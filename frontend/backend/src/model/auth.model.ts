import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import moment from "moment";

const authSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        lowercase: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    expiredAt: {
        type: Date
    },

    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    resendOtpAt: {
        type: Date,
        default: null,
    },
    refreshToken: {
        type: String,
    },

}, { timestamps: true })

authSchema.pre('save', function () {
    this.refreshToken = uuid()
    this.expiredAt = moment().add(7, 'day').toDate()
})

authSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12)
})

export const authModel = model("auth", authSchema)