"use client";

import { useEffect, useState } from "react";

const Snowfall = () => {
    const [snowflakes, setSnowflakes] = useState<
        { id: number; left: string; animationDelay: string; animationDuration: string; opacity: number; size: string }[]
    >([]);

    useEffect(() => {
        const count = 30; // Number of snowflakes
        const flakes = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 20}s`, // Slower fall (10-30s)
            opacity: Math.random() * 0.5 + 0.3,
            size: `${Math.random() * 0.5 + 0.5}rem`, // varied sizes 0.5rem - 1rem
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <>
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="animate-snow rounded-full bg-white blur-[1px]"
                    style={{
                        left: flake.left,
                        animationDelay: flake.animationDelay,
                        animationDuration: flake.animationDuration,
                        opacity: flake.opacity,
                        width: flake.size,
                        height: flake.size,
                    }}
                />
            ))}
        </>
    );
};

export default Snowfall;
