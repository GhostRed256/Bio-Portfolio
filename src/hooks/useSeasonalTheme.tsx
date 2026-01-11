"use client";

import { useState, useEffect, useCallback, createContext, useContext } from 'react';

export type SeasonTheme =
    | 'NewYear'
    | 'RepublicDay'
    | 'Valentine'
    | 'Spring'
    | 'Summer'
    | 'Monsoon'
    | 'IndependenceDay'
    | 'Autumn'
    | 'Halloween'
    | 'Diwali'
    | 'Christmas'
    | 'Winter';

export interface ThemeColors {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
}

interface SeasonalThemeData {
    theme: SeasonTheme;
    isDay: boolean;
    colors: ThemeColors;
    isManualOverride: boolean;
}

interface SeasonalThemeContextValue extends SeasonalThemeData {
    setTheme: (theme: SeasonTheme) => void;
    toggleDayNight: () => void;
    resetToAuto: () => void;
    allThemes: SeasonTheme[];
}

const allThemes: SeasonTheme[] = [
    'NewYear', 'RepublicDay', 'Valentine', 'Spring', 'Summer',
    'Monsoon', 'IndependenceDay', 'Autumn', 'Halloween', 'Diwali',
    'Christmas', 'Winter'
];

// Theme color definitions
const themeColors: Record<SeasonTheme, { day: ThemeColors; night: ThemeColors }> = {
    NewYear: {
        day: {
            background: "45 80% 96%", // Gold tinted
            primary: "45 90% 60%", // Gold
            secondary: "0 0% 90%", // Silver
            accent: "45 100% 70%",
            text: "45 60% 20%"
        },
        night: {
            background: "240 30% 8%", // Dark blue
            primary: "45 90% 70%", // Gold sparkle
            secondary: "0 0% 80%", // Silver
            accent: "45 100% 60%",
            text: "45 30% 95%"
        }
    },
    RepublicDay: {
        day: {
            background: "30 60% 96%", // Saffron tinted white
            primary: "30 100% 50%", // Saffron
            secondary: "120 60% 30%", // Green
            accent: "240 60% 50%", // Blue (Ashoka Chakra)
            text: "30 50% 15%"
        },
        night: {
            background: "120 30% 8%", // Dark green
            primary: "30 100% 60%", // Saffron
            secondary: "0 0% 95%", // White
            accent: "120 60% 40%", // Green
            text: "0 0% 95%"
        }
    },
    Valentine: {
        day: {
            background: "350 70% 97%", // Light pink
            primary: "350 80% 60%", // Rose pink
            secondary: "0 70% 85%", // Light red
            accent: "350 90% 65%",
            text: "350 50% 20%"
        },
        night: {
            background: "350 40% 10%", // Dark rose
            primary: "350 70% 65%", // Rose
            secondary: "0 60% 50%", // Deep red
            accent: "350 80% 60%",
            text: "350 30% 95%"
        }
    },
    Spring: {
        day: {
            background: "120 50% 97%", // Light green
            primary: "340 70% 75%", // Cherry blossom pink
            secondary: "120 50% 70%", // Fresh green
            accent: "50 80% 70%", // Yellow
            text: "120 40% 20%"
        },
        night: {
            background: "120 30% 10%", // Dark green
            primary: "340 50% 65%", // Muted pink
            secondary: "120 40% 50%", // Green
            accent: "50 60% 60%",
            text: "120 20% 95%"
        }
    },
    Summer: {
        day: {
            background: "45 100% 96%", // Warm yellow
            primary: "30 100% 55%", // Orange
            secondary: "195 80% 60%", // Sky blue
            accent: "45 100% 65%", // Bright yellow
            text: "30 60% 15%"
        },
        night: {
            background: "220 40% 12%", // Night blue
            primary: "30 80% 60%", // Orange
            secondary: "195 50% 50%", // Teal
            accent: "45 80% 55%",
            text: "30 30% 95%"
        }
    },
    Monsoon: {
        day: {
            background: "210 40% 95%", // Cloudy grey-blue
            primary: "210 60% 55%", // Rain blue
            secondary: "180 30% 80%", // Misty grey
            accent: "210 70% 50%",
            text: "210 50% 20%"
        },
        night: {
            background: "220 50% 8%", // Dark stormy
            primary: "210 50% 60%", // Lightning blue
            secondary: "200 30% 30%", // Dark grey
            accent: "210 60% 50%",
            text: "210 20% 95%"
        }
    },
    IndependenceDay: {
        day: {
            background: "0 0% 98%", // Clean white
            primary: "30 100% 50%", // Saffron
            secondary: "120 60% 35%", // Green
            accent: "240 60% 50%", // Ashoka blue
            text: "0 0% 15%"
        },
        night: {
            background: "240 30% 10%", // Navy
            primary: "30 100% 55%", // Saffron
            secondary: "0 0% 95%", // White
            accent: "120 60% 45%", // Green
            text: "0 0% 95%"
        }
    },
    Autumn: {
        day: {
            background: "25 60% 96%", // Warm cream
            primary: "25 80% 55%", // Burnt orange
            secondary: "45 70% 60%", // Golden
            accent: "10 70% 50%", // Red-brown
            text: "25 50% 18%"
        },
        night: {
            background: "25 40% 10%", // Dark brown
            primary: "25 60% 55%", // Orange
            secondary: "45 50% 50%", // Gold
            accent: "10 50% 45%",
            text: "25 20% 95%"
        }
    },
    Halloween: {
        day: {
            background: "30 50% 95%", // Pale orange
            primary: "25 100% 50%", // Pumpkin orange
            secondary: "270 40% 30%", // Purple
            accent: "0 0% 10%", // Black
            text: "270 40% 15%"
        },
        night: {
            background: "270 50% 5%", // Deep purple-black
            primary: "25 100% 55%", // Glowing orange
            secondary: "120 80% 40%", // Eerie green
            accent: "270 60% 50%", // Purple
            text: "25 80% 90%"
        }
    },
    Diwali: {
        day: {
            background: "40 70% 95%", // Warm gold tint
            primary: "40 100% 55%", // Gold
            secondary: "350 80% 55%", // Festive red
            accent: "25 100% 50%", // Orange
            text: "40 50% 15%"
        },
        night: {
            background: "270 40% 8%", // Deep purple night
            primary: "45 100% 60%", // Bright gold
            secondary: "350 90% 55%", // Red
            accent: "25 100% 55%", // Orange fire
            text: "45 50% 95%"
        }
    },
    Christmas: {
        day: {
            background: "0 50% 97%", // Warm white
            primary: "350 80% 45%", // Christmas red
            secondary: "140 60% 35%", // Christmas green
            accent: "45 80% 60%", // Gold
            text: "350 40% 15%"
        },
        night: {
            background: "220 50% 8%", // Winter night
            primary: "350 70% 50%", // Red
            secondary: "140 50% 40%", // Green
            accent: "45 90% 65%", // Gold star
            text: "0 0% 95%"
        }
    },
    Winter: {
        day: {
            background: "200 30% 98%", // Ice white
            primary: "200 50% 70%", // Ice blue
            secondary: "0 0% 85%", // Silver
            accent: "200 60% 60%",
            text: "200 40% 20%"
        },
        night: {
            background: "220 40% 8%", // Dark winter
            primary: "200 40% 65%", // Pale blue
            secondary: "0 0% 75%", // Silver
            accent: "200 50% 55%",
            text: "200 20% 95%"
        }
    }
};

function getAutoTheme(date: Date): SeasonTheme {
    const month = date.getMonth(); // 0-11
    const day = date.getDate();

    // Special dates
    if (month === 0 && day <= 7) return 'NewYear'; // Jan 1-7
    if (month === 0 && day === 26) return 'RepublicDay'; // Jan 26
    if (month === 1 && day >= 7 && day <= 14) return 'Valentine'; // Feb 7-14
    if (month === 7 && day === 15) return 'IndependenceDay'; // Aug 15
    if (month === 9 && day >= 25) return 'Halloween'; // Oct 25-31
    if (month === 9 && day >= 15 && day < 25) return 'Diwali'; // Oct 15-24 (approx)
    if (month === 10 && day <= 5) return 'Diwali'; // Nov 1-5 (Diwali period)
    if (month === 11 && day >= 20) return 'Christmas'; // Dec 20-31

    // Monthly themes
    if (month === 0) return 'Winter'; // January
    if (month === 1) return 'Valentine'; // February
    if (month >= 2 && month <= 3) return 'Spring'; // March-April
    if (month >= 4 && month <= 5) return 'Summer'; // May-June
    if (month >= 6 && month <= 7) return 'Monsoon'; // July-August
    if (month >= 8 && month <= 9) return 'Autumn'; // September-October
    if (month === 10) return 'Autumn'; // November
    return 'Winter'; // December
}

function getIsDay(): boolean {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
}

const SeasonalThemeContext = createContext<SeasonalThemeContextValue | null>(null);

export function useSeasonalTheme() {
    const context = useContext(SeasonalThemeContext);
    if (!context) {
        // Return default values if not in provider
        const autoTheme = getAutoTheme(new Date());
        const isDay = getIsDay();
        return {
            theme: autoTheme,
            isDay,
            colors: themeColors[autoTheme][isDay ? 'day' : 'night'],
            isManualOverride: false,
            setTheme: () => { },
            toggleDayNight: () => { },
            resetToAuto: () => { },
            allThemes
        };
    }
    return context;
}

export function SeasonalThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<SeasonTheme>(() => getAutoTheme(new Date()));
    const [isDay, setIsDay] = useState<boolean>(() => getIsDay());
    const [isManualOverride, setIsManualOverride] = useState(false);

    // Auto-update theme based on date (if not manually overridden)
    // Auto-update theme based on date is handled by initial state and resetToAuto.
    // Periodic updates would require a timer, but for now we rely on mount/reset.


    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement;
        const colors = themeColors[theme][isDay ? 'day' : 'night'];

        root.style.setProperty('--background', colors.background);
        root.style.setProperty('--foreground', colors.text);
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--accent', colors.accent);

        // Set muted colors based on theme text
        root.style.setProperty('--muted-foreground', colors.text);

        // Special tricolor handling for national days
        const isTricolor = theme === 'RepublicDay' || theme === 'IndependenceDay';
        root.setAttribute('data-tricolor', isTricolor ? 'true' : 'false');

        // Set tricolor CSS variables for gradient text
        if (isTricolor) {
            root.style.setProperty('--tricolor-saffron', '#FF9933');
            root.style.setProperty('--tricolor-white', '#FFFFFF');
            root.style.setProperty('--tricolor-green', '#138808');
        }

        // Toggle dark class for Tailwind
        if (!isDay) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme, isDay]);

    const setTheme = useCallback((newTheme: SeasonTheme) => {
        setThemeState(newTheme);
        setIsManualOverride(true);
    }, []);

    const toggleDayNight = useCallback(() => {
        setIsDay(prev => !prev);
        setIsManualOverride(true);
    }, []);

    const resetToAuto = useCallback(() => {
        setIsManualOverride(false);
        setThemeState(getAutoTheme(new Date()));
        setIsDay(getIsDay());
    }, []);

    const colors = themeColors[theme][isDay ? 'day' : 'night'];

    return (
        <SeasonalThemeContext.Provider
            value={{
                theme,
                isDay,
                colors,
                isManualOverride,
                setTheme,
                toggleDayNight,
                resetToAuto,
                allThemes
            }}
        >
            {children}
        </SeasonalThemeContext.Provider>
    );
}

export { themeColors, allThemes };
