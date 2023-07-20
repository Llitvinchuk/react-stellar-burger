import React, { useMemo } from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { Ingredient } from "./Ingredient";

export const BurgerIngredients = ({ data, order, setOrder }) => {
  const [current, setCurrent] = React.useState("buns");

  const buns = useMemo(
    () => data.filter((item) => item.type === "bun"),
    [data]
  );
  const sauces = useMemo(
    () => data.filter((item) => item.type === "sauce"),
    [data]
  );
  const main = useMemo(
    () => data.filter((item) => item.type === "main"),
    [data]
  );

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    data && (
      <>
        <h1 className={`${styles.title} text text_type_main-large mb-5`}>
          Соберите бургер
        </h1>
        <div className={styles.container}>
          <Tab
            value="buns"
            active={current === "buns"}
            onClick={() => {
              setTab("buns");
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={current === "sauces"}
            onClick={() => {
              setTab("sauces");
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={current === "main"}
            onClick={() => {
              setTab("main");
            }}
          >
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          <p
            id="buns"
            className={`${styles.title} text text_type_main-medium mt-10`}
          >
            Булки
          </p>
          <div className={styles.buns}>
            {buns.map((element) => (
              <Ingredient
                key={element._id}
                element={element}
                order={order}
                setOrder={setOrder}
              />
            ))}
          </div>
          <p
            id="sauces"
            className={`${styles.title} text text_type_main-medium mt-10 mb-6`}
          >
            Соусы
          </p>
          <div className={styles.sauces}>
            {sauces.map((element) => (
              <Ingredient
                key={element._id}
                element={element}
                order={order}
                setOrder={setOrder}
              />
            ))}
          </div>
          <p
            id="main"
            className={`${styles.title} text text_type_main-medium mt-10 mb-6`}
          >
            Начинки
          </p>
          <div className={styles.mains}>
            {main.map((element) => (
              <Ingredient
                key={element._id}
                element={element}
                order={order}
                setOrder={setOrder}
              />
            ))}
          </div>
        </div>
      </>
    )
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
