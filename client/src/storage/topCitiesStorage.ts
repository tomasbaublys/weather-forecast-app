import type { TopCity } from '../types';

const STORAGE_KEY = 'weather.topCities';

export const loadTopCities = (): TopCity[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as TopCity[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const recordCityView = (city: { code: string; name: string }): TopCity[] => {
  const list = loadTopCities();

  const existing = list.find((c) => c.code === city.code);

  if (existing) {
    existing.count += 1;
  } else {
    list.push({ code: city.code, name: city.name, count: 1 });
  }

  list.sort((a, b) => b.count - a.count);

  const updated = list.slice(0, 3);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
};