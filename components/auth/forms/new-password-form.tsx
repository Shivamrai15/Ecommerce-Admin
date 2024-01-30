"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormMessage,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FormWrapper } from "@/components/auth/utils/form-wrapper"
import { ResetPasswordSchema } from "@/schemas/reset-password-schema";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { newPassword } from "@/actions/new-password";


export const NewPasswordForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver : zodResolver(ResetPasswordSchema),
        defaultValues : {
            password : ""
        }
    });

    const onSubmit = async (values : z.infer<typeof ResetPasswordSchema>) => {
        try {
            setIsLoading(false);
            if (!token){
                toast.error("Invalid verification link");
                return;
            }

            const response = await newPassword(values.password, token);
            if (response.error){
                toast.error(response.error);
            }
            if (response.success){
                toast.success(response.success);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <FormWrapper
            headerLabel="Reset your password"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <Form {...form}>
            <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="*******"
                                            type="password"
                                            disabled = {isLoading}
                                            className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-red-200/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled = {isLoading}
                        className="w-full"    
                        type="submit"                
                    >
                        { isLoading ? (
                            <Loader className="animate-spin"/> 
                        ) : "Reset Password" }
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    )
}
