"use client";

import Link from "next/link";
import { Facebook, Twitter, Send } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative mt-0 md:mt-24 px-4 md:px-6 pb-6">
            <div className="mx-auto max-w-6xl bg-amber-950 rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden text-white min-h-[400px] flex flex-col justify-center">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-40" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-40" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-6 md:space-y-8">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold">Stay Sweet</h2>
                    <p className="text-amber-200/80 text-lg">Join our inner circle for exclusive flavors and healing rituals.</p>

                    <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 focus:border-white/60 backdrop-blur-md transition-all shadow-inner"
                        />
                        <button className="px-8 py-4 bg-white text-amber-950 rounded-full font-bold hover:bg-pink-100 transition-colors flex items-center justify-center gap-2 shadow-lg min-h-[44px]">
                            Subscribe <Send size={18} />
                        </button>
                    </form>

                    <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 mt-16">
                        <Link href="/" className="font-serif font-bold text-2xl hover:text-pink-300 transition-colors">Giaboinee.</Link>
                        <div className="flex gap-8 justify-center">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="24"
                                width="24"
                                className="cursor-pointer hover:text-pink-400 transition-colors transform hover:scale-110 duration-200"
                            >
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>

                            <Facebook className="cursor-pointer hover:text-pink-400 transition-colors transform hover:scale-110 duration-200" />
                            <Twitter className="cursor-pointer hover:text-pink-400 transition-colors transform hover:scale-110 duration-200" />
                        </div>
                        <div className="text-sm text-white/40">© 2025 design by người luôn đứng về phe em.</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
