"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/login-schema";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async(values : z.infer<typeof LoginSchema>)=>{
    try {
        const validatedData = LoginSchema.safeParse(values);

        if (!validatedData.success){
            return { error : "Invalid credentials"}
        }

        const { email, password } = validatedData.data;
        const existingUser = await getUserByEmail(email);

        if (!existingUser || !existingUser.password){
            return { error : "Account does not exist"}
        }

        
        const isVerified = !!existingUser.emailVerified
        if (!isVerified){
            
            // Generating verification token
            const token = await generateVerificationToken(email);
            if (!token){
                return { error : "Internal server error"}
            }

            await sendVerificationEmail(email, token.token, existingUser.name);
            return { success : "Verification email has been sent"}
        }

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

        return {
            success : "Logged In successfully"
        }

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
              case "CredentialsSignin":
                return { error: "Invalid credentials!" }
              default:
                return { error: "Internal server error" }
            }
          }
      
          throw error;
    }
}