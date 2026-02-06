import WeatherIcon from '../atoms/WeatherIcon';
import type { WeatherCurrentCardProps } from '../../../types';

const WeatherCurrentCard = ({
  selectedPlaceName,
  loadingForecast,
  currentWeather,
  currentIcon,
  currentTempText,
}: WeatherCurrentCardProps) => {
  return (
    <article className="weatherCard weatherCard--current">
      <div className="weatherCard__title">{selectedPlaceName}</div>

      {loadingForecast && <div className="weatherCard__loading">Loading forecast...</div>}

      {!loadingForecast && currentWeather && (
        <>
          <div className="weatherCard__bigRow">
            <div className="weatherCard__temp">{currentTempText}</div>

            <div className="weatherCard__sub">
              <div className="weatherCard__time">{currentWeather.forecastTimeUtc}</div>
              <div className="weatherCard__condRow">
                <WeatherIcon name={currentIcon} className="wxIcon" />
                <span className="weatherCard__condText">{currentWeather.conditionCode ?? '-'}</span>
              </div>
            </div>
          </div>

          <div className="weatherCard__metrics">
            <div className="weatherMetric">
              <div className="weatherMetric__label">
                <WeatherIcon name="wind" className="wxIcon" />
                Wind
              </div>
              <div className="weatherMetric__value">{currentWeather.windSpeed} m/s</div>
            </div>

            <div className="weatherMetric">
              <div className="weatherMetric__label">
                <WeatherIcon name="cloud" className="wxIcon" />
                Humidity
              </div>
              <div className="weatherMetric__value">{currentWeather.relativeHumidity} %</div>
            </div>

            <div className="weatherMetric">
              <div className="weatherMetric__label">
                <WeatherIcon name="cloud" className="wxIcon" />
                Pressure
              </div>
              <div className="weatherMetric__value">{currentWeather.seaLevelPressure} hPa</div>
            </div>

            <div className="weatherMetric">
              <div className="weatherMetric__label">
                <WeatherIcon name="rain" className="wxIcon" />
                Precipitation
              </div>
              <div className="weatherMetric__value">{currentWeather.totalPrecipitation} mm</div>
            </div>
          </div>
        </>
      )}

      {!loadingForecast && !currentWeather && <div className="weatherCard__empty">Select a city to see forecast.</div>}
    </article>
  );
};

export default WeatherCurrentCard;