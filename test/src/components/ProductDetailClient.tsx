"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Minus,
    Plus,
    Share2,
    ChevronRight,
    Leaf,
    ThermometerSun,
    Scale,
    ShoppingBag,
    CookieIcon
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { useCartStore } from "@/store/cartStore";
import SmartImage from "./SmartImage";

interface ProductDetailClientProps {
    product: Product;
    relatedProducts?: Product[];
}

export default function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailClientProps) {
    const [selectedImage, setSelectedImage] = useState(product.imageSrc);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const addItem = useCartStore(state => state.addItem);

    const handleAddToCart = () => {
        addItem(product, quantity);
        toast.success(
            <div className="flex flex-col gap-1">
                <span className="font-bold font-serif text-amber-950">Added to Cart!</span>
                <span className="text-sm text-amber-900/70">
                    {quantity}x {product.name}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-amber-900/40 font-medium mb-8">
                <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link href="/products" className="hover:text-pink-600 transition-colors">Products</Link>
                <ChevronRight size={14} />
                <span className="text-amber-900/80">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left Column: Gallery */}
                <div className="space-y-6">
                    <motion.div
                        layoutId={`product-image-${product.id}`}
                        className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-amber-50 shadow-2xl shadow-amber-950/5 border border-white/40"
                    >
                        {/* Main Image with Transition */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <SmartImage
                                    src={selectedImage}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Floating Badges */}
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                            {product.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold text-white border border-white/20 shadow-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Thumbnails */}
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-center md:justify-start">
                        {product.gallery.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={cn(
                                    "relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0",
                                    selectedImage === img
                                        ? "border-pink-500 shadow-lg scale-105"
                                        : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                                )}
                            >
                                <SmartImage
                                    src={img}
                                    alt={`View ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column: Info & Actions */}
                <div className="space-y-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold font-serif text-amber-950 leading-tight mb-4"
                        >
                            {product.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-amber-900/70 leading-relaxed"
                        >
                            {product.description}
                        </motion.p>
                    </div>

                    <div className="h-px bg-amber-900/10" />

                    {/* Flavor Profile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-serif font-bold text-amber-900 flex items-center gap-2">
                                <ThermometerSun size={18} /> Flavor Profile
                            </h3>
                            <div className="space-y-3">
                                {product.flavorProfile.map((item, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex justify-between text-xs font-medium text-amber-900/60">
                                            <span>{item.label}</span>
                                            <span>{item.value}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-amber-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${item.value}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-pink-400 to-amber-600 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-4">
                            <h3 className="font-serif font-bold text-amber-900 flex items-center gap-2">
                                <Scale size={18} /> Details
                            </h3>
                            <ul className="space-y-3">
                                {product.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-center justify-between text-sm border-b border-amber-900/5 pb-2 last:border-0">
                                        <span className="text-amber-900/60">{detail.label}</span>
                                        <span className="font-medium text-amber-900">{detail.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="h-px bg-amber-900/10" />

                    {/* Price & Actions */}
                    <div className="space-y-6">
                        <div className="flex items-end justify-between">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold font-serif text-pink-600">${product.price}</span>
                                <span className="text-sm text-amber-900/40">/ box</span>
                            </div>

                            {/* Quantity Stepper */}
                            <div className="flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow-sm border border-amber-900/10">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-1 hover:bg-amber-50 rounded-full transition-colors text-amber-900"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="text-lg font-bold w-4 text-center text-amber-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-1 hover:bg-amber-50 rounded-full transition-colors text-amber-900"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-amber-900 text-white rounded-full py-4 font-bold text-lg shadow-xl shadow-amber-900/20 hover:bg-amber-800 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={20} />
                                Add to Cart - ${(product.price * quantity).toFixed(2)}
                            </button>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={cn(
                                    "p-4 rounded-full border-2 transition-all hover:scale-105 active:scale-95",
                                    isWishlisted
                                        ? "border-pink-500 bg-pink-50 text-pink-500"
                                        : "border-amber-900/10 hover:border-pink-200 text-amber-900/60"
                                )}
                            >
                                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>

                    {/* Story Section */}
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Leaf size={100} className="text-amber-900" />
                        </div>
                        <h3 className="font-serif font-bold text-amber-950 mb-3 relative z-10">Story Behind the Bar</h3>
                        <p className="text-amber-900/80 italic relative z-10">
                            "{product.story}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Related Products Section (Placeholder for now) */}
            <div className="mt-24">
                <h2 className="text-3xl font-serif font-bold text-amber-950 mb-8 text-center">You Might Also Like</h2>
                {/* Logic to show related products based on tags would go here */}
            </div>
        </div>
    );
}
