import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (
    request : Request,
    { params } : { params : { storeId: string, colorId : string }}
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

        if (!params.colorId) {
            return new NextResponse("Color Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const color = await db.color.updateMany({
            where : {
                id : params.colorId
            },
            data : {
                name,
                value
            }
        })

        return NextResponse.json(color);

    } catch (error) {
        console.log("COLOR PATCH", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function DELETE (
    _request : Request,
    { params } : { params : { storeId: string, colorId : string }}
) {
    try {
        
        const session = await auth();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        if (!params.colorId) {
            return new NextResponse("Color Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const color = await db.color.deleteMany({
            where : {
                id : params.colorId,
            },
        });

        return NextResponse.json(color);

    } catch (error) {
        console.log("COLOR DELETE", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function GET (
    _request : Request,
    { params } : { params : { colorId : string }}
) {
    try {


        if (!params.colorId) {
            return new NextResponse("Color Id is required", {status : 400});
        }

        const color = await db.color.findUnique({
            where : {
                id : params.colorId,
            },
        });

        return NextResponse.json(color);

    } catch (error) {
        console.log("COLOR GET", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}