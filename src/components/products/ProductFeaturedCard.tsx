"use client";

import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { Product } from "@/lib/data";
import SmartImage from "../SmartImage";
import AddToCartButton from "../cart/AddToCartButton";

interface ProductFeaturedCardProps {
    product: Product;
}

export default function ProductFeaturedCard({ product }: ProductFeaturedCardProps) {
    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-[2.5rem] p-6 border border-white/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-6 h-full justify-between">
            {/* Large Image Area - Aspect 4/5 or Square */}
            <Link href={`/san-pham/${product.slug}`} className="block w-full max-w-sm mx-auto">
                <div className="w-full aspect-[4/5] rounded-[2rem] relative overflow-hidden bg-amber-50 shadow-inner">
                    <SmartImage
                        src={product.imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="flex flex-col gap-3 w-full max-w-md">
                <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-bold tracking-widest text-amber-900/40 uppercase">
                    <span>{product.tags[0] || "Featured"}</span>
                    <span className="w-1 h-1 rounded-full bg-amber-900/30" />
                    <span className="text-pink-600">{formatCurrency(product.price)}</span>
                </div>

                <Link href={`/san-pham/${product.slug}`} className="group-hover:text-pink-600 transition-colors">
                    <h3 className="text-3xl md:text-4xl font-bold text-amber-950 font-serif leading-none">{product.name}</h3>
                </Link>

                <p className="text-base text-amber-900/60 line-clamp-2 px-4">{product.description}</p>
            </div>

            {/* Wide Pill Button */}
            <div className="w-full max-w-xs mt-2">
                <AddToCartButton product={product} variant="light" />
            </div>
        </div>
    );
}
