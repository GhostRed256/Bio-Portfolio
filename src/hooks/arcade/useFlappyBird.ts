"use client";

import { useState, useCallback, useEffect } from 'react';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

export function useFlappyBird(isActive: boolean = false) {
    const [isStarted, setIsStarted] = useState(false);
    const [birdY, setBirdY] = useState(10);
    const [pipes, setPipes] = useState<{ x: number, gapY: number }[]>([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);



    const startGame = useCallback(() => {
        setBirdY(10);
        setPipes([{ x: 10, gapY: 8 }]);
        setScore(0);
        setIsGameOver(false);
        setIsPaused(false);
        setIsStarted(true);
    }, []);

    const jump = useCallback(() => {
        if (!isGameOver && !isPaused) setBirdY(y => Math.max(0, y - 2));
    }, [isGameOver, isPaused]);

    const move = useCallback(() => {
        setBirdY(y => {
            const nextY = y + 1;
            if (nextY >= GRID_HEIGHT) setIsGameOver(true);
            return nextY;
        });

        setPipes(prev => {
            const nextPipes = prev.map(p => ({ ...p, x: p.x - 1 }));

            // Remove off-screen pipes
            const filtered = nextPipes.filter(p => p.x >= 0);

            // Add new pipes
            if (filtered.length === 0 || filtered[filtered.length - 1].x < 5) {
                filtered.push({ x: 9, gapY: Math.floor(Math.random() * 8) + 4 });
            }

            // Collision check
            const birdX = 2;
            const collidingPipe = filtered.find(p => p.x === birdX);
            if (collidingPipe) {
                if (birdY < collidingPipe.gapY || birdY > collidingPipe.gapY + 3) {
                    setIsGameOver(true);
                } else {
                    setScore(s => s + 1);
                }
            }

            return filtered;
        });
    }, [birdY]);

    useEffect(() => {
        if (!isActive || isGameOver || isPaused) return;
        const loop = setInterval(move, 200);
        return () => clearInterval(loop);
    }, [isGameOver, isPaused, move, isActive]);

    const board = Array.from({ length: GRID_HEIGHT }, (_, y) =>
        Array.from({ length: GRID_WIDTH }, (_, x) => {
            if (x === 2 && Math.round(birdY) === y) return '#facc15';
            const pipe = pipes.find(p => p.x === x);
            if (pipe && (y < pipe.gapY || y > pipe.gapY + 3)) return '#22c55e';
            return null;
        })
    );

    return {
        board,
        score,
        isGameOver,
        isPaused,
        isStarted,
        startGame,
        togglePause: () => setIsPaused(p => !p),
        jump,
        controlsHint: "Space to Jump"
    };
}
