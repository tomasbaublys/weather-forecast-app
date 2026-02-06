import type { Place, ForecastTimestamp } from '../api/weatherApi';
import type { WeatherIconName } from '../types';

export const conditionToIcon = (conditionCode?: string | null): WeatherIconName => {
  const c = (conditionCode ?? '').toLowerCase();
  if (c.includes('rain') || c.includes('sleet') || c.includes('drizzle')) return 'rain';
  if (c.includes('snow')) return 'snow';
  if (c.includes('clear') || c.includes('sun')) return 'sun';
  return 'cloud';
};

export const getSelectedPlaceName = (places: Place[], selectedPlaceCode: string | null) => {
  return (selectedPlaceCode ? places.find((p) => p.code === selectedPlaceCode)?.name : null) ?? 'Select a city';
};

export const buildDailyIconsByDate = (
  forecastTimestamps: ForecastTimestamp[],
  dailyForecastDates: string[]
) => {
  const map = new Map<string, WeatherIconName>();

  for (const date of dailyForecastDates) {
    const dayEntries = forecastTimestamps.filter((t) => t.forecastTimeUtc.startsWith(date));
    const midday = dayEntries.find((t) => t.forecastTimeUtc.includes('12:00:00')) ?? dayEntries[0];
    map.set(date, conditionToIcon(midday?.conditionCode));
  }

  return map;
};

export const formatTempC = (value: number | null | undefined) => {
  return value == null ? '-' : `${Math.round(value)}°C`;
};