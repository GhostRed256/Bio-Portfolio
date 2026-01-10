"use client";

import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";

interface BrowserWindowProps {
    children: React.ReactNode;
    url?: string;
    className?: string;
}

export function BrowserWindow({ children, url = "https://github.com", className }: BrowserWindowProps) {
    return (
        <div className={cn("rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full", className)}>
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
        </div>
    );
}
