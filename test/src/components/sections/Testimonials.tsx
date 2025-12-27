"use client";

import { motion } from "framer-motion";
import { Star, Instagram, Facebook, Twitter, Send } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
    return (
        <section className="py-10 md:py-24 relative overflow-hidden">
            <div className="mx-auto max-w-6xl px-6">

                {/* Testimonials Carousel */}
                <div className="mt-6 md:mt-12 overflow-hidden cursor-grab active:cursor-grabbing">
                    <motion.div
                        className="flex gap-4 md:gap-6 w-max"
                        drag="x"
                        dragConstraints={{ right: 0, left: -1000 }}
                    >
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={t.id}
                                className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-white/60 shadow-sm w-[280px] md:w-[350px] flex-shrink-0 flex flex-col h-full min-h-[320px] select-none justify-between"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-amber-900/80 italic mb-6 leading-relaxed flex-grow text-sm md:text-base line-clamp-5">"{t.text}"</p>
                                    <div className="mt-auto pt-4 border-t border-amber-900/5">
                                        <div className="font-bold text-amber-950">{t.name}</div>
                                        <div className="text-xs text-amber-900/50 uppercase font-medium">{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-center text-amber-900/40 text-xs md:text-sm mt-4 md:mt-8">Swipe to read more</p>
                </div>
            </div>
        </section>
    );
}
