"use client";

import { ArcadeContainer } from "@/components/arcade/ArcadeContainer";

export default function ArcadePage() {
    return (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            <ArcadeContainer isOpen={true} onClose={() => { }} />
        </div>
    );
}
