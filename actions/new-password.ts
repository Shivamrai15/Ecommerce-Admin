"use server";

import { getResetTokenByToken } from "@/data/reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const newPassword = async (password: string, token : string)=>{
    try {
        
        const existingToken = await getResetTokenByToken(token);

        if (!existingToken){
            return { error : "Invalid verification link"}
        }

        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired){
            return { error : "Verification link has been expired!"}
        }

        const existingUser = await getUserByEmail(existingToken.email);

        if (!existingUser || !existingUser.password){
            return { error : "Account does not exists"}
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await db.user.update({
            where : {
                id : existingUser.id
            },
            data : {
                password : hashedPassword
            }
        });

        return { success : "Password has been changed successfully"}

    } catch (error) {
        console.log(error);
        return {
            error : "Internal server error"
        }
    }
}