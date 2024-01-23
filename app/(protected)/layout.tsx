import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
    children : React.ReactNode;
}

const ProtectedLayout = async({
    children
} : ProtectedLayoutProps) => {

    const session = await auth();
    const userId = session?.user?.id;

    if (!session || !userId){
        redirect("/login");
    }

    const store = await db.store.findFirst({
        where : {
            userId
        }
    });

    if (store){
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedLayout;