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

        const color = await db.color.create({
            data : {
                name,
                value,
                storeId : params.storeId
            }
        });

        return NextResponse.json(color);

    } catch (error) {
        console.log("COLOR POST", error);
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

        const colors = await db.color.findMany({
            where : {
                storeId : params.storeId
            }
        });

        return NextResponse.json(colors);

    } catch (error) {
        console.log("COLOR GET", error);
        return new NextResponse("Internal server error", { status : 500});
    }
}