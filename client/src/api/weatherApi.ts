const BASE_URL = 'https://api.meteo.lt/v1';

export type Place = {
  code: string;
  name: string;
};

export type ForecastTimestamp = {
  forecastTimeUtc: string;
  airTemperature: number | null;
  feelsLikeTemperature?: number | null;
  windSpeed: number | null;
  windGust?: number | null;
  windDirection?: number | null;
  relativeHumidity: number | null;
  seaLevelPressure: number | null;
  totalPrecipitation: number | null;
  conditionCode: string | null;
};

export type LongTermForecastResponse = {
  place: Place;
  forecastCreationTimeUtc: string;
  forecastTimestamps: ForecastTimestamp[];
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
};

export const weatherApi = {
  getPlaces: async (): Promise<Place[]> => {
    return fetchJson<Place[]>(`${BASE_URL}/places`);
  },

  getLongTermForecast: async (placeCode: string): Promise<LongTermForecastResponse> => {
    return fetchJson<LongTermForecastResponse>(
      `${BASE_URL}/places/${encodeURIComponent(placeCode)}/forecasts/long-term`
    );
  },
};

export default weatherApi;