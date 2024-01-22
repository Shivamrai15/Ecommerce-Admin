import { db } from "@/lib/db";

export const getVerificationTokenByToken = async(token : string)=>{
    try {
        
        const existingToken = await db.verificationToken.findUnique({
            where : {
                token
            }
        });
        return existingToken;

    } catch (error) {
        return null;
    }
}