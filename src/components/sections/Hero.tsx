"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Star } from "lucide-react";
import BannerHero from "@/components/BannerHero";

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex flex-col pt-0 overflow-hidden">

            {/* 1. Full-width Hero Banner */}
            <BannerHero />

            {/* 2. Trust Badges (below banner) */}
            <div className="bg-white/30 backdrop-blur-md border-b border-white/20 py-8">
                <div className="mx-auto max-w-6xl px-6 flex flex-wrap justify-center gap-8 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="p-3 bg-green-100/50 rounded-full text-green-700">
                            <Leaf size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-amber-950">Pure Cacao</h3>
                            <p className="text-sm text-amber-900/60">Ethically sourced single origin</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        <div className="p-3 bg-rose-100/50 rounded-full text-rose-600">
                            <Heart size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-amber-950">Less Sugar</h3>
                            <p className="text-sm text-amber-900/60">Sweetened with monk fruit</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3"
                    >
                        <div className="p-3 bg-amber-100/50 rounded-full text-amber-600">
                            <Star size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-amber-950">Perfect Gift</h3>
                            <p className="text-sm text-amber-900/60">Luxurious packaging included</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
