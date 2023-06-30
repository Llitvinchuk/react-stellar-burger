import styles from "./app.module.css";
import { AppHeader } from "../appHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { data } from "../../utils/data";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState({
    bun: undefined,
    ingredients: [],
  });

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={`${styles.main} ${styles.columns}`}>
        <section className={`${styles.column} ${styles.columns}`}>
          <div className={`${styles.article} ${styles.first__article}`}>
            <BurgerIngredients data={data} order={order} setOrder={setOrder} />
          </div>
        </section>
        <BurgerConstructor data={data} order={order} setOrder={setOrder} />
      </div>
    </div>
  );
}

export default App;
