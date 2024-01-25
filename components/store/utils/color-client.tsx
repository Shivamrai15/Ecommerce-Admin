"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ColorColumn, colorColumns } from "./columns";
import { DataTable } from "./data-table";
import { ApiList } from "./api-list.";

interface SizeClientProps {
    data : ColorColumn[]
}

export const ColorClient = ({
    data
} : SizeClientProps) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title="Colors"
                    badge = {data.length.toString()}
                    description="Colors for your store"
                />
                <Button
                    onClick={()=>router.push(`/${params.storeId}/colors/create`)}
                >
                    <Plus className="h-4 w-4 mr-2" size="sm" />
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable columns={colorColumns} data={data} searchKey="name" />
            <Header
                title="API"
                description="API calls for colors"
            />
            <ApiList entityName="colors" entityIdName="colorId" />
        </>
    )
}
