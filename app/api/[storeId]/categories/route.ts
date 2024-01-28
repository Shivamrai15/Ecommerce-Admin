import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST( 
    request : Request,
    { params } : { params : { storeId : string}}
) {
    try {

        const { name, billboardId, type, classification } = await request.json();
        const session = await auth();

        if (!session ){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!name){
            return new NextResponse("Name is required", {status :400});
        }

        if (!billboardId){
            return new NextResponse("Billboard Id is required", {status :400});
        }

        if (!type){
            return new NextResponse("Type is required", {status :400});
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

        const category = await db.category.create({
            data : {
                name,
                billboardId,
                type,
                classification,
                storeId : params.storeId
            }
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log("CATEGORY POST API", error);
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

        const categories = await db.category.findMany({
            where : {
                storeId : params.storeId
            },
            include : {
                billboard : true
            }
        });

        return NextResponse.json(categories);

    } catch (error) {
        console.log("CATEGORY GET API", error);
        return new NextResponse("Internal server error", { status : 500});
    }
}