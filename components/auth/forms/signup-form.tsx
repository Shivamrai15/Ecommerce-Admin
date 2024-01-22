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
import { RegisterSchema } from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { register } from "@/actions/register";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export const SignUpForm = () => {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver : zodResolver(RegisterSchema),
        defaultValues : {
            name : "",
            email : "",
            password : "",
        }
    });

    const onSubmit = async(values : z.infer<typeof RegisterSchema>)=>{
        setIsLoading(true);
        const response = await register(values);
        if (response.error){
            toast.error(response.error);
        } else {
            toast.error(response.success);
        }
        setIsLoading(false);
    }

    return (
        <FormWrapper
            headerLabel="Create an account"
            backButtonHref="/login"
            backButtonLabel="Already have an account"
            showSocial
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField 
                            name="name"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {isLoading}
                                            placeholder="John"
                                            type="name"
                                            className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-red-200/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name="email"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {isLoading}
                                            placeholder="john@example.com"
                                            type="email"
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
                                            disabled = {isLoading}
                                            placeholder="******"
                                            type="password"
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
                        {isLoading ? (
                            <Loader className="animate-spin"/> 
                        ) : "Create an account"}
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    );
}
