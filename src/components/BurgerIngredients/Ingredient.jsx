import { useMemo, useState } from "react";
import styles from "./BurgerIngredients.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";

import { addBurgerIngredient } from "../../services/actions/BurgerConstructorAction";
import { useDrag } from "react-dnd";

export const Ingredient = ({ element, handleModal }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: element,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.3 : 1;

  const bun = useSelector((state) => state.burger.bun);

  const ingredients = useSelector((state) => state.burger.ingredients);

  const orderType = element.type === "bun" ? "bun" : "ingredients";
  const qty = useMemo(() => {
    if (orderType === "bun") {
      if (bun?._id) {
        return bun._id === element._id ? 1 : 0;
      }

      return 0;
    } else {
      return (
        ingredients.filter(
          (orderIngredient) => orderIngredient._id === element._id
        )?.length || 0
      );
    }
  }, [ingredients, bun, orderType, element]);

  const onClick = () => {
    dispatch(addBurgerIngredient(element));
  };

  return (
    <div className={styles.ingredient} style={{ opacity }} ref={drag}>
      <div onClick={onClick} className={styles.counter}>
        <Counter count={qty} size="default" />
      </div>
      <div onClick={() => handleModal(element)}>
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
    </div>
  );
};

Ingredient.propTypes = PropTypes.arrayOf(
  ingredientPropType.isRequired
).isRequired;
