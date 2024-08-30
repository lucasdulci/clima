import { useState, FormEvent } from "react";
import { countries } from "../../data/countries";
import type { SearchType } from "./types";
import styles from "./Form.module.css";
import { Alert } from "../Alert/Alert";

type FormProps = {
  fetchWheater: (search: SearchType) => Promise<void>;
};

export const Form = ({ fetchWheater }: FormProps) => {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }

    fetchWheater(search);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor='city'>Ciudad:</label>
        <input
          id='city'
          type='text'
          name='city'
          placeholder='Ciudad'
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor='city'>Pais:</label>
        <select
          value={search.country}
          name='country'
          id='country'
          onChange={handleChange}>
          <option value=''>-- Seleccione un País --</option>
          {countries.map(country => (
            <option
            className={styles.country}
              key={country.code}
              value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input
        className={styles.submit}
        type='submit'
        value='Consultar Clima'
      />
    </form>
  );
};
