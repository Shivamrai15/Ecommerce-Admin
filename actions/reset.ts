"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ForgetPasswordSchema } from "@/schemas/forget-password-schema";
import * as z from "zod";

export const reset = async (values : z.infer<typeof ForgetPasswordSchema>) =>{
    try {
        
        const validatedData = ForgetPasswordSchema.safeParse(values);
        if (!validatedData.success){
            return { error : "Invalid credentials" }
        }
        
        const { email } = validatedData.data;

        const existingUser = await getUserByEmail(email);

        if (!existingUser || !existingUser.password){
            return { error : "Account does not exist" }
        }

        const token = await generatePasswordResetToken(email);

        if (!token){
            return { error: "Internal server error"}
        }

        await sendPasswordResetEmail(existingUser.email, token.token, existingUser.name);

        return { success : "Password reset verification email has been sent"}

    } catch (error) {
        console.log(error);
        return { error: "Internal server error"}
    }
}