"use client";

import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
    return (
        <section className="py-12 md:py-32 relative overflow-hidden">
            <div className="mx-auto max-w-6xl px-6">

                {/* Testimonials Carousel */}
                <div className="mt-6 md:mt-12">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                                centeredSlides: false,
                            },
                        }}
                        className="w-full py-10"
                    >
                        {TESTIMONIALS.map((t) => (
                            <SwiperSlide key={t.id} className="h-auto">
                                <div className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-white/60 shadow-sm h-full select-none flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] max-w-md mx-auto">
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
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <p className="text-center text-amber-900/40 text-xs md:text-sm mt-4 md:mt-8">Swipe to read more</p>
                </div>
            </div>
        </section>
    );
}
