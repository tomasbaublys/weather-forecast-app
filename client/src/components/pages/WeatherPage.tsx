import { useContext } from 'react';
import Container from '../UI/atoms/Container';
import Heading from '../UI/atoms/Heading';
import CitySelect from '../UI/molecules/CitySelect';
import WeatherContext from '../contexts/WeatherContext';

const WeatherPage = () => {
  const ctx = useContext(WeatherContext);

  if (!ctx) return <div>WeatherContext missing</div>;

  const {
    places,
    selectedPlaceCode,
    forecast,
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

      <div>Loaded places: {places.length}</div>
      <div>Selected: {selectedPlaceCode ?? '-'}</div>

      <h3>Top viewed cities</h3>
      <ul>
        {topCities.map((c) => (
          <li key={c.code}>
            <button type="button" onClick={() => setSelectedPlaceCode(c.code)}>
              {c.name} ({c.count})
            </button>
          </li>
        ))}
      </ul>

      {loadingForecast && <div>Loading forecast...</div>}

      {forecast && (
        <ul>
          {forecast.forecastTimestamps.slice(0, 5).map((t) => (
            <li key={t.forecastTimeUtc}>
              {t.forecastTimeUtc} | temp: {t.airTemperature} | wind: {t.windSpeed} | hum:{' '}
              {t.relativeHumidity}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default WeatherPage;