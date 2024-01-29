"use server";

import { db } from "@/lib/db";

interface GraphData {
    name :string;
    total : number;
} 

export const getTotalRevenue = async (storeId : string) => {
    try {
        const paidOrders = await db.order.findMany({
            where : {
                storeId,
                isPaid : true
            },
            include :{
                orderItems : {
                    include : {
                        product : true
                    }
                }
            }
        });

        const totalRevenue = paidOrders.reduce((total, order)=>{
            
            const orderTotal = order.orderItems.reduce((orderSum,  item) => {
                return  orderSum + item.quantity*item.product.price;
            }, 0);

            return total+orderTotal;
        }, 0)

        return totalRevenue;

    } catch (error) {
        return 0
    }
}

export const getSalesCount = async ( storeId : string ) => {
    try {
        
        const totalSales = await db.order.findMany({
            where : {
                storeId,
                isPaid : true
            }
        });

        return totalSales.length;

    } catch (error) {
        return 0;
    }
}

export const getProductsInStock = async ( storeId : string ) => {
    try {
        
        const totalProducts = await db.product.findMany({
            where : {
                storeId,
                stock : {
                    gt : 0
                }
            }
        });

        return totalProducts.length;

    } catch (error) {
        return 0;
    }
}

export const getGraphRevenue = async ( storeId : string ) => {
    try {
        
        const paidOrders = await db.order.findMany({
            where : {
                storeId,
                isPaid : true
            },
            include : {
                orderItems : {
                    include : {
                        product : true
                    }
                },
            }
        });

        const monthlyRevenue : { [key : number] : number } = {};
        
        for( const order of paidOrders ) {
            const month = order.createdAt.getMonth();

            let revenueForOrder = 0;

            for (const item of order.orderItems) {
                revenueForOrder += item.quantity*item.product.price;
            }

            monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
        }

        const graphData : GraphData[] = [
            { name : "Jan", total : 0 },
            { name : "Feb", total : 0 },
            { name : "Mar", total : 0 },
            { name : "Apr", total : 0 },
            { name : "May", total : 0 },
            { name : "Jun", total : 0 },
            { name : "Jul", total : 0 },
            { name : "Aug", total : 0 },
            { name : "Sep", total : 0 },
            { name : "Oct", total : 0 },
            { name : "Nov", total : 0 },
            { name : "Dec", total : 0 },
        ];

        for (const month in monthlyRevenue ) {
            graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
        }

        return graphData

    } catch (error) {
        return [];
    }
}