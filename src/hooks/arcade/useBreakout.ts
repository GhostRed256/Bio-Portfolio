"use client";

import { useState, useCallback, useEffect } from 'react';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

export function useBreakout(isActive: boolean = false) {
    const [isStarted, setIsStarted] = useState(false);
    const [paddle, setPaddle] = useState(4);
    const [ball, setBall] = useState({ x: 5, y: 15, dx: 1, dy: -1 });
    const [bricks, setBricks] = useState<{ x: number, y: number }[]>([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const startGame = useCallback(() => {
        setPaddle(4);
        setBall({ x: 5, y: 15, dx: 1, dy: -1 });
        const initialBricks = [];
        for (let y = 2; y < 7; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                initialBricks.push({ x, y });
            }
        }
        setBricks(initialBricks);
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

            // Wall bounce
            if (nextX <= 0 || nextX >= GRID_WIDTH - 1) nextDx *= -1;
            if (nextY <= 0) nextDy *= -1;

            // Paddle bounce
            if (nextY === 18 && nextX >= paddle && nextX <= paddle + 2) {
                nextDy *= -1;
                // Add some angle variation based on where it hit the paddle
                nextDx = nextX === paddle ? -1 : nextX === paddle + 2 ? 1 : nextDx;
            }

            // Brick bounce
            const hitBrickIdx = bricks.findIndex(b => b.x === Math.round(nextX) && b.y === Math.round(nextY));
            if (hitBrickIdx !== -1) {
                setBricks(curr => curr.filter((_, i) => i !== hitBrickIdx));
                setScore(s => s + 50);
                nextDy *= -1;
            }

            // Game over
            if (nextY >= GRID_HEIGHT) {
                setIsGameOver(true);
                return prev;
            }

            return { x: nextX, y: nextY, dx: nextDx, dy: nextDy };
        });
    }, [paddle, bricks]);

    useEffect(() => {
        if (!isActive || isGameOver || isPaused || bricks.length === 0) return;
        const loop = setInterval(move, 100);
        return () => clearInterval(loop);
    }, [isGameOver, isPaused, move, isActive, bricks.length]);

    const board = Array.from({ length: GRID_HEIGHT }, (_, y) =>
        Array.from({ length: GRID_WIDTH }, (_, x) => {
            if (bricks.some(b => b.x === x && b.y === y)) return '#facc15'; // Yellow-400
            if (Math.round(ball.x) === x && Math.round(ball.y) === y) return '#ffffff';
            if (y === 18 && x >= paddle && x <= paddle + 2) return '#3b82f6';
            return null;
        })
    );

    return {
        board,
        score,
        isGameOver: isGameOver || (bricks.length === 0 && score > 0),
        isPaused,
        isStarted,
        startGame,
        togglePause: () => setIsPaused(p => !p),
        moveLeft: () => setPaddle(p => Math.max(0, p - 1)),
        moveRight: () => setPaddle(p => Math.min(GRID_WIDTH - 3, p + 1)),
        controlsHint: "← → Move Paddle"
    };
}
