"use client";

import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

export function SeasonalGreeting() {
    const { theme } = useSeasonalTheme();

    const greeting = useMemo(() => {
        const now = new Date();
        const month = now.getMonth(); // 0-11
        const day = now.getDate();

        let msg = "";

        // Specific Holiday/Occasion Greetings
        if (month === 0 && day === 1) msg = "Happy New Year 2026! 🎉 Let's make it count.";
        else if (month === 0 && day === 26) msg = "Happy Republic Day! 🇮🇳 Jai Hind.";
        else if (month === 1 && day === 14) msg = "Happy Valentine's Day! ❤️ Spread the love.";
        else if (month === 7 && day === 15) msg = "Happy Independence Day! 🇮🇳 Freedom is our pride.";
        else if (month === 9 && (day >= 29 || day <= 2)) msg = "Happy Diwali! 🪔 Shubh Deepawali.";
        else if (month === 11 && day === 25) msg = "Merry Christmas! 🎄 Ho Ho Ho!";
        else if (month === 9 && day === 31) msg = "Happy Halloween! 🎃 Trick or treat?";

        // General Seasonal/Monthly Greetings (Fallbacks)
        if (!msg) {
            switch (theme) {
                case 'NewYear':
                case 'Winter':
                    if (month === 0) {
                        // Rest of January messages
                        const messages = [
                            "New Year, New Beginnings, New Possibilities ✨",
                            "Establishing new habits for a better year ahead. 💪",
                            "January: The first chapter of a beautiful 2026 journey. 📖",
                            "Stay focused, stay determined. The year has just begun! 🚀"
                        ];
                        msg = messages[day % messages.length];
                    } else {
                        msg = "Stay Cozy, Stay Warm! ❄️ Winter is here.";
                    }
                    break;
                case 'RepublicDay':
                    msg = "Pride and Honor to be an Indian. 🇮🇳";
                    break;
                case 'Spring':
                    msg = "Bloom where you are planted. 🌸 Spring is in the air.";
                    break;
                case 'Summer':
                    msg = "Sun, Sand and a Drink in hand! ☀️ Soak up the sun.";
                    break;
                case 'Monsoon':
                    msg = "Life isn't about waiting for the storm to pass... 🌧️ It's about dancing in the rain.";
                    break;
                case 'Autumn':
                    msg = "Golden leaves, crisp air, autumn vibes. 🍂 Change is beautiful.";
                    break;
                case 'Halloween':
                    msg = "Spooky season is here! 👻 Watch out for ghosts.";
                    break;
                case 'Diwali':
                    msg = "May your life be as colorful as the lights. ✨ Festival of lights.";
                    break;
                case 'Christmas':
                    msg = "Spreading Cheer and Joy! 🎁 Season of giving.";
                    break;
                case 'Valentine':
                    msg = "Love is in the air. 💕 Be kind to everyone.";
                    break;
                default:
                    msg = "Welcome to my creative space! 👋";
            }
        }
        return msg;
    }, [theme]);

    if (!greeting) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={greeting}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full py-5 px-6 text-center text-[11px] md:text-xs font-black uppercase tracking-[0.2em] bg-primary/5 text-primary/70"
            >
                <div className="container mx-auto">
                    <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {greeting}
                    </motion.span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
