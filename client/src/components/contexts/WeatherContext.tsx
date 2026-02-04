import { createContext, useEffect, useState } from 'react';
import weatherApi, { type LongTermForecastResponse, type Place } from '../../api/weatherApi';
import type { ChildrenProps, WeatherContextTypes } from '../../types';

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

  const setSelectedPlaceCode = (placeCode: string) => {
    setSelectedPlaceCodeState(placeCode);
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