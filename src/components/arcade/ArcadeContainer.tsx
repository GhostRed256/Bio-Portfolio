"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { useArcade } from "@/hooks/arcade/useArcade";
import { useTetris } from "@/hooks/arcade/useTetris";
import { useSnake } from "@/hooks/arcade/useSnake";
import { useSpaceImpact } from "@/hooks/arcade/useSpaceImpact";
import { useBreakout } from "@/hooks/arcade/useBreakout";
import { usePong } from "@/hooks/arcade/usePong";
import { useFlappyBird } from "@/hooks/arcade/useFlappyBird";
import { use2048 } from "@/hooks/arcade/use2048";
import { useMinesweeper } from "@/hooks/arcade/useMinesweeper";
import { useMemoryMatch } from "@/hooks/arcade/useMemoryMatch";
import { useDinoRun } from "@/hooks/arcade/useDinoRun";

interface ArcadeContainerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ArcadeContainer({ isOpen, onClose }: ArcadeContainerProps) {
    const {
        activeGame,
        nextGame,
        prevGame,
        isFullscreen,
        toggleFullscreen
    } = useArcade();

    // Game-specific logic hooks
    const tetris = useTetris(activeGame.id === 'tetris' && isOpen);
    const snake = useSnake(activeGame.id === 'snake' && isOpen);
    const space = useSpaceImpact(activeGame.id === 'space-impact' && isOpen);
    const breakout = useBreakout(activeGame.id === 'breakout' && isOpen);
    const pong = usePong(activeGame.id === 'pong' && isOpen);
    const flappy = useFlappyBird(activeGame.id === 'flappy' && isOpen);
    const g2048 = use2048(activeGame.id === '2048' && isOpen);
    const mines = useMinesweeper(activeGame.id === 'minesweeper' && isOpen);
    const memory = useMemoryMatch(activeGame.id === 'memory' && isOpen);
    const dino = useDinoRun(activeGame.id === 'dino' && isOpen);

    // Current game state mapper
    const getGameControls = () => {
        switch (activeGame.id) {
            case 'tetris':
                return {
                    board: tetris.board,
                    score: tetris.score,
                    isGameOver: tetris.isGameOver,
                    isPaused: tetris.isPaused,
                    isInitialized: tetris.isStarted,
                    startGame: tetris.startGame,
                    togglePause: tetris.togglePause,
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        if (dir === 'UP') tetris.rotate();
                        if (dir === 'LEFT') tetris.moveLeft();
                        if (dir === 'RIGHT') tetris.moveRight();
                        if (dir === 'DOWN') tetris.moveDown();
                        if (dir === 'FIRE') tetris.hardDrop();
                    },
                    controlsHint: "← → Move | ↑ Rotate | ↓ Down | Space Drop"
                };
            case 'snake':
                return {
                    board: snake.board,
                    score: snake.score,
                    isGameOver: snake.isGameOver,
                    isPaused: snake.isPaused,
                    isInitialized: snake.isStarted,
                    startGame: snake.startGame,
                    togglePause: snake.togglePause,
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        if (dir !== 'FIRE') snake.setDirection(dir);
                    },
                    controlsHint: "Arrow Keys to Move"
                };
            case 'space-impact':
                return {
                    board: space.board,
                    score: space.score,
                    isGameOver: space.isGameOver,
                    isPaused: space.isPaused,
                    isInitialized: space.isStarted,
                    startGame: space.startGame,
                    togglePause: space.togglePause,
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        if (dir === 'LEFT') space.moveLeft();
                        if (dir === 'RIGHT') space.moveRight();
                        if (dir === 'FIRE') space.fire();
                    },
                    controlsHint: "← → Move | Space Fire"
                };
            case 'breakout':
                return {
                    board: breakout.board,
                    score: breakout.score,
                    isGameOver: breakout.isGameOver,
                    isPaused: breakout.isPaused,
                    isInitialized: breakout.isStarted,
                    startGame: breakout.startGame,
                    togglePause: breakout.togglePause,
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        if (dir === 'LEFT') breakout.moveLeft();
                        if (dir === 'RIGHT') breakout.moveRight();
                    },
                    controlsHint: "← → Move Paddle"
                };
            case 'pong':
                return {
                    board: pong.board,
                    score: pong.score,
                    isGameOver: pong.isGameOver,
                    isPaused: pong.isPaused,
                    isInitialized: pong.isStarted,
                    startGame: pong.startGame,
                    togglePause: pong.togglePause,
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        if (dir === 'LEFT') pong.moveLeft();
                        if (dir === 'RIGHT') pong.moveRight();
                    },
                    controlsHint: "← → Move Paddle"
                };
            case 'flappy':
                return {
                    board: flappy.board,
                    score: flappy.score,
                    isGameOver: flappy.isGameOver,
                    isPaused: flappy.isPaused,
                    isInitialized: flappy.isStarted,
                    startGame: flappy.startGame,
                    togglePause: flappy.togglePause,
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        if (dir === 'FIRE' || dir === 'UP') flappy.jump();
                    },
                    controlsHint: "Space to Jump"
                };
            case '2048':
                return {
                    board: g2048.board,
                    score: g2048.score,
                    isGameOver: g2048.isGameOver,
                    isPaused: false,
                    isInitialized: g2048.isStarted,
                    startGame: g2048.startGame,
                    togglePause: () => { },
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        if (dir !== 'FIRE') g2048.onDirection(dir);
                    },
                    controlsHint: "Arrow Keys to Merge"
                };
            case 'minesweeper':
                return {
                    board: mines.board,
                    score: mines.score,
                    isGameOver: mines.isGameOver,
                    isPaused: false,
                    isInitialized: mines.isStarted,
                    startGame: mines.startGame,
                    togglePause: () => { },
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        mines.onDirection(dir);
                    },
                    controlsHint: "Arrows Move | Space Reveal"
                };
            case 'memory':
                return {
                    board: memory.board,
                    score: memory.score,
                    isGameOver: memory.isGameOver,
                    isPaused: false,
                    isInitialized: memory.isStarted,
                    startGame: memory.startGame,
                    togglePause: () => { },
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        memory.onDirection(dir);
                    },
                    controlsHint: "Arrows Move | Space Flip"
                };
            case 'dino':
                return {
                    board: dino.board,
                    score: dino.score,
                    isGameOver: dino.isGameOver,
                    isPaused: dino.isPaused,
                    isInitialized: dino.isStarted,
                    startGame: dino.startGame,
                    togglePause: dino.togglePause,
                    onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
                        if (dir === 'UP' || dir === 'FIRE') dino.jump();
                    },
                    controlsHint: "Space/Up to Jump"
                };
            default:
                return {
                    board: Array.from({ length: 20 }, () => Array(10).fill(null)),
                    score: 0,
                    isGameOver: false,
                    isPaused: false,
                    isInitialized: true,
                    startGame: () => { },
                    togglePause: () => { },
                    onDirection: () => { },
                    controlsHint: "Coming Soon..."
                };
        }
    };

    const game = getGameControls();

    // Global Keyboard Listener
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default scrolling for game keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }

            switch (e.key) {
                case 'ArrowUp':
                    game.onDirection('UP');
                    break;
                case 'ArrowDown':
                    game.onDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    game.onDirection('LEFT');
                    break;
                case 'ArrowRight':
                    game.onDirection('RIGHT');
                    break;
                case ' ':
                    game.onDirection('FIRE');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, game]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Portal mounting
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Use Portal to ensure fixed positioning works correctly
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm dark:bg-black/80"
                    />

                    {/* Main Container */}
                    <motion.div
                        key="arcade-modal"
                        initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: "-50%",
                            y: "-50%",
                            top: "50%",
                            left: "50%",
                            width: isFullscreen ? '100vw' : 'auto',
                            height: isFullscreen ? '100vh' : 'auto',
                            borderRadius: isFullscreen ? 0 : 24
                        }}
                        exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                        className="fixed z-[100] flex flex-col items-center justify-center outline-none"
                        style={{
                            maxWidth: isFullscreen ? 'none' : 'min(90vw, 400px)',
                            minWidth: isFullscreen ? 'none' : '300px',
                            maxHeight: isFullscreen ? 'none' : 'min(85vh, 650px)',
                        }}
                    >
                        {/* Floating Nav Buttons (Outside the Card) */}
                        {!isFullscreen && (
                            <>
                                <button
                                    onClick={prevGame}
                                    className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 dark:bg-white/10 hover:bg-background text-foreground/70 hover:text-foreground transition-all active:scale-90 hidden md:flex items-center justify-center backdrop-blur-md border border-border shadow-lg"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button
                                    onClick={nextGame}
                                    className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 dark:bg-white/10 hover:bg-background text-foreground/70 hover:text-foreground transition-all active:scale-90 hidden md:flex items-center justify-center backdrop-blur-md border border-border shadow-lg"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </>
                        )}

                        {/* Card Content (Overflow Hidden) - Glass Effect */}
                        <div className="w-full h-full glass border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden relative rounded-[inherit]">
                            {/* Header - Glass Effect */}
                            <div className="p-3 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-md shrink-0">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{activeGame.icon}</span>
                                    <div>
                                        <h3 className="text-white font-bold leading-none text-sm">{activeGame.title}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={toggleFullscreen}
                                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                                    >
                                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Game Display Wrapper */}
                            <div className="flex-1 flex flex-col items-center justify-center relative p-4 gap-4">

                                {/* Game Board */}
                                <div className="relative z-10">

                                    {/* Main Screen */}
                                    <div className="p-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border-4 border-slate-700 shadow-2xl">
                                        <div
                                            className="bg-slate-950 rounded-lg overflow-hidden relative transition-colors duration-300 shadow-inner border-2 border-slate-700"
                                            style={{
                                                width: 'min(70vw, 220px)',
                                                aspectRatio: '10 / 20',
                                            }}
                                        >
                                            <div className="grid grid-cols-10 grid-rows-20 h-full w-full gap-[1px] p-0.5 bg-slate-900">
                                                {game.board.flat().map((cell, i) => (
                                                    <div
                                                        key={i}
                                                        style={cell ? { backgroundColor: cell } : undefined}
                                                        className={`rounded-[1px] transition-colors duration-200 ${!cell ? 'bg-slate-800/50' : ''}`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Game Overlays */}
                                            {(game.isGameOver || game.isPaused || !game.isInitialized) && (
                                                <div className="absolute inset-0 z-10 bg-white/60 dark:bg-black/80 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                                    <h4 className="text-xl font-black text-foreground mb-3 italic tracking-tighter text-center">
                                                        {!game.isInitialized ? "READY" : game.isGameOver ? "GAME OVER" : "PAUSED"}
                                                    </h4>
                                                    <button
                                                        onClick={(!game.isInitialized || game.isGameOver) ? game.startGame : game.togglePause}
                                                        className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest"
                                                    >
                                                        {!game.isInitialized ? "START" : game.isGameOver ? "RETRY" : "JEU"}
                                                    </button>
                                                </div>
                                            )}

                                            {/* HUD */}
                                            <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 px-2 py-1 rounded text-[10px] font-mono text-foreground border border-border backdrop-blur-md shadow-sm">
                                                SCR: {game.score}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Controls Overlay - ALWAYS VISIBLE ON MOBILE */}
                                <div className="w-full flex flex-col gap-2 md:hidden mt-2 shrink-0">
                                    <div className="flex justify-between items-center px-4">
                                        <button
                                            onClick={prevGame}
                                            className="p-2 text-muted-foreground"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{activeGame.title}</span>
                                        <button
                                            onClick={nextGame}
                                            className="p-2 text-muted-foreground"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 px-6 pb-2">
                                        <div className="col-span-1 flex flex-col gap-2 items-center justify-center">
                                            <button
                                                className="w-12 h-12 bg-accent/50 rounded-full flex items-center justify-center active:bg-accent text-foreground"
                                                onPointerDown={() => game.onDirection('LEFT')}
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                        </div>
                                        <div className="col-span-1 flex flex-col gap-2 items-center">
                                            <button
                                                className="w-12 h-12 bg-accent/50 rounded-full flex items-center justify-center active:bg-accent text-foreground"
                                                onPointerDown={() => game.onDirection('UP')}
                                            >
                                                <ChevronLeft className="rotate-90" size={20} />
                                            </button>
                                            <button
                                                className="w-12 h-12 bg-accent/50 rounded-full flex items-center justify-center active:bg-accent text-foreground"
                                                onPointerDown={() => game.onDirection('DOWN')}
                                            >
                                                <ChevronLeft className="-rotate-90" size={20} />
                                            </button>
                                        </div>
                                        <div className="col-span-1 flex flex-col gap-2 items-center justify-center">
                                            <button
                                                className="w-12 h-12 bg-accent/50 rounded-full flex items-center justify-center active:bg-accent text-foreground"
                                                onPointerDown={() => game.onDirection('RIGHT')}
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex justify-center pb-2">
                                        <button
                                            className="w-16 h-16 bg-red-500/10 border-2 border-red-500 rounded-full flex items-center justify-center active:bg-red-500/20 text-[10px] font-bold text-red-500"
                                            onPointerDown={() => game.onDirection('FIRE')}
                                        >
                                            AB
                                        </button>
                                    </div>
                                </div>

                                {/* Desktop: Minimal Controls Hint */}
                                <div className="hidden md:flex flex-col items-center gap-2 text-center opacity-50 hover:opacity-100 transition-opacity">
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{game.controlsHint}</p>
                                    <div className="flex gap-2">
                                        <button onClick={game.togglePause} className="p-2 hover:bg-accent rounded text-foreground">
                                            {game.isPaused ? <Play size={16} /> : <Pause size={16} />}
                                        </button>
                                        <button onClick={game.startGame} className="p-2 hover:bg-accent rounded text-foreground">
                                            <RotateCcw size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
