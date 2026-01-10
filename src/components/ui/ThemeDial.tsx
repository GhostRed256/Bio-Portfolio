"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Sun, Moon, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { useSeasonalTheme, SeasonTheme } from "@/hooks/useSeasonalTheme";

const themeEmojis: Record<SeasonTheme, string> = {
    NewYear: "🎉",
    RepublicDay: "🇮🇳",
    Valentine: "💕",
    Spring: "🌸",
    Summer: "☀️",
    Monsoon: "🌧️",
    IndependenceDay: "🇮🇳",
    Autumn: "🍂",
    Halloween: "🎃",
    Diwali: "🪔",
    Christmas: "🎄",
    Winter: "❄️"
};

const themeLabels: Record<SeasonTheme, string> = {
    NewYear: "New Year",
    RepublicDay: "Republic Day",
    Valentine: "Valentine's",
    Spring: "Spring",
    Summer: "Summer",
    Monsoon: "Monsoon",
    IndependenceDay: "Independence",
    Autumn: "Autumn",
    Halloween: "Halloween",
    Diwali: "Diwali",
    Christmas: "Christmas",
    Winter: "Winter"
};

export function ThemeDial() {
    const { theme, isDay, isManualOverride, setTheme, toggleDayNight, resetToAuto, allThemes } = useSeasonalTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(() => allThemes.indexOf(theme));
    const dialRef = useRef<HTMLDivElement>(null);

    const handlePrev = () => {
        const newIndex = currentIndex === 0 ? allThemes.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setTheme(allThemes[newIndex]);
    };

    const handleNext = () => {
        const newIndex = currentIndex === allThemes.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setTheme(allThemes[newIndex]);
    };

    return (
        <div className="fixed top-20 right-4 z-50" ref={dialRef}>
            {/* Main Dial Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-14 h-14 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-lg flex items-center justify-center overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Animated gradient ring */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))`,
                        opacity: 0.4
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner circle */}
                <div className="absolute inset-1 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-md flex items-center justify-center">
                    <span className="text-2xl">{themeEmojis[theme]}</span>
                </div>

                {/* Manual override indicator */}
                {isManualOverride && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    />
                )}
            </motion.button>

            {/* Expanded Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        className="absolute top-16 right-0 w-72 p-4 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-2xl"
                    >
                        {/* Theme Selector */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-foreground/80">Theme</span>
                                {isManualOverride && (
                                    <button
                                        onClick={resetToAuto}
                                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <RotateCcw size={12} />
                                        Auto
                                    </button>
                                )}
                            </div>

                            {/* Theme Carousel */}
                            <div className="flex items-center justify-between bg-white/30 dark:bg-black/30 rounded-xl p-3">
                                <button
                                    onClick={handlePrev}
                                    className="p-1 rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <motion.div
                                    key={theme}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-1"
                                >
                                    <span className="text-3xl">{themeEmojis[theme]}</span>
                                    <span className="text-sm font-medium">{themeLabels[theme]}</span>
                                </motion.div>

                                <button
                                    onClick={handleNext}
                                    className="p-1 rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Theme dots indicator */}
                            <div className="flex justify-center gap-1 mt-3">
                                {allThemes.map((t, i) => (
                                    <button
                                        key={t}
                                        onClick={() => {
                                            setCurrentIndex(i);
                                            setTheme(t);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all ${i === currentIndex
                                                ? 'bg-primary w-4'
                                                : 'bg-foreground/20 hover:bg-foreground/40'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Day/Night Toggle */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/20">
                            <span className="text-sm font-medium text-foreground/80">
                                {isDay ? "Day Mode" : "Night Mode"}
                            </span>
                            <button
                                onClick={toggleDayNight}
                                className="relative w-16 h-8 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 dark:from-indigo-600 dark:to-purple-800 p-1 transition-all"
                            >
                                <motion.div
                                    className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
                                    animate={{ x: isDay ? 0 : 32 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                    {isDay ? (
                                        <Sun size={14} className="text-amber-500" />
                                    ) : (
                                        <Moon size={14} className="text-indigo-600" />
                                    )}
                                </motion.div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
