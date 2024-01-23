"use client";

interface ModalProps {
    title : string;
    description : string;
    isOpen : boolean;
    onClose : ()=>void;
    children? : React.ReactNode;
}

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export const Modal = ({
    title,
    description,
    isOpen,
    onClose,
    children
} : ModalProps) => {

    const onChange = (open : boolean) => {
        if (!open){
            onClose();
        }
    }

    return (
        <Dialog open = {isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}