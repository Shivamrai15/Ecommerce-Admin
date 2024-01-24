import { Badge } from "@/components/ui/badge";

interface HeaderProps {
    title : string;
    description : string;
    badge? : string
}

export const Header = ({
    title,
    description,
    badge
} : HeaderProps) => {

    return (
        <div>
            <div className="flex items-center gap-x-4">
                <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
                {
                    badge && (
                        <Badge className="h-8 w-10 bg-muted text-zinc-600 dark:text-zinc-400 text-xl font-extrabold hover:bg-muted/65 cursor-default">
                            {badge}
                        </Badge>
                    )
                }
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}
