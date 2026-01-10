"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Art", href: "#art" },
    { name: "Code", href: "#code" },
    { name: "Contact", href: "#contact" },
];

import { SeasonalGreeting } from "@/components/ui/SeasonalGreeting";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
                isScrolled
                    ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-border shadow-sm py-3"
                    : "bg-transparent py-0"
            )}
        >
            <AnimatePresence>
                {!isScrolled && <SeasonalGreeting />}
            </AnimatePresence>

            <nav className={cn(
                "transition-all duration-300",
                !isScrolled && "pt-4 pb-6"
            )}>
                <div className="container mx-auto px-6 flex justify-between items-center relative">
                    {/* Logo with scroll-based movement */}
                    <motion.div
                        animate={isScrolled ? { scale: 0.95 } : { scale: 1 }}
                        className="flex items-center"
                    >
                        <Link
                            href="/"
                            className="group flex items-center gap-1"
                        >
                            <span className={cn(
                                "text-2xl font-bold tracking-tighter transition-colors duration-300",
                                isScrolled ? "text-primary" : "text-foreground"
                            )}
                            >
                                GhostRed911
                            </span>

                            {/* Bouncing Dot */}
                            <motion.div
                                animate={{
                                    y: isScrolled ? [0, -5, 0] : 0,
                                    scale: isScrolled ? 0.8 : 1
                                }}
                                transition={{
                                    y: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
                                    scale: { duration: 0.3 }
                                }}
                                className="w-2 h-2 rounded-full bg-primary mt-2"
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-semibold hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            Let's Talk
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
                        >
                            <div className="flex flex-col p-6 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    href="#contact"
                                    className="inline-block text-center w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-lg font-medium hover:opacity-90 transition-opacity font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Let's Talk
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}
