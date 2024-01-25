"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {  ProductColumn, productColumns } from "./columns";
import { DataTable } from "./data-table";
import { ApiList } from "./api-list.";

interface ProductClientProps {
    data : ProductColumn[]
}

export const ProductClient = ({
    data
} : ProductClientProps) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title="Products"
                    badge = {data.length.toString()}
                    description="Products for your store"
                />
                <Button
                    onClick={()=>router.push(`/${params.storeId}/products/create`)}
                >
                    <Plus className="h-4 w-4 mr-2" size="sm" />
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable columns={productColumns} data={data} visibility searchKey="name" />
            <Header
                title="API"
                description="API calls for products"
            />
            <ApiList entityName="products" entityIdName="products" />
        </>
    )
}
