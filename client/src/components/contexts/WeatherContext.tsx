// src/components/contexts/WeatherContext.tsx
import { createContext, useEffect, useState } from 'react';
import weatherApi, { type LongTermForecastResponse, type Place } from '../../api/weatherApi';
import type { ChildrenProps, TopCity, WeatherContextTypes } from '../../types';
import { loadTopCities, recordCityView } from '../../storage/topCitiesStorage';

const WeatherContext = createContext<WeatherContextTypes | undefined>(undefined);

const WeatherProvider = ({ children }: ChildrenProps) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlaceCode, setSelectedPlaceCodeState] = useState<string | null>(null);
  const [forecast, setForecast] = useState<LongTermForecastResponse | null>(null);

  const [topCities, setTopCities] = useState<TopCity[]>([]);

  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTopCities(loadTopCities());
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('selectedPlaceCode');
    if (saved) setSelectedPlaceCodeState(saved);
  }, []);

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
    localStorage.setItem('selectedPlaceCode', placeCode);

    const place = places.find((p) => p.code === placeCode);

    if (place) {
      const updated = recordCityView({ code: place.code, name: place.name });
      setTopCities(updated);
    }

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
      // ignor logging errors
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
        topCities,
        setSelectedPlaceCode,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider };
export default WeatherContext;