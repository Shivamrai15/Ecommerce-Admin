"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Home = () => {
    return (
        <div>
            <Button onClick={()=>signOut()}>
                SignOut
            </Button>
        </div>
    );
}

export default Home;
