"use client";

import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/lib/data";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
    product: Product;
    qty?: number;
    className?: string;
    variant?: "icon" | "full" | "light";
}

export default function AddToCartButton({ product, qty = 1, className, variant = "full" }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, qty);
        toast.success(
            <div className="flex flex-col gap-1">
                <span className="font-bold font-serif text-amber-950">Added to Cart</span>
                <span className="text-sm text-amber-900/70">{qty}x {product.name}</span>
            </div>
        );
    };

    if (variant === "icon") {
        return (
            <button
                onClick={handleAddToCart}
                className={cn("p-3 bg-amber-900 text-white rounded-full shadow-lg hover:bg-amber-800 transition-colors z-20", className)}
                aria-label={`Add ${product.name} to cart`}
            >
                <ShoppingBag size={18} />
            </button>
        );
    }

    if (variant === "light") {
        return (
            <button
                onClick={handleAddToCart}
                className={cn("w-full px-8 py-3 bg-white/50 text-amber-900 border border-amber-900/10 rounded-full font-medium hover:bg-white backdrop-blur-sm transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap text-base cursor-pointer", className)}
            >
                Thêm vào giỏ hàng
            </button>
        );
    }

    return (
        <button
            onClick={handleAddToCart}
            className={cn("w-full px-4 py-3 bg-amber-900 text-white rounded-full font-bold shadow-xl shadow-amber-900/20 hover:scale-105 active:scale-95 hover:bg-amber-800 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base cursor-pointer", className)}
        >
            <ShoppingBag size={18} />
            Add to Cart
        </button>
    );
}
