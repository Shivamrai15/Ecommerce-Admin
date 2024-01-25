import * as z from "zod";

export const ColorFormSchema = z.object({
    name : z.string().min(1, {
        message : "Name is required"
    }),
    value : z.string().min(4).regex(/^#/, {
        message  : "String must be a valid hex code"
    })
});