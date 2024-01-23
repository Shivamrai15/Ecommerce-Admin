"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { StoreSchema } from "@/schemas/store-schema";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreForm = () => {
    
    const { onClose } = useStoreModal();
    const [isLoading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof StoreSchema>>({
        resolver : zodResolver(StoreSchema),
        defaultValues : {
            name : ""
        }
    });

    const onSubmit = async( values : z.infer<typeof StoreSchema>)=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/stores", values);
            window.location.assign(`/${response.data.id}`);

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");

        } finally {
            setLoading(false);
        }
    }
    
    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 py-2 pb-2"
            >
                <FormField
                    control={form.control}
                    name = "name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Store name"
                                    {...field}
                                    disabled = {isLoading}
                                    className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-2"
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage className="w-full px-2 py-2 bg-red-200/50 text-destructive/70 rounded-md"/>
                        </FormItem>
                    )}
                />
                <div className="space-x-2 flex items-center justify-end w-full">
                    <Button
                        onClick={onClose}
                        variant={"outline"}
                        disabled = {isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        disabled = {isLoading}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
    )
}
