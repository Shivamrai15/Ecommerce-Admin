import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (
    request : Request,
    { params } : { params : { storeId: string, categoryId : string }}
) {
    try {
        
        const session = await auth();
        const { name, billboardId } = await request.json();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!name){
            return new NextResponse("Name is required", { status : 400});
        }

        if (!billboardId){
            return new NextResponse("Billboard Id is required", { status : 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        if (!params.categoryId) {
            return new NextResponse("Category Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const category = await db.category.updateMany({
            where : {
                id : params.categoryId
            },
            data : {
                name,
                billboardId
            }
        })

        return NextResponse.json(category);

    } catch (error) {
        console.log("CATEGORY PATCH", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function DELETE (
    _request : Request,
    { params } : { params : { storeId: string, categoryId : string }}
) {
    try {
        
        const session = await auth();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        if (!params.categoryId) {
            return new NextResponse("Category Id is required", {status : 400});
        }

        const storeById = await db.store.findUnique({
            where : {
                id : params.storeId
            }
        });

        if (!storeById ){
            return new NextResponse("Store does not exists", {status :404});
        }

        const category = await db.category.deleteMany({
            where : {
                id : params.categoryId,
            },
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log("CATEGORY DELETE", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function GET (
    _request : Request,
    { params } : { params : { categoryId : string }}
) {
    try {


        if (!params.categoryId) {
            return new NextResponse("Category Id is required", {status : 400});
        }

        const category = await db.category.findUnique({
            where : {
                id : params.categoryId,
            },
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log("CATEGORY GET", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}