import WeatherIcon from '../atoms/WeatherIcon';
import type { WeatherTopCitiesProps } from '../../../types';

const WeatherTopCities = ({
  topCities,
  onSelectPlaceCode,
  hasCurrentWeather,
  currentIcon,
  currentTempText,
}: WeatherTopCitiesProps) => {
  return (
    <section className="weatherPage__top">
      <div className="weatherPage__sectionLabel">Mostly viewed</div>

      <div className="weatherPage__topGrid">
        {topCities.map((city) => (
          <button
            key={city.code}
            type="button"
            className="weatherPage__topCard"
            onClick={() => onSelectPlaceCode(city.code)}
          >
            <div className="weatherPage__topCardHeader">
              <div className="weatherPage__topCardName">{city.name}</div>
            </div>

            <div className="weatherPage__topCardFooter">
              <span className="weatherPage__topCardIcon">
                <WeatherIcon name={hasCurrentWeather ? currentIcon : 'cloud'} className="wxIcon" />
              </span>

              <span className="weatherPage__topCardTemp">{currentTempText}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default WeatherTopCities;