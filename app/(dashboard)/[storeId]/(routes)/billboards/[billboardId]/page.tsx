import { BillboardForm } from "@/components/store/forms/billboard-form";
import { db } from "@/lib/db";


const BillboardPage = async(
    { params } : { params : { billboardId : string }}
) => {

    let billboard = null

    if (params.billboardId !== "create") {
        billboard = await db.billBoard.findUnique({
            where : {
                id : params.billboardId
            }
        });
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm data ={billboard} />
            </div>
        </div>
    )
}

export default BillboardPage;