import * as z from "zod";

export const SizeFormSchema = z.object({
    name : z.string().min(1, {
        message : "Name is required"
    }),
    value : z.string().min(1, {
        message : "Value is required"
    })
});