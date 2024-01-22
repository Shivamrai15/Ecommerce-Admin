import { db } from "@/lib/db";

export const getResetTokenByToken = async(token : string) => {
    try {
        
        const existingToken = await db.passwordResetToken.findUnique({
            where : {
                token
            }
        });
        return existingToken;

    } catch (error) {
        return null;
    }
}

export const getResetTokenByEmail = async(email : string) => {
    try {

        const existingToken = await db.passwordResetToken.findFirst({
            where : {
                email
            }
        });
        return existingToken;

    } catch (error) {
        return null;
    }
}