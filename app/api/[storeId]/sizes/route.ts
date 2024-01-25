import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST( 
    request : Request,
    { params } : { params : { storeId : string}}
) {
    try {

        const { name, value } = await request.json();
        const session = await auth();

        if (!session ){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!name){
            return new NextResponse("Name is required", {status :400});
        }

        if (!value){
            return new NextResponse("Value is required", {status :400});
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

        const size = await db.size.create({
            data : {
                name,
                value,
                storeId : params.storeId
            }
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log("SIZE POST", error);
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

        const sizes = await db.size.findMany({
            where : {
                storeId : params.storeId
            }
        });

        return NextResponse.json(sizes);

    } catch (error) {
        console.log("SIZE GET", error);
        return new NextResponse("Internal server error", { status : 500});
    }
}