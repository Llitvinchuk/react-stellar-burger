import styles from "./app.module.css";
import { AppHeader } from "../appHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { useState, useEffect } from "react";
import { getIngredients } from "../../utils/api";

function App() {
  const [order, setOrder] = useState({
    bun: undefined,
    ingredients: [],
  });

  const [ingredients, setIngredients] = useState({
    isLoading: true,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    setIngredients((prevState) => ({ ...prevState, isLoading: true }));

    getIngredients()
      .then((res) => {
        setIngredients({
          isLoading: false,
          hasError: false,
          data: res.data,
        });
      })
      .catch((error) => {
        setIngredients((prevState) => ({
          ...prevState,
          hasError: true,
          isLoading: false,
        }));
      });
  }, []);

  if (ingredients.isLoading) return <p>Загрузка...</p>;
  else if (ingredients.hasError)
    return <p>Произошла ошибка, пожалуйста попробуйте снова</p>;

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={`${styles.main} ${styles.columns}`}>
        <section className={`${styles.column} ${styles.columns}`}>
          <div className={`${styles.article} ${styles.first__article}`}>
            <BurgerIngredients
              data={ingredients.data}
              order={order}
              setOrder={setOrder}
            />
          </div>
        </section>
        <BurgerConstructor
          data={ingredients.data}
          order={order}
          setOrder={setOrder}
        />
      </div>
    </div>
  );
}

export default App;
