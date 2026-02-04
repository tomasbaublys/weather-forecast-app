import type { ReactNode } from 'react';
import type { LongTermForecastResponse, Place } from './api/weatherApi';

export type ChildrenProps = {
  children: ReactNode;
};

export type WeatherContextTypes = {
  places: Place[];
  selectedPlaceCode: string | null;
  forecast: LongTermForecastResponse | null;

  loadingPlaces: boolean;
  loadingForecast: boolean;
  error: string | null;

  setSelectedPlaceCode: (placeCode: string) => void;
};