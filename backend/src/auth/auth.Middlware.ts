import { NextFunction, Response, Request } from "express"
import jwt from 'jsonwebtoken'
import { cookieOptions, userDataInterface } from "./auth.interface";


export interface AuthRequest extends Request {
    user?: userDataInterface
}

const options: cookieOptions = {
    httpOnly: true,
    maxAge: Number(process.env.ACCESS_TOKEN_EXPIRY),
    domain: process.env.CLIENT_DOMAIN,
    secure: process.env.NODE_ENV === "dev" ? false : true,
    sameSite: "lax" as const
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as userDataInterface;

        req.user = decoded;

        next();
    } catch (err) {

        if (err instanceof jwt.TokenExpiredError) {
            res.clearCookie("accessToken", options)
            return res.status(401).json({
                success: false, message: "Access token expired",
            });
        }
        res.clearCookie("accessToken", options)

        if (err instanceof jwt.JsonWebTokenError)
            return res.status(401).json({
                success: false, message: "Invalid token",
            })
    }
}
