import { CategoryForm } from "@/components/store/forms/category-form";
import { db } from "@/lib/db";


const CategoryPage = async(
    { params } : { params : { categoryId : string, storeId : string }}
) => {

    let category = null

    if (params.categoryId !== "create") {
        category = await db.category.findUnique({
            where : {
                id : params.categoryId
            }
        });
    }

    const billboards = await db.billBoard.findMany({
        where : {
            storeId : params.storeId
        }
    });

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm data ={category} billboards = {billboards} />
            </div>
        </div>
    )
}

export default CategoryPage;