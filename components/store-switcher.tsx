"use client";

import { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation"; 
import { useStoreModal } from "@/hooks/use-store-modal";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover" ;
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDown, PlusCircle, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitchersProps extends PopoverTriggerProps {
    items : Store[];
}

export const StoreSwitcher = ({
    className,
    items = []
} : StoreSwitchersProps ) => {

    const { onOpen } = useStoreModal();
    const [open, setOpen] = useState(false);
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item)=>({
        label : item.name,
        id : item.id
    }));

    const currentStore = formattedItems.find((item) => item.id === params.storeId);

    const onSelectStore = ( store : {id : string, label : string}) => {
        setOpen(false);
        router.push(`/${store.id}`);
    }

    return (
        <Popover open = {open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"sm"}
                    role="combobox"
                    aria-expanded = {open}
                    aria-label="Select a store"
                    className={cn(
                        "w-[200px] justify-between",
                        className
                    )}
                >
                    <StoreIcon className="mr-2 h-4 w-4"/>
                    { currentStore?.label }
                    <ChevronDown className="ml-auto shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading = "Stores">
                            {
                                formattedItems.map((item)=>(
                                    <CommandItem
                                        key={item.id}
                                        onSelect={()=>onSelectStore(item)}
                                        className="text-sm"
                                    >
                                        <StoreIcon className="mr-2 h-4 w-4" />
                                        {item.label}
                                        <CheckIcon className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.id === item.id ? "opacity-100" : "opacity-0"
                                        )} />
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={()=>{
                                    setOpen(false);
                                    onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
