import { Router } from "express";
import { Logout, profile, resendOtp, signup, VerifyOtp } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.Middlware";


export const authRouter = Router()

authRouter.post("/signup", signup)
authRouter.post("/verify-otp", VerifyOtp)
authRouter.post("/resend-otp", resendOtp)
authRouter.post("/logout", authMiddleware, Logout)
authRouter.post("/profile", authMiddleware, profile)