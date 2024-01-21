import { db } from "@/lib/db";

export const getUserById = async( id : string ) => {
    try {
        const user = db.user.findUnique({
            where : {
                id
            }
        });

        return user;
    } catch (error) {
        return null;
    }
}

export const getUserByEmail = async( email : string ) => {
    try {
        const user = db.user.findUnique({
            where : {
                email
            }
        });

        return user;
    } catch (error) {
        return null;
    }
}