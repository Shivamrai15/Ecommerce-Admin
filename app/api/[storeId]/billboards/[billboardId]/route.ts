import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (
    request : Request,
    { params } : { params : { storeId: string, billboardId : string }}
) {
    try {
        
        const session = await auth();
        const { label, imageUrl } = await request.json();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!label){
            return new NextResponse("Label is required", { status : 400});
        }

        if (!label){
            return new NextResponse("ImageUrl is required", { status : 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const billboard = await db.billBoard.updateMany({
            where : {
                id : params.billboardId
            },
            data : {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("BILLBOARD PATCH", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function DELETE (
    _request : Request,
    { params } : { params : { storeId: string, billboardId : string }}
) {
    try {
        
        const session = await auth();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const billboard = await db.billBoard.deleteMany({
            where : {
                id : params.billboardId,
            },
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("BILLBOARD DELETE", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function GET (
    _request : Request,
    { params } : { params : { billboardId : string }}
) {
    try {


        if (!params.billboardId) {
            return new NextResponse("Billboard Id is required", {status : 400});
        }

        const billboard = await db.billBoard.findUnique({
            where : {
                id : params.billboardId,
            },
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("BILLBOARD GET", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}