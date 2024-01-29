import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import { ModalProvider } from "@/providers/modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Store | Admin",
    description: "Effortlessly control your ecommerce empire with our intuitive admin panel. Seamlessly manage products, orders, and track revenue for optimal SEO and business success.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >   
                    <ModalProvider/>
                    <Toaster position="bottom-right" />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
