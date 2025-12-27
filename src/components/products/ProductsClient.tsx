"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import ProductFeaturedCard from "./ProductFeaturedCard";
import ProductGridCard from "./ProductGridCard";

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
    // Determine which products to show: Top 3 if featured, otherwise ALL.
    const displayProducts = featuredOnly
        ? PRODUCTS.slice(0, 3)
        : PRODUCTS;

    return (
        <section id="products" className="py-12 md:py-32 relative z-10 w-full">
            <div className="mx-auto max-w-6xl px-6">
                {!featuredOnly && (
                    <div className="text-center mb-6 md:mb-16 space-y-2 md:space-y-4">
                        {/* Header removed here as it's likely handled by parent page now, or we can keep it simple.
                           The user wanted to remove filters. I will keep the header for now but remove filters.
                        */}
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
                        featuredOnly
                            ? "flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-8 items-stretch"
                            : "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 auto-rows-fr items-stretch"
                    )}
                >
                    <AnimatePresence mode="popLayout">
                        {displayProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                variants={itemVariants}
                                whileHover={featuredOnly ? undefined : { y: -10 }}
                                transition={{ duration: 0.3 }}
                                className={cn("group h-full", featuredOnly ? "w-full" : "")}
                            >
                                {featuredOnly ? (
                                    <ProductFeaturedCard product={product} />
                                ) : (
                                    <ProductGridCard product={product} />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {featuredOnly && (
                    <div className="mt-12 text-center">
                        <Link href="/san-pham" className="inline-flex items-center justify-center px-8 py-3 bg-amber-900 text-white rounded-full font-medium hover:bg-amber-800 transition-colors shadow-lg shadow-amber-900/20">
                            Thích xem hết sản phẩm thì vô đây
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
