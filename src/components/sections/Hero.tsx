"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function Hero() {
    return (
        <section id="home" className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
            {/* Background Gradient Spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="z-10"
            >
                <h2 className="text-xl md:text-2xl font-medium tracking-tight text-muted-foreground mb-4">
                    Hello, I'm Ritesh Dey.
                </h2>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                    Artist & <br /> Developer.
                </h1>
                <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                    Building digital experiences that blend aesthetic beauty with robust engineering.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="#code"
                        className="px-8 py-3 rounded-full bg-foreground text-background font-medium hover:scale-105 transition-transform"
                    >
                        View Projects
                    </Link>
                    <Link
                        href="#art"
                        className="px-8 py-3 rounded-full border border-border bg-background text-foreground font-medium hover:bg-muted transition-colors"
                    >
                        See Artworks
                    </Link>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <ArrowDown className="text-muted-foreground animate-bounce" />
            </motion.div>
        </section>
    );
}
