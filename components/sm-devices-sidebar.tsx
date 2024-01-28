"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SubNav } from "./sub-nav";
import { MenuIcon } from "lucide-react";
  

export const SmDevicesSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <MenuIcon className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="mb-6">
                    <SheetTitle>
                        Store Entities
                    </SheetTitle>
                </SheetHeader>
                <SubNav/>
            </SheetContent>
        </Sheet>
    )
}
