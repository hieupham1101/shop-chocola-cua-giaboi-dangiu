"use client";

import { useState } from "react";
import { useCartStore, useCartTotals } from "@/store/cartStore";
import { ZALO_CHECKOUT_URL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ClipboardCopy, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function CheckoutClient() {
    const { items, clearCart } = useCartStore();
    const { subtotal } = useCartTotals();

    // Form State
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-white/30 backdrop-blur-md rounded-3xl border border-white/50 max-w-2xl mx-auto mt-12 mb-20">
                <h2 className="text-3xl font-serif font-bold text-amber-950 mb-4">Your cart is empty</h2>
                <p className="text-amber-900/60 mb-8">Add some sweetness to your day before checking out.</p>
                <Link href="/" className="px-8 py-3 bg-amber-900 text-white rounded-full font-bold shadow-lg">
                    Return to Shop
                </Link>
            </div>
        );
    }

    const handleCheckout = () => {
        if (!name || !phone) {
            toast.error("Please fill in your Name and Phone number.");
            return;
        }

        setIsSubmitting(true);

        const orderText = `
🍫 NEW ORDER 🍫
Name: ${name}
Phone: ${phone}
Address: ${address || "N/A"}
------------------
${items.map(i => `${i.qty}x ${i.name} ($${(i.price * i.qty).toFixed(2)})`).join("\n")}
------------------
Total: $${subtotal.toFixed(2)}
Note: ${note}
        `.trim();

        // Copy to clipboard
        navigator.clipboard.writeText(orderText).then(() => {
            toast.success("Order copied! Opening Zalo...");

            setTimeout(() => {
                // Open Zalo
                window.open(ZALO_CHECKOUT_URL, "_blank");
                // Optional: clear cart after successful handover? 
                // clearCart(); 
                setIsSubmitting(false);
            }, 1000);
        }).catch(() => {
            toast.error("Could not copy order. Please try again.");
            setIsSubmitting(false);
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left: Form */}
            <div className="space-y-8">
                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-sm">
                    <h2 className="text-2xl font-serif font-bold text-amber-950 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-sm">1</span>
                        Your Details
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-amber-900/70 mb-1 ml-4">Full Name *</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-transparent focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all placeholder:text-amber-900/20"
                                placeholder="e.g. Ariana Grande"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-amber-900/70 mb-1 ml-4">Phone Number *</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-transparent focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all placeholder:text-amber-900/20"
                                placeholder="0912..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-amber-900/70 mb-1 ml-4">Address</label>
                            <textarea
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-transparent focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all placeholder:text-amber-900/20 resize-none h-24"
                                placeholder="Street, Ward, District..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-amber-900/70 mb-1 ml-4">Note</label>
                            <input
                                type="text"
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-transparent focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all placeholder:text-amber-900/20"
                                placeholder="Gift wrap requests, etc."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Order Summary */}
            <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-xl sticky top-24">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-serif font-bold text-amber-950 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 text-sm">2</span>
                            Summary
                        </h2>
                        <button onClick={clearCart} className="text-sm text-red-500 hover:underline flex items-center gap-1">
                            <Trash2 size={14} /> Clear
                        </button>
                    </div>

                    <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        {items.map(item => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                    <Image src={item.imageSrc} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-amber-950 text-sm">{item.name}</h4>
                                    <div className="text-xs text-amber-900/60">{item.qty} x ${item.price}</div>
                                </div>
                                <div className="font-bold text-amber-900">${(item.price * item.qty).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-dashed border-amber-900/20 pt-6 space-y-2 mb-8">
                        <div className="flex justify-between text-amber-900/60">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-amber-900/60">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium text-sm">Calculated on Zalo</span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold text-amber-950 pt-2">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={isSubmitting}
                        className={cn(
                            "w-full py-4 bg-[#0068FF] text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group",
                            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#0057d9] hover:shadow-[#0068FF]/30 hover:-translate-y-1"
                        )}
                    >
                        {/* Zalo Blue */}
                        {isSubmitting ? "Processing..." : (
                            <>
                                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                Place Order via Zalo
                            </>
                        )}
                    </button>
                    <p className="text-center text-xs text-amber-900/40 mt-4">
                        We will confirm items & availability instantly.
                    </p>
                </div>
            </div>
        </div>
    );
}

