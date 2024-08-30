import { Weather } from "../../hooks/useWheater";
import { formatTemperature } from "../../utils";
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
  weather: Weather;
};

export const WeatherDetail = ({ weather }: WeatherDetailProps) => {
  return (
    <div className={styles.marco}>
      <h2>Clima de: {weather.name}</h2>
      <p className={styles.weather}>{formatTemperature(weather.main.temp)}&deg;C</p>
      <div className={styles.second}>
        <p>Max: {formatTemperature(weather.main.temp_max)}&deg;C</p>
        <p>Min: {formatTemperature(weather.main.temp_min)}&deg;C</p>
      </div>
    </div>
  );
};
