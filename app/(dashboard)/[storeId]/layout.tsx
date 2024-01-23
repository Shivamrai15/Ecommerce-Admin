import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";

interface DashboardLayoutPageProps {
    children : React.ReactNode;
    params : { storeId : string } 
}

const DashboardLayoutPage = async({
    children,
    params
} : DashboardLayoutPageProps) => {

    const session = await auth();
    const userId = session?.user?.id;

    if (!session || !userId){
        redirect("/login");
    }

    const store = await db.store.findFirst({
        where : {
            id : params.storeId,
            userId
        }
    });

    if (!store) {
        redirect("/");
    }

    return (
        <div className="h-full">
            <Navbar />
            {children}
        </div>
    )
}

export default DashboardLayoutPage;