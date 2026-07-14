import { Router } from "express";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import { AddProperty } from "./AddProperty.controller";

export const addPropertyRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/");
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${nanoid()}${ext}`);
    },
});

const upload = multer({ storage });

addPropertyRouter.post(
    "/add",
    upload.array("images", 10),
    AddProperty
);