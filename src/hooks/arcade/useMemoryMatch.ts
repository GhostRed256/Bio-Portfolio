"use client";

import { useState, useCallback, useEffect } from 'react';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

export function useMemoryMatch(isActive: boolean = false) {
    const [isStarted, setIsStarted] = useState(false);
    const [cards, setCards] = useState<{ id: number, value: number, isMatched: boolean, isFlipped: boolean }[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [cursor, setCursor] = useState(0);
    const [score, setScore] = useState(0);

    const startGame = useCallback(() => {
        const values = Array.from({ length: 15 }, (_, i) => i + 1);
        const pairValues = [...values, ...values].sort(() => Math.random() - 0.5);
        setCards(pairValues.map((v, i) => ({ id: i, value: v, isMatched: false, isFlipped: false })));
        setFlipped([]);
        setCursor(0);
        setScore(0);
        setIsStarted(true);
    }, []);

    const flipCard = useCallback((idx: number) => {
        if (!isActive || cards[idx].isMatched || cards[idx].isFlipped || flipped.length >= 2) return;

        const newCards = [...cards];
        newCards[idx].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flipped, idx];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].value === cards[second].value) {
                setTimeout(() => {
                    setCards(prev => {
                        const updated = [...prev];
                        updated[first].isMatched = true;
                        updated[second].isMatched = true;
                        return updated;
                    });
                    setScore(s => s + 100);
                    setFlipped([]);
                }, 500);
            } else {
                setTimeout(() => {
                    setCards(prev => {
                        const updated = [...prev];
                        updated[first].isFlipped = false;
                        updated[second].isFlipped = false;
                        return updated;
                    });
                    setFlipped([]);
                }, 1000);
            }
        }
    }, [cards, flipped, isActive]);

    useEffect(() => {
        if (!isActive) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') setCursor(c => Math.max(0, c - GRID_WIDTH));
            if (e.key === 'ArrowDown') setCursor(c => Math.min(cards.length - 1, c + GRID_WIDTH));
            if (e.key === 'ArrowLeft') setCursor(c => Math.max(0, c - 1));
            if (e.key === 'ArrowRight') setCursor(c => Math.min(cards.length - 1, c + 1));
            if (e.key === ' ') flipCard(cursor);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, cursor, flipCard, cards.length]);

    const board = Array.from({ length: GRID_HEIGHT }, (_, y) =>
        Array.from({ length: GRID_WIDTH }, (_, x) => {
            const idx = y * GRID_WIDTH + x;
            if (idx === cursor) return '#ffffff';
            const card = cards[idx];
            if (!card) return null;
            if (card.isMatched) return '#22c55e';
            if (card.isFlipped) return '#3b82f6';
            return '#334155';
        })
    );

    return {
        board,
        score,
        isGameOver: cards.length > 0 && cards.every(c => c.isMatched),
        isStarted,
        isPaused: false,
        startGame,
        togglePause: () => { },
        onDirection: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE') => {
            if (dir === 'UP') setCursor(c => Math.max(0, c - GRID_WIDTH));
            if (dir === 'DOWN') setCursor(c => Math.min(cards.length - 1, c + GRID_WIDTH));
            if (dir === 'LEFT') setCursor(c => Math.max(0, c - 1));
            if (dir === 'RIGHT') setCursor(c => Math.min(cards.length - 1, c + 1));
            if (dir === 'FIRE') flipCard(cursor);
        },
        controlsHint: "Arrows Move | Space Flip"
    };
}
