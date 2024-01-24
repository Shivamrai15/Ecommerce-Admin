import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (
    request : Request,
    { params } : { params : { storeId: string }}
) {
    try {
        
        const session = await auth();
        const { name } = await request.json();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!name){
            return new NextResponse("Name is required", { status : 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        const store = await db.store.updateMany({
            where : {
                id : params.storeId,
                userId : session.user.id
            },
            data : {
                name
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log("PATCH STORE", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}

export async function DELETE (
    _request : Request,
    { params } : { params : { storeId: string }}
) {
    try {
        
        const session = await auth();

        if (!session || !session.user || !session.user.id){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status : 400});
        }

        const store = await db.store.deleteMany({
            where : {
                id : params.storeId,
                userId : session.user.id
            },
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log("PATCH DELETE", error);
        return new NextResponse("Internal server error", {status : 500});
    }
}