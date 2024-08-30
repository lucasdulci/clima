import styles from "./App.module.css";
import { Alert } from "./components/Alert/Alert";
import { Form } from "./components/Form/Form";
import { WeatherDetail } from "./components/WeatherDetail/WeatherDetail";
import useWheater from "./hooks/useWheater";

function App() {
  const { weather, notFound, fetchWheater, hasWeatherData } = useWheater();

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWheater={fetchWheater} />
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App;
