"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
}  from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormWrapper } from "@/components/auth/utils/form-wrapper";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas/login-schema";
import { useState } from "react";
import { Loader } from "lucide-react";
import { login } from "@/actions/login";
import { toast } from "sonner";
import Link from "next/link";

export const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password : "",
        }
    });

    const onSubmit = async(values : z.infer<typeof LoginSchema>)=>{
        try {
            setIsLoading(true);
            const response = await login(values);
            if (response.error){
                toast.error(response.error);
            }else{
                toast.success(response.success);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <FormWrapper
            headerLabel="Welcome Back"
            backButtonHref="/sign-up"
            backButtonLabel="Don't have an account?"
            showSocial
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField 
                            name="email"
                            control={form.control}
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
                        <FormField 
                            name="password"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled = {isLoading}
                                            className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-red-200/70 rounded-md"/>
                                    <Button
                                        size="sm"
                                        variant="link"
                                        asChild
                                        className="px-0 font-normal text-xs"
                                    >
                                        <Link
                                        href="/forget"
                                        >
                                        Forget Password
                                        </Link>
                                    </Button>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled = {isLoading}
                        className="w-full"  
                        type="submit"                  
                    >
                        {isLoading ? (
                            <Loader className="animate-spin"/> 
                        ) : "Login"}
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    );
}
