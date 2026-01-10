import { useState, useEffect } from 'react';

export type WeatherCondition = 'Sunny' | 'Rainy' | 'Snowy' | 'Cloudy' | 'Clear' | 'Evening';

interface WeatherData {
    temperature: number;
    condition: WeatherCondition;
    isDay: boolean;
}

export function useWeather() {
    const [weather, setWeather] = useState<WeatherData>({
        temperature: 25,
        condition: 'Sunny', // Default to Sunny/Pastel Yellow
        isDay: true,
    });

    useEffect(() => {
        const fetchWeather = async (lat: number, lon: number) => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day`
                );
                const data = await response.json();

                const code = data.current.weather_code;
                const isDay = data.current.is_day === 1;
                let condition: WeatherCondition = 'Clear';

                // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
                if (code <= 1) condition = 'Sunny';
                else if (code <= 3) condition = 'Cloudy';
                else if (code <= 48) condition = 'Cloudy'; // Fog
                else if (code <= 67) condition = 'Rainy'; // Drizzle/Rain
                else if (code <= 77) condition = 'Snowy'; // Snow grains
                else if (code <= 82) condition = 'Rainy'; // Rain showers
                else if (code <= 86) condition = 'Snowy'; // Snow showers
                else if (code <= 99) condition = 'Rainy'; // Thunderstorm

                // Override for simple "Sunny" mapping if clear
                if (condition === 'Sunny' && !isDay) condition = 'Clear'; // Clear night

                // Check for evening time (17:00 - 19:00 local time)
                const currentHour = new Date().getHours();
                const isEvening = currentHour >= 17 && currentHour < 19;
                if (isEvening && (condition === 'Sunny' || condition === 'Cloudy')) {
                    condition = 'Evening';
                }

                setWeather({
                    temperature: data.current.temperature_2m,
                    condition,
                    isDay
                });
            } catch (error) {
                console.error("Failed to fetch weather:", error);
            }
        };

        // Default: Dibrugarh, Assam
        // Latitude: 27.4728, Longitude: 94.9120
        let lat = 27.4728;
        let lon = 94.9120;

        // Try getting user location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    // Fallback to Dibrugarh on error/denial
                    fetchWeather(lat, lon);
                }
            );
        } else {
            fetchWeather(lat, lon);
        }
    }, []);

    return weather;
}
