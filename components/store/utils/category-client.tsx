"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn, categoryColumns } from "./columns";
import { DataTable } from "./data-table";
import { ApiList } from "./api-list.";

interface CategoryClientProps {
    data : CategoryColumn[]
}

export const CategoryClient = ({
    data
} : CategoryClientProps) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title="Categories"
                    badge = {data.length.toString()}
                    description="Categories for your store"
                />
                <Button
                    onClick={()=>router.push(`/${params.storeId}/categories/create`)}
                >
                    <Plus className="h-4 w-4 mr-2" size="sm" />
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable columns={categoryColumns} data={data} searchKey="name" />
            <Header
                title="API"
                description="API calls for categories"
            />
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    )
}
