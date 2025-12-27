"use client";

import { useCartStore, useCartTotals } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function CartButtonFloating() {
    const { toggleCart } = useCartStore();
    const { itemCount } = useCartTotals();

    return (
        <AnimatePresence>
            {itemCount > 0 && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={toggleCart}
                    className="fixed bottom-8 right-8 z-40 p-4 bg-amber-900 text-white rounded-full shadow-2xl shadow-pink-500/30 flex items-center justify-center border-4 border-white/20"
                >
                    <ShoppingBag size={24} />
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {itemCount}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
