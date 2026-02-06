import type { ReactNode } from 'react';
import type { LongTermForecastResponse, Place, ForecastTimestamp } from './api/weatherApi';

export type ChildrenProps = {
  children: ReactNode;
};

export type WeatherIconName = 'cloud' | 'sun' | 'rain' | 'snow' | 'wind';

export type WeatherIconProps = {
  name: WeatherIconName;
  className?: string;
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

export type WeatherDailyCardListProps = {
  loadingForecast: boolean;
  dailyForecast: DailyForecast[];
  dailyIconsByDate: Map<string, WeatherIconName>;
};

export type WeatherCurrentCardProps = {
  selectedPlaceName: string;
  loadingForecast: boolean;
  currentWeather: ForecastTimestamp | null;
  currentIcon: WeatherIconName;
  currentTempText: string;
};

export type WeatherTopCitiesProps = {
  topCities: TopCity[];
  onSelectPlaceCode: (placeCode: string) => void;
  hasCurrentWeather: boolean;
  currentIcon: WeatherIconName;
  currentTempText: string;
};