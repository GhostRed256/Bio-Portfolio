"use client";

import { motion } from "framer-motion";
import { useWeather, WeatherCondition } from "@/hooks/useWeather";
import { useEffect } from "react";

export function WeatherEffects() {
    const { condition, isDay } = useWeather();

    // Dynamic Theme Variables based on Weather
    useEffect(() => {
        const root = document.documentElement;

        // Define themes
        const themes: Record<WeatherCondition, { background: string; primary: string; secondary: string; text: string }> = {
            Sunny: {
                background: "50 100% 95%", // Pastel Yellow
                primary: "40 100% 70%", // Orange-ish
                secondary: "50 80% 90%",
                text: "30 50% 20%" // Dark Brown/Orange
            },
            Rainy: {
                background: "210 50% 95%", // Pastel Blue/Grey
                primary: "210 60% 60%", // Rainy Blue
                secondary: "210 40% 90%",
                text: "210 50% 20%" // Dark Blue
            },
            Snowy: {
                background: "200 20% 98%", // Almost White/Ice
                primary: "200 40% 80%", // Ice Blue
                secondary: "200 10% 95%",
                text: "200 30% 30%" // Slate
            },
            Cloudy: {
                background: "0 0% 96%", // Greyish
                primary: "270 20% 70%", // Muted Purple
                secondary: "0 0% 92%",
                text: "0 0% 20%"
            },
            Clear: { // Night
                background: "240 30% 10%", // Dark Navy
                primary: "240 50% 80%", // Moonlight
                secondary: "240 20% 15%",
                text: "240 10% 95%" // White
            },
            Evening: { // Dusky Evening - Orange & Dark Blue
                background: "20 60% 25%", // Deep Dusky Orange-Brown
                primary: "25 100% 60%", // Sunset Orange
                secondary: "240 50% 20%", // Dark Blue
                text: "30 80% 90%" // Light Cream
            }
        };

        const theme = themes[condition] || themes.Sunny;

        // Apply variables
        // We only override the base colors, keeping the structure
        root.style.setProperty('--background', theme.background);
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--secondary', theme.secondary);

        // Optional: Update text colors if needed, but keeping readability is key
        // root.style.setProperty('--foreground', theme.text); 

    }, [condition, isDay]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            {/* SUN ANIMATION */}
            {condition === 'Sunny' && isDay && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute top-10 right-10 w-32 h-32 bg-yellow-300/40 rounded-full blur-3xl opacity-60"
                />
            )}

            {/* EVENING SUNSET ANIMATION */}
            {condition === 'Evening' && (
                <>
                    <motion.div
                        animate={{ opacity: [0.4, 0.6, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-orange-500/30 to-transparent"
                    />
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-20 w-24 h-24 bg-orange-400/50 rounded-full blur-2xl"
                    />
                </>
            )}

            {/* RAIN ANIMATION */}
            {condition === 'Rainy' && (
                <div className="absolute inset-0">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: "100vh", opacity: 0.5 }}
                            transition={{
                                duration: 1 + Math.random(),
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 2
                            }}
                            className="absolute bg-blue-400 w-[1px] h-6"
                            style={{
                                left: `${Math.random() * 100}%`
                            }}
                        />
                    ))}
                    {/* Lightning Flash overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 + Math.random() * 10 }}
                        className="absolute inset-0 bg-white mix-blend-overlay"
                    />
                </div>
            )}

            {/* SNOW ANIMATION */}
            {condition === 'Snowy' && (
                <div className="absolute inset-0">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: "100vh", opacity: 0.8, x: Math.random() * 20 - 10 }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5
                            }}
                            className="absolute bg-white w-2 h-2 rounded-full blur-[1px]"
                            style={{
                                left: `${Math.random() * 100}%`
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
