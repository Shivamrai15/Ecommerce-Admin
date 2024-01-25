"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Trash2 } from "lucide-react";
import { Header } from "@/components/store/utils/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageUpload } from "@/components/store/utils/image-upload";
import { SizeFormSchema } from "@/schemas/size-form-schema";

interface SizeFormProps {
    data : Size | null
}

export const SizeForm = ({
    data
} : SizeFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const title  = data ? "Edit Size" : "Create Size";
    const description  = data ? "Edit a size" : "Add a new size";
    const toastMessage  = data ? "Size updated." : "Size created.";
    const actions  = data ? "Save Changes" : "Create";

    const form = useForm<z.infer<typeof SizeFormSchema>>({
        resolver : zodResolver(SizeFormSchema),
        defaultValues :  data || {
            name : "",
            value : ""
        }
    });

    const onSubmit = async(values : z.infer<typeof SizeFormSchema>) => {
        try {
            
            setLoading(true);

            if (data){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/sizes`, values);
            }
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            router.refresh();
            toast.success(toastMessage);

        } catch (error) {
            console.log(error);
            toast.error("Internal server error");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async()=>{
        try {
            
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            router.refresh();
            toast.success("Size deleted");

        } catch (error) {
            console.error(error);
            toast.error("Internal server error");
        } finally{
            setLoading(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen = {open}
                onClose={()=>setOpen(false)}
                loading = {loading}
                onConfirm={onDelete}
            />
            <div className="flex items-center justify-between">
                <Header
                    title = {title}
                    description = {description}
                />
                {
                    data && (
                        <Button
                            disabled = {loading}
                            variant="destructive"
                            size="sm"
                            onClick={()=>setOpen(true)}
                        >
                            <Trash2/>
                        </Button>
                    )
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name = "name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {loading}
                                            placeholder="Size name"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name = "value"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {loading}
                                            placeholder="Size value"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled = {loading}
                    >
                        {actions}
                    </Button>
                </form>
            </Form>
        </>
    );
}
