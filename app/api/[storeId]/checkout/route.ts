import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json( {}, {headers : corsHeaders} );
}

export async function POST(
    request : Request,
    {params} : { params : { storeId : string }}
) {
    
    try {

        const { products } : { products: {id:string, quantity : number}[]} = await request.json();

        if (!products || products.length === 0){
            return new NextResponse("Product Ids are requierd", {status : 401})
        }

    
        const productIds = products.map( (product) => product.id );
    
        const allProducts = await db.product.findMany({
            where : {
                id : {
                    in : productIds
                }
            }
        });
    
        const line_items : Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    
        allProducts.forEach((product) => {
            line_items.push({
                quantity : products.find((item) => product.id === item.id)?.quantity || 1,
                price_data : {
                    currency : "INR",
                    product_data : {
                        name : product.about,
                    },
                    unit_amount : product.price*100
                },
            })
        });
    
        const order = await db.order.create({
            data : {
                storeId : params.storeId,
                isPaid : false,
                orderItems  : {
                    create : products.map((product) =>({
                        product : {
                            connect : {
                                id : product.id
                            }
                        },  
                        quantity : product.quantity
                    }))
                }
            }
        });
    
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode : "payment",
            billing_address_collection : "required",
            phone_number_collection : {
                enabled : true
            },
            success_url : `${process.env.STORE_URL}/cart?success=1`,
            cancel_url : `${process.env.STORE_URL}/cart?cancelled=1`,
            metadata : {
                orderId : order.id 
            },
            currency : 'INR',
        });
    
        return NextResponse.json({
            url : session.url
        }, {
            headers : corsHeaders
        });

    } catch (error) {
        console.log("PAYMENT_ERROR", error);
        return new NextResponse("Internal server Error", {status : 500});
    }

}