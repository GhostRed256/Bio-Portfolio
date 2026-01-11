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
    const leaves = ["🍂", "🍁"];
    const [leaf] = useState(() => leaves[Math.floor(Math.random() * leaves.length)]);
    const [duration] = useState(() => 8 + Math.random() * 4);

    useEffect(() => setWindowHeight(window.innerHeight), []);

    return (
        <motion.div
            className="absolute text-xl"
            style={{ left: `${x}%`, top: -20 }}
            animate={{ y: [0, windowHeight + 50], rotate: [0, 360], x: [0, Math.sin(delay * 2) * 50, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        >
            {leaf}
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
    const animate = useMemo(() => ({
        x: [0, (Math.random() - 0.5) * 100, 0],
        y: [0, (Math.random() - 0.5) * 100, 0],
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.2, 0.8]
    }), []);

    const duration = useMemo(() => 10 + Math.random() * 10, []);

    return (
        <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                boxShadow: "0 0 8px #fef08a, 0 0 16px #fef08a"
            }}
            animate={animate}
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

export function FestiveEffects() {
    const { theme, isDay } = useSeasonalTheme();
    const [crackers, setCrackers] = useState<number[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {theme === 'Monsoon' && Array.from({ length: 40 }).map((_, i) => <RainDrop key={i} delay={i * 0.1} />)}
            {theme === 'Halloween' && Array.from({ length: 8 }).map((_, i) => <Ghost key={i} delay={i * 0.5} />)}
            {theme === 'Summer' && (
                isDay ? <RealisticSun /> : Array.from({ length: 30 }).map((_, i) => <Firefly key={i} delay={i * 0.2} />)
            )}
        </div>
    );
}
