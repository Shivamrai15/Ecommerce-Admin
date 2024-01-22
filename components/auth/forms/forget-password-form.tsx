"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormWrapper } from "@/components/auth/utils/form-wrapper";

import { ForgetPasswordSchema } from "@/schemas/forget-password-schema";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { reset } from "@/actions/reset";


export const ForgetPasswordForm = () => {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
        resolver : zodResolver(ForgetPasswordSchema),
        defaultValues : {
            email : ""
        }
    });

    const onSubmit = async(values : z.infer<typeof ForgetPasswordSchema>) => {
        try {
            setIsLoading(true);
            const response = await reset(values);

            if (response.error){
                toast.error(response.error);
            }

            if (response.success){
                toast.success(response.success);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <FormWrapper
            headerLabel="Forget your password?"
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
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="john@example.com"
                                            type="email"
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
