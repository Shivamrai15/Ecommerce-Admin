import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST( 
    request : Request,
    { params } : { params : { storeId : string}}
) {
    try {

        const { label, imageUrl } = await request.json();
        const session = await auth();

        if (!session ){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!label){
            return new NextResponse("Label is required", {status :400});
        }

        if (!imageUrl){
            return new NextResponse("ImageUrl is required", {status :400});
        }

        if (!params.storeId) {
            return new NextResponse("StoreId is required", {status :400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const billboard = await db.billBoard.create({
            data : {
                label,
                imageUrl,
                storeId : params.storeId
            }
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("BILLBOARD API", error);
        return new NextResponse("Internal server error", { status : 500});
    }
}

export async function GET( 
    request : Request,
    { params } : { params : { storeId : string}}
) {
    try {

        if (!params.storeId) {
            return new NextResponse("StoreId is required", {status :400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        return NextResponse.json(storeById);

    } catch (error) {
        console.log("BILLBOARD API", error);
        return new NextResponse("Internal server error", { status : 500});
    }
}