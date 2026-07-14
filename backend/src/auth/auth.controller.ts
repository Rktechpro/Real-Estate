import { Request, Response } from "express"
import * as authService from './auth.service'
import { AuthRequest } from "./auth.Middlware"



export const signup = async (req: Request, res: Response) => {
    try {
        const body = req.body
        const auth = await authService.signup(body)
        res.json(auth)

    } catch (err) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message })
    }
}

export const VerifyOtp = async (req: Request, res: Response) => {
    try {

        const body = req.body;
        const user = await authService.verifyOtp(body)


        res.cookie("accessToken", user.accessToken, {
            httpOnly: true,
            maxAge: Number(process.env.ACCESS_TOKEN_EXPIRY),
            domain: process.env.CLIENT_DOMAIN,
            secure: process.env.NODE_ENV === "dev" ? false : true,
            sameSite: "lax"
        })

        res.cookie("refreshToken", user.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: process.env.CLIENT_DOMAIN,
            secure: process.env.NODE_ENV === "dev" ? false : true,
            sameSite: "lax"
        })

        res.json({
            success: true,
            message: user.message
        });

    } catch (err) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message })
    }
}


export const resendOtp = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const user = await authService.resendOtp(body)

        return res.status(201).json({
            success: user.success,
            message: user.message
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({

                message: err.message,
            });
        }
    }
};

export const Logout = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const user = await authService.Logout(userId)
        const cookieoption = {
            httpOnly: true,
            maxAge: Number(process.env.ACCESS_TOKEN_EXPIRY),
            domain: process.env.CLIENT_DOMAIN,
            secure: process.env.NODE_ENV === "dev" ? false : true,
            sameSite: "lax"
        }
        res.clearCookie("accessToken", cookieoption as any)
        res.clearCookie("refreshToken", cookieoption as any)
        return res.json({ success: user.success, message: user.message })

    } catch (err) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message })
    }
}

export const profile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId)
            return res.status(404).json({ message: "User Not Found!" })

        const userProfile = await authService.profile(userId)
        res.json(userProfile)
    } catch (err) {
        if (err instanceof Error)
            return res.status(500).json({ message: err.message })
    }
}