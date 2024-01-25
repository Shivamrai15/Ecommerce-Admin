"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SizeColumn, sizeColumns } from "./columns";
import { DataTable } from "./data-table";
import { ApiList } from "./api-list.";

interface SizeClientProps {
    data : SizeColumn[]
}

export const SizeClient = ({
    data
} : SizeClientProps) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title="Sizes"
                    badge = {data.length.toString()}
                    description="Sizes for your store"
                />
                <Button
                    onClick={()=>router.push(`/${params.storeId}/sizes/create`)}
                >
                    <Plus className="h-4 w-4 mr-2" size="sm" />
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable columns={sizeColumns} data={data} searchKey="name" />
            <Header
                title="API"
                description="API calls for sizes"
            />
            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    )
}
