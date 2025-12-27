"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface SmartImageProps extends Omit<ImageProps, "onError"> {
    fallbackText?: string;
    containerClassName?: string;
}

export default function SmartImage({
    src,
    alt,
    fallbackText,
    containerClassName,
    className,
    ...props
}: SmartImageProps) {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (error) {
        return (
            <div className={cn(
                "w-full h-full bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden",
                containerClassName,
                className
            )}>
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,200,200,0.5),transparent_70%)]" />
                <Sparkles className="text-pink-300 w-8 h-8 mb-2 animate-pulse" />
                <span className="font-serif text-amber-950/80 font-medium text-sm relative z-10 font-bold tracking-wide">
                    {fallbackText || alt || "Giaboinee"}
                </span>
            </div>
        );
    }

    return (
        <div className={cn("relative w-full h-full overflow-hidden", containerClassName)}>
            {isLoading && (
                <div className="absolute inset-0 bg-pink-100/50 animate-pulse z-10" />
            )}
            <Image
                src={src}
                alt={alt}
                onError={() => setError(true)}
                onLoad={() => setIsLoading(false)}
                className={cn(
                    className,
                    "transition-opacity duration-500",
                    isLoading ? "opacity-0" : "opacity-100"
                )}
                {...props}
            />
        </div>
    );
}
