"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Disc, SkipBack, SkipForward, X } from "lucide-react";
import { PLAYLISTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MusicClientProps {
    teaserMode?: boolean;
}

export default function MusicClient({ teaserMode = false }: MusicClientProps) {
    // Audio State
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    const displayPlaylists = teaserMode ? PLAYLISTS.slice(0, 1) : PLAYLISTS;
    const currentTrack = currentTrackIndex !== null ? PLAYLISTS[currentTrackIndex] : null;

    // Handle Play/Pause
    useEffect(() => {
        if (currentTrackIndex !== null && audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Playback error:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentTrackIndex, isPlaying]);

    // Handle Track Change
    useEffect(() => {
        if (currentTrackIndex !== null && audioRef.current) {
            audioRef.current.load(); // Reload audio source
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Playback error:", e));
            }
        }
    }, [currentTrackIndex]); // Only re-run when track index changes

    const handleTrackSelect = (index: number) => {
        if (currentTrackIndex === index) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentTrackIndex(index);
            setIsPlaying(true);
            setIsPlayerVisible(true);
        }
    };

    const handleNext = () => {
        if (currentTrackIndex !== null) {
            const nextIndex = (currentTrackIndex + 1) % PLAYLISTS.length;
            setCurrentTrackIndex(nextIndex);
            setIsPlaying(true);
        }
    };

    const handlePrev = () => {
        if (currentTrackIndex !== null) {
            const prevIndex = (currentTrackIndex - 1 + PLAYLISTS.length) % PLAYLISTS.length;
            setCurrentTrackIndex(prevIndex);
            setIsPlaying(true);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setProgress(time);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Auto-advance logic
    const handleEnded = () => {
        handleNext();
    };


    return (
        <section id="healing-music" className="py-12 md:py-32 relative overflow-hidden w-full">
            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={currentTrack?.audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

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
                            Nhạc cho những ai <span className="italic text-pink-600">đang cảm thấy bế tắc ❤️</span>
                        </motion.h2>
                        <p className="text-amber-900/70 text-lg">
                            Vừa nhâm nhi sô-cô-la, vừa nghe nhạc này thì chỉ có 'đổ' đứ đừ thôi! (Cấm ngủ gật nha 😴)
                        </p>
                    </div>
                    {!teaserMode && (
                        <div className="flex gap-2 items-end h-16">
                            {/* Visualizer - only animating when playing */}
                            {[1, 2, 3, 4, 5].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-amber-900/20 rounded-full"
                                    animate={{ height: isPlaying ? [20, 60, 30, 50, 20] : 10 }}
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
                        // In component map, we can find the true index in the full PLAYLISTS array
                        const trueIndex = PLAYLISTS.findIndex(p => p.id === playlist.id);
                        const isCurrentTrack = currentTrackIndex === trueIndex;
                        const isRunning = isCurrentTrack && isPlaying;

                        return (
                            <motion.div
                                key={playlist.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => handleTrackSelect(trueIndex)}
                                className={cn(
                                    "group relative bg-white/40 backdrop-blur-md border rounded-[2rem] p-6 transition-all duration-300 cursor-pointer flex flex-col items-center text-center hover:bg-white/60 hover:shadow-lg",
                                    isCurrentTrack ? "border-pink-400 bg-white/60 shadow-md ring-1 ring-pink-200" : "border-white/50"
                                )}
                            >
                                <div className={cn("w-full aspect-square rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden shadow-inner transition-colors", playlist.color)}>
                                    <div className="absolute inset-0 bg-black/10" />
                                    <Disc className={cn("text-white/80 w-24 h-24 transition-all duration-700", isRunning && "animate-spin-[4s]")} />

                                    <div className={cn(
                                        "absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-opacity duration-300",
                                        isCurrentTrack ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                    )}>
                                        <div
                                            className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl transform transition-transform duration-200 hover:scale-110 active:scale-95"
                                        >
                                            {isRunning ? <Pause className="fill-amber-900 text-amber-900" /> : <Play className="fill-amber-900 text-amber-900 ml-1" />}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 w-full">
                                    <div className="flex justify-between items-center text-xs font-bold tracking-wider text-amber-900/50 uppercase w-full px-2">
                                        <span>{playlist.mood}</span>
                                        <span>{playlist.length}</span>
                                    </div>
                                    <h3 className={cn("text-xl font-bold font-serif", isCurrentTrack ? "text-pink-600" : "text-amber-950")}>{playlist.title}</h3>
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
                                Vô kho nhạc tuyển nè 🎶
                            </motion.button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Sticky Player Bar */}
            <AnimatePresence>
                {isPlayerVisible && currentTrack && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-xl z-50 px-2"
                    >
                        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 ring-1 ring-black/5">
                            <div className="flex items-center gap-4">
                                {/* Thumbnail */}
                                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 flex-shrink-0 relative overflow-hidden", currentTrack.color)}>
                                    <Disc className={cn("w-8 h-8 text-white/90", isPlaying && "animate-spin-[3s]")} />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-amber-950 truncate text-sm md:text-base">{currentTrack.title}</h4>
                                    <p className="text-xs text-amber-900/60 truncate">{currentTrack.mood}</p>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-2 md:gap-4">
                                    <button onClick={handlePrev} className="p-2 hover:bg-black/5 rounded-full transition-colors text-amber-900/70 hover:text-amber-900">
                                        <SkipBack size={20} className="fill-current" />
                                    </button>
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
                                    >
                                        {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-1" />}
                                    </button>
                                    <button onClick={handleNext} className="p-2 hover:bg-black/5 rounded-full transition-colors text-amber-900/70 hover:text-amber-900">
                                        <SkipForward size={20} className="fill-current" />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full flex items-center gap-3 text-[10px] md:text-xs font-medium text-amber-900/60">
                                <span className="w-8 text-right tabular-nums">{formatTime(progress)}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 100}
                                    value={progress}
                                    onChange={handleSeek}
                                    className="flex-1 h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer accent-pink-500 hover:accent-pink-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
                                />
                                <span className="w-8 tabular-nums">{formatTime(duration)}</span>
                            </div>

                            {/* Close Button Mobile/Desktop */}
                            <button
                                onClick={() => {
                                    setIsPlayerVisible(false);
                                    setIsPlaying(false);
                                }}
                                className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 text-gray-400 hover:text-gray-800 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
