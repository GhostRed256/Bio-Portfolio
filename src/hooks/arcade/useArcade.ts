"use client";

import { useState, useCallback, useEffect } from 'react';
import { useSeasonalTheme } from '@/hooks/useSeasonalTheme';

export type GameId =
    | 'tetris'
    | 'snake'
    | 'space-impact'
    | 'breakout'
    | 'pong'
    | 'flappy'
    | '2048'
    | 'minesweeper'
    | 'memory'
    | 'dino';

export interface GameInfo {
    id: GameId;
    title: string;
    description: string;
    icon: string;
}

export const GAMES: GameInfo[] = [
    { id: 'tetris', title: 'Tetris', description: 'Classic block stacking', icon: '🧱' },
    { id: 'snake', title: 'Snake', description: 'Retro hungry snake', icon: '🐍' },
    { id: 'space-impact', title: 'Space Impact', description: 'Defender of the galaxy', icon: '🚀' },
    { id: 'breakout', title: 'Breakout', description: 'Smash the bricks', icon: '🎾' },
    { id: 'pong', title: 'Pong', description: 'The original paddle game', icon: '🏓' },
    { id: 'flappy', title: 'Flappy Bird', description: 'Flap and dodge', icon: '🐦' },
    { id: '2048', title: '2048', description: 'Merge the numbers', icon: '🔢' },
    { id: 'minesweeper', title: 'Minesweeper', description: 'Find the bombs', icon: '💣' },
    { id: 'memory', title: 'Memory Match', description: 'Test your brain', icon: '🎴' },
    { id: 'dino', title: 'Dino Run', description: 'Jump over obstacles', icon: '🦖' },
];

export function useArcade() {
    const { theme } = useSeasonalTheme();
    const [activeGameIndex, setActiveGameIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Set default game based on season
    useEffect(() => {
        let defaultIdx = 0;
        switch (theme) {
            case 'Winter':
            case 'Christmas':
                defaultIdx = GAMES.findIndex(g => g.id === 'tetris'); // Tetris feels wintery
                break;
            case 'Spring':
                defaultIdx = GAMES.findIndex(g => g.id === 'snake'); // Spring/Nature
                break;
            case 'Summer':
                defaultIdx = GAMES.findIndex(g => g.id === 'dino');
                break;
            case 'Autumn':
            case 'Halloween':
                defaultIdx = GAMES.findIndex(g => g.id === 'memory');
                break;
            case 'Diwali':
                defaultIdx = GAMES.findIndex(g => g.id === 'space-impact');
                break;
            default:
                defaultIdx = 0;
        }
        setActiveGameIndex(defaultIdx >= 0 ? defaultIdx : 0);
    }, [theme]);

    const nextGame = useCallback(() => {
        setActiveGameIndex(prev => (prev + 1) % GAMES.length);
    }, []);

    const prevGame = useCallback(() => {
        setActiveGameIndex(prev => (prev - 1 + GAMES.length) % GAMES.length);
    }, []);

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen(prev => !prev);
    }, []);

    return {
        activeGame: GAMES[activeGameIndex],
        activeGameIndex,
        nextGame,
        prevGame,
        isFullscreen,
        toggleFullscreen,
        games: GAMES
    };
}
