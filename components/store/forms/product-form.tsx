"use client";

import * as z from "zod";
import { useState } from "react";
import {
    Category,
    Color,
    Product,
    ProductImage,
    ProductType,
    Size
} from "@prisma/client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageUpload } from "@/components/store/utils/image-upload";
import { ProductSchema } from "@/schemas/product-form-schema";
import { Switch } from "@/components/ui/switch";
import { ProductFeatures } from "../utils/product-features";

interface ProductFormProps {
    data : (Product & {
        productImages : ProductImage[]
    }) | null,
    categories : Category[],
    sizes : Size[],
    colors : Color[]
}

export const ProductForm = ({
    data,
    categories,
    sizes,
    colors
} : ProductFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const title  = data ? "Edit Product" : "Create Product";
    const description  = data ? "Edit a product" : "Add a new product";
    const toastMessage  = data ? "Product updated." : "Product created.";
    const actions  = data ? "Save Changes" : "Create";

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver : zodResolver(ProductSchema),
        defaultValues :  data || {
            name : "",
            productImages : [],
            price : 0,
            stock : 0,
            about : "",
            categoryId : "",
            colorId : "",
            sizeId : "",
            isFeatured : false,
            isArchieved : false,
            description : "",
            materialAndCare : [],
            sizeAndFit : [],
            type : ProductType.MEN
        }
    });

    const onSubmit = async(values : z.infer<typeof ProductSchema>) => {
        try {
            
            setLoading(true);

            if (data){
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/products`, values);
            }
            router.refresh();
            router.push(`/${params.storeId}/products`);
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/${params.storeId}/products`);
            router.refresh();
            toast.success("Product deleted");

        } catch (error) {
            console.error(error);
            toast.error("Internal server error")
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
                                            placeholder="Product name"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name = "about"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>About Product</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {loading}
                                            placeholder="About Product"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name = "description"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Product Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {loading}
                                            placeholder="A short description of product..."
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name = "price"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {loading}
                                            placeholder="Enter the price in INR"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name = "stock"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {loading}
                                            placeholder="No of stocks available"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name = "categoryId"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
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
                                                categories.map((category)=>(
                                                    <SelectItem 
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
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
                            name = "colorId"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select
                                        disabled = {loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder = "Select a color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                colors.map((color)=>(
                                                    <SelectItem 
                                                        key={color.id}
                                                        value={color.id}
                                                    >
                                                        <div className="flex items-center gap-x-4 w-full">
                                                            <div className="h-4 w-4 rounded-full" style={{backgroundColor : color.value}} />
                                                            {color.name}
                                                        </div>
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
                            name = "sizeId"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select
                                        disabled = {loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder = "Select a size" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                sizes.map((size)=>(
                                                    <SelectItem 
                                                        key={size.id}
                                                        value={size.id}
                                                    >
                                                        {size.name}
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
                                    <FormLabel>Product Type</FormLabel>
                                    <Select
                                        disabled = {loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder = "Select product type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                [
                                                    ProductType.MEN,
                                                    ProductType.WOMEN,
                                                    ProductType.KIDS,
                                                    ProductType.BEAUTY
                                                ].map((type)=>(
                                                    <SelectItem 
                                                        key={type}
                                                        value={type}
                                                        defaultValue={""}
                                                    >
                                                        {type}
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
                            name = "isFeatured"
                            render={({field})=>(
                                <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-4">
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Featured</FormLabel>
                                        <FormDescription>
                                            This product will appear on the home page
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                            control={form.control}
                            name = "sizeAndFit"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Size and Fit</FormLabel>
                                    <FormControl>
                                        <ProductFeatures
                                            value = { [...field.value] }
                                            disabled = {loading}
                                            onChange = {(value) => field.onChange([...field.value, value])}
                                            onRemove = { (value) => field.onChange([...field.value.filter((data)=>data!==value)])}
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                    />
                    <FormField
                            control={form.control}
                            name = "materialAndCare"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Material and Care</FormLabel>
                                    <FormControl>
                                        <ProductFeatures
                                            value = { [...field.value] }
                                            disabled = {loading}
                                            onChange = {(value) => field.onChange([...field.value, value])}
                                            onRemove = { (value) => field.onChange([...field.value.filter((data)=>data!==value)])}
                                        />
                                    </FormControl>
                                    <FormMessage className="w-full px-2 py-2 bg-destructive/20 text-destructive/70 rounded-md"/>
                                </FormItem>
                            )}
                    />
                    <FormField
                            control={form.control}
                            name = "productImages"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value.map((image)=> image.url)}
                                            disabled = {loading}
                                            onChange={(url) => field.onChange([...field.value, {url}])}
                                            onRemove={(url) => field.onChange([...field.value.filter((current)=> current.url!==url)])}
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
