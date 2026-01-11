"use client";

import { useState, useCallback, useEffect } from 'react';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

export function useDinoRun(isActive: boolean = false) {
    const [isStarted, setIsStarted] = useState(false);
    const [dinoY, setDinoY] = useState(18);
    const [obstacles, setObstacles] = useState<{ x: number, type: 'CACTUS' | 'BIRD' }[]>([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isJumping, setIsJumping] = useState(false);

    const jump = useCallback(() => {
        if (!isActive || isGameOver || isPaused || isJumping) return;
        setIsJumping(true);
        let frames = 0;
        const jumpInterval = setInterval(() => {
            frames++;
            if (frames <= 5) setDinoY(y => y - 1);
            else if (frames > 7 && frames <= 12) setDinoY(y => y + 1);
            else if (frames > 12) {
                clearInterval(jumpInterval);
                setIsJumping(false);
                setDinoY(18);
            }
        }, 50);
    }, [isGameOver, isPaused, isJumping, isActive]);

    const move = useCallback(() => {
        if (!isActive) return;
        setObstacles(prev => {
            const next = prev.map(o => ({ ...o, x: o.x - 1 })).filter(o => o.x >= 0);
            if (next.length === 0 || next[next.length - 1].x < 5) {
                if (Math.random() < 0.3) {
                    next.push({ x: 9, type: Math.random() < 0.8 ? 'CACTUS' : 'BIRD' });
                }
            }

            // Collision check
            const dinoX = 2;
            const collision = next.find(o => o.x === dinoX && (o.type === 'CACTUS' ? dinoY >= 17 : dinoY <= 16));
            if (collision) setIsGameOver(true);

            return next;
        });
        setScore(s => s + 1);
    }, [dinoY, isActive]);

    useEffect(() => {
        if (!isActive || isGameOver || isPaused) return;
        const loop = setInterval(move, 200);
        return () => clearInterval(loop);
    }, [isGameOver, isPaused, move, isActive]);

    useEffect(() => {
        if (!isActive) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === ' ') {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, jump]);

    const board = Array.from({ length: GRID_HEIGHT }, (_, y) =>
        Array.from({ length: GRID_WIDTH }, (_, x) => {
            if (x === 2 && y === dinoY) return '#3b82f6';
            const obstacle = obstacles.find(o => o.x === x);
            if (obstacle) {
                if (obstacle.type === 'CACTUS' && y >= 17) return '#22c55e';
                if (obstacle.type === 'BIRD' && y === 15) return '#ef4444';
            }
            if (y === 19) return '#475569';
            return null;
        })
    );

    return {
        board,
        score,
        isGameOver,
        isPaused,
        isStarted,
        startGame: () => {
            setDinoY(18);
            setObstacles([]);
            setScore(0);
            setIsGameOver(false);
            setIsPaused(false);
            setIsStarted(true);
        },
        togglePause: () => setIsPaused(p => !p),
        jump,
        controlsHint: "Space/Up to Jump"
    };
}
