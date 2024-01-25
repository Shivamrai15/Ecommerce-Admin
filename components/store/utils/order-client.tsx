"use client";

import { Header } from "./header";
import { Separator } from "@/components/ui/separator";
import {  OrderColumn, orderColumns } from "./columns";
import { DataTable } from "./data-table";

interface OrderClientProps {
    data : OrderColumn[]
}

export const OrderClient = ({
    data
} : OrderClientProps) => {

    return (
        <>
            <Header
                title="Orders"
                badge = {data.length.toString()}
                description="Orders of your store"
            />
            <Separator/>
            <DataTable columns={orderColumns} data={data} searchKey="phone" />
        </>
    )
}
