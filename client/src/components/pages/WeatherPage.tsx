import { useContext, useMemo } from 'react';
import Container from '../UI/atoms/Container';
import Heading from '../UI/atoms/Heading';
import CitySelect from '../UI/molecules/CitySelect';
import WeatherContext from '../contexts/WeatherContext';
import { getCurrentWeather, getDailyForecast } from '../../utils/weatherForecast';
import { buildDailyIconsByDate, conditionToIcon, formatTempC, getSelectedPlaceName } from '../../utils/weatherUi';
import type { WeatherIconName } from '../../types';

import WeatherTopCities from '../UI/organisms/WeatherTopCities';
import WeatherCurrentCard from '../UI/organisms/WeatherCurrentCard';
import WeatherDailyCardList from '../UI/organisms/WeatherDailyCardList';

import '../../styles/weatherPage.scss';

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

  const dailyIconsByDate = useMemo(() => {
    if (!forecast) return new Map<string, WeatherIconName>();

    return buildDailyIconsByDate(
      forecast.forecastTimestamps,
      dailyForecast.map((d) => d.date)
    );
  }, [forecast, dailyForecast]);

  if (!ctx) return <div>WeatherContext missing</div>;

  const { places, loadingPlaces, loadingForecast, error, topCities, setSelectedPlaceCode, selectedPlaceCode } = ctx;

  if (loadingPlaces) return <div>Loading places...</div>;
  if (error) return <div>Error: {error}</div>;

  const selectedPlaceName = getSelectedPlaceName(places, selectedPlaceCode);

  const currentIcon = conditionToIcon(currentWeather?.conditionCode);
  const currentTempText = formatTempC(currentWeather?.airTemperature);

  return (
    <div className="weatherPage">
      <div className="weatherPage__hero" />

      <Container>
        <div className="weatherPage__content">
          <header className="weatherPage__header">
            <Heading>Weather Forecast</Heading>

            <div className="weatherPage__searchWrap">
              <CitySelect
                places={places}
                selectedPlaceCode={selectedPlaceCode}
                onSelectPlaceCode={setSelectedPlaceCode}
              />
            </div>
          </header>

          <WeatherTopCities
            topCities={topCities}
            onSelectPlaceCode={setSelectedPlaceCode}
            hasCurrentWeather={Boolean(currentWeather)}
            currentIcon={currentIcon}
            currentTempText={currentTempText}
          />

          <section className="weatherPage__main">
            <div className="weatherPage__grid">
              <WeatherCurrentCard
                selectedPlaceName={selectedPlaceName}
                loadingForecast={loadingForecast}
                currentWeather={currentWeather}
                currentIcon={currentIcon}
                currentTempText={currentTempText}
              />

              <WeatherDailyCardList
                loadingForecast={loadingForecast}
                dailyForecast={dailyForecast}
                dailyIconsByDate={dailyIconsByDate}
              />
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default WeatherPage;