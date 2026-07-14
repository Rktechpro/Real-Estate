import { AddPropertyInput } from "./addProperty.Dto";
import { addPropertyModel } from "./addproperty.model";

export const addProperty = async (
    body: AddPropertyInput,
    images: string[]
) => {
    const exists = await addPropertyModel.findOne({
        owner: body.owner,
        title: body.title,
        address: body.address,
    });

    if (exists) {
        throw new Error("Property already exists.");
    }

    const property = await addPropertyModel.create({
        ...body,
        images,
    });

    return property;
};