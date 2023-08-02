import styles from "./App.module.css";
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/IngredientAction";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={`${styles.main} ${styles.columns}`}>
        <DndProvider backend={HTML5Backend}>
          <section className={`${styles.column} ${styles.columns}`}>
            <div className={`${styles.article} ${styles.first__article}`}>
              <BurgerIngredients />
            </div>
          </section>

          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
