import { DndProvider } from "react-dnd";
import styles from "./Menu.module.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import React from "react";

const Menu = () => {
  return (
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
  );
};

export default React.memo(Menu);
