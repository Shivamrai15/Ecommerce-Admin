import { SettingsForm } from "@/components/store/forms/settings-form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


interface SettingsPageProps {
    params : {
        storeId : string
    };
}

const SettingsPage = async({
    params
} : SettingsPageProps ) => {

    const store  = await db.store.findFirst({
        where : {
            id : params.storeId
        }
    });

    if (!store){
        redirect("/");
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm data = {store} />
            </div>
        </div>
    )
}

export default SettingsPage;