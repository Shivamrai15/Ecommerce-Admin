"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from "@/components/ui/button";
import { ImagePlusIcon, Trash } from "lucide-react";

interface ImageUploadProps {
    value : string[];
    disabled : boolean;
    onChange : (value : string) => void;
    onRemove : (value : string) => void;
}

export const ImageUpload = ({
    value,
    disabled,
    onChange,
    onRemove
} : ImageUploadProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    const onUpload = (result : any)=>{
        onChange(result.info.secure_url)
    }


    if (!isMounted){
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {
                    value.map((url)=>(
                        <div
                            key={url}
                            className="relative w-[200px] h-[220px] rounded-md overflow-hidden"
                        >
                            <div className="z-10 absolute top-2 right-2">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    type="button"
                                    onClick={() => onRemove(url)}
                                >
                                    <Trash className="h-4 w-4"/>
                                </Button>
                            </div>
                            <Image
                                fill
                                className="object-cover"
                                alt="Image"
                                src={url}
                            />
                        </div>
                    ))
                }
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="f3ytpcsd">
                { ({open}) => {
                    const onClick = ()=>{
                        open();
                    }
                    return (
                        <Button
                            type="button"
                            disabled = {disabled}
                            onClick={onClick}
                            variant="secondary"
                        >
                            <ImagePlusIcon className="h-4 w-4 mr-2" />
                            Upload an Image 
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}
