import type { ReactNode } from 'react';
import type { LongTermForecastResponse, Place } from './api/weatherApi';

export type ChildrenProps = {
  children: ReactNode;
};

export type TopCity = {
  code: string;
  name: string;
  count: number;
};

export type DailyForecast = {
  date: string;
  minTemp: number;
  maxTemp: number;
  windMax: number;
  humAvg: number;
};

export type DayStats = {
  date: string;
  min: number;
  max: number;
  windMax: number;
  humSum: number;
  count: number;
};

export type WeatherContextTypes = {
  places: Place[];
  selectedPlaceCode: string | null;
  forecast: LongTermForecastResponse | null;

  loadingPlaces: boolean;
  loadingForecast: boolean;
  error: string | null;

  topCities: TopCity[];

  setSelectedPlaceCode: (placeCode: string) => void;
};