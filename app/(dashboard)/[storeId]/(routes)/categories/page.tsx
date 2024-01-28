import { format } from "date-fns";
import { db } from "@/lib/db";

import { CategoryColumn } from "@/components/store/utils/columns";
import { CategoryClient } from "@/components/store/utils/category-client";

const CategoriesPage = async(
    {params} : {params : { storeId : string }}
) => {

    const categories = await db.category.findMany({
        where : {
            storeId : params.storeId
        },
        include : {
            billboard : true
        },
        orderBy : {
            createdAt : "desc"
        }
    });

    
    const formattedCategory : CategoryColumn[] = categories.map((item)=>({
        id: item.id,
        name : item.name,
        billboardLabel : item.billboard.label,
        type : item.type,
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data = {formattedCategory} />
            </div>
        </div>
    )
}

export default CategoriesPage;