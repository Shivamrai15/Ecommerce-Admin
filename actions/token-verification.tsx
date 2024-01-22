"use server";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const tokenVerification = async(token : string)=>{
    try {
        
        const existingToken = await getVerificationTokenByToken(token);

        if (!existingToken){
            return { error : "Token does not exists"}
        }

        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired){
            return { error : "Verification email has been expired"}
        }

        const existingUser = await getUserByEmail(existingToken.email);

        if (!existingUser || !existingUser.password){
            return { error : "Account does not exists"}
        }

        await db.user.update({
            where : {
                id : existingUser.id
            },
            data : {
                emailVerified : new Date(),
                email : existingToken.email
            }
        });

        await db.verificationToken.delete({
            where : {
                id : existingToken.id
            }
        });

        return {
            success : "Email verified successfully"
        }

    } catch (error) {
        console.log(error);
        return { error:"Internal server error"}
    }
}