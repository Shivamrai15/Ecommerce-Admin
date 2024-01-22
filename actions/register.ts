"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas/register-schema";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async(values : z.infer<typeof RegisterSchema>)=>{
    try {
        const validatedData = RegisterSchema.safeParse(values);

        if (!validatedData.success){
            return { error : "Invalid credentials"}
        }

        const { email, password, name } = validatedData.data;

        const existingUser = await getUserByEmail(email);
        if (existingUser){
            return { error : "Account already exists"}
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.user.create({
            data : {
                name,
                email,
                password : hashedPassword,
            }
        });


        // Generating verification token
        const token = await generateVerificationToken(email);

        if (!token){
            return { error : "Internal server error"}
        }

        await sendVerificationEmail(email, token.token, name);

        return {
            success : "Verification email has been sent"
        }

    } catch (error) {
        console.error(error);
        return { error : "Internal server error"}
    }
}   