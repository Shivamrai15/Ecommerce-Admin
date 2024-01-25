import { ProductType } from "@prisma/client";
import * as z from "zod";

export const ProductSchema = z.object({
    name : z.string().min(1, {
        message : "Name is required"
    }),
    productImages : z.object({ url: z.string() }).array(),
    price : z.coerce.number().min(1, {
        message : "Price is required"
    }),
    stock : z.coerce.number().min(0, {
        message : "Stock cannot be negative"
    }),
    categoryId : z.string().min(1, {
        message : "Category is required"
    }),
    colorId : z.string().min(1, {
        message : "Category is required"
    }),
    sizeId : z.string().min(1, {
        message : "Category is required"
    }),
    about : z.string().min(1, {
        message : "Short description of product is required"
    }),
    description : z.string().min(1, {
        message : "Product description is required"
    }),
    sizeAndFit : z.string().array(),
    materialAndCare :z.string().array(),
    isFeatured : z.boolean(),
    isArchieved : z.boolean().default(false),
    type : z.union([
        z.literal(ProductType.MEN),
        z.literal(ProductType.WOMEN),
        z.literal(ProductType.KIDS),
        z.literal(ProductType.BEAUTY),
    ]),
});