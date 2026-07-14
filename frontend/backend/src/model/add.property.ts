import { Schema, Types, model } from "mongoose";
import { addArea, addownership, addPropert, addStatus, frontSide } from "../enum/addProperty.enum";


const addPropertySchema = new Schema(
    {
        owner: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        propertyType: {
            type: String,
            enum: addPropert,
            required: true,
        },

        listingType: {
            type: String,
            enum: ["Sale", "Rent"],
            default: "Sale",
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        area: {
            type: Number,
            required: true,
        },

        areaUnit: {
            type: String,
            enum: addArea,
            default: "sqft",
        },

        length: Number,

        width: Number,

        facing: {
            type: String,
            enum: frontSide
        },

        address: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        pincode: {
            type: String,
            required: true,
        },

        latitude: Number,

        longitude: Number,

        images: [
            {
                type: String,
            },
        ],

        video: {
            type: String,
            default: "",
        },

        amenities: [
            {
                type: String,
            },
        ],

        isCornerPlot: {
            type: Boolean,
            default: false,
        },

        roadWidth: {
            type: Number,
        },

        ownership: {
            type: String,
            enum: addownership,
            default: "Freehold",
        },

        featured: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: addStatus,
            default: "Available",
        },

        isApproved: {
            type: Boolean,
            default: false,
        },

        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

export const addPropertyModel = model("addProperty", addPropertySchema)

