"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import AddToCartButton from "../cart/AddToCartButton";
import SmartImage from "../SmartImage";

const FILTERS = ["All", "Dark", "Milk", "White", "Fruit", "Gift box"];

interface ProductsClientProps {
    featuredOnly?: boolean;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function ProductsClient({ featuredOnly = false }: ProductsClientProps) {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProducts = activeFilter === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.tags.some(tag => tag.includes(activeFilter)));

    // If featuredOnly is true, just take the first 3 products and ignore filters
    const displayProducts = featuredOnly
        ? PRODUCTS.slice(0, 3)
        : filteredProducts;

    return (
        <section id="products" className="py-10 md:py-24 relative z-10 w-full">
            <div className="mx-auto max-w-6xl px-6">
                {!featuredOnly && (
                    <div className="text-center mb-6 md:mb-16 space-y-2 md:space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif font-bold text-amber-950"
                        >
                            Curated Collection
                        </motion.h2>
                        <p className="text-amber-900/60">Select your moment of bliss.</p>

                        {/* Filters */}
                        <div className="flex flex-wrap justify-center gap-2 mt-6 md:mt-8">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                        activeFilter === filter
                                            ? "bg-amber-900 text-white shadow-lg scale-105"
                                            : "bg-white/40 text-amber-900 hover:bg-white/70"
                                    )}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Product Grid / Stack */}
                <motion.div
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className={cn(
                        featuredOnly ? "flex flex-col gap-10 md:gap-12" : "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 auto-rows-fr"
                    )}
                >
                    <AnimatePresence mode="popLayout">
                        {displayProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                variants={itemVariants}
                                whileHover={featuredOnly ? undefined : { y: -10 }} // Disable hover lift on featured large cards if preferred, or keep small
                                transition={{ duration: 0.3 }}
                                className={cn("group h-full", featuredOnly ? "w-full" : "")}
                            >
                                {featuredOnly ? (
                                    // Featured Single Column Layout (Music-aesthetic)
                                    <div className="bg-white/40 backdrop-blur-sm rounded-[2.5rem] p-6 border border-white/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-6">
                                        {/* Large Image Area - Aspect 4/5 or Square */}
                                        <Link href={`/products/${product.slug}`} className="block w-full max-w-sm mx-auto">
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
                                                <span className="text-pink-600">${product.price}</span>
                                            </div>

                                            <Link href={`/products/${product.slug}`} className="group-hover:text-pink-600 transition-colors">
                                                <h3 className="text-3xl md:text-4xl font-bold text-amber-950 font-serif leading-none">{product.name}</h3>
                                            </Link>

                                            <p className="text-base text-amber-900/60 line-clamp-2 px-4">{product.description}</p>
                                        </div>

                                        {/* Wide Pill Button */}
                                        <div className="w-full max-w-xs mt-2">
                                            <AddToCartButton product={product} variant="light" />
                                        </div>
                                    </div>
                                ) : (
                                    // Standard Grid Layout
                                    <div className="bg-white/40 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-6 border border-white/50 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 h-full flex flex-col justify-between gap-2">
                                        {/* Top Section: Image and Info */}
                                        <div className="flex flex-col flex-1">
                                            {/* Image with Smart Image */}
                                            <Link href={`/products/${product.slug}`} className="block w-full">
                                                <div className="w-full aspect-[4/5] rounded-xl md:rounded-2xl mb-3 md:mb-4 relative overflow-hidden bg-amber-50">
                                                    <SmartImage
                                                        src={product.imageSrc}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                                                <Link href={`/products/${product.slug}`} className="hover:underline decoration-pink-500/30 underline-offset-4 block">
                                                    {/* Title with fixed min-height for alignment */}
                                                    <h3 className="text-sm md:text-xl font-semibold text-amber-950 font-serif leading-tight group-hover:text-pink-600 transition-colors line-clamp-2">{product.name}</h3>
                                                </Link>
                                                <span className="font-semibold text-pink-600 whitespace-nowrap text-sm md:text-lg">${product.price}</span>
                                            </div>
                                            <div className="flex-1 min-h-[1.25rem]">
                                                <p className="text-xs text-gray-500 line-clamp-1 mb-3 hidden sm:block">{product.description}</p>
                                            </div>
                                        </div>

                                        {/* Mobile Action Button (Bottom aligned) */}
                                        <div className="mt-auto block md:hidden w-full">
                                            <AddToCartButton product={product} variant="full" />
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
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {featuredOnly && (
                    <div className="mt-12 text-center">
                        <Link href="/products" className="inline-flex items-center justify-center px-8 py-3 bg-amber-900 text-white rounded-full font-medium hover:bg-amber-800 transition-colors shadow-lg shadow-amber-900/20">
                            View All Products
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
