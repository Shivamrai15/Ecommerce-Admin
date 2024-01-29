import { auth } from "@/auth";
import { StoreSwitcher } from "@/components/store-switcher";
import { SubNav } from "@/components/sub-nav";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SmDevicesSidebar } from "@/components/sm-devices-sidebar";
import { ProfileDropdown } from "@/components/auth/utils/profile-dropdown";


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
                <div className="md:hidden mr-3">
                    <SmDevicesSidebar/>
                </div>
                <StoreSwitcher
                    items={stores}
                />
                <div className="hidden md:block">
                    <SubNav className="mx-6" />
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <ProfileDropdown
                        name  = {session.user.name || ""}
                        email = {session.user.email || ""}
                        avatar = {session.user.image || ""}
                    />
                </div>
            </div>
        </header>
    )
}
