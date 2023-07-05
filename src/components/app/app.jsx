import styles from "./app.module.css";
import { AppHeader } from "../appHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { data } from "../../utils/data";
import { useState, useEffect } from "react";

const URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [order, setOrder] = useState({
    bun: undefined,
    ingredients: [],
  });
  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    setState({ ...state, isLoading: true });
    fetch(URL)
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response.status);
      })
      .then((data) => {
        setState({
          ...state,
          isLoading: false,
          hasError: false,
          data: data.data,
        });
      })
      .catch((err) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

  if (state.isLoading) return <p>Загрузка...</p>;
  else if (state.hasError)
    return <p>Произошла ошибка, пожалуйста попробуйте снова</p>;

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={`${styles.main} ${styles.columns}`}>
        <section className={`${styles.column} ${styles.columns}`}>
          <div className={`${styles.article} ${styles.first__article}`}>
            <BurgerIngredients
              data={state.data}
              order={order}
              setOrder={setOrder}
            />
          </div>
        </section>
        <BurgerConstructor
          data={state.data}
          order={order}
          setOrder={setOrder}
        />
      </div>
    </div>
  );
}

export default App;
