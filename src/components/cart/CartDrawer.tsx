"use client";

import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SmartImage from "../SmartImage";
import { useCartStore, useCartTotals } from "@/store/cartStore";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function CartDrawer() {
    const { items, isOpen, closeCart, updateQty, removeItem } = useCartStore();
    const { subtotal } = useCartTotals();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        role="dialog"
                        aria-modal="true"
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl z-[100] border-l border-white/50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-amber-900/10">
                            <h2 className="text-2xl font-serif font-bold text-amber-950 flex items-center gap-2">
                                <ShoppingBag className="text-pink-600" /> Giỏ hàng
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-amber-900/5 rounded-full transition-colors"
                            >
                                <X size={24} className="text-amber-900/60" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                                    <ShoppingBag size={64} className="text-amber-900/20" />
                                    <p className="text-amber-900 font-medium">Your bag is empty.</p>
                                    <button
                                        onClick={closeCart}
                                        className="text-pink-600 hover:underline"
                                    >
                                        Start shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-4 bg-white/50 p-3 rounded-2xl border border-white/60"
                                    >
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-amber-50 shrink-0">
                                            <Image
                                                src={item.imageSrc}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-serif font-bold text-amber-900 line-clamp-2 leading-tight">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-amber-900/40 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center bg-white rounded-full px-2 py-1 border border-amber-900/10 shadow-sm">
                                                    <button
                                                        onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                                                        className="p-1 hover:text-pink-600 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-amber-900 text-sm">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(item.id, item.qty + 1)}
                                                        className="p-1 hover:text-pink-600 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-pink-600">
                                                    {formatCurrency(item.price * item.qty)}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-amber-900/10 bg-white/50 backdrop-blur-md">

                                {/* Romantic Gift Options */}
                                <div className="mb-6 p-4 bg-white/60 rounded-xl border border-pink-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-100 to-transparent -mr-8 -mt-8 rounded-full blur-xl"></div>

                                    <label className="block text-sm font-serif font-bold text-amber-900 mb-2 flex items-center gap-2">
                                        <span> Ghi chú 💌</span>
                                    </label>
                                    <textarea
                                        className="w-full text-sm p-3 rounded-lg border border-amber-900/10 bg-white/80 focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none font-serif text-amber-800 placeholder:text-amber-900/30 mb-3"
                                        rows={2}
                                        placeholder="Write something sweet..."
                                    />

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-amber-900 flex items-center gap-2">
                                            Gói quà 🎁
                                        </span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        confetti({
                                                            particleCount: 100,
                                                            spread: 70,
                                                            origin: { y: 0.6 },
                                                            colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#F8B195']
                                                        });
                                                    }
                                                }}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-amber-900/60 font-medium">Tổng cộng</span>
                                    <span className="text-2xl font-bold text-amber-950 font-serif">
                                        {formatCurrency(subtotal)}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <Link
                                        href="/checkout"
                                        onClick={closeCart}
                                        className="w-full py-4 bg-amber-900 text-white rounded-xl font-bold shadow-lg shadow-amber-900/20 hover:bg-amber-800 transition-colors flex justify-center items-center gap-2"
                                    >
                                        Chuyển qua thanh toán <ArrowRight size={18} />
                                    </Link>
                                    <button
                                        onClick={closeCart}
                                        className="w-full py-3 text-amber-900/60 hover:text-amber-900 font-medium transition-colors"
                                    >
                                        Tiếp tục mua sắm
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
