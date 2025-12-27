import React from "react";

type DecorVariant = "wave" | "hearts" | "leaves";

interface DecorativeDividerProps {
    variant: DecorVariant;
    className?: string;
}

const DecorativeDivider: React.FC<DecorativeDividerProps> = ({
    variant,
    className = "",
}) => {
    // Hand-drawn wave: irregular sine wave
    const WaveSVG = () => (
        <svg
            viewBox="0 0 1200 60"
            className="w-full h-full text-[#E8C7C7]"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M0,30 C150,50 300,10 450,35 C600,60 750,5 900,30 C1050,55 1200,20 1200,20" />
        </svg>
    );

    // Hand-drawn hearts: a string of imperfect hearts
    const HeartsSVG = () => (
        <svg
            viewBox="0 0 1200 60"
            className="w-full h-full text-[#E8C7C7]"
            preserveAspectRatio="xMidYMid slice" // Repeat pattern logic better handled by narrower viewbox or pattern usage, but keeping it simple for "hand drawn" look across wide screen.
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* A long path connecting small hearts */}
            <path d="M0,30 C50,30 50,30 100,30" />
            {/* Heart 1 */}
            <path d="M100,30 C100,20 90,15 85,25 C80,15 70,20 70,30 C70,45 100,60 100,60 C100,60 130,45 130,30 C130,20 120,15 115,25 C110,15 100,20 100,30 Z" transform="scale(0.5) translate(150, 20)" />

            {/* To make it truly responsive and fill width with a pattern without distortion, 
           it's better to use a pattern definition or just simple repeated elements.
           For a "hand-drawn component" that spans full width, a static path might stretch awkwardly.
           
           Let's try a different approach for hearts/leaves to avoid stretching:
           Use a pattern or a smaller repeatable SVG scaled up?
           
           Re-thinking: The requirement is "w-full". Imperfect squiggles are fine stretched. 
           Specific shapes like hearts might look bad if stretched 1200px wide but 40px high.
           
           Let's use a simpler "string of things" path that looks okay stretched, 
           OR set preserveAspectRatio="none" only for the connecting line and place hearts at intervals.
           
           Actually, for simplicity and effectiveness, let's just draw a wiggly line with some loops that look kinda like hearts/leaves 
           incorporated into the path, or just scattered small shapes.
           
           Let's go with a repeating pattern approach effectively by drawing enough of them for a standard wide screen 
           and letting overflow hide or scale.
       */}

            {/* Simplified "Hearts String" - just a few hearts on a line, looking cute/minimal */}
            <path d="M0,30 Q300,5 600,30 T1200,30" className="opacity-50" />

            {/* Heart shape definition to reuse? No, just raw paths for "hand-drawn" feel */}
            {/* Center Heart */}
            <path d="M600,35 C580,10 550,20 550,40 C550,65 600,80 600,80 C600,80 650,65 650,40 C650,20 620,10 600,35 Z" fill="currentColor" opacity="0.8" transform="scale(0.5) translate(600, -20)" />

            {/* Left Heart */}
            <path d="M300,35 C280,10 250,20 250,40 C250,65 300,80 300,80 C300,80 350,65 350,40 C350,20 320,10 300,35 Z" fill="currentColor" opacity="0.6" transform="scale(0.4) translate(400, 0)" />

            {/* Right Heart */}
            <path d="M900,35 C880,10 850,20 850,40 C850,65 900,80 900,80 C900,80 950,65 950,40 C950,20 920,10 900,35 Z" fill="currentColor" opacity="0.6" transform="scale(0.4) translate(1600, 0)" />
        </svg>
    );

    // Hand-drawn leaves: a vine
    const LeavesSVG = () => (
        <svg
            viewBox="0 0 1200 60"
            className="w-full h-full text-[#D4AF37]" // Gold
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Vine */}
            <path d="M0,30 C200,10 400,50 600,30 C800,10 1000,50 1200,30" />

            {/* Leaves */}
            <path d="M100,20 Q120,5 140,20 Q120,35 100,20" fill="currentColor" />
            <path d="M300,40 Q320,25 340,40 Q320,55 300,40" fill="currentColor" />
            <path d="M500,20 Q520,5 540,20 Q520,35 500,20" fill="currentColor" />
            <path d="M700,40 Q720,25 740,40 Q720,55 700,40" fill="currentColor" />
            <path d="M900,20 Q920,5 940,20 Q920,35 900,20" fill="currentColor" />
            <path d="M1100,40 Q1120,25 1140,40 Q1120,55 1100,40" fill="currentColor" />
        </svg>
    );

    // Re-doing Hearts to ensure it looks better - the previous attempt was a bit experimental.
    // Let's make a consistent "string of hearts" that stretches nicely.
    const HeartsSVGRevised = () => (
        <svg
            viewBox="0 0 1200 40"
            className="w-full h-full text-[#E8C7C7]"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            {/* Connecting line */}
            <path d="M0,20 Q300,5 600,20 T1200,20" strokeDasharray="5,5" />

            {/* Hearts along the line */}
            <g fill="#E8C7C7">
                <path transform="translate(150, 10) scale(0.8)" d="M10,5 C10,0 5,0 5,5 C5,10 10,15 10,15 C10,15 15,10 15,5 C15,0 10,0 10,5 Z" />
                <path transform="translate(450, 25) scale(0.8)" d="M10,5 C10,0 5,0 5,5 C5,10 10,15 10,15 C10,15 15,10 15,5 C15,0 10,0 10,5 Z" />
                <path transform="translate(750, 10) scale(0.8)" d="M10,5 C10,0 5,0 5,5 C5,10 10,15 10,15 C10,15 15,10 15,5 C15,0 10,0 10,5 Z" />
                <path transform="translate(1050, 25) scale(0.8)" d="M10,5 C10,0 5,0 5,5 C5,10 10,15 10,15 C10,15 15,10 15,5 C15,0 10,0 10,5 Z" />
            </g>
        </svg>
    );

    return (
        <div className={`w-full overflow-hidden flex justify-center items-center py-4 ${className}`}>
            <div className="w-full h-[40px] md:h-[60px]">
                {variant === "wave" && <WaveSVG />}
                {variant === "hearts" && <HeartsSVGRevised />}
                {variant === "leaves" && <LeavesSVG />}
            </div>
        </div>
    );
};

export default DecorativeDivider;
