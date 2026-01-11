"use client";

import { useEffect, useRef, useCallback } from 'react';

interface TouchGestureOptions {
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onTap?: () => void;
    threshold?: number; // minimum distance for swipe
}

export function useTouchGesture({
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    onTap,
    threshold = 50
}: TouchGestureOptions) {
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const touchTime = useRef<number>(0);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        const touch = e.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
        touchTime.current = Date.now();
    }, []);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
        if (!touchStart.current) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStart.current.x;
        const deltaY = touch.clientY - touchStart.current.y;
        const deltaTime = Date.now() - touchTime.current;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Detect tap (short duration, minimal movement)
        if (absDeltaX < 10 && absDeltaY < 10 && deltaTime < 300) {
            onTap?.();
            touchStart.current = null;
            return;
        }

        // Detect swipe
        if (absDeltaX > threshold || absDeltaY > threshold) {
            if (absDeltaX > absDeltaY) {
                // Horizontal swipe
                if (deltaX > 0) {
                    onSwipeRight?.();
                } else {
                    onSwipeLeft?.();
                }
            } else {
                // Vertical swipe
                if (deltaY > 0) {
                    onSwipeDown?.();
                } else {
                    onSwipeUp?.();
                }
            }
        }

        touchStart.current = null;
    }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, onTap, threshold]);

    return { handleTouchStart, handleTouchEnd };
}
