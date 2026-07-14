import { email, z } from 'zod'

export const signupDtoSchema = z.object({
    fullname: z.string().min(1, "fullName is Required"),
    email: z.email("Enter a valid Email"),
    password: z.string().min(8, "Password is Required")
})

export const verifyOtpDtoSchema = z.object({
    email: z.email("Enter a Valid Email"),
    otp: z.string().min(6, "Enter a Valid Otp")
})

export const resendOtpDtoSchema = z.object({
    email: z.email("Enter a Valid Email"),
})

export type signupDto = z.infer<typeof signupDtoSchema>
export type verifyOtpDto = z.infer<typeof verifyOtpDtoSchema>
export type resendOtpDto = z.infer<typeof resendOtpDtoSchema>