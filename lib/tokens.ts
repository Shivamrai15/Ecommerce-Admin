import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { getResetTokenByEmail } from "@/data/reset-token";

export const generateVerificationToken = async( email: string ) =>{
    try {

        const token = nanoid(20);
        const expires = new Date(new Date().getTime() + 600*1000);

        const existingToken = await db.verificationToken.findFirst({
            where : {
                email
            }
        });

        if (existingToken){
            await db.verificationToken.delete({
                where : {
                    id : existingToken.id
                }
            });
        }

        const verificationToken = await db.verificationToken.create({
            data : {
                email,
                token,
                expires
            }
        });

        return verificationToken;

    } catch (error) {
        return null;
    }
}


export const generatePasswordResetToken = async(email : string)=>{
    try {
        
        const token = nanoid(20);
        const expires = new Date(new Date().getTime() + 600*1000);

        const existingToken = await getResetTokenByEmail(email);
        
        if (existingToken){
            await db.passwordResetToken.delete({
                where :{
                    id :existingToken.id
                }
            });
        }

        const resetToken = await db.passwordResetToken.create({
            data :{
                email,
                token,
                expires
            }
        });

        return resetToken;

    } catch (error) {
        return null;
    }
}