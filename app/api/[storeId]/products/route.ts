import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas/product-form-schema";
import { NextResponse } from "next/server";

export async function POST( 
    request : Request,
    { params } : { params : { storeId : string}}
) {
    try {

        const body = await request.json();
        const validatedData = ProductSchema.safeParse(body);

        if (!validatedData.success){
            return new NextResponse("Invalid is required", {status :400});
        }

        const productImages = validatedData.data.productImages;

        const session = await auth();

        if (!session ){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!params.storeId) {
            return new NextResponse("StoreId is required", {status :400});
        }

        if (!productImages || !productImages.length) {
            return new NextResponse("Images are required");
        }
        

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }


        const product = await db.product.create({
            data : {
                ...validatedData.data,
                productImages : {
                    createMany : {
                        data : [
                            ...productImages.map( (image : { url : string}) => image )
                        ]
                    }
                },
                storeId : params.storeId
            }
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log("PRODUCT POST", error);
        return new NextResponse("Internal server error", { status : 500});
    }
}

export async function GET( 
    request : Request,
    { params } : { params : { storeId : string}}
) {
    try {

        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const isFeatured = searchParams.get('isFeatured');

        console.log(categoryId);

        if (!params.storeId) {
            return new NextResponse("StoreId is required", {status :400});
        }

        const products = await db.product.findMany({
            where : {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
            },
            include : {
                productImages : true,
                category : true,
                color : true,
                size : true
            },
            orderBy : {
               createdAt : "desc" 
            }
        });

        return NextResponse.json(products);

    } catch (error) {
        console.log("PRODUCTS GET", error);
        return new NextResponse("Internal server error", { status : 500});
    }
}