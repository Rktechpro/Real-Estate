import { Document, Types } from "mongoose";

export interface AddPropertyModelInterface extends Document {
    owner: Types.ObjectId;

    title: string;

    description: string;

    propertyType:
    | "Residential"
    | "Commercial"
    | "Agricultural"
    | "Industrial";

    listingType: "Sale" | "Rent";

    price: number;

    area: number;

    areaUnit:
    | "sqft"
    | "sqyd"
    | "acre"
    | "hectare";

    length?: number;

    width?: number;

    facing?:
    | "North"
    | "South"
    | "East"
    | "West"
    | "North-East"
    | "North-West"
    | "South-East"
    | "South-West";

    address: string;

    city: string;

    state: string;

    pincode: string;

    latitude?: number;

    longitude?: number;

    images: string[];

    video?: string;

    amenities: string[];

    isCornerPlot: boolean;

    roadWidth?: number;

    ownership: "Freehold" | "Leasehold";

    featured: boolean;

    status: "Available" | "Sold" | "Pending";

    isApproved: boolean;

    views: number;

    createdAt: Date;

    updatedAt: Date;
}