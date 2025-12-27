import ProductsClient from "@/components/products/ProductsClient";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Products | Giaboinee",
    description: "Explore our curated collection of artisanal chocolates.",
};

export default function ProductsPage() {
    return (
        <main className="min-h-screen pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6 mb-8">
                <div className="flex items-center gap-2 text-sm text-amber-900/40 font-medium">
                    <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-amber-900/80">Products</span>
                </div>
            </div>

            <div className="text-center mb-8 px-6">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-950 mb-4 tracking-tight">
                    Our Collection
                </h1>
                <p className="text-amber-900/60 max-w-2xl mx-auto text-lg">
                    Discover chocolates crafted with passion, blending the finest single-origin cacao with unique flavors.
                </p>
            </div>
            <ProductsClient />
        </main>
    );
}
