"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface Balloon {
    id: number;
    x: number;
    delay: number;
    color: string;
    scale: number;
}

const pastelColors = [
    "#FFB7B2", // Pastel Red
    "#B5EAD7", // Pastel Mint
    "#E2F0CB", // Pastel Green/Yellow
    "#C7CEEA", // Pastel Blue/Purple
    "#FDFD96", // Pastel Yellow
    "#FFDAC1", // Pastel Orange
];

export function FloatingBalloons() {
    const [balloons, setBalloons] = useState<Balloon[]>([]);
    const { scrollY } = useScroll();

    // Transform scroll value to vertical movement
    // As we scroll down, balloons fly up faster
    const y1 = useTransform(scrollY, [0, 2000], [0, -1000]);
    const y2 = useTransform(scrollY, [0, 2000], [0, -1500]);
    const y3 = useTransform(scrollY, [0, 2000], [0, -800]);

    useEffect(() => {
        // Generate random balloons on client side only
        const newBalloons = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Random percentage for left position
            delay: Math.random() * 5,
            color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
            scale: 0.5 + Math.random() * 0.5, // Scale between 0.5 and 1
        }));
        setBalloons(newBalloons);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {balloons.map((balloon, index) => {
                // Assign different scroll speeds based on index
                const y = index % 3 === 0 ? y1 : index % 3 === 1 ? y2 : y3;

                return (
                    <motion.div
                        key={balloon.id}
                        initial={{ bottom: -100, opacity: 0 }}
                        animate={{
                            bottom: "120vh",
                            opacity: [0, 0.8, 0.8, 0],
                            x: [0, Math.random() * 50 - 25, 0] // Gentle sway
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: balloon.delay,
                            ease: "linear",
                        }}
                        style={{
                            left: `${balloon.x}%`,
                            scale: balloon.scale,
                            y: y, // Apply scroll-based transform
                        }}
                        className="absolute"
                    >
                        {/* Balloon Shape */}
                        <div className="relative flex flex-col items-center">
                            <div
                                className="w-16 h-20 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-lg opacity-80 backdrop-blur-sm"
                                style={{ backgroundColor: balloon.color }}
                            >
                                <div className="absolute top-3 left-3 w-3 h-6 bg-white/40 rounded-full rotate-[-45deg]" />
                            </div>
                            {/* String */}
                            <div className="w-[1px] h-24 bg-foreground/20 mt-[-2px]" />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
