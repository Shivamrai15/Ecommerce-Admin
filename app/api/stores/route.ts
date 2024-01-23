import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST( request : Request ) {
    try {

        const { name } = await request.json();
        const session = await auth();

        if (!session || !session.user){
            return new NextResponse("Unauthorized Access", {status : 401});
        }

        if (!name){
            return new NextResponse("Name is required", {status :400});
        }

        const store = await db.store.create({
            data : {
                name,
                userId : session.user.id || ""
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log("STORE API", error);
        return new NextResponse("Internal server error", { status : 500});
    }
}