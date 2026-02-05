import { useContext, useMemo } from 'react';
import Container from '../UI/atoms/Container';
import Heading from '../UI/atoms/Heading';
import CitySelect from '../UI/molecules/CitySelect';
import WeatherContext from '../contexts/WeatherContext';
import { getCurrentWeather, getDailyForecast } from '../../utils/weatherForecast';

const WeatherPage = () => {
  const ctx = useContext(WeatherContext);

  const forecast = ctx?.forecast ?? null;

  const currentWeather = useMemo(() => {
    if (!forecast) return null;
    return getCurrentWeather(forecast.forecastTimestamps);
  }, [forecast]);

  const dailyForecast = useMemo(() => {
    if (!forecast) return [];
    return getDailyForecast(forecast.forecastTimestamps);
  }, [forecast]);

  if (!ctx) return <div>WeatherContext missing</div>;

  const {
    places,
    selectedPlaceCode,
    loadingPlaces,
    loadingForecast,
    error,
    topCities,
    setSelectedPlaceCode,
  } = ctx;

  if (loadingPlaces) return <div>Loading places...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Heading>Weather Forecast</Heading>

      <CitySelect
        places={places}
        selectedPlaceCode={selectedPlaceCode}
        onSelectPlaceCode={setSelectedPlaceCode}
      />

      <h3>Top viewed cities</h3>
      <ul>
        {topCities.map((city) => (
          <li key={city.code}>
            <button type="button" onClick={() => setSelectedPlaceCode(city.code)}>
              {city.name} ({city.count})
            </button>
          </li>
        ))}
      </ul>

      {loadingForecast && <div>Loading forecast...</div>}

      {!loadingForecast && forecast && currentWeather && (
        <>
          <h3>Current conditions (UTC)</h3>
          <ul>
            <li>Time: {currentWeather.forecastTimeUtc}</li>
            <li>Temperature: {currentWeather.airTemperature ?? '-'} °C</li>
            <li>Wind: {currentWeather.windSpeed ?? '-'} m/s</li>
            <li>Humidity: {currentWeather.relativeHumidity ?? '-'} %</li>
            <li>Pressure: {currentWeather.seaLevelPressure ?? '-'} hPa</li>
            <li>Precipitation: {currentWeather.totalPrecipitation ?? '-'} mm</li>
            <li>Condition: {currentWeather.conditionCode ?? '-'}</li>
          </ul>

          <h3>5 day forecast</h3>
          <ul>
            {dailyForecast.map((day) => (
              <li key={day.date}>
                {day.date} | min: {day.minTemp}°C | max: {day.maxTemp}°C | wind max: {day.windMax} | hum avg:{' '}
                {day.humAvg}%
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
};

export default WeatherPage;