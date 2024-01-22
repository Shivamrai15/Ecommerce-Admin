"use client";

import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {

    const onClick = () => {
        signIn("google", {
            callbackUrl : DEFAULT_LOGIN_REDIRECT
        });
    }

    return (
        <Button
            onClick={onClick}
            className="w-full"
            variant="outline"
        >
            <FcGoogle className="h-5 w-5"/>
        </Button>
    );
}
