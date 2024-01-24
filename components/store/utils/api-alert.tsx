"use client";

import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BringToFront, Copy } from "lucide-react";
import { toast } from "sonner";

interface ApiAlertProps {
    title : string;
    description : string;
    variant : "public" | "admin"
}

const textMap : Record<ApiAlertProps["variant"], string > = {
    public : "Public",
    admin : "Admin"
}

const variantMap : Record<ApiAlertProps["variant"], BadgeProps["variant"] > = {
    public : "secondary",
    admin : "destructive"
}


export const ApiAlert = ({
    title,
    description,
    variant = "public"
} : ApiAlertProps) => {

    const onCopy = ()=>{
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to the clipboard")
    }

    return (
        <Alert>
            <AlertTitle className="flex items-center gap-x-3">
                <BringToFront className="h-4 w-4"/>
                <h2 className="text-sm">
                    {title}
                </h2>
                <Badge variant={variantMap[variant]}> 
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between gap-x-3">
                <code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-zinc-600 dark:text-zinc-400 flex-1 truncate select-none">
                    {description}
                </code>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onCopy}
                >
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}
