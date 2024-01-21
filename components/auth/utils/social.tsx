import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
    return (
        <Button
            className="w-full"
            variant="outline"
        >
            <FcGoogle className="h-5 w-5"/>
        </Button>
    );
}
