import * as z from "zod";

export const ResetPasswordSchema = z.object({
    password : z.string().min(6, {
        message : "Minimum six characters required"
    })
});