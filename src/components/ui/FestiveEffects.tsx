"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";

// Component Definitions
function Cracker({ delay }: { delay: number }) {
    // Rocket shoots to the top 20-40% of the screen
    const [position] = useState(() => ({ x: 10 + Math.random() * 80, startY: 75 + Math.random() * 15 }));
    const colors = ["#FFD700", "#FF4500", "#00FF7F", "#00BFFF", "#FF1493", "#9400D3", "#FFFFFF"];
    const particles = useMemo(() => Array.from({ length: 24 }).map((_, i) => ({
        angle: (i / 24) * 360,
        distance: 80 + Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)]
    })), [colors]);

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left: `${position.x}%`, bottom: 0 }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: `-${position.startY}vh`, opacity: [1, 1, 0] }}
            transition={{ duration: 0.7, delay, ease: "circOut" }}
        >
            <motion.div
                className="w-1.5 h-10 bg-gradient-to-t from-orange-600 via-yellow-400 to-white rounded-full brightness-150 drop-shadow-[0_0_12px_rgba(255,165,0,0.9)]"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: [1, 1.2, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 0.7, delay }}
            />

            {/* Explosion */}
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ backgroundColor: p.color, boxShadow: `0 0 15px ${p.color}, 0 0 30px ${p.color}` }} // Glowing particles
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1.8, 0],
                        x: Math.cos(p.angle * Math.PI / 180) * p.distance,
                        y: Math.sin(p.angle * Math.PI / 180) * p.distance,
                        opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, delay: delay + 0.7, ease: "easeOut" }}
                />
            ))}
        </motion.div>
    );
}

function Petal({ delay }: { delay: number }) {
    const [windowHeight, setWindowHeight] = useState(800);
    const x = useMemo(() => Math.random() * 100, []);
    const colors = ["#FF9933", "#FFFFFF", "#138808"]; // Tricolor petals
    const color = useMemo(() => colors[Math.floor(Math.random() * colors.length)], [colors]);
    const duration = useMemo(() => 6 + Math.random() * 4, []);

    useEffect(() => setWindowHeight(window.innerHeight), []);

    return (
        <motion.div
            className="absolute w-4 h-4 rounded-tl-full rounded-br-full opacity-80"
            style={{
                left: `${x}%`,
                top: -20,
                backgroundColor: color,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
            animate={{
                y: [0, windowHeight + 50],
                rotate: [0, 360],
                x: [0, Math.sin(delay * 2) * 100, 0],
                rotateX: [0, 180, 360],
                rotateY: [0, 180, 360]
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
}

function Diya({ x, delay }: { x: number; delay: number }) {
    return (
        <motion.div
            className="absolute bottom-0" style={{ left: `${x}%` }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <motion.div className="relative" animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <div className="w-3 h-5 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-[1px]" />
                <div className="absolute inset-0 w-3 h-5 bg-yellow-300 rounded-full opacity-50 blur-sm" />
            </motion.div>
            <div className="w-6 h-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full -mt-1" />
        </motion.div>
    );
}

function LightString({ colors, y }: { colors: string[]; y: number }) {
    const items = useMemo(() => colors.map((color, i) => ({
        color,
        duration: 0.8 + Math.random() * 0.4,
        delay: i * 0.1
    })), [colors]);

    return (
        <div className="absolute left-0 right-0 flex justify-around px-4 pointer-events-none" style={{ top: `${y}%` }}>
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    className="w-3 h-4 rounded-b-full shadow-[0_0_10px_currentColor]"
                    style={{ backgroundColor: item.color, color: item.color }}
                    animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1, 0.9] }}
                    transition={{ duration: item.duration, repeat: Infinity, delay: item.delay }}
                />
            ))}
        </div>
    );
}

// Tricolor Background Overlay
function TricolorBackground() {
    return (
        <div className="fixed inset-0 z-[-2] opacity-20 pointer-events-none flex flex-col">
            <div className="flex-1 bg-gradient-to-b from-[#FF9933] to-transparent" />
            <div className="flex-1 bg-white/10" />
            <div className="flex-1 bg-gradient-to-t from-[#138808] to-transparent" />
        </div>
    );
}

function FloatingHeart({ delay }: { delay: number }) {
    const [windowHeight, setWindowHeight] = useState(800);
    const [x] = useState(() => Math.random() * 100);
    const [size] = useState(() => 10 + Math.random() * 15);
    const [duration] = useState(() => 8 + Math.random() * 4);

    useEffect(() => setWindowHeight(window.innerHeight), []);

    return (
        <motion.div
            className="absolute text-pink-400"
            style={{ left: `${x}%`, bottom: -20, fontSize: size }}
            initial={{ opacity: 0 }}
            animate={{ y: [0, -windowHeight - 100], opacity: [0, 1, 1, 0], x: [0, Math.sin(delay) * 30, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        >
            ❤️
        </motion.div>
    );
}

function Snowflake({ delay }: { delay: number }) {
    const [windowHeight, setWindowHeight] = useState(800);
    const [x] = useState(() => Math.random() * 100);
    const [duration] = useState(() => 10 + Math.random() * 5);

    useEffect(() => setWindowHeight(window.innerHeight), []);

    return (
        <motion.div
            className="absolute text-xl"
            style={{ left: `${x}%`, top: -20, color: '#A5F3FC', textShadow: '0 0 4px #38bdf8' }}
            animate={{ y: [0, windowHeight + 50], x: [0, Math.sin(delay * 5) * 50], rotate: [0, 360] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        >
            ❄
        </motion.div>
    );
}

function Sparkle({ delay }: { delay: number }) {
    const [x] = useState(() => Math.random() * 100);
    const [y] = useState(() => Math.random() * 100);
    const [repeatDelay] = useState(() => Math.random() * 2);

    return (
        <motion.div
            className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow-[0_0_4px_#FFD700]"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay }}
        />
    );
}

function Flower({ delay }: { delay: number }) {
    const [windowHeight, setWindowHeight] = useState(800);
    const [x] = useState(() => Math.random() * 100);
    const flowers = ["🌸", "🌺", "🌼", "🌻", "🌷"];
    const [flower] = useState(() => flowers[Math.floor(Math.random() * flowers.length)]);
    const [duration] = useState(() => 6 + Math.random() * 4);

    useEffect(() => setWindowHeight(window.innerHeight), []);

    return (
        <motion.div
            className="absolute text-xl"
            style={{ left: `${x}%`, top: -20 }}
            animate={{ y: [0, windowHeight + 50], rotate: [0, 360], x: [0, Math.sin(delay) * 30, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        >
            {flower}
        </motion.div>
    );
}


function AutumnLeaf({ delay }: { delay: number }) {
    const [windowHeight, setWindowHeight] = useState(800);
    const [x] = useState(() => Math.random() * 100);
    const [leafType] = useState(() => Math.floor(Math.random() * 4)); // 0: Maple, 1: Oak, 2: Side, 3: Traditional
    const [rotationStart] = useState(() => Math.random() * 360);
    const [duration] = useState(() => 8 + Math.random() * 4);

    useEffect(() => setWindowHeight(window.innerHeight), []);

    // Variations for Autumn
    const getLeafPath = (type: number, color: string, accent: string) => {
        switch (type) {
            case 0: // Maple (Front)
                return (
                    <svg width="30" height="30" viewBox="0 0 30 30" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
                        <path d="M15,2 L17,10 L20,8 L18,14 L25,12 L19,18 L26,22 L18,20 L20,27 L15,22 L10,27 L12,20 L4,22 L11,18 L5,12 L12,14 L10,8 L13,10 L15,2 Z" fill={color} stroke={accent} strokeWidth="0.5" />
                        <line x1="15" y1="8" x2="15" y2="22" stroke={accent} strokeWidth="0.5" opacity="0.6" />
                    </svg>
                );
            case 1: // Oak (lobed)
                return (
                    <svg width="25" height="35" viewBox="0 0 25 35" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
                        <path d="M12,2 Q16,5 17,8 Q22,8 23,12 Q19,15 17,18 Q20,22 18,26 Q15,28 12,32 Q9,28 6,26 Q4,22 7,18 Q5,15 1,12 Q2,8 7,8 Q8,5 12,2 Z" fill={color} stroke={accent} strokeWidth="0.5" />
                        <line x1="12" y1="2" x2="12" y2="32" stroke={accent} strokeWidth="0.5" opacity="0.6" />
                    </svg>
                );
            case 2: // Side View (Curled)
                return (
                    <svg width="25" height="25" viewBox="0 0 25 25" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
                        <path d="M2,20 Q12,10 22,5 Q18,15 12,22 Q5,22 2,20 Z" fill={color} stroke={accent} strokeWidth="0.5" />
                        <path d="M2,20 Q8,18 12,22" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.8" />
                    </svg>
                );
            case 3: // Traditional / Stylized Pattern
                return (
                    <svg width="30" height="30" viewBox="0 0 30 30" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
                        <path d="M15,0 C25,10 25,20 15,30 C5,20 5,10 15,0 Z" fill={color} stroke={accent} strokeWidth="1" />
                        {/* Intricate Veins */}
                        <path d="M15,0 L15,30 M15,5 L20,10 M15,10 L22,15 M15,15 L20,20 M15,5 L10,10 M15,10 L8,15 M15,15 L10,20" stroke={accent} strokeWidth="0.5" opacity="0.7" fill="none" />
                    </svg>
                );
            default: return null;
        }
    };

    const colors = [
        { fill: '#D2691E', accent: '#8B4513' },
        { fill: '#CD5C5C', accent: '#8B0000' },
        { fill: '#DAA520', accent: '#B8860B' },
        { fill: '#A0522D', accent: '#5C3317' }
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left: `${x}%`, top: -40 }}
            animate={{
                y: [0, windowHeight + 60],
                rotate: [rotationStart, rotationStart + 360],
                x: [0, Math.sin(delay * 3) * 60, 0] // Varied sway
            }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        >
            {getLeafPath(leafType, color.fill, color.accent)}
        </motion.div>
    );
}


function RainDrop({ delay }: { delay: number }) {
    const [windowHeight, setWindowHeight] = useState(800);
    const [x] = useState(() => Math.random() * 100);
    const [duration] = useState(() => 0.8 + Math.random());

    useEffect(() => setWindowHeight(window.innerHeight), []);

    return (
        <motion.div
            className="absolute w-[1px] h-4 bg-blue-400/50"
            style={{ left: `${x}%`, top: -20 }}
            animate={{ y: [0, windowHeight + 50] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        />
    );
}

function Firefly({ delay }: { delay: number }) {
    const [position, setPosition] = useState(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition({
                x: Math.random() * 100,
                y: Math.random() * 100
            });
        }, 8000 + Math.random() * 4000);
        return () => clearInterval(interval);
    }, []);

    // Randoms in animate are tricky, so use state or memo if they need to be consistent.
    // For now, let's keep them as is or fix them.
    // The previous code had Math.random() in animate props.
    // I will use useMemo for the random ranges if possible, but they are usually static definitions.
    // Actually, animate props are re-evaluated on render? No, only if props change.
    // But Math.random() in JSX props runs every render.
    // I'll memoize the animation variants.
    const [animationProps] = useState(() => ({
        x: [0, (Math.random() - 0.5) * 100, 0],
        y: [0, (Math.random() - 0.5) * 100, 0],
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.2, 0.8]
    }));

    const [duration] = useState(() => 10 + Math.random() * 10);

    return (
        <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                boxShadow: "0 0 8px #fef08a, 0 0 16px #fef08a"
            }}
            animate={animationProps}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay
            }}
        />
    );
}

function RealisticSun() {
    const [rays] = useState(() => Array.from({ length: 12 }).map((_, i) => ({
        height: 600 + Math.random() * 200,
        duration: 3 + Math.random() * 2,
        delay: i * 0.2
    })));

    return (
        <div className="absolute top-[-50px] right-[-50px] pointer-events-none">
            {/* Sun Core */}
            <motion.div
                className="w-40 h-40 bg-yellow-300 rounded-full blur-2xl relative z-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="absolute inset-0 bg-white/50 rounded-full blur-xl" />
            </motion.div>

            {/* Sun Rays/Streaks */}
            <div className="absolute inset-0 flex items-center justify-center">
                {rays.map((ray, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] bg-gradient-to-t from-transparent via-yellow-200/40 to-transparent origin-bottom"
                        style={{
                            height: ray.height,
                            transform: `rotate(${i * 30}deg)`,
                            bottom: "50%",
                        }}
                        animate={{
                            opacity: [0.1, 0.4, 0.1],
                            scaleY: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: ray.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: ray.delay
                        }}
                    />
                ))}
            </div>

            {/* Slow overall rotation */}
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-[1000px] h-1 bg-gradient-to-r from-yellow-100/10 via-yellow-200/5 to-transparent origin-left"
                        style={{
                            transform: `rotate(${i * 45}deg)`,
                            left: "80px",
                            top: "80px"
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}

function Ghost({ delay }: { delay: number }) {
    const [x] = useState(() => Math.random() * 100);
    const [y] = useState(() => Math.random() * 100);
    return (
        <motion.div
            className="absolute text-2xl opacity-20"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ y: [0, -20, 0], opacity: [0, 0.3, 0] }}
            transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
        >
            👻
        </motion.div>
    );
}


function DarkCloud({ delay, x, scale, isNight }: { delay: number; x: number; scale: number; isNight: boolean }) {
    const [duration] = useState(() => 40 + Math.random() * 20); // Slower, more realistic drift
    const [y] = useState(() => 2 + Math.random() * 15);

    return (
        <motion.div
            className={`absolute ${isNight ? 'text-slate-800' : 'text-slate-500'} opacity-90`}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                filter: isNight
                    ? 'blur(8px) drop-shadow(0 4px 20px rgba(0,0,0,0.9))' // Heavy blur for night outline
                    : 'blur(5px) drop-shadow(0 8px 15px rgba(0,0,0,0.4))' // Soft blur for day
            }}
            initial={{ x: -150 }}
            animate={{ x: [0, 50, 0] }} // Gentle drift
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Complex Multi-Layered Cloud Shape for Realism */}
            <svg width={150 * scale} height={80 * scale} viewBox="0 0 150 80" fill="currentColor" className="overflow-visible">
                {/* Base Layer - Heavily blurred via container, but add internal opacity */}
                <path d="M20 50 Q30 30 50 35 Q60 15 90 25 Q110 5 130 30 Q145 35 140 55 Q135 75 100 70 Q80 75 50 65 Q20 70 10 55 Q0 50 20 50Z" opacity="0.9" />
                {/* Top Fluff - Extra blur */}
                <path d="M40 35 Q55 10 80 25 Q100 15 120 35" fill="none" stroke="currentColor" strokeWidth="25" strokeLinecap="round" opacity="0.5" style={{ filter: 'blur(8px)' }} />
            </svg>
        </motion.div>
    );
}

function Lightning({ isNight }: { isNight: boolean }) {
    const [flash, setFlash] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const [boltLeft, setBoltLeft] = useState(() => 20 + Math.random() * 60);

    // Random lightning triggers
    useEffect(() => {
        const timeout = setTimeout(() => {
            setFlash(true);
            setBoltLeft(20 + Math.random() * 60);
            setTimeout(() => setFlash(false), 100 + Math.random() * 150); // Faster, sharper flash
            setTrigger(prev => prev + 1);
        }, 3000 + Math.random() * 7000);

        return () => clearTimeout(timeout);
    }, [trigger]);

    return (
        <div className={`fixed inset-0 pointer-events-none transition-opacity duration-75 ${flash ? 'opacity-100' : 'opacity-0'} ${isNight ? 'z-[-5]' : 'z-[5]'}`}>
            {/* Ultra Bright Flash Overlay */}
            <div className={`absolute inset-0 ${isNight ? 'bg-slate-200/20' : 'bg-white/60'} mix-blend-hard-light`} />

            {/* Dramatic Bolt */}
            {flash && (
                <div
                    className="absolute top-0 w-[4px] h-[70vh] bg-blue-50 shadow-[0_0_50px_#fff,0_0_100px_#60a5fa] z-10"
                    style={{ left: `${boltLeft}%`, filter: 'blur(0.5px)', opacity: 1 }}
                >
                    <svg className="absolute top-0 -left-20 w-40 h-full" viewBox="0 0 100 400" preserveAspectRatio="none">
                        <path d="M50 0 L65 120 L35 120 L55 250 L20 250 L60 400" fill="none" stroke="white" strokeWidth="4"
                            style={{ filter: 'drop-shadow(0 0 20px #bfdbfe) drop-shadow(0 0 40px #3b82f6)' }} />
                    </svg>
                </div>
            )}
        </div>
    );
}



function SpiderWeb({ isRight }: { isRight: boolean }) {
    // Different variations for left and right webs to look unique
    const scale = isRight ? 1.3 : 1.1;
    const rotate = isRight ? 12 : -8;
    const zoom = isRight ? 1.4 : 1.2;

    return (
        <motion.div
            className="absolute top-0 pointer-events-none"
            style={{
                right: isRight ? -60 : 'auto',
                left: isRight ? 'auto' : -60,
                top: isRight ? -95 : -90,
                width: '250px',
                height: '250px',
                transformOrigin: isRight ? 'top right' : 'top left',
                zIndex: 10,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
        >
            <img
                src="/spider-web.png"
                alt="Spider Web"
                className="opacity-90 dark:invert absolute"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: isRight ? 'top right' : 'top left',
                    transform: `scale(${zoom}) rotate(${rotate}deg) ${isRight ? 'scaleX(-1)' : ''}`,
                    filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.2)) contrast(1.1)',
                }}
            />
        </motion.div>
    );
}

function GreenLeaf({ delay }: { delay: number }) {
    const [windowHeight, setWindowHeight] = useState(800);
    const [x] = useState(() => Math.random() * 100);
    const [leafType] = useState(() => Math.floor(Math.random() * 3));
    const [duration] = useState(() => 10 + Math.random() * 5);

    useEffect(() => setWindowHeight(window.innerHeight), []);

    // Variations for Summer
    const getGreenLeafPath = (type: number, color: string, accent: string) => {
        switch (type) {
            case 0: // Standard Oval
                return (
                    <svg width="28" height="32" viewBox="0 0 28 32" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>
                        <path d="M14,2 Q20,8 22,16 Q20,24 14,30 Q8,24 6,16 Q8,8 14,2 Z" fill={color} stroke={accent} strokeWidth="0.5" />
                        <line x1="14" y1="4" x2="14" y2="28" stroke={accent} strokeWidth="0.8" opacity="0.7" />
                        <path d="M14,10 Q18,12 20,14 M14,10 Q10,12 8,14 M14,18 Q18,19 20,20 M14,18 Q10,19 8,20" stroke={accent} strokeWidth="0.4" opacity="0.5" fill="none" />
                    </svg>
                );
            case 1: // Elongated / Willow-like
                return (
                    <svg width="20" height="40" viewBox="0 0 20 40" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>
                        <path d="M10,0 Q18,10 18,20 Q15,35 10,40 Q5,35 2,20 Q2,10 10,0 Z" fill={color} stroke={accent} strokeWidth="0.5" />
                        <line x1="10" y1="0" x2="10" y2="40" stroke={accent} strokeWidth="0.5" opacity="0.6" />
                    </svg>
                );
            case 2: // Side View (Curved - Realistic)
                return (
                    <svg width="30" height="25" viewBox="0 0 30 25" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>
                        {/* More organic curved shape */}
                        <path d="M2,22 Q8,12 18,8 Q28,6 28,2 Q22,12 15,18 Q8,24 2,22 Z" fill={color} stroke={accent} strokeWidth="0.5" />
                        {/* Central vein following the curve */}
                        <path d="M2,22 Q12,14 28,2" stroke={accent} strokeWidth="0.6" fill="none" opacity="0.8" />
                    </svg>
                );
            default: return null;
        }
    };

    // Different green shades
    const colors = [
        { fill: '#228B22', accent: '#006400' },
        { fill: '#32CD32', accent: '#228B22' },
        { fill: '#2E8B57', accent: '#1C5F3A' }
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left: `${x}%`, top: -40 }}
            animate={{
                y: [0, windowHeight + 60],
                rotate: [0, 360],
                x: [0, Math.sin(delay * 2.5) * 70, 0]
            }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        >
            {getGreenLeafPath(leafType, color.fill, color.accent)}
        </motion.div>
    );
}

export function FestiveEffects() {
    const { theme, isDay } = useSeasonalTheme();
    const [crackers, setCrackers] = useState<number[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {

        setMounted(true);
    }, []);

    useEffect(() => {

        if (theme !== 'Diwali' && theme !== 'NewYear') { setCrackers([]); return; }
        const interval = setInterval(() => {
            setCrackers(prev => {
                const newId = Date.now();
                return [...prev.filter(id => Date.now() - id < 5000), newId];
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [theme]);

    const lights = useMemo(() => ["#FF0000", "#00FF00", "#FFD700", "#FF0000", "#00FF00", "#FFD700"], []);
    // Lazy init for clouds to avoid impure random in render
    const [clouds] = useState(() => Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        delay: i * 2,
        x: Math.random() * 80,
        scale: 1 + Math.random() * 1.5
    })));

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
            {(theme === 'IndependenceDay' || theme === 'RepublicDay') && <TricolorBackground />}

            <AnimatePresence>
                {(theme === 'Diwali' || theme === 'NewYear') && (
                    <>
                        {crackers.map((id, i) => <Cracker key={id} delay={i * 0.3} />)}
                        {theme === 'Diwali' && (
                            <div className="absolute bottom-0 left-0 right-0 h-20">
                                {Array.from({ length: 15 }).map((_, i) => <Diya key={i} x={5 + i * 6.5} delay={i * 0.1} />)}
                            </div>
                        )}
                        <LightString colors={lights} y={5} />
                    </>
                )}
            </AnimatePresence>

            {theme === 'Christmas' && (
                <>
                    <LightString colors={lights} y={0} />
                    {Array.from({ length: 20 }).map((_, i) => <Snowflake key={i} delay={i * 0.5} />)}
                </>
            )}

            {theme === 'Valentine' && Array.from({ length: 15 }).map((_, i) => <FloatingHeart key={i} delay={i * 0.8} />)}
            {theme === 'NewYear' && Array.from({ length: 30 }).map((_, i) => <Sparkle key={i} delay={i * 0.2} />)}
            {/* Show snow in Winter regardless of Day/Night, but heavily styled in component to be visible */}
            {theme === 'Winter' && Array.from({ length: 20 }).map((_, i) => <Snowflake key={i} delay={i * 0.8} />)}
            {(theme === 'IndependenceDay' || theme === 'RepublicDay') && Array.from({ length: 25 }).map((_, i) => <Petal key={i} delay={i * 0.5} />)}
            {theme === 'Spring' && Array.from({ length: 15 }).map((_, i) => <Flower key={i} delay={i * 0.5} />)}
            {theme === 'Autumn' && Array.from({ length: 12 }).map((_, i) => <AutumnLeaf key={i} delay={i * 0.8} />)}

            {theme === 'Monsoon' && (
                <>
                    {/* Background Lightning (Night) or Overlay (Day) */}
                    <Lightning isNight={!isDay} />

                    {/* Dark Clouds */}
                    {clouds.map((cloud) => (
                        <DarkCloud
                            key={cloud.id}
                            delay={cloud.delay}
                            x={cloud.x}
                            scale={cloud.scale}
                            isNight={!isDay}
                        />
                    ))}

                    {/* Rain overlays everything */}
                    {Array.from({ length: 60 }).map((_, i) => <RainDrop key={i} delay={i * 0.1} />)}
                </>
            )}

            {theme === 'Halloween' && (
                <>
                    <SpiderWeb isRight={false} />
                    <SpiderWeb isRight={true} />
                    {Array.from({ length: 8 }).map((_, i) => <Ghost key={i} delay={i * 0.5} />)}
                </>
            )}
            {theme === 'Summer' && (
                isDay ? (
                    <>
                        <RealisticSun />
                        {Array.from({ length: 15 }).map((_, i) => <GreenLeaf key={i} delay={i * 1.5} />)}
                    </>
                ) : (
                    Array.from({ length: 30 }).map((_, i) => <Firefly key={i} delay={i * 0.2} />)
                )
            )}
        </div>
    );
}
