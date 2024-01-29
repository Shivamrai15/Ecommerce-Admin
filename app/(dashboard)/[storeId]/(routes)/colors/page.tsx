import { Metadata } from "next";
import { format } from "date-fns";
import { db } from "@/lib/db";

import { ColorColumn } from "@/components/store/utils/columns";
import { ColorClient } from "@/components/store/utils/color-client";

export const metadata : Metadata = {
    title : "Store | Colors"
}

const ColorsPage = async(
    {params} : {params : { storeId : string }}
) => {

    const colors = await db.color.findMany({
        where : {
            storeId : params.storeId
        },
        orderBy : {
            createdAt : "desc"
        }
    });

    
    const formattedColors : ColorColumn[] = colors.map((item)=>({
        id: item.id,
        name : item.name,
        value : item.value,
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient data = {formattedColors} />
            </div>
        </div>
    )
}

export default ColorsPage;