"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Product } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import SmartImage from "../SmartImage";
import AddToCartButton from "../cart/AddToCartButton";

interface ProductGridCardProps {
    product: Product;
}

export default function ProductGridCard({ product }: ProductGridCardProps) {
    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-6 border border-white/50 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 h-full flex flex-col justify-between gap-2">
            {/* Top Section: Image and Info */}
            <div className="flex flex-col flex-1">
                {/* Image with Smart Image */}
                <Link href={`/san-pham/${product.slug}`} className="block w-full">
                    <div className="w-full aspect-[4/5] rounded-xl md:rounded-2xl mb-3 md:mb-4 relative overflow-hidden bg-amber-50">
                        <SmartImage
                            src={product.imageSrc}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => console.error(`[ProductGridCard] Failed to load image for ${product.name}:`, e.currentTarget.src)}
                        />
                        {/* Hover Overlay Actions (Desktop) */}
                        <div className="absolute bottom-3 right-3 flex gap-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-300 z-10 md:flex hidden">
                            <AddToCartButton product={product} variant="icon" />
                            <div className="p-3 bg-amber-900 text-white rounded-full shadow-lg hover:bg-amber-800 transition-colors">
                                <Eye size={18} />
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="flex flex-col gap-1 mb-1">
                    <Link href={`/san-pham/${product.slug}`} className="hover:underline decoration-pink-500/30 underline-offset-4 block">
                        {/* Title with fixed min-height for alignment */}
                        <h3 className="text-sm md:text-xl font-semibold text-amber-950 font-serif leading-tight group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">{product.name}</h3>
                    </Link>
                    <span className="font-semibold text-pink-600 whitespace-nowrap text-sm md:text-lg">{formatCurrency(product.price)}</span>
                </div>
                <div className="flex-1 min-h-[1.25rem]">
                    <p className="text-xs text-gray-500 line-clamp-1 mb-3 hidden sm:block">{product.description}</p>
                </div>
            </div>

            {/* Mobile Action Button (Bottom aligned) */}
            <div className="mt-auto block md:hidden w-full">
                <AddToCartButton
                    product={product}
                    variant="full"
                    className="py-2 text-sm font-medium"
                />
            </div>

            {/* Desktop Tags (Bottom aligned) */}
            <div className="hidden md:flex gap-2 mt-auto flex-wrap pt-2">
                {product.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-white/50 rounded-md text-amber-900/70 border border-amber-900/5">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
