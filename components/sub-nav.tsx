"use client";

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";


export const SubNav = ({
    className, 
    ...props
} : React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname();
    const params = useParams();

    const routes = useMemo(()=>([
        {
            href : `/${params.storeId}`,
            label : "Overview",
            active : pathname === `/${params.storeId}`
        },
        {
            href : `/${params.storeId}/categories`,
            label : "Categories",
            active : pathname === `/${params.storeId}/categories`
        },
        {
            href : `/${params.storeId}/sizes`,
            label : "Sizes",
            active : pathname === `/${params.storeId}/sizes`
        },
        {
            href : `/${params.storeId}/colors`,
            label : "Colors",
            active : pathname === `/${params.storeId}/colors`
        },
        {
            href : `/${params.storeId}/products`,
            label : "Products",
            active : pathname === `/${params.storeId}/products`
        },
        {
            href : `/${params.storeId}/orders`,
            label : "Orders",
            active : pathname === `/${params.storeId}/orders`
        },
        {
            href : `/${params.storeId}/billboards`,
            label : "Billboards",
            active : pathname === `/${params.storeId}/billboards`
        },
        {
            href : `/${params.storeId}/settings`,
            label : "Settings",
            active : pathname === `/${params.storeId}/settings`
        },
    ]), [pathname, params]);
    
    return (
        <nav className={cn(
            "flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-4 lg:space-x-6",
            className
        )}>
            {
                routes.map((route)=>(
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-black dark:text-white" : "text-muted-foreground"
                        )}
                    >
                        {route.label}
                    </Link>
                ))
            }
        </nav>
    )
}
