import { createContext, useEffect, useState } from 'react';
import weatherApi, { type LongTermForecastResponse, type Place } from '../../api/weatherApi';
import type { ChildrenProps, WeatherContextTypes } from '../../types';

type TopCity = {
  code: string;
  name: string;
  count: number;
};

const WeatherContext = createContext<WeatherContextTypes | undefined>(undefined);

const WeatherProvider = ({ children }: ChildrenProps) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlaceCode, setSelectedPlaceCodeState] = useState<string | null>(null);
  const [forecast, setForecast] = useState<LongTermForecastResponse | null>(null);

  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoadingPlaces(true);
        setError(null);

        const data = await weatherApi.getPlaces();
        setPlaces(data);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Unknown error';
        setError(msg);
      } finally {
        setLoadingPlaces(false);
      }
    };

    void loadPlaces();
  }, []);

  useEffect(() => {
    const loadForecast = async () => {
      if (!selectedPlaceCode) return;

      try {
        setLoadingForecast(true);
        setError(null);

        const data = await weatherApi.getLongTermForecast(selectedPlaceCode);
        setForecast(data);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Unknown error';
        setError(msg);
        setForecast(null);
      } finally {
        setLoadingForecast(false);
      }
    };

    void loadForecast();
  }, [selectedPlaceCode]);

  const setSelectedPlaceCode = async (placeCode: string) => {
    setSelectedPlaceCodeState(placeCode);

    const place = places.find((p) => p.code === placeCode);

    // store top-3 most viewed cities in browser (localStorage)
    if (place) {
      const STORAGE_KEY = 'weather.topCities';

      const raw = localStorage.getItem(STORAGE_KEY);
      const list: TopCity[] = raw ? (JSON.parse(raw) as TopCity[]) : [];

      const existing = list.find((c) => c.code === place.code);

      if (existing) {
        existing.count += 1;
      } else {
        list.push({
          code: place.code,
          name: place.name,
          count: 1,
        });
      }

      list.sort((a, b) => b.count - a.count);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 3)));
    }

    // backend logging (task requirement)
    try {
      await fetch('http://localhost:5500/api/log/city-selected', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeCode,
          placeName: place?.name ?? null,
        }),
      });
    } catch {
      // ignore logging errors
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        places,
        selectedPlaceCode,
        forecast,
        loadingPlaces,
        loadingForecast,
        error,
        setSelectedPlaceCode,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider };
export default WeatherContext;