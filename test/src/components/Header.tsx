"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore, useCartTotals } from "@/store/cartStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { id: "/", label: "Trang chủ" },
    { id: "/products", label: "Sản phẩm" },
    { id: "/music", label: "Nhạc chữa lành" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActiveLink = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out pt-[env(safe-area-inset-top)]",
                    isScrolled
                        ? "bg-pink-50/90 backdrop-blur-xl border-b border-pink-200/40 py-3 shadow-md"
                        : "bg-transparent py-5"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 cursor-pointer z-50">
                        <span className={cn(
                            "text-2xl font-bold tracking-tight font-serif transition-colors duration-500 ease-in-out",
                            isScrolled ? "text-amber-900" : "text-white drop-shadow-md"
                        )}>
                            Giaboinee<span className={cn("transition-colors duration-500", isScrolled ? "text-pink-500" : "text-pink-300")}>.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className={cn(
                        "hidden md:flex items-center gap-1 p-1 rounded-full transition-all duration-500 ease-in-out",
                        isScrolled ? "bg-white/40 border border-white/40 backdrop-blur-md" : "bg-black/5 border border-white/10 backdrop-blur-sm"
                    )}>
                        {NAV_ITEMS.map((item) => {
                            const active = isActiveLink(item.id);
                            return (
                                <Link
                                    key={item.id}
                                    href={item.id}
                                    className={cn(
                                        "relative px-5 py-2 rounded-full text-sm font-medium transition-colors z-10 duration-500",
                                        active
                                            ? "text-white"
                                            : isScrolled ? "text-amber-900/80 hover:text-amber-900" : "text-white/90 hover:text-white drop-shadow-sm"
                                    )}
                                >
                                    {active && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full -z-10 shadow-lg shadow-pink-500/20"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4 z-50">
                        <CartButton isScrolled={isScrolled} />

                        {/* Mobile Menu Toggle - Larger Touch Target */}
                        <button
                            className={cn(
                                "md:hidden p-3 rounded-full transition-colors duration-500 ease-in-out active:scale-95",
                                isScrolled
                                    ? "text-amber-900 hover:bg-pink-100"
                                    : "text-white hover:bg-white/20 drop-shadow-md"
                            )}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-pink-50/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        <div className="absolute inset-0 bg-noise opacity-5"></div>
                        {NAV_ITEMS.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    href={item.id}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "text-4xl font-serif tracking-tight transition-colors",
                                        isActiveLink(item.id)
                                            ? "text-pink-600 font-bold"
                                            : "text-amber-900/80 hover:text-amber-900"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function CartButton({ isScrolled }: { isScrolled: boolean }) {
    const { toggleCart } = useCartStore();
    const { itemCount } = useCartTotals();

    return (
        <button
            onClick={toggleCart}
            className={cn(
                "hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all relative group duration-300",
                isScrolled
                    ? "bg-amber-900 text-white shadow-amber-900/10 hover:bg-amber-800"
                    : "bg-white/20 text-white border border-white/20 backdrop-blur-md hover:bg-white/30"
            )}>
            <ShoppingBag size={18} />
            <span>Cart ({itemCount})</span>
        </button>
    )
}
