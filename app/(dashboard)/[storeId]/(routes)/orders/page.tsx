import { format } from "date-fns";
import { db } from "@/lib/db";

import { OrderClient } from "@/components/store/utils/order-client";
import { OrderColumn } from "@/components/store/utils/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async(
    {params} : {params : { storeId : string }}
) => {

    const orders = await db.order.findMany({
        where : {
            storeId : params.storeId
        },
        include : {
            orderItems : {
                include : {
                    product : true
                }
            }
        },
        orderBy : {
            createdAt : "desc"
        }
    });

    
    const formattedOrders : OrderColumn[]  = orders.map((item)=>({
        id: item.id,
        phone : item.phone,
        address : item.address,
        isPaid : item.isPaid,
        products : item.orderItems.map((orderItem) => orderItem.product.name).join(", "),
        totalPrice : formatter.format(item.orderItems.reduce((total, item)=>{
            return total + (item.product.price*item.quantity)
        }, 0)),
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data = {formattedOrders} />
            </div>
        </div>
    )
}

export default OrdersPage;