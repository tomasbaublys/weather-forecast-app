import { describe, it, expect, vi } from 'vitest';
import { getCurrentWeather, getDailyForecast } from './weatherForecast';
import type { ForecastTimestamp } from '../api/weatherApi';

const makeEntry = (overrides: Partial<ForecastTimestamp>): ForecastTimestamp =>
  ({
    forecastTimeUtc: '2026-02-05 00:00:00',
    airTemperature: 0,
    windSpeed: 0,
    relativeHumidity: 0,
    seaLevelPressure: null,
    totalPrecipitation: null,
    conditionCode: null,
    ...overrides,
  }) as ForecastTimestamp;

describe('weatherForecast utils', () => {
  it('getCurrentWeather returns correct entry based on current time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-05T10:00:00Z'));

    const hourlyData = [
      makeEntry({ forecastTimeUtc: '2026-02-05 09:00:00', airTemperature: -5 }),
      makeEntry({ forecastTimeUtc: '2026-02-05 10:00:00', airTemperature: -4 }),
      makeEntry({ forecastTimeUtc: '2026-02-05 11:00:00', airTemperature: -3 }),
    ];

    const current = getCurrentWeather(hourlyData);

    expect(current?.forecastTimeUtc).toBe('2026-02-05 10:00:00');
    expect(current?.airTemperature).toBe(-4);

    vi.useRealTimers();
  });

  it('getDailyForecast aggregates 5 days correctly', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-05T00:00:00Z'));

    const hourlyData = [
      makeEntry({ forecastTimeUtc: '2026-02-04 12:00:00', airTemperature: 1, windSpeed: 2, relativeHumidity: 50 }),
      makeEntry({ forecastTimeUtc: '2026-02-05 00:00:00', airTemperature: -5, windSpeed: 3, relativeHumidity: 80 }),
      makeEntry({ forecastTimeUtc: '2026-02-05 06:00:00', airTemperature: -2, windSpeed: 5, relativeHumidity: 90 }),
      makeEntry({ forecastTimeUtc: '2026-02-06 00:00:00', airTemperature: -10, windSpeed: 4, relativeHumidity: 70 }),
      makeEntry({ forecastTimeUtc: '2026-02-06 12:00:00', airTemperature: -6, windSpeed: 6, relativeHumidity: 60 }),
      makeEntry({ forecastTimeUtc: '2026-02-07 00:00:00', airTemperature: -1, windSpeed: 2, relativeHumidity: 50 }),
      makeEntry({ forecastTimeUtc: '2026-02-08 00:00:00', airTemperature: 0, windSpeed: 1, relativeHumidity: 55 }),
      makeEntry({ forecastTimeUtc: '2026-02-09 00:00:00', airTemperature: 2, windSpeed: 7, relativeHumidity: 65 }),
      makeEntry({ forecastTimeUtc: '2026-02-10 00:00:00', airTemperature: 10, windSpeed: 1, relativeHumidity: 10 }),
    ];

    const daily = getDailyForecast(hourlyData);

    expect(daily).toHaveLength(5);
    expect(daily[0].date).toBe('2026-02-05');

    const day1 = daily.find((d) => d.date === '2026-02-05');
    expect(day1?.minTemp).toBe(-5);
    expect(day1?.maxTemp).toBe(-2);
    expect(day1?.windMax).toBe(5);

    vi.useRealTimers();
  });

  it('getDailyForecast ignores invalid numeric entries', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-05T00:00:00Z'));

    const hourlyData = [
      makeEntry({ forecastTimeUtc: '2026-02-05 00:00:00', airTemperature: null }),
      makeEntry({ forecastTimeUtc: '2026-02-05 01:00:00', windSpeed: null }),
      makeEntry({ forecastTimeUtc: '2026-02-05 02:00:00', relativeHumidity: null }),
      makeEntry({ forecastTimeUtc: '2026-02-05 03:00:00', airTemperature: -1, windSpeed: 2, relativeHumidity: 80 }),
    ];

    const daily = getDailyForecast(hourlyData);

    expect(daily).toHaveLength(1);
    expect(daily[0].minTemp).toBe(-1);

    vi.useRealTimers();
  });
});