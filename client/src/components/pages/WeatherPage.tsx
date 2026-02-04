import { useContext } from 'react';
import Container from '../UI/atoms/Container';
import Heading from '../UI/atoms/Heading';
import WeatherContext from '../contexts/WeatherContext';

const WeatherPage = () => {
  const ctx = useContext(WeatherContext);

  if (!ctx) return <div>WeatherContext missing</div>;

  const { places, selectedPlaceCode, forecast, loadingPlaces, loadingForecast, error } = ctx;

  if (loadingPlaces) return <div>Loading places...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Heading>Weather Forecast</Heading>

      <div>Loaded places: {places.length}</div>
      <div>Selected: {selectedPlaceCode ?? '-'}</div>

      {loadingForecast && <div>Loading forecast...</div>}

      {forecast && (
        <ul>
          {forecast.forecastTimestamps.slice(0, 5).map((t) => (
            <li key={t.forecastTimeUtc}>
              {t.forecastTimeUtc} | temp: {t.airTemperature} | wind: {t.windSpeed} | hum: {t.relativeHumidity}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default WeatherPage;