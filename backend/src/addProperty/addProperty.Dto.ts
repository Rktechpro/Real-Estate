import { z } from "zod";
import { addArea, addownership, addPropert, addStatus, frontSide } from "./addProperty.enum";

export const addPropertyValidation = z.object({
    owner: z.string().min(1, "Owner is required"),
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),

    propertyType: z.enum(addPropert),

    listingType: z.enum(["Sale", "Rent"]).default("Sale"),

    price: z.number().positive("Price must be greater than 0"),

    area: z.number().positive("Area must be greater than 0"),

    areaUnit: z.enum(addArea),

    length: z.number().positive().optional(),

    width: z.number().positive().optional(),

    facing: z.enum(frontSide).optional(),

    address: z.string().min(5),

    city: z.string().min(2),

    state: z.string().min(2),

    pincode: z
        .string()
        .regex(/^[1-9][0-9]{5}$/, "Invalid pincode"),

    latitude: z.number().optional(),

    longitude: z.number().optional(),

    images: z.array(z.string()).default([]),

    video: z.string().optional(),

    amenities: z.array(z.string()).default([]),

    isCornerPlot: z.boolean().default(false),

    roadWidth: z.number().positive().optional(),

    ownership: z.enum(addownership),

    featured: z.boolean().default(false),

    status: z.enum(addStatus),

    isApproved: z.boolean().default(false),

    views: z.number().default(0),
});

export type AddPropertyInput = z.infer<typeof addPropertyValidation>;