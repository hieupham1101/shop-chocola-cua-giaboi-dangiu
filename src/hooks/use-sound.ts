"use client";

import { useCallback } from "react";

// Base64 encoded sounds to avoid external dependencies for this simple task
// Short, soft click
const CLICK_SOUND = "data:audio/wav;base64,UklGRi4AAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="; // Placeholder, real base64 below

// I will use real, very short base64 strings for actual sounds.
// Pop/Click
const POP_B64 = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWgAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Placeholder - generating real simple sounds in code isn't feasible, I'll use a silent mock or very standard simple beeps if requested, but for "Premium" vibe I should use decent placeholders. 
// Since I can't browse for assets easily, I will implement the hook structure and leave a comment or use a simple synthesized tone if possible?
// Better: Web Audio API Oscillator for clean, generated sounds without assets.

export const useSound = () => {

    // Helper to play a generated beep/boop
    const playTone = useCallback((freq: number, type: OscillatorType, duration: number, volume: number = 0.1) => {
        if (typeof window === "undefined") return;
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, []);

    const playClick = useCallback(() => {
        // Soft high tick
        playTone(800, "sine", 0.1, 0.05);
    }, [playTone]);

    const playHover = useCallback(() => {
        // Very subtle distinct tick
        // playTone(400, "triangle", 0.05, 0.02);
        // Hover sounds can be annoying, skipping implementation as per best practices unless explicitly forced. User asked for "navigation links" click sound.
    }, []);

    const playSuccess = useCallback(() => {
        // Pleasant major chord chime
        const now = (typeof window !== "undefined" ? new (window.AudioContext || (window as any).webkitAudioContext)().currentTime : 0);

        // Simple sequential notes
        // C5, E5, G5
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const playNote = (f: number, t: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = f;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.1, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.5);
        }

        const nowTime = ctx.currentTime;
        playNote(523.25, nowTime); // C5
        playNote(659.25, nowTime + 0.1); // E5
        playNote(783.99, nowTime + 0.2); // G5

    }, []);

    return { playClick, playSuccess, playHover };
};
