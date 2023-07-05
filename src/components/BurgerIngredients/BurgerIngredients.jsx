import React, { useMemo, useState } from "react";
import styles from "./BurgerIngredients.module.css";
import {
  Tab,
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

export const BurgerIngredients = ({ data, order, setOrder }) => {
  const [current, setCurrent] = React.useState("buns");

  const buns = useMemo(() => data.filter((item) => item.type === "bun"));
  const sauces = useMemo(() => data.filter((item) => item.type === "sauce"));
  const main = useMemo(() => data.filter((item) => item.type === "main"));

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

const Ingredient = ({ element, order, setOrder }) => {
  const [show, setShow] = useState(false);
  const orderType = element.type === "bun" ? "bun" : "ingredients";
  const qty = useMemo(() => {
    if (orderType === "bun") {
      if (order.bun?._id) {
        return order.bun._id === element._id ? 1 : 0;
      }

      return 0;
    } else {
      return (
        order[orderType].find(
          (orderIngredient) => orderIngredient._id === element._id
        )?.qty || 0
      );
    }
  }, [order]);

  return (
    <div className={styles.ingredient}>
      <div
        onClick={() => {
          setOrder((prevOrder) => {
            const type = element.type === "bun" ? "bun" : "ingredients";

            const newState = { ...prevOrder };

            if (type === "bun") {
              if (newState[type]) {
                return newState;
              } else {
                newState.bun = element;

                return newState;
              }
            }

            if (
              newState[type].find(
                (stateIngredient) => stateIngredient._id === element._id
              )
            ) {
              newState[type] = newState[type].map((stateIngredient) => {
                if (stateIngredient._id === element._id) {
                  return { ...stateIngredient, qty: stateIngredient.qty++ };
                }

                return stateIngredient;
              });
            } else {
              newState[type].push({ ...element, qty: 1 });
            }

            return newState;
          });
        }}
      >
        <Counter count={qty} size="default" />
      </div>
      <div onClick={() => setShow(true)}>
        <img
          className="ml-4 mr-4 mb-1"
          alt={element.name}
          src={element.image}
        />
      </div>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{element.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default`}>{element.name}</p>
      {show && (
        <Modal title="Детали ингредиента" onClose={() => setShow(false)}>
          <IngredientDetails {...element} />
        </Modal>
      )}
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
Ingredient.propTypes = PropTypes.arrayOf(
  ingredientPropType.isRequired
).isRequired;
