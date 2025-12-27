"use client";

import { useState, useEffect } from "react";

export function useScrollSpy(ids: string[], offset: number = 0) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const listener = () => {
            const scroll = window.scrollY;

            // Find the first section that is receiving the top of the viewport
            const active = ids.find((id) => {
                const element = document.getElementById(id);
                if (!element) return false;
                const rect = element.getBoundingClientRect();
                const top = rect.top + scroll - offset;
                const bottom = rect.bottom + scroll - offset;
                return scroll >= top - 100 && scroll < bottom;
            });

            if (active) {
                setActiveId(active);
            }
        };

        listener();
        window.addEventListener("resize", listener);
        window.addEventListener("scroll", listener);

        return () => {
            window.removeEventListener("resize", listener);
            window.removeEventListener("scroll", listener);
        };
    }, [ids, offset]);

    return activeId;
}
