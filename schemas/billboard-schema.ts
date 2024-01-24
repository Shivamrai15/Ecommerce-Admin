import * as z from "zod";

export const BillboardSchema = z.object({
    label : z.string().min(1, {
        message : "Name is required"
    }),
    imageUrl : z.string().min(1, {
        message : "Image is required"
    })
});