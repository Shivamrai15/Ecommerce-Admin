"use client";

import * as z from "zod";
import { useState } from "react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas/settings-schema";
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
import { ApiAlert } from "../utils/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
    data : Store
}

export const SettingsForm = ({
    data
} : SettingsFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver : zodResolver(SettingsSchema),
        defaultValues : data
    });

    const onSubmit = async(values : z.infer<typeof SettingsSchema>) => {
        try {
            
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, values);
            router.refresh();
            toast.success("Store Updated");
        } catch (error) {
            console.log(error);
            toast.error("Internal server error");
        } finally {
            setLoading(false);
        }
    }

    const onDeleteStore = async()=>{
        try {
            
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted");

        } catch (error) {
            console.error(error);
            toast.error("Make sure you removed all products and categories first.")
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
                onConfirm={onDeleteStore}
            />
            <div className="flex items-center justify-between">
                <Header
                    title = "Settings"
                    description = "Manage store preferences"
                />
                <Button
                    disabled = {loading}
                    variant="destructive"
                    size="sm"
                    onClick={()=>setOpen(true)}
                >
                    <Trash2/>
                </Button>
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
                                            placeholder="Store name"
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
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant="public"
            />
        </>
    );
}
