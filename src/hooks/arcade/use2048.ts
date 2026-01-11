"use client";

import { useState, useCallback, useEffect } from 'react';

const GRID_SIZE = 4;

export function use2048(isActive: boolean = false) {
    const [isStarted, setIsStarted] = useState(false);
    const [board, setBoard] = useState<(number | null)[][]>(
        Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
    );
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    const addRandomTile = useCallback((currentBoard: (number | null)[][]) => {
        const emptyCells = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                if (currentBoard[y][x] === null) emptyCells.push({ x, y });
            }
        }
        if (emptyCells.length === 0) return currentBoard;
        const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newBoard = currentBoard.map(row => [...row]);
        newBoard[y][x] = Math.random() < 0.9 ? 2 : 4;
        return newBoard;
    }, []);

    const startGame = useCallback(() => {
        let newBoard = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
        newBoard = addRandomTile(newBoard);
        newBoard = addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setIsGameOver(false);
        setIsStarted(true);
    }, [addRandomTile]);

    const move = useCallback((direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
        setBoard(prev => {
            if (isGameOver || !isStarted) return prev;

            const movedBoard = prev.map(row => [...row]);
            let rotated = movedBoard;
            let moved = false;
            let currentScore = score;

            const rotateRight = (b: (number | null)[][]) => {
                const newB = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
                for (let y = 0; y < GRID_SIZE; y++) {
                    for (let x = 0; x < GRID_SIZE; x++) {
                        newB[x][GRID_SIZE - 1 - y] = b[y][x];
                    }
                }
                return newB as (number | null)[][];
            };

            // Rotate board so we always move LEFT
            let rotations = 0;
            if (direction === 'UP') rotations = 3; // Rotate 270 deg (3 right) -> Up becomes Left
            else if (direction === 'RIGHT') rotations = 2; // Rotate 180 deg (2 right) -> Right becomes Left
            else if (direction === 'DOWN') rotations = 1; // Rotate 90 deg (1 right) -> Down becomes Left

            for (let i = 0; i < rotations; i++) rotated = rotateRight(rotated);

            // Process move LEFT
            const nextBoardTemp = rotated.map(row => {
                // Filter out nulls
                const newRow: (number | null)[] = row.filter(val => val !== null) as number[];

                // Merge
                for (let i = 0; i < newRow.length - 1; i++) {
                    // Check non-null before accessing
                    if (newRow[i] !== null && newRow[i] === newRow[i + 1]) {
                        newRow[i] = (newRow[i] as number) * 2;
                        currentScore += newRow[i] as number;
                        newRow.splice(i + 1, 1);
                        newRow.push(null);
                    }
                }

                // Fill remaining with null
                while (newRow.length < GRID_SIZE) newRow.push(null);

                if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
                return newRow;
            });

            // Rotate back
            let finalBoard = nextBoardTemp;
            const reverseRotations = (4 - rotations) % 4;
            for (let i = 0; i < reverseRotations; i++) finalBoard = rotateRight(finalBoard);

            if (moved) {
                setScore(currentScore);
                return addRandomTile(finalBoard);
            }
            return prev;
        });
    }, [addRandomTile, score, isGameOver, isStarted]);

    useEffect(() => {
        if (!isActive || isGameOver) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') move('UP');
            if (e.key === 'ArrowDown') move('DOWN');
            if (e.key === 'ArrowLeft') move('LEFT');
            if (e.key === 'ArrowRight') move('RIGHT');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [move, isGameOver, isActive]);

    const displayBoard = Array.from({ length: 20 }, (_, y) =>
        Array.from({ length: 10 }, (_, x) => {
            // Map 4x4 to center of 10x20
            if (x >= 3 && x <= 6 && y >= 8 && y <= 11) {
                const val = board[y - 8][x - 3];
                if (val === null) return null;
                // Colors for 2048 tiles
                if (val === 2) return '#eee4da';
                if (val === 4) return '#ede0c8';
                if (val === 8) return '#f2b179';
                if (val === 16) return '#f59563';
                if (val === 32) return '#f67c5f';
                if (val === 64) return '#f65e3b';
                return '#edcf72';
            }
            return null;
        })
    );

    return {
        board: displayBoard,
        score,
        isGameOver,
        isStarted,
        isPaused: false,
        startGame,
        togglePause: () => { },
        onDirection: move,
        controlsHint: "Arrow Keys to Merge"
    };
}
