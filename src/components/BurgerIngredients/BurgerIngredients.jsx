import React, { useMemo } from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "./Ingredient";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import {
  closeIngredientDetailsModal,
  deletePopupIngredient,
  openIngredientDetailsModal,
  setPopupIngredient,
} from "../../services/actions/IngredientDetailsAction";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

export const BurgerIngredients = () => {
  const data = useSelector((state) => {
    return state.ingredients.data;
  });
  const [current, setCurrent] = React.useState("buns");
  const { isPopupIngredientOpened } = useSelector(
    (state) => state.ingredientDetails
  );

  const dispatch = useDispatch();

  const buns = useMemo(() => {
    return data.filter((item) => item.type === "bun");
  }, [data]);

  const handleOpenModalIngredient = (element) => {
    dispatch(openIngredientDetailsModal());
    dispatch(setPopupIngredient(element));
  };
  const handleCloseModalIngredient = () => {
    dispatch(closeIngredientDetailsModal());
    dispatch(deletePopupIngredient());
  };

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

  const [bunRef, bunInView] = useInView();
  const [sauceRef, sauceInView] = useInView();
  const [mainRef, mainInView] = useInView();

  return (
    data && (
      <>
        <h1 className={`${styles.title} text text_type_main-large mb-5`}>
          Соберите бургер
        </h1>
        <div className={styles.container}>
          <Tab
            value="buns"
            active={bunInView === true}
            onClick={() => {
              setTab("buns");
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={sauceInView === true}
            onClick={() => {
              setTab("sauces");
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={mainInView === true}
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
          <div className={styles.buns} ref={bunRef}>
            {buns.map((element) => (
              <Ingredient key={element._id} element={element} />
            ))}
          </div>
          <p
            id="sauces"
            className={`${styles.title} text text_type_main-medium mt-10 mb-6`}
          >
            Соусы
          </p>
          <div className={styles.sauces} ref={sauceRef}>
            {sauces.map((element) => (
              <Ingredient key={element._id} element={element} />
            ))}
          </div>
          <p
            id="main"
            className={`${styles.title} text text_type_main-medium mt-10 mb-6`}
          >
            Начинки
          </p>
          <div className={styles.mains} ref={mainRef}>
            {main.map((element) => (
              <Ingredient key={element._id} element={element} />
            ))}
          </div>
        </div>
      </>
    )
  );
};
