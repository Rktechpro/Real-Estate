import { Worker } from "bullmq";
import nodemailer from "nodemailer";
import connection from "../config/redis";
import { generateOtpTemplate } from "../message-template/user.template";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
    },
});

new Worker("emailQueue", async (job) => {
    const { email, otp, fullname } = job.data;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP Verification",
        html: generateOtpTemplate({
            name: fullname,
            otp,
            expiryMinutes: 1,
            company: "Real State",
            supportEmail: "support@realstate.com",
        }),
    });
},
    {
        connection: connection as any,
    }
);