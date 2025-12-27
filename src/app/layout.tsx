import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import CartDrawer from "@/components/cart/CartDrawer";
import CartButtonFloating from "@/components/cart/CartButtonFloating";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chocolat de Luxe | Premium Healing Sweets",
  description: "Experience the healing power of premium chocolate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          inter.variable,
          "antialiased min-h-screen relative selection:bg-pink-300 selection:text-amber-900"
        )}
      >
        {children}
        <CartDrawer />
        <CartButtonFloating />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
