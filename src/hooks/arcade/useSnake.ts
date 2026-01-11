"use client";

import { useState, useCallback, useEffect, useRef } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const INITIAL_SPEED = 150;

export function useSnake(isActive: boolean = false) {
    const [isStarted, setIsStarted] = useState(false);
    const [snake, setSnake] = useState<Point[]>([{ x: 5, y: 10 }]);
    const [food, setFood] = useState<Point>({ x: 5, y: 5 });
    const [direction, setDirection] = useState<Direction>('UP'); // Start moving UP to avoid wall hit immediately
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);

    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const lastDirection = useRef<Direction>('UP');

    const generateFood = useCallback((currentSnake: Point[]) => {
        let newFood: Point;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_WIDTH),
                y: Math.floor(Math.random() * GRID_HEIGHT)
            };
            if (!currentSnake.some(p => p.x === newFood.x && p.y === newFood.y)) break;
        }
        return newFood;
    }, []);

    const startGame = useCallback(() => {
        setSnake([{ x: 5, y: 10 }]);
        setFood({ x: 5, y: 5 });
        setDirection('UP');
        lastDirection.current = 'UP';
        setIsGameOver(false);
        setIsPaused(false);
        setScore(0);
        setIsStarted(true);
    }, []);

    const move = useCallback(() => {
        setSnake(prev => {
            const head = prev[0];
            const newHead = { ...head };

            switch (direction) {
                case 'UP': newHead.y -= 1; break;
                case 'DOWN': newHead.y += 1; break;
                case 'LEFT': newHead.x -= 1; break;
                case 'RIGHT': newHead.x += 1; break;
            }

            // Check collision with walls
            if (newHead.x < 0 || newHead.x >= GRID_WIDTH || newHead.y < 0 || newHead.y >= GRID_HEIGHT) {
                setIsGameOver(true);
                return prev;
            }

            // Check collision with self
            if (prev.some(p => p.x === newHead.x && p.y === newHead.y)) {
                setIsGameOver(true);
                return prev;
            }

            const newSnake = [newHead, ...prev];

            // Check if food eaten
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 10);
                setFood(generateFood(newSnake));
            } else {
                newSnake.pop();
            }

            lastDirection.current = direction;
            return newSnake;
        });
    }, [direction, food, generateFood]);

    useEffect(() => {
        if (!isActive || isGameOver || isPaused) {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            return;
        }

        const speed = Math.max(50, INITIAL_SPEED - Math.floor(score / 50) * 10);
        gameLoopRef.current = setInterval(move, speed);

        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [isActive, isGameOver, isPaused, move, score]);

    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (lastDirection.current !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (lastDirection.current !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (lastDirection.current !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (lastDirection.current !== 'LEFT') setDirection('RIGHT');
                    break;
                case 'p':
                case 'P':
                    setIsPaused(p => !p);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive]);

    // Swipe controls for mobile
    const setSwipedDirection = useCallback((dir: Direction) => {
        if (dir === 'UP' && lastDirection.current !== 'DOWN') setDirection('UP');
        if (dir === 'DOWN' && lastDirection.current !== 'UP') setDirection('DOWN');
        if (dir === 'LEFT' && lastDirection.current !== 'RIGHT') setDirection('LEFT');
        if (dir === 'RIGHT' && lastDirection.current !== 'LEFT') setDirection('RIGHT');
    }, []);

    // Create display board
    const board = Array.from({ length: GRID_HEIGHT }, (_, y) =>
        Array.from({ length: GRID_WIDTH }, (_, x) => {
            const isSnake = snake.some(p => p.x === x && p.y === y);
            const isFood = food.x === x && food.y === y;
            if (isSnake) return '#22c55e'; // Emerald-500
            if (isFood) return '#ef4444'; // Red-500
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
        setDirection: setSwipedDirection,
        controlsHint: "Arrow Keys to Move | P to Pause"
    };
}
