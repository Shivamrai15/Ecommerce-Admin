import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = (text : string, message? : string)=>{
  navigator.clipboard.writeText(text);
  if (message){
    toast.info(message);
  }
}

export const formatter = new Intl.NumberFormat("en-IN", {
  style : "currency",
  currency : "INR"
})