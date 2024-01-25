"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ProductColumn } from "./columns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { copyToClipboard } from "@/lib/utils";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionsProps {
    data : ProductColumn
}

export const ProductCellActions = ({
    data
} : CellActionsProps) => {

    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onDelete = async()=>{
        try {
            
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/products/${data.id}`);
            router.refresh();
            toast.success("Product deleted");

        } catch (error) {
            console.error(error);
            toast.error("Internal server error")
        } finally{
            setOpen(false);
            setLoading(false);
        }
    }

    return (
        <>
            <AlertModal 
                isOpen = {open}
                onClose={()=>setOpen(false)}
                loading = {loading}
                onConfirm={onDelete}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel className="mx-2">
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem
                        onClick={()=>copyToClipboard(data.id, "Product Id is copied to clipboard")}
                    >
                        <Copy className="h-4 w-4 mr-4"/>
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={()=>router.push(`/${params.storeId}/products/${data.id}`)}
                    >
                        <Edit className="h-4 w-4 mr-4"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled = {loading}
                        onClick={()=>setOpen(true)}
                    >
                        <Trash2 className="h-4 w-4 mr-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}