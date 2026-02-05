import { describe, it, expect, beforeEach } from 'vitest';
import { loadTopCities, recordCityView } from './topCitiesStorage';

describe('topCitiesStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loadTopCities returns empty array when storage is empty', () => {
    expect(loadTopCities()).toEqual([]);
  });

  it('recordCityView adds a new city with count 1', () => {
    const updated = recordCityView({ code: 'vilnius', name: 'Vilnius' });

    expect(updated).toEqual([{ code: 'vilnius', name: 'Vilnius', count: 1 }]);
  });

  it('recordCityView increments existing city count', () => {
    recordCityView({ code: 'vilnius', name: 'Vilnius' });
    const updated = recordCityView({ code: 'vilnius', name: 'Vilnius' });

    expect(updated[0].count).toBe(2);
  });

  it('recordCityView keeps only top 3 cities sorted by count desc', () => {
    recordCityView({ code: 'a', name: 'A' });
    recordCityView({ code: 'b', name: 'B' });
    recordCityView({ code: 'c', name: 'C' });
    recordCityView({ code: 'd', name: 'D' });

    const updated = loadTopCities();

    expect(updated).toHaveLength(3);
    expect(updated.map((c) => c.code)).toEqual(['a', 'b', 'c']);
  });

  it('recordCityView sorts by count desc after increments', () => {
    recordCityView({ code: 'a', name: 'A' });
    recordCityView({ code: 'b', name: 'B' });
    recordCityView({ code: 'c', name: 'C' });

    recordCityView({ code: 'c', name: 'C' });
    recordCityView({ code: 'c', name: 'C' });

    const updated = loadTopCities();

    expect(updated[0].code).toBe('c');
    expect(updated[0].count).toBe(3);
  });
});