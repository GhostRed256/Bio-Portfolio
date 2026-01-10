"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw } from "lucide-react";
import { useTetris } from "@/hooks/useTetris";

interface TetrisGameProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TetrisGame({ isOpen, onClose }: TetrisGameProps) {
    const {
        board,
        nextPiece,
        score,
        lines,
        level,
        isGameOver,
        isPaused,
        startGame,
        togglePause
    } = useTetris();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-6 shadow-2xl border border-white/10"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <X size={16} className="text-white" />
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            🎮 Tetris
                        </h2>

                        <div className="flex gap-6">
                            {/* Game Board */}
                            <div className="bg-slate-950 rounded-lg p-1 border border-white/20">
                                <div
                                    className="grid gap-[1px]"
                                    style={{
                                        gridTemplateColumns: `repeat(10, 1fr)`,
                                        width: 200,
                                        height: 400
                                    }}
                                >
                                    {board.flat().map((cell, i) => (
                                        <div
                                            key={i}
                                            className="w-[19px] h-[19px] rounded-sm transition-colors"
                                            style={{
                                                backgroundColor: cell || '#1e293b',
                                                boxShadow: cell ? `inset 0 0 3px rgba(255,255,255,0.3)` : 'none'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Side Panel */}
                            <div className="flex flex-col gap-4 w-32">
                                {/* Next Piece */}
                                <div className="bg-slate-950 rounded-lg p-3 border border-white/20">
                                    <p className="text-xs text-slate-400 mb-2">NEXT</p>
                                    <div className="flex justify-center">
                                        <div
                                            className="grid gap-[1px]"
                                            style={{
                                                gridTemplateColumns: `repeat(${nextPiece.shape[0]?.length || 4}, 16px)`
                                            }}
                                        >
                                            {nextPiece.shape.flat().map((cell, i) => (
                                                <div
                                                    key={i}
                                                    className="w-4 h-4 rounded-sm"
                                                    style={{
                                                        backgroundColor: cell ? nextPiece.color : 'transparent'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Score */}
                                <div className="bg-slate-950 rounded-lg p-3 border border-white/20">
                                    <p className="text-xs text-slate-400">SCORE</p>
                                    <p className="text-xl font-bold text-white">{score.toLocaleString()}</p>
                                </div>

                                {/* Lines */}
                                <div className="bg-slate-950 rounded-lg p-3 border border-white/20">
                                    <p className="text-xs text-slate-400">LINES</p>
                                    <p className="text-lg font-bold text-white">{lines}</p>
                                </div>

                                {/* Level */}
                                <div className="bg-slate-950 rounded-lg p-3 border border-white/20">
                                    <p className="text-xs text-slate-400">LEVEL</p>
                                    <p className="text-lg font-bold text-white">{level}</p>
                                </div>

                                {/* Controls */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={togglePause}
                                        className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-1 transition-colors"
                                    >
                                        {isPaused ? <Play size={16} /> : <Pause size={16} />}
                                    </button>
                                    <button
                                        onClick={startGame}
                                        className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-1 transition-colors"
                                    >
                                        <RotateCcw size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Controls hint */}
                        <div className="mt-4 text-center text-xs text-slate-400">
                            <span className="inline-flex gap-3">
                                <span>← → Move</span>
                                <span>↑ Rotate</span>
                                <span>↓ Down</span>
                                <span>Space Drop</span>
                                <span>P Pause</span>
                            </span>
                        </div>

                        {/* Game Over / Start Overlay */}
                        {(isGameOver || !board.some(row => row.some(cell => cell))) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/70 rounded-2xl flex flex-col items-center justify-center"
                            >
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {isGameOver ? "Game Over!" : "Ready?"}
                                </h3>
                                {isGameOver && (
                                    <p className="text-slate-300 mb-4">
                                        Final Score: {score.toLocaleString()}
                                    </p>
                                )}
                                <button
                                    onClick={startGame}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg"
                                >
                                    {isGameOver ? "Play Again" : "Start Game"}
                                </button>
                            </motion.div>
                        )}

                        {/* Paused Overlay */}
                        {isPaused && !isGameOver && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/70 rounded-2xl flex flex-col items-center justify-center"
                            >
                                <h3 className="text-3xl font-bold text-white mb-4">Paused</h3>
                                <button
                                    onClick={togglePause}
                                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors"
                                >
                                    Resume
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
