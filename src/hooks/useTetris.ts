"use client";

import { useState, useCallback, useEffect, useRef } from 'react';

// Tetromino shapes
const TETROMINOES = {
    I: {
        shape: [[1, 1, 1, 1]],
        color: '#00CED1'
    },
    O: {
        shape: [[1, 1], [1, 1]],
        color: '#FFD700'
    },
    T: {
        shape: [[0, 1, 0], [1, 1, 1]],
        color: '#9B59B6'
    },
    S: {
        shape: [[0, 1, 1], [1, 1, 0]],
        color: '#2ECC71'
    },
    Z: {
        shape: [[1, 1, 0], [0, 1, 1]],
        color: '#E74C3C'
    },
    J: {
        shape: [[1, 0, 0], [1, 1, 1]],
        color: '#3498DB'
    },
    L: {
        shape: [[0, 0, 1], [1, 1, 1]],
        color: '#F39C12'
    }
};

type TetrominoType = keyof typeof TETROMINOES;

interface Piece {
    type: TetrominoType;
    shape: number[][];
    color: string;
    x: number;
    y: number;
}

interface GameState {
    board: (string | null)[][];
    currentPiece: Piece | null;
    nextPiece: TetrominoType;
    score: number;
    lines: number;
    level: number;
    isGameOver: boolean;
    isPaused: boolean;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

function createEmptyBoard(): (string | null)[][] {
    return Array.from({ length: BOARD_HEIGHT }, () =>
        Array(BOARD_WIDTH).fill(null)
    );
}

function getRandomTetromino(): TetrominoType {
    const types = Object.keys(TETROMINOES) as TetrominoType[];
    return types[Math.floor(Math.random() * types.length)];
}

function createPiece(type: TetrominoType): Piece {
    const { shape, color } = TETROMINOES[type];
    return {
        type,
        shape: shape.map(row => [...row]),
        color,
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2),
        y: 0
    };
}

function rotatePiece(piece: Piece): Piece {
    const newShape = piece.shape[0].map((_, i) =>
        piece.shape.map(row => row[i]).reverse()
    );
    return { ...piece, shape: newShape };
}

function checkCollision(
    board: (string | null)[][],
    piece: Piece,
    offsetX = 0,
    offsetY = 0
): boolean {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const newX = piece.x + x + offsetX;
                const newY = piece.y + y + offsetY;

                if (
                    newX < 0 ||
                    newX >= BOARD_WIDTH ||
                    newY >= BOARD_HEIGHT ||
                    (newY >= 0 && board[newY][newX])
                ) {
                    return true;
                }
            }
        }
    }
    return false;
}

function mergePieceToBoard(
    board: (string | null)[][],
    piece: Piece
): (string | null)[][] {
    const newBoard = board.map(row => [...row]);

    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const boardY = piece.y + y;
                const boardX = piece.x + x;
                if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                    newBoard[boardY][boardX] = piece.color;
                }
            }
        }
    }

    return newBoard;
}

function clearLines(board: (string | null)[][]): { board: (string | null)[][]; linesCleared: number } {
    const newBoard = board.filter(row => row.some(cell => cell === null));
    const linesCleared = BOARD_HEIGHT - newBoard.length;

    while (newBoard.length < BOARD_HEIGHT) {
        newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }

    return { board: newBoard, linesCleared };
}

function calculateScore(linesCleared: number, level: number): number {
    const linePoints = [0, 100, 300, 500, 800];
    return linePoints[linesCleared] * (level + 1);
}

export function useTetris() {
    const [gameState, setGameState] = useState<GameState>({
        board: createEmptyBoard(),
        currentPiece: null,
        nextPiece: getRandomTetromino(),
        score: 0,
        lines: 0,
        level: 0,
        isGameOver: false,
        isPaused: false
    });

    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    const startGame = useCallback(() => {
        const firstPiece = createPiece(getRandomTetromino());
        setGameState({
            board: createEmptyBoard(),
            currentPiece: firstPiece,
            nextPiece: getRandomTetromino(),
            score: 0,
            lines: 0,
            level: 0,
            isGameOver: false,
            isPaused: false
        });
    }, []);

    const togglePause = useCallback(() => {
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
    }, []);

    const moveLeft = useCallback(() => {
        setGameState(prev => {
            if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
            if (checkCollision(prev.board, prev.currentPiece, -1, 0)) return prev;
            return {
                ...prev,
                currentPiece: { ...prev.currentPiece, x: prev.currentPiece.x - 1 }
            };
        });
    }, []);

    const moveRight = useCallback(() => {
        setGameState(prev => {
            if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
            if (checkCollision(prev.board, prev.currentPiece, 1, 0)) return prev;
            return {
                ...prev,
                currentPiece: { ...prev.currentPiece, x: prev.currentPiece.x + 1 }
            };
        });
    }, []);

    const rotate = useCallback(() => {
        setGameState(prev => {
            if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
            const rotated = rotatePiece(prev.currentPiece);

            // Wall kick - try to fit rotated piece
            for (const offsetX of [0, -1, 1, -2, 2]) {
                if (!checkCollision(prev.board, rotated, offsetX, 0)) {
                    return {
                        ...prev,
                        currentPiece: { ...rotated, x: rotated.x + offsetX }
                    };
                }
            }
            return prev;
        });
    }, []);

    const hardDrop = useCallback(() => {
        setGameState(prev => {
            if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

            let dropY = 0;
            while (!checkCollision(prev.board, prev.currentPiece, 0, dropY + 1)) {
                dropY++;
            }

            const droppedPiece = { ...prev.currentPiece, y: prev.currentPiece.y + dropY };
            const newBoard = mergePieceToBoard(prev.board, droppedPiece);
            const { board: clearedBoard, linesCleared } = clearLines(newBoard);

            const newLines = prev.lines + linesCleared;
            const newLevel = Math.floor(newLines / 10);
            const scoreGain = calculateScore(linesCleared, prev.level) + (dropY * 2);

            const nextPiece = createPiece(prev.nextPiece);
            const isGameOver = checkCollision(clearedBoard, nextPiece);

            return {
                ...prev,
                board: clearedBoard,
                currentPiece: isGameOver ? null : nextPiece,
                nextPiece: getRandomTetromino(),
                score: prev.score + scoreGain,
                lines: newLines,
                level: newLevel,
                isGameOver
            };
        });
    }, []);

    const moveDown = useCallback(() => {
        setGameState(prev => {
            if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

            if (checkCollision(prev.board, prev.currentPiece, 0, 1)) {
                // Merge piece and spawn new one
                const newBoard = mergePieceToBoard(prev.board, prev.currentPiece);
                const { board: clearedBoard, linesCleared } = clearLines(newBoard);

                const newLines = prev.lines + linesCleared;
                const newLevel = Math.floor(newLines / 10);
                const scoreGain = calculateScore(linesCleared, prev.level);

                const nextPiece = createPiece(prev.nextPiece);
                const isGameOver = checkCollision(clearedBoard, nextPiece);

                return {
                    ...prev,
                    board: clearedBoard,
                    currentPiece: isGameOver ? null : nextPiece,
                    nextPiece: getRandomTetromino(),
                    score: prev.score + scoreGain,
                    lines: newLines,
                    level: newLevel,
                    isGameOver
                };
            }

            return {
                ...prev,
                currentPiece: { ...prev.currentPiece, y: prev.currentPiece.y + 1 }
            };
        });
    }, []);

    // Game loop
    useEffect(() => {
        if (gameState.isGameOver || gameState.isPaused || !gameState.currentPiece) {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
                gameLoopRef.current = null;
            }
            return;
        }

        const speed = Math.max(100, 1000 - (gameState.level * 100));

        gameLoopRef.current = setInterval(moveDown, speed);

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [gameState.isGameOver, gameState.isPaused, gameState.currentPiece, gameState.level, moveDown]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState.isGameOver && e.key !== 'Enter') return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    moveLeft();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    moveRight();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    rotate();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    moveDown();
                    break;
                case ' ':
                    e.preventDefault();
                    hardDrop();
                    break;
                case 'p':
                case 'P':
                    e.preventDefault();
                    togglePause();
                    break;
                case 'Enter':
                    if (gameState.isGameOver || !gameState.currentPiece) {
                        e.preventDefault();
                        startGame();
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState.isGameOver, gameState.currentPiece, moveLeft, moveRight, rotate, moveDown, hardDrop, togglePause, startGame]);

    // Create display board (with current piece)
    const displayBoard = gameState.currentPiece
        ? mergePieceToBoard(gameState.board, gameState.currentPiece)
        : gameState.board;

    return {
        board: displayBoard,
        nextPiece: TETROMINOES[gameState.nextPiece],
        score: gameState.score,
        lines: gameState.lines,
        level: gameState.level,
        isGameOver: gameState.isGameOver,
        isPaused: gameState.isPaused,
        startGame,
        togglePause,
        moveLeft,
        moveRight,
        rotate,
        moveDown,
        hardDrop
    };
}
