"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { FormWrapper } from "@/components/auth/utils/form-wrapper";
import { FormError } from "@/components/auth/utils/form-error";
import { FormSuccess } from "@/components/auth/utils/form-success";

import { tokenVerification } from "@/actions/token-verification";


export const TokenVerificationForm = () => {
    
    const [ error, setError ] = useState<string|undefined>();
    const [ success, setSuccess ] = useState<string|undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const verifyToken = useCallback(()=>{
        
        if (success || error) return;
        
        if (!token){
            setError("Invalid verification link");
            return;
        }

        tokenVerification(token)
        .then((response)=>{
            if (response.error){
                setError(response.error);
            }
            else{
                setSuccess(response.success);
            }
        })
        .catch((error)=>{
            console.log(error);
            setError("Something went wrong");
        });

    }, [token, error, success]);

    useEffect(()=>{
        verifyToken();
    }, [verifyToken]);
    
    return (
        <FormWrapper
            headerLabel="Confirming your email"
            backButtonLabel="Back to login"
            backButtonHref="/login"

        >
            <div className="flex items-center justify-center w-full">
                {
                    !error && !success && (
                        <Loader2 className="h-5 w-5 text-muted-foreground animate-spin"/>
                    )
                }
                {
                    error && (
                        <FormError message={error} />
                    )
                }
                {
                    success && (
                        <FormSuccess message={success} />
                    )
                }
            </div>
        </FormWrapper>
    );
}
