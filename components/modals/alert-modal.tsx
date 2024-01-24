"use client";

import { useEffect, useState } from "react";
import { Modal } from "../modal";
import { Button } from "../ui/button";

interface AlertModalProps {
    isOpen : boolean;
    loading : boolean;
    onClose : () => void;
    onConfirm : () => void;
}

export const AlertModal = ({
    isOpen,
    loading,
    onClose,
    onConfirm
} : AlertModalProps) => {
    
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    }, []);

    if (!mounted){
        return null;
    }
    
    return (
        <Modal
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your data and remove your data from our servers."
            isOpen = {isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                    disabled = {loading}
                    variant="outline"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled = {loading}
                    variant="destructive"
                    onClick={onConfirm}
                >
                    Continue
                </Button>
            </div>
        </Modal>
    )
}
