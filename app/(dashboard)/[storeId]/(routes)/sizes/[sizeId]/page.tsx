
import { SizeForm } from "@/components/store/forms/size-form";
import { db } from "@/lib/db";


const SizePage = async(
    { params } : { params : { sizeId : string }}
) => {

    let size = null

    if (params.sizeId !== "create") {
        size = await db.size.findUnique({
            where : {
                id : params.sizeId
            }
        });
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm data ={size} />
            </div>
        </div>
    )
}

export default SizePage;