"use client";

import { useState, useCallback, useEffect } from 'react';

type Entity = { x: number; y: number; type: 'PLAYER' | 'ENEMY' | 'BULLET' };

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

const PLAYER_SHIP_SHAPE = [
    { dx: 0, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: 1 }
];

export function useSpaceImpact(isActive: boolean = false) {
    const [isStarted, setIsStarted] = useState(false);
    const [entities, setEntities] = useState<Entity[]>([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // const gameLoopRef = useRef<NodeJS.Timeout | null>(null); // Removed unused ref

    const startGame = useCallback(() => {
        setEntities([{ x: 4, y: 18, type: 'PLAYER' }]);
        setScore(0);
        setIsGameOver(false);
        setIsPaused(false);
        setIsStarted(true);
    }, []);

    const spawnEnemy = useCallback(() => {
        setEntities(prev => [
            ...prev,
            { x: Math.floor(Math.random() * GRID_WIDTH), y: 0, type: 'ENEMY' }
        ]);
    }, []);

    const fire = useCallback(() => {
        setEntities(prev => {
            const player = prev.find(e => e.type === 'PLAYER');
            if (!player) return prev;
            return [...prev, { x: player.x, y: player.y - 1, type: 'BULLET' }];
        });
    }, []);

    const move = useCallback(() => {
        setEntities(prev => {
            const player = prev.find(e => e.type === 'PLAYER');
            if (!player) return prev;

            // 1. Move Bullets
            const movedBullets = prev
                .filter(e => e.type === 'BULLET')
                .map(b => ({ ...b, y: b.y - 1 }))
                .filter(b => b.y >= 0);

            // 2. Move Enemies
            let enemyReachedBottom = false;
            const movedEnemies = prev
                .filter(e => e.type === 'ENEMY')
                .map(e => {
                    const nextY = e.y + 0.3; // Slower movement
                    if (nextY >= GRID_HEIGHT - 1) enemyReachedBottom = true;
                    return { ...e, y: nextY };
                });

            if (enemyReachedBottom) {
                setIsGameOver(true);
                return prev;
            }

            // 3. Collision Detection
            const survivingBullets: Entity[] = [];
            const survivingEnemies: Entity[] = [];
            let scoreIncrement = 0;

            const bulletHits = new Set<number>();
            const enemyHits = new Set<number>();

            movedBullets.forEach((b, bIdx) => {
                const hitEnemyIdx = movedEnemies.findIndex((e, eIdx) => {
                    if (enemyHits.has(eIdx)) return false;
                    return Math.round(e.x) === Math.round(b.x) &&
                        (Math.round(e.y) === Math.round(b.y) || Math.round(e.y) === Math.round(b.y) + 1);
                });

                if (hitEnemyIdx !== -1) {
                    bulletHits.add(bIdx);
                    enemyHits.add(hitEnemyIdx);
                    scoreIncrement += 20;
                } else {
                    survivingBullets.push(b);
                }
            });

            movedEnemies.forEach((e, i) => {
                if (!enemyHits.has(i)) survivingEnemies.push(e);
            });

            if (scoreIncrement > 0) setScore(s => s + scoreIncrement);

            // Check Player Collision
            const playerHit = survivingEnemies.some(e => {
                return PLAYER_SHIP_SHAPE.some(part =>
                    Math.round(e.x) === (player.x + part.dx) &&
                    Math.round(e.y) === (player.y + part.dy)
                );
            });

            if (playerHit) {
                setIsGameOver(true);
                return prev;
            }

            return [player, ...survivingBullets, ...survivingEnemies];
        });
    }, []);

    useEffect(() => {
        if (!isActive || isGameOver || isPaused) return;

        const loop = setInterval(() => {
            move();
            if (Math.random() < 0.1) spawnEnemy();
        }, 100);

        return () => clearInterval(loop);
    }, [isGameOver, isPaused, move, spawnEnemy, isActive]);

    const board = Array.from({ length: GRID_HEIGHT }, (_, y) =>
        Array.from({ length: GRID_WIDTH }, (_, x) => {
            const playerEntity = entities.find(e => e.type === 'PLAYER');

            // Render Player
            if (playerEntity && PLAYER_SHIP_SHAPE.some(part =>
                (playerEntity.x + part.dx) === x && (playerEntity.y + part.dy) === y
            )) return '#3b82f6';

            // Render Entities
            const entity = entities.find(e => Math.round(e.x) === x && Math.round(e.y) === y);
            if (entity) {
                if (entity.type === 'BULLET') return '#fcd34d';
                if (entity.type === 'ENEMY') return '#ef4444';
            }
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
        moveLeft: () => setEntities(prev => {
            const p = prev.find(e => e.type === 'PLAYER');
            if (p && p.x > 1) return prev.map(e => e.type === 'PLAYER' ? { ...e, x: e.x - 1 } : e);
            return prev;
        }),
        moveRight: () => setEntities(prev => {
            const p = prev.find(e => e.type === 'PLAYER');
            if (p && p.x < GRID_WIDTH - 2) return prev.map(e => e.type === 'PLAYER' ? { ...e, x: e.x + 1 } : e);
            return prev;
        }),
        fire,
        controlsHint: "← → Move | Space Fire"
    };
}
