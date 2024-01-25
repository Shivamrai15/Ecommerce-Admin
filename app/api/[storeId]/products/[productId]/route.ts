import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas/product-form-schema";
import { NextResponse } from "next/server";

export async function PATCH (
    request : Request,
    { params } : { params : { storeId: string, productId : string }}
) {
    try {
        
        const session = await auth();
        const body = await request.json();

        const validatedData = ProductSchema.safeParse(body);

        if (!validatedData.success){
            return new NextResponse("Invalid attributes", {status : 400});
        }

        const productImages = validatedData.data.productImages;

        if (!productImages || !productImages.length){
            return new NextResponse("Product images are required", {status : 400});
        }

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        if (!params.productId) {
            return new NextResponse("Product Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        await db.product.update({
            where : {
                id : params.productId
            },
            data : {
                ...validatedData.data,
                productImages : {
                    deleteMany : {}
                }
            }
        });

        const product = await db.product.update({
            where : {
                id : params.productId
            },
            data : {
                productImages : {
                    createMany : {
                        data : [
                            ...productImages.map( (image : { url : string}) => image )
                        ]
                    }
                }
            }
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log("PRODUCT PATCH", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function DELETE (
    _request : Request,
    { params } : { params : { storeId: string, productId : string }}
) {
    try {
        
        const session = await auth();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        if (!params.productId) {
            return new NextResponse("Product Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const product = await db.product.deleteMany({
            where : {
                id : params.productId,
            },
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log("PRODUCT DELETE", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function GET (
    _request : Request,
    { params } : { params : { productId : string }}
) {
    try {


        if (!params.productId) {
            return new NextResponse("Product Id is required", {status : 400});
        }

        const product = await db.product.findUnique({
            where : {
                id : params.productId,
            },
            include : {
                category : true,
                color : true,
                productImages : true,
                size : true
            }
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log("PRODUCT GET", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}