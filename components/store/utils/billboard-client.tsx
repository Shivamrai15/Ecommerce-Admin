"use client";

import { useParams, useRouter } from "next/navigation";
import { BillBoard } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BillboardClientProps {
    data : BillBoard[]
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
                    onClick={()=>router.push(`/${params.storeId}/billboards/65b0b6706355ba0c3a832e82`)}
                >
                    <Plus className="h-4 w-4 mr-2" size="sm" />
                    Add New
                </Button>
            </div>
            <Separator/>
        </>
    )
}
