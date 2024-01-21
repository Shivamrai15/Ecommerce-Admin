import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

interface HeaderProps {
    label : string
}

const font = Poppins({
    weight : ["600", "700", "900"],
    subsets : ["latin"]
});

export const Header = ({
    label
} : HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
                "text-3xl font-bold",
                font.className,
            )}>
                Shopify
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    );
}
