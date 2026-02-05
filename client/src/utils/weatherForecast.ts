import type { ForecastTimestamp } from '../api/weatherApi';
import type { DailyForecast, DayStats } from '../types';

const parseUtc = (value: string) => new Date(value.replace(' ', 'T') + 'Z');

export const getCurrentWeather = (hourlyData: ForecastTimestamp[]) => {
  if (hourlyData.length === 0) return null;

  const nowMs = Date.now();

  for (const entry of hourlyData) {
    const entryMs = parseUtc(entry.forecastTimeUtc).getTime();
    if (entryMs >= nowMs) return entry;
  }

  return hourlyData[hourlyData.length - 1] ?? null;
};

export const getDailyForecast = (hourlyData: ForecastTimestamp[]): DailyForecast[] => {
  const groupedByDate = new Map<string, DayStats>();

  for (const entry of hourlyData) {
    if (
      entry.airTemperature === null ||
      entry.windSpeed === null ||
      entry.relativeHumidity === null
    ) {
      continue;
    }

    const date = entry.forecastTimeUtc.slice(0, 10);

    const stats = groupedByDate.get(date);

    if (!stats) {
      groupedByDate.set(date, {
        date,
        min: entry.airTemperature,
        max: entry.airTemperature,
        windMax: entry.windSpeed,
        humSum: entry.relativeHumidity,
        count: 1,
      });
      continue;
    }

    stats.min = Math.min(stats.min, entry.airTemperature);
    stats.max = Math.max(stats.max, entry.airTemperature);
    stats.windMax = Math.max(stats.windMax, entry.windSpeed);
    stats.humSum += entry.relativeHumidity;
    stats.count += 1;
  }

  const todayKey = new Date().toISOString().slice(0, 10);

  return Array.from(groupedByDate.values())
    .filter((stats) => stats.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)
    .map((stats) => ({
      date: stats.date,
      minTemp: stats.min,
      maxTemp: stats.max,
      windMax: stats.windMax,
      humAvg: stats.count ? Math.round(stats.humSum / stats.count) : 0,
    }));
};