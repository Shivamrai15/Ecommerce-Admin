import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (
    request : Request,
    { params } : { params : { storeId: string, sizeId : string }}
) {
    try {
        
        const session = await auth();
        const { name, value } = await request.json();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!name){
            return new NextResponse("Name is required", { status : 400});
        }

        if (!value){
            return new NextResponse("Value is required", { status : 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        if (!params.sizeId) {
            return new NextResponse("Size Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const size = await db.size.updateMany({
            where : {
                id : params.sizeId
            },
            data : {
                name,
                value
            }
        })

        return NextResponse.json(size);

    } catch (error) {
        console.log("SIZE PATCH", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function DELETE (
    _request : Request,
    { params } : { params : { storeId: string, sizeId : string }}
) {
    try {
        
        const session = await auth();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        if (!params.sizeId) {
            return new NextResponse("Size Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const size = await db.size.deleteMany({
            where : {
                id : params.sizeId,
            },
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log("SIZE DELETE", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function GET (
    _request : Request,
    { params } : { params : { sizeId : string }}
) {
    try {


        if (!params.sizeId) {
            return new NextResponse("Size Id is required", {status : 400});
        }

        const size = await db.size.findUnique({
            where : {
                id : params.sizeId,
            },
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log("SIZE GET", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}