"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BANNERS } from "@/lib/data";
import { cn } from "@/lib/utils";

// Custom type for Swiper styling
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BannerHero() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative w-full h-[65vh] md:h-[80vh]">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect="fade"
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} custom-bullet"></span>`;
                    }
                }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                loop={true}
                className="w-full h-full group"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {BANNERS.map((banner, index) => (
                    <SwiperSlide key={banner.id} className="relative w-full h-full overflow-hidden">
                        {/* Background Image with Zoom Effect */}
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src={banner.imageSrc}
                                alt={banner.title}
                                fill
                                priority={index === 0}
                                className="object-cover transition-transform duration-[6000ms] ease-out scale-100 group-[.swiper-slide-active]:scale-110"
                                sizes="100vw"
                            />
                            {/* Fallback Gradient if image fails (or as overlay) */}
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-amber-100 opacity-20 mix-blend-overlay" />
                        </div>

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-black/10" /> {/* Reduced darkening */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none z-10" /> {/* Top gradient for header contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" /> {/* Stronger vignette bottom for buttons */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/10 to-transparent opacity-30 mix-blend-multiply pointer-events-none" /> {/* Reduced tint */}

                        {/* Content Container */}
                        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-24 px-4 md:px-20 pointer-events-none">
                            <div className={cn(
                                "w-full max-w-7xl mx-auto flex pointer-events-auto",
                                banner.align === "left" ? "justify-start" :
                                    banner.align === "right" ? "justify-end" :
                                        "justify-center text-center"
                            )}>
                                <div className="relative z-10 w-full md:w-auto">
                                    <AnimatePresence mode="wait">
                                        {/* Only animate content when this slide is active */}
                                        {activeIndex === index && (
                                            <motion.div
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                variants={{
                                                    hidden: {},
                                                    visible: {
                                                        transition: {
                                                            staggerChildren: 0.15
                                                        }
                                                    }
                                                }}
                                            >
                                                {/* Buttons Only */}
                                                <motion.div
                                                    variants={{
                                                        hidden: { opacity: 0, y: 20 },
                                                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                                    }}
                                                    className="flex flex-row justify-center md:justify-start gap-3 md:gap-4 w-full md:w-auto"
                                                >
                                                    <button className="flex-1 md:flex-none px-5 py-2.5 md:px-8 md:py-3 bg-white text-amber-950 rounded-full font-bold shadow-xl hover:bg-pink-50 hover:scale-105 transition-all flex items-center justify-center gap-2 group/btn min-h-[44px] text-sm md:text-base">
                                                        Shop Now
                                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform md:w-[18px] md:h-[18px]" />
                                                    </button>
                                                    <button className="flex-1 md:flex-none px-5 py-2.5 md:px-8 md:py-3 bg-transparent text-white border border-white/60 rounded-full font-bold hover:bg-white/10 backdrop-blur-sm transition-all min-h-[44px] text-sm md:text-base">
                                                        Explore
                                                    </button>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation (Desktop only) */}
                <div className="hidden md:flex absolute top-1/2 left-4 z-20 swiper-button-prev-custom w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center cursor-pointer hover:bg-white/20 transition-all text-white">
                    <ArrowRight className="rotate-180" size={24} />
                </div>
                <div className="hidden md:flex absolute top-1/2 right-4 z-20 swiper-button-next-custom w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center cursor-pointer hover:bg-white/20 transition-all text-white">
                    <ArrowRight size={24} />
                </div>

                {/* Custom Pagination Styling */}
                <style jsx global>{`
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.4);
            opacity: 1;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            width: 30px;
            border-radius: 5px;
            background: #fff;
          }
        `}</style>
            </Swiper>
        </section>
    );
}
