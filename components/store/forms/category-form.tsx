"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { BillBoard, Category, CategoryClassification, CategoryType, ProductType } from "@prisma/client";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { Trash2 } from "lucide-react";
import { Header } from "@/components/store/utils/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { CategoryFormSchema } from "@/schemas/category-form-schema";

interface CategoryFormProps {
    data : Category | null,
    billboards : BillBoard[]
}

export const CategoryForm = ({
    data,
    billboards
} : CategoryFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const title  = data ? "Edit Category" : "Create Category";
    const description  = data ? "Edit a category" : "Add a new category";
    const toastMessage  = data ? "Category updated." : "Category created.";
    const actions  = data ? "Save Changes" : "Create";

    const form = useForm<z.infer<typeof CategoryFormSchema>>({
        resolver : zodResolver(CategoryFormSchema),
        defaultValues :  data || {
            name : ""
        }
    });

    const onSubmit = async(values : z.infer<typeof CategoryFormSchema>) => {
        try {
            
            setLoading(true);

            if (data){
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/categories`, values);
            }
            router.refresh();
            router.push(`/${params.storeId}/categories`);
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
            router.refresh();
            router.push(`/${params.storeId}/categories`);
            router.refresh();
            toast.success("Category deleted");

        } catch (error) {
            console.error(error);
            toast.error("Make sure you removed all products first.")
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
                                            placeholder="Category name"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name = "billboardId"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled = {loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder = "Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                billboards.map((billboard)=>(
                                                    <SelectItem 
                                                        key={billboard.id}
                                                        value={billboard.id}
                                                    >
                                                        {billboard.label}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>    
                                    </Select>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name = "type"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Category Type</FormLabel>
                                    <Select
                                        disabled = {loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder = "Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                [CategoryType.MEN, CategoryType.WOMEN, CategoryType.UNISEX, CategoryType.BEAUTY].map((item)=>(
                                                    <SelectItem 
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>    
                                    </Select>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name = "classification"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Product Classification</FormLabel>
                                    <Select
                                        disabled = {loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder = "Classify Product" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                [
                                                    CategoryClassification.TOPWEAR,
                                                    CategoryClassification.BOTTOMWEAR,
                                                    CategoryClassification.FOOTWEAR,
                                                    CategoryClassification.INNERWEARANDSLEEPWEAR,
                                                    CategoryClassification.MAKEUP,
                                                    CategoryClassification.SKINCARE,
                                                    CategoryClassification.HAIRCARE,
                                                    CategoryClassification.FRAGRANCES
                                                ].map((item)=>(
                                                    <SelectItem 
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>    
                                    </Select>
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
