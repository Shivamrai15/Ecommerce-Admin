"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

const Home = () => {

    const { isOpen, onOpen } = useStoreModal();

    useEffect(()=>{
        if(!isOpen){
            onOpen();
        }
    }, [isOpen, onOpen]);

    return null;
}

export default Home;
