"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { TetrisGame } from "./TetrisGame";

const REQUIRED_CLICKS = 9;
const RESET_TIMEOUT = 3000;

export function EasterEggTrigger() {
    const [clickCount, setClickCount] = useState(0);
    const [isGameOpen, setIsGameOpen] = useState(false);
    const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

    const scheduleReset = useCallback(() => {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => setClickCount(0), RESET_TIMEOUT);
    }, []);

    const handleClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        scheduleReset();

        if (newCount >= REQUIRED_CLICKS) {
            setIsGameOpen(true);
            setClickCount(0);
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        }
    };

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {!isGameOpen && (
                    <motion.button
                        layoutId="tetris-game"
                        onClick={handleClick}
                        className="group flex items-center gap-1.5 px-2 py-1 rounded-full text-muted-foreground/30 hover:text-primary/60 transition-colors cursor-default hover:cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Let's play?"
                    >
                        <Gamepad2
                            size={12}
                            className="opacity-50 group-hover:opacity-100 transition-opacity"
                        />
                        <span className="text-[10px] font-medium tracking-wide">
                            let&apos;s play
                        </span>

                        {/* Micro progress bar */}
                        <div className="w-8 h-[2px] bg-muted/20 rounded-full overflow-hidden ml-1">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${(clickCount / REQUIRED_CLICKS) * 100}%` }}
                            />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            <TetrisGame
                isOpen={isGameOpen}
                onClose={() => setIsGameOpen(false)}
            />
        </>
    );
}
