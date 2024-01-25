"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface ProductFeaturesProps {
    value : string[];
    disabled : boolean;
    onChange : (value : string) => void;
    onRemove : (value : string) => void;
}

export const ProductFeatures = ({
    value,
    disabled,
    onChange,
    onRemove
} : ProductFeaturesProps) => {

    const [text, setText] = useState("");

    const handleOnClick = ()=>{
        onChange(text);
        setText("");
    }

    return (
        <div className='w-full flex flex-col space-y-4'>
            <div className="flex items-center flex-wrap gap-3">
                {
                    value.map((feature, index)=>(
                        <div
                            key={index}
                            className="w-fit py-1 px-2 rounded-lg bg-muted flex items-center gap-x-2"
                        >
                            {feature}
                            <Button 
                                variant="destructive"
                                size="icon"
                                className="p-0 h-4 w-4"
                                type="button"
                                onClick={()=>onRemove(feature)}
                                disabled = {disabled}
                            >
                                <X/>
                            </Button>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center gap-x-4">
                <Input
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    disabled = {disabled}
                    className="max-w-md"
                />
                <Button 
                    variant="secondary"
                    onClick = {handleOnClick}
                    type="button"
                    disabled = {disabled}
                >
                    Insert
                </Button>
            </div>
        </div>
    );
}
