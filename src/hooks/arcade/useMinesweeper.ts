"use client";

import { useState, useCallback, useEffect } from 'react';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const MINES_COUNT = 25;

type Cell = { isMine: boolean, isRevealed: boolean, isFlagged: boolean, neighborCount: number };

export function useMinesweeper(isActive: boolean = false) {
    const [isStarted, setIsStarted] = useState(false);
    const [board, setBoard] = useState<Cell[][]>([]);
    const [cursor, setCursor] = useState({ x: 5, y: 10 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const startGame = useCallback(() => {
        const newBoard: Cell[][] = Array.from({ length: GRID_HEIGHT }, () =>
            Array.from({ length: GRID_WIDTH }, () => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborCount: 0
            }))
        );

        // Place mines
        let placedMines = 0;
        while (placedMines < MINES_COUNT) {
            const x = Math.floor(Math.random() * GRID_WIDTH);
            const y = Math.floor(Math.random() * GRID_HEIGHT);
            if (!newBoard[y][x].isMine) {
                newBoard[y][x].isMine = true;
                placedMines++;
            }
        }

        // Calculate neighbors
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                if (newBoard[y][x].isMine) continue;
                let count = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const ny = y + dy, nx = x + dx;
                        if (ny >= 0 && ny < GRID_HEIGHT && nx >= 0 && nx < GRID_WIDTH && newBoard[ny][nx].isMine) {
                            count++;
                        }
                    }
                }
                newBoard[y][x].neighborCount = count;
            }
        }

        setBoard(newBoard);
        setIsGameOver(false);
        setScore(0);
        setCursor({ x: 5, y: 10 });
        setIsStarted(true);
    }, []);

    const reveal = useCallback((x: number, y: number) => {
        if (isGameOver || board[y][x].isRevealed || board[y][x].isFlagged || !isActive) return;

        const newBoard = board.map(row => row.map(cell => ({ ...cell })));

        const revealRecursive = (rx: number, ry: number) => {
            if (rx < 0 || rx >= GRID_WIDTH || ry < 0 || ry >= GRID_HEIGHT || newBoard[ry][rx].isRevealed) return;
            newBoard[ry][rx].isRevealed = true;
            if (newBoard[ry][rx].neighborCount === 0 && !newBoard[ry][rx].isMine) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        revealRecursive(rx + dx, ry + dy);
                    }
                }
            }
        };

        if (newBoard[y][x].isMine) {
            setIsGameOver(true);
            newBoard.forEach(row => row.forEach(c => { if (c.isMine) c.isRevealed = true; }));
        } else {
            revealRecursive(x, y);
            const revealedCount = newBoard.flat().filter(c => c.isRevealed).length;
            setScore(revealedCount * 10);
        }
        setBoard(newBoard);
    }, [board, isGameOver, isActive]);

    useEffect(() => {
        if (!isActive || isGameOver) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') setCursor(c => ({ ...c, y: Math.max(0, c.y - 1) }));
            if (e.key === 'ArrowDown') setCursor(c => ({ ...c, y: Math.min(GRID_HEIGHT - 1, c.y + 1) }));
            if (e.key === 'ArrowLeft') setCursor(c => ({ ...c, x: Math.max(0, c.x - 1) }));
            if (e.key === 'ArrowRight') setCursor(c => ({ ...c, x: Math.min(GRID_WIDTH - 1, c.x + 1) }));
            if (e.key === ' ') reveal(cursor.x, cursor.y);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, isGameOver, cursor, reveal]);

    const displayBoard = Array.from({ length: GRID_HEIGHT }, (_, y) =>
        Array.from({ length: GRID_WIDTH }, (_, x) => {
            if (x === cursor.x && y === cursor.y && !isGameOver) return '#ffffff';
            const cell = board[y]?.[x];
            if (!cell) return null;
            if (!cell.isRevealed) return cell.isFlagged ? '#ef4444' : '#334155';
            if (cell.isMine) return '#ef4444';
            return cell.neighborCount > 0 ? '#3b82f6' : '#1e293b';
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
        moveLeft: () => setCursor(c => ({ ...c, x: Math.max(0, c.x - 1) })),
        moveRight: () => setCursor(c => ({ ...c, x: Math.min(GRID_WIDTH - 1, c.x + 1) })),
        moveDown: () => setCursor(c => ({ ...c, y: Math.min(GRID_HEIGHT - 1, c.y + 1) })),
        rotate: () => setCursor(c => ({ ...c, y: Math.max(0, c.y - 1) })),
        onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
            if (dir === 'UP') setCursor(c => ({ ...c, y: Math.max(0, c.y - 1) }));
            if (dir === 'DOWN') setCursor(c => ({ ...c, y: Math.min(GRID_HEIGHT - 1, c.y + 1) }));
            if (dir === 'LEFT') setCursor(c => ({ ...c, x: Math.max(0, c.x - 1) }));
            if (dir === 'RIGHT') setCursor(c => ({ ...c, x: Math.min(GRID_WIDTH - 1, c.x + 1) }));
            if (dir === 'FIRE') reveal(cursor.x, cursor.y);
        },
        controlsHint: "Arrows to Move | Space to Reveal"
    };
}
