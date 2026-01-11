"use client";

import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { useState, useRef } from "react";

interface BrowserWindowProps {
    children: React.ReactNode;
    url?: string;
    className?: string;
}

export function BrowserWindow({ children, url = "https://github.com", className }: BrowserWindowProps) {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [shineX, setShineX] = useState(50);
    const [shineY, setShineY] = useState(50);
    const [isHovering, setIsHovering] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -10;
        const rotateYValue = ((x - centerX) / centerX) * 10;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);

        // Calculate shine position as percentage
        const shineXValue = (x / rect.width) * 100;
        const shineYValue = (y / rect.height) * 100;

        setShineX(shineXValue);
        setShineY(shineYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovering(false);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transformStyle: 'preserve-3d',
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovering ? 'scale(1.02)' : 'scale(1)'}`,
                transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
            }}
            className={cn("rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md flex flex-col h-full relative", className)}
        >
            {/* Title Bar */}
            <div className="h-10 bg-muted/50 border-b border-border flex items-center px-4 space-x-4">
                {/* Traffic Lights */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* URL Bar */}
                <div className="flex-1 max-w-md mx-auto h-6 bg-background/50 rounded-md border border-border flex items-center px-3 text-xs text-muted-foreground truncate font-mono">
                    {url}
                </div>
            </div>

            {/* Content */}
            <div className="p-0 flex-1 relative flex flex-col">
                {children}
            </div>

            {/* Shine overlay */}
            {isHovering && (
                <div
                    className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden z-10"
                    style={{
                        background: `radial-gradient(circle 300px at ${shineX}% ${shineY}%, rgba(255,255,255,0.12), transparent 80%)`,
                        filter: 'blur(20px)',
                    }}
                />
            )}
        </div>
    );
}
