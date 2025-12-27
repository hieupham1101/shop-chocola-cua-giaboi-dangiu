"use client";

import { motion } from "framer-motion";

export function PinkMeshBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-pink-50/30">
            {/* Static Mesh Gradient */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    backgroundImage: `
            radial-gradient(at 0% 0%, hsla(320, 80%, 90%, 1) 0px, transparent 50%),
            radial-gradient(at 100% 0%, hsla(340, 70%, 85%, 1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, hsla(320, 60%, 90%, 1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(330, 80%, 90%, 1) 0px, transparent 50%)
          `
                }}
            />

            {/* Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />

            {/* Floating Blobs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-pink-300/20 rounded-full blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, -70, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                }}
                className="absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] bg-rose-200/20 rounded-full blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5,
                }}
                className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-pink-200/20 rounded-full blur-3xl"
            />
        </div>
    );
}
