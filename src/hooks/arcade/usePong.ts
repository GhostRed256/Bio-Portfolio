"use client";

import { useState, useCallback, useEffect } from 'react';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

export function usePong(isActive: boolean = false) {
    const [isStarted, setIsStarted] = useState(false);
    const [player, setPlayer] = useState(4);
    const [cpu, setCpu] = useState(4);
    const [ball, setBall] = useState({ x: 5, y: 10, dx: 1, dy: 1 });
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const startGame = useCallback(() => {
        setPlayer(4);
        setCpu(4);
        setBall({ x: 5, y: 10, dx: 1, dy: 1 });
        setScore(0);
        setIsGameOver(false);
        setIsPaused(false);
        setIsStarted(true);
    }, []);

    const move = useCallback(() => {
        setBall(prev => {
            const nextX = prev.x + prev.dx;
            const nextY = prev.y + prev.dy;
            let nextDx = prev.dx;
            let nextDy = prev.dy;

            // X Wall bounce
            if (nextX <= 0 || nextX >= GRID_WIDTH - 1) nextDx *= -1;

            // Player paddle bounce (Bottom)
            if (nextY === 18 && nextX >= player && nextX <= player + 2) {
                nextDy *= -1;
            }

            // CPU paddle bounce (Top)
            if (nextY === 1 && nextX >= cpu && nextX <= cpu + 2) {
                nextDy *= -1;
            }

            // Scoring
            if (nextY <= 0) {
                setScore(s => s + 1);
                return { x: 5, y: 10, dx: 1, dy: 1 };
            }

            if (nextY >= GRID_HEIGHT - 1) {
                setIsGameOver(true);
                return prev;
            }

            // CPU AI
            setCpu(curr => {
                if (nextX > curr + 1 && Math.random() < 0.3) return Math.min(GRID_WIDTH - 3, curr + 1);
                if (nextX < curr + 1 && Math.random() < 0.3) return Math.max(0, curr - 1);
                return curr;
            });

            return { x: nextX, y: nextY, dx: nextDx, dy: nextDy };
        });
    }, [player, cpu]);

    useEffect(() => {
        if (!isActive || isGameOver || isPaused) return;
        const loop = setInterval(move, 120);
        return () => clearInterval(loop);
    }, [isGameOver, isPaused, move, isActive]);

    const board = Array.from({ length: GRID_HEIGHT }, (_, y) =>
        Array.from({ length: GRID_WIDTH }, (_, x) => {
            if (Math.round(ball.x) === x && Math.round(ball.y) === y) return '#ffffff';
            if (y === 18 && x >= player && x <= player + 2) return '#3b82f6';
            if (y === 1 && x >= cpu && x <= cpu + 2) return '#ef4444';
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
        moveLeft: () => setPlayer(p => Math.max(0, p - 1)),
        moveRight: () => setPlayer(p => Math.min(GRID_WIDTH - 3, p + 1)),
        controlsHint: "← → Move Paddle"
    };
}
