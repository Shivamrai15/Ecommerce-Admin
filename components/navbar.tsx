import { auth } from "@/auth"
import { StoreSwitcher } from "@/components/store-switcher"
import { SubNav } from "@/components/sub-nav"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"


export const Navbar = async() => {

    const session = await auth();

    if (!session || !session.user || !session.user.id ){
        redirect("/login");
    }

    const stores = await db.store.findMany({
        where : {
            userId : session.user.id
        }
    });

    return (
        <header className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher
                    items={stores}
                />
                <SubNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <Button>
                        Sign Out
                    </Button>
                </div>
            </div>
        </header>
    )
}
