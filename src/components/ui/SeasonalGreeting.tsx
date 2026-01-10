"use client";

import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SeasonalGreeting() {
    const { theme } = useSeasonalTheme();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const now = new Date();
        const month = now.getMonth(); // 0-11
        const day = now.getDate();

        let msg = "";

        // Specific Holiday Greetings
        if (month === 0 && day === 1) msg = "Happy New Year 2026! 🎉";
        else if (month === 0 && day === 26) msg = "Happy Republic Day! 🇮🇳";
        else if (month === 1 && day === 14) msg = "Happy Valentine's Day! ❤️";
        else if (month === 7 && day === 15) msg = "Happy Independence Day! 🇮🇳";
        else if (month === 9 && day === 31) msg = "Happy Halloween! 🎃";
        else if (theme === 'Diwali' && (day >= 29 || day <= 2)) msg = "Happy Diwali! 🪔"; // Diwali usually falls in this range
        else if (month === 11 && day === 25) msg = "Merry Christmas! 🎄";

        // General Seasonal/Monthly Greetings (Fallbacks)
        if (!msg) {
            switch (theme) {
                case 'NewYear':
                case 'Winter':
                    if (month === 0) msg = "New Year, New Beginnings, New Possibilities ✨";
                    else msg = "Stay Cozy, Stay Warm! ❄️";
                    break;
                case 'RepublicDay':
                    msg = "Pride and Honor to be an Indian. 🇮🇳";
                    break;
                case 'Spring':
                    msg = "Bloom where you are planted. 🌸";
                    break;
                case 'Summer':
                    msg = "Sun, Sand and a Drink in hand! ☀️";
                    break;
                case 'Monsoon':
                    msg = "Life isn't about waiting for the storm to pass... 🌧️";
                    break;
                case 'Autumn':
                    msg = "Golden leaves, crisp air, autumn vibes. 🍂";
                    break;
                case 'Halloween':
                    msg = "Spooky season is here! 👻";
                    break;
                case 'Diwali':
                    msg = "May your life be as colorful as the lights. ✨";
                    break;
                case 'Christmas':
                    msg = "Spreading Cheer and Joy! 🎁";
                    break;
                case 'Valentine':
                    msg = "Love is in the air. 💕";
                    break;
                default:
                    msg = "Welcome to my portfolio! 👋";
            }
        }

        setGreeting(msg);
    }, [theme]);

    if (!greeting) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={greeting}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="w-full py-3 px-6 text-center text-sm font-semibold tracking-wide border-b border-white/10 backdrop-blur-md bg-primary/5 text-primary/80"
            >
                {greeting}
            </motion.div>
        </AnimatePresence>
    );
}
