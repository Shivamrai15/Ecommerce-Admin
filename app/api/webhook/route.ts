import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

import { db } from "@/lib/db";

export async function POST ( req : Request ) {
        
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string ;

    let event : Stripe.Event;
    
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )    
    } catch (error : any) {
        return new NextResponse(`Webhook Error ${error.message}`, {status : 400})
    }

    const session = event.data.object as Stripe.Checkout.Session;

    const address = session?.customer_details?.address;

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.country,
        address?.postal_code
    ];

    const addressString = addressComponents.filter((c) => c !== null).join(', ');

    if (event.type === "checkout.session.completed") {
        const order = await db.order.update({
            where : {
                id: session?.metadata?.orderId
            },
            data :{
                isPaid : true,
                address : addressString,
                phone : session?.customer_details?.phone || '',
            },
            include : {
                orderItems : true
            }
        });

        try {
            
            const updatedItems = await Promise.all(
                order.orderItems.map(async(orderItem)=>{
    
                    const product = await db.product.findUnique({
                        where : {
                            id : orderItem.productId
                        }
                    });
        
                    if (!product) return null;
        
                    const newStock = Math.max(0, product.stock - orderItem.quantity);
        
                    const updatedProduct = await db.product.update({
                        where : {
                            id : product.id
                        },
                        data : {
                            stock : newStock
                        }
                    });
        
                    return updatedProduct;
        
                })
            );

        } catch (error) {
            return new NextResponse("Something went wrong!");
        }

    }

    return  new NextResponse(null, {status : 200});

}