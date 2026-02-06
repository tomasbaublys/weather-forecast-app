import WeatherIcon from '../atoms/WeatherIcon';
import type { WeatherDailyCardListProps } from '../../../types';

const WeatherDailyCardList = ({ loadingForecast, dailyForecast, dailyIconsByDate }: WeatherDailyCardListProps) => {
  return (
    <article className="weatherCard weatherCard--daily">
      <div className="weatherCard__title">5-day forecast</div>

      {loadingForecast && <div className="weatherCard__loading">Loading forecast...</div>}

      {!loadingForecast && dailyForecast.length > 0 && (
        <div className="dailyGrid">
          {dailyForecast.map((day) => {
            const icon = dailyIconsByDate.get(day.date) ?? 'cloud';

            return (
              <div key={day.date} className="dailyCard">
                <div className="dailyCard__date">{day.date}</div>

                <div className="dailyCard__icon">
                  <WeatherIcon name={icon} className="wxIcon" />
                </div>

                <div className="dailyCard__temps">
                  <span className="dailyCard__min">{Math.round(day.minTemp)}°</span>
                  <span className="dailyCard__sep">/</span>
                  <span className="dailyCard__max">{Math.round(day.maxTemp)}°</span>
                </div>

                <div className="dailyCard__meta">wind {day.windMax}</div>
              </div>
            );
          })}
        </div>
      )}

      {!loadingForecast && dailyForecast.length === 0 && (
        <div className="weatherCard__empty">Select a city to see forecast.</div>
      )}
    </article>
  );
};

export default WeatherDailyCardList;