interface HeaderProps {
    title : string;
    description : string;
}

export const Header = ({
    title,
    description
} : HeaderProps) => {

    return (
        <div>
            <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}
