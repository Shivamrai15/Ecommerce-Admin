import { format } from "date-fns";
import { db } from "@/lib/db";

import { BillboardClient } from "@/components/store/utils/billboard-client";
import { Billboard } from "@/components/store/utils/columns";
import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Store | Billboards"
}

const BillboardsPage = async(
    {params} : {params : { storeId : string }}
) => {

    const billboards = await db.billBoard.findMany({
        where : {
            storeId : params.storeId
        },
        orderBy : {
            createdAt : "desc"
        }
    });

    
    const formattedBillboard : Billboard[] = billboards.map((item)=>({
        id: item.id,
        label : item.label,
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data = {formattedBillboard} />
            </div>
        </div>
    )
}

export default BillboardsPage