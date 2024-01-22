import { nanoid } from "nanoid";
import { db } from "@/lib/db";

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