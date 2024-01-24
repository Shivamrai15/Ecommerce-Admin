import { db } from "@/lib/db";
import { BillboardClient } from "@/components/store/utils/billboard-client";

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

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data = {billboards} />
            </div>
        </div>
    )
}

export default BillboardsPage