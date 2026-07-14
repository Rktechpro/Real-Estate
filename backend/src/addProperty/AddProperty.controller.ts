import { Request, Response } from "express";
import * as propertyService from "./addproperty.service";

export const AddProperty = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];

        const images = files.map((file) => file.filename);

        const property = await propertyService.addProperty(
            req.body,
            images
        );

        return res.status(201).json({
            success: true,
            data: property,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error ? error.message : "Internal Server Error",
        });
    }
};