import { ProductForm } from "@/components/store/forms/product-form";
import { db } from "@/lib/db";


const ProductPage = async(
    { params } : { params : { productId : string, storeId : string }}
) => {

    let product = null

    if (params.productId !== "create") {
        product = await db.product.findUnique({
            where : {
                id : params.productId
            },
            include : {
                productImages : true,
                color : true,
                size : true,
                category : true
            }
        });
    }

    const categories = await db.category.findMany({
        where : {
            storeId : params.storeId
        }
    });

    const sizes = await db.size.findMany({
        where : {
            storeId : params.storeId
        }
    });

    const colors = await db.color.findMany({
        where : {
            storeId : params.storeId
        }
    });

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    data ={product}
                    categories  = {categories}
                    sizes = {sizes}
                    colors = {colors} 
                />
            </div>
        </div>
    )
}

export default ProductPage;