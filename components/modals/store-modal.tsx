"use client";

import { Modal } from "@/components/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { StoreForm } from "@/components/store/forms/store-form";


export const StoreModal = () => {
    
    const { isOpen, onClose } = useStoreModal();
    
    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen = {isOpen}
            onClose={onClose}
        >
            <StoreForm/>
        </Modal>
    );
}
