import redis from "../config/redis";
import { authModel } from "./auth.model";
import emailQueue from "../queues/email.queue";
import { resendOtpDto, signupDto, verifyOtpDto } from "./auth.dto";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const attemp = {
    attempts: 3,
    removeOnComplete: 100,
    removeOnFail: 50,
    backoff: {
        type: "exponential",
        delay: 3000,
    },
}

export const signup = async (body: signupDto) => {
    const { fullname, email, password } = body
    const exist = await authModel.findOne({ email: body.email })
    if (exist)
        throw new Error("User already exists")
    const otp = generateOTP()
    const hashotp = await bcrypt.hash(otp, 12)

    await redis.set(
        `signup:${email}`,
        JSON.stringify({
            fullname,
            email,
            password,
            otp: hashotp,
        }),
        "EX",
        300
    );

    const otpExp = new Date(Date.now() + 60 * 1000)
    await authModel.create({
        fullname,
        email,
        password,
        otp: hashotp,
        otpExpiry: otpExp
    });

    await emailQueue.add("signupOtp", { email, otp, fullname })

    return {
        success: true,
        message: "OTP sent successfully",
    };

}

export const verifyOtp = async (body: verifyOtpDto) => {
    const { email, otp } = body;

    const user = await authModel.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.otp || !user.otpExpiry || new Date() > user.otpExpiry) {
        throw new Error("OTP has expired. Please request a new OTP.");
    }

    const isValidOtp = await bcrypt.compare(otp, user.otp);

    if (!isValidOtp) {
        throw new Error("Invalid OTP");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    const payload = {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
    };

    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1h",
        }
    );

    return {
        message: "OTP verified successfully",
        accessToken,
        refreshToken: user.refreshToken,
    };
};

export const resendOtp = async (body: resendOtpDto) => {
    const { email } = body
    if (!email)
        throw new Error("Email is required")
    const user = await authModel.findOne({ email })

    if (!user)
        throw new Error("User not found")

    if (!user.isVerified)
        throw new Error("Email is already verified");


    // 60 seconds cooldown
    if (user.resendOtpAt && user.resendOtpAt.getTime() > Date.now()) {
        const remainingSeconds = Math.ceil(
            (user.resendOtpAt.getTime() - Date.now()) / 1000
        );
        throw new Error(
            `Please wait ${remainingSeconds} seconds before requesting a new OTP`
        );
    }

    const otp = generateOTP();
    const hashOtp = await bcrypt.hash(otp, 12)
    user.otp = hashOtp;

    // OTP valid for 1 minutes
    user.otpExpiry = new Date(Date.now() + 60 * 1000);
    // Resend cooldown 1 minute
    user.resendOtpAt = new Date(Date.now() + 60 * 1000);
    await user.save();
    await emailQueue.add("sendOTP", {
        email: user.email,
        fullname: user.fullname,
        otp,

    }, attemp);

    return {
        success: true,
        message: "OTP resent successfully",
    }
}

export const Logout = async (userId: string) => {
    const user = await authModel.findById(userId)

    if (!user)
        throw new Error("User not found")

    user.refreshToken = null
    user.otp = null,
        user.otpExpiry = null

    await user.save();
    return {
        success: true,
        message: "Logout successful",
    };
}

export const profile = async (userId: string) => {
    const user = await authModel.findById(userId)
        .select("-password -otp -refreshToken");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};