"use client";

import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/lib/data";
import { ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSound } from "@/hooks/use-sound";

interface AddToCartButtonProps {
    product: Product;
    qty?: number;
    className?: string;
    variant?: "icon" | "full" | "light";
}

export default function AddToCartButton({ product, qty = 1, className, variant = "full" }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);
    const { playSuccess } = useSound();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        playSuccess();
        addItem(product, qty);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1000);
        toast.success(
            <div className="flex flex-col gap-1">
                <span className="font-bold font-serif text-amber-950">Added to Cart</span>
                <span className="text-sm text-amber-900/70">{qty}x {product.name}</span>
            </div>
        );
    };

    const Icon = isAdded ? Check : ShoppingBag;

    if (variant === "icon") {
        return (
            <button
                onClick={handleAddToCart}
                className={cn(
                    "p-3 rounded-full shadow-lg transition-all z-20",
                    isAdded ? "bg-green-600 hover:bg-green-700 text-white" : "bg-amber-900 hover:bg-amber-800 text-white",
                    className
                )}
                aria-label={`Add ${product.name} to cart`}
            >
                <Icon size={18} className={cn("transition-all duration-300", isAdded ? "scale-110" : "scale-100")} />
            </button>
        );
    }

    if (variant === "light") {
        return (
            <button
                onClick={handleAddToCart}
                className={cn(
                    "w-full px-8 py-3 rounded-full font-medium backdrop-blur-sm transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap text-base cursor-pointer border",
                    isAdded
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-white/50 text-amber-900 border-amber-900/10 hover:bg-white",
                    className
                )}
            >
                {isAdded ? (
                    <>
                        <Check size={18} /> Added
                    </>
                ) : (
                    "Add to Cart"
                )}
            </button>
        );
    }

    return (
        <button
            onClick={handleAddToCart}
            className={cn(
                "w-full px-4 py-3 rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base cursor-pointer",
                isAdded
                    ? "bg-green-600 text-white shadow-green-600/20 hover:bg-green-700"
                    : "bg-amber-900 text-white shadow-amber-900/20 hover:bg-amber-800",
                className
            )}
        >
            <Icon size={18} className={cn("transition-all duration-300", isAdded ? "scale-110" : "scale-100")} />
            {isAdded ? "Đã thêm" : "Thêm vào giỏ hàng"}
        </button>
    );
}
