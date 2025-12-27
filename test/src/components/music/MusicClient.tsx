"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music, Disc } from "lucide-react";
import { PLAYLISTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MusicClientProps {
    teaserMode?: boolean;
}

export default function MusicClient({ teaserMode = false }: MusicClientProps) {
    const [playingId, setPlayingId] = useState<string | null>(null);

    const displayPlaylists = teaserMode ? PLAYLISTS.slice(0, 1) : PLAYLISTS;

    return (
        <section id="healing-music" className="py-10 md:py-24 relative overflow-hidden w-full">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/30 to-transparent -z-10" />

            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mb-8 md:mb-16 text-center md:text-left">
                    <div className="max-w-md mx-auto md:mx-0">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif font-bold text-amber-950 mb-4"
                        >
                            Sonic <span className="italic text-pink-600">Healing</span>
                        </motion.h2>
                        <p className="text-amber-900/70 text-lg">
                            Pair your chocolate ritual with our curated soundscapes. Designed to enhance flavor perception and relaxation.
                        </p>
                    </div>
                    {!teaserMode && (
                        <div className="flex gap-2 items-end">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-amber-900/20 rounded-full"
                                    animate={{ height: playingId ? [20, 60, 30, 50, 20] : 10 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className={cn(
                    "grid gap-8",
                    teaserMode ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
                )}>
                    {displayPlaylists.map((playlist, index) => {
                        const isPlaying = playingId === playlist.id;

                        return (
                            <motion.div
                                key={playlist.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] p-6 hover:bg-white/60 transition-colors flex flex-col items-center text-center"
                            >
                                <div className={cn("w-full aspect-square rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden shadow-inner", playlist.color)}>
                                    <div className="absolute inset-0 bg-black/10" />
                                    <Disc className={cn("text-white/80 w-24 h-24", isPlaying && "animate-spin-[3s]")} />

                                    <button
                                        onClick={() => setPlayingId(isPlaying ? null : playlist.id)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl"
                                        >
                                            {isPlaying ? <Pause className="fill-amber-900 text-amber-900" /> : <Play className="fill-amber-900 text-amber-900 ml-1" />}
                                        </motion.div>
                                    </button>
                                </div>

                                <div className="space-y-2 w-full">
                                    <div className="flex justify-between items-center text-xs font-bold tracking-wider text-amber-900/50 uppercase w-full px-2">
                                        <span>{playlist.mood}</span>
                                        <span>{playlist.length}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-amber-950 font-serif">{playlist.title}</h3>
                                </div>

                                {/* Progress Bar Mock */}
                                <div className="mt-6 w-full">
                                    <div className="h-1 w-full bg-amber-900/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-pink-500"
                                            initial={{ width: "0%" }}
                                            animate={{ width: isPlaying ? "100%" : "0%" }}
                                            transition={{ duration: 30, ease: "linear" }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {teaserMode && (
                    <div className="mt-12 text-center">
                        <Link href="/music">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center px-8 py-3 bg-white/50 text-amber-900 border border-amber-900/10 rounded-full font-medium hover:bg-white backdrop-blur-sm transition-all shadow-sm min-h-[44px]"
                            >
                                Browse Playlist
                            </motion.button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
