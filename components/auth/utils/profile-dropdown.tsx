"use client";

import { signOut } from "next-auth/react";

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";


interface ProfileDropdownProps {
    email : string;
    name : string;
    avatar : string;
}


export const ProfileDropdown = ({
    name,
    email,
    avatar,
} : ProfileDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 mr-6">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <div className="mt-2 p-2 flex items-center justify-between">
                    <div>
                        <p className="font-semibold truncate" >{name}</p>
                        <p className="text-xs text-muted-foreground truncate" >{email}</p>
                    </div>
                    <ModeToggle />
                </div>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    className="flex text-base font-medium items-center justify-between"
                    onClick={()=>signOut()}
                >
                    Logout
                    <LogOut />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
