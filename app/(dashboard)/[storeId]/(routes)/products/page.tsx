import { format } from "date-fns";
import { db } from "@/lib/db";

import { ProductClient } from "@/components/store/utils/product-client";
import { ProductColumn } from "@/components/store/utils/columns";
import { formatter } from "@/lib/utils";
import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Store | Products"
}

const ProductsPage = async(
    {params} : {params : { storeId : string }}
) => {

    const products = await db.product.findMany({
        where : {
            storeId : params.storeId
        },
        include : {
            category : true,
            color : true,
            size : true,
        },
        orderBy : {
            createdAt : "desc"
        }
    });

    
    const formattedProducts : ProductColumn[]  = products.map((item)=>({
        id: item.id,
        name : item.name,
        isFeatured : item.isFeatured,
        isArchieved : item.isArchieved,
        price : formatter.format(item.price),
        stock : item.stock,
        category : item.category.name,
        size : item.size.value,
        color : item.color.value,
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data = {formattedProducts} />
            </div>
        </div>
    )
}

export default ProductsPage