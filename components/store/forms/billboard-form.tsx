"use client";

import * as z from "zod";
import { useState } from "react";
import { BillBoard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { BillboardSchema } from "@/schemas/billboard-schema";
import axios from "axios";
import { toast } from "sonner";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageUpload } from "@/components/store/utils/image-upload";

interface BillboardFormProps {
    data : BillBoard | null
}

export const BillboardForm = ({
    data
} : BillboardFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const title  = data ? "Edit Billboard" : "Create Billboard";
    const description  = data ? "Edit a billboard" : "Add a new Billboard";
    const toastMessage  = data ? "Billboard updated." : "Billboard created.";
    const actions  = data ? "Save Changes" : "Create";

    const form = useForm<z.infer<typeof BillboardSchema>>({
        resolver : zodResolver(BillboardSchema),
        defaultValues :  data || {
            label : "",
            imageUrl : ""
        }
    });

    const onSubmit = async(values : z.infer<typeof BillboardSchema>) => {
        try {
            
            setLoading(true);

            if (data){
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, values);
            }
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push("/");
            toast.success("Billboard deleted");

        } catch (error) {
            console.error(error);
            toast.error("Make sure you removed all categories first.")
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
                            name = "label"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {loading}
                                            placeholder="Billboard label"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                            control={form.control}
                            name = "imageUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Background image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value ? [field.value] : []}
                                            disabled = {loading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                    />
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
