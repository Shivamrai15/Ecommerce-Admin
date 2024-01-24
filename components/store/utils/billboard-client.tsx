"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Billboard, columns } from "./columns";
import { DataTable } from "./data-table";
import { ApiList } from "./api-list.";

interface BillboardClientProps {
    data : Billboard[]
}

export const BillboardClient = ({
    data
} : BillboardClientProps) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title="Billboards"
                    badge = {data.length.toString()}
                    description="Billboards for your store"
                />
                <Button
                    onClick={()=>router.push(`/${params.storeId}/billboards/create`)}
                >
                    <Plus className="h-4 w-4 mr-2" size="sm" />
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="label" />
            <Header
                title="API"
                description="API calls for billboard"
            />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    )
}
