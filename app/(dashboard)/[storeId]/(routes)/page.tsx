import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Header } from "@/components/store/utils/header";
import { Separator } from "@/components/ui/separator";
import { CreditCard, IndianRupee, Package } from "lucide-react";
import { formatter } from "@/lib/utils";
import { getGraphRevenue, getProductsInStock, getSalesCount, getTotalRevenue } from "@/actions/dashboard-actions";
import { Overview } from "@/components/overview";

interface DashboardPageProps {
    params : { storeId : string }
}

const DashboardPage = async({
    params
} : DashboardPageProps) => {

    const totalRevenue = await getTotalRevenue( params.storeId );
    const totalSales = await getSalesCount( params.storeId );
    const totalProducts = await getProductsInStock( params.storeId );
    const graphRevenue = await getGraphRevenue(params.storeId)

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Header title="Dashboard" description="Overview of your store" />
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="sm:col-span-2 lg:col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> 
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <IndianRupee className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> 
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{totalSales}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> 
                            <CardTitle className="text-sm font-medium">
                                Products In Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalProducts}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview  data = {graphRevenue} />
                    </CardContent>
                </Card>
            </div>
            
        </div>
    );
}

export default DashboardPage;