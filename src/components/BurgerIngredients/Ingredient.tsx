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
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

export const Ingredient = ({ element }: { element: TIngredient }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: element,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.3 : 1;

  const bun = useAppSelector((state) => state.burger.bun);

  const ingredients = useAppSelector((state) => state.burger.ingredients);

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
    <Link
      to={`/ingredients/${element._id}`}
      state={{ background: location }}
      className={styles.ingredient}
      style={{ opacity }}
      ref={drag}
    >
      <div onClick={onClick} className={styles.counter}>
        <Counter count={qty} size="default" />
      </div>
      <img className="ml-4 mr-4 mb-1" alt={element.name} src={element.image} />

      <div className={styles.price}>
        <p className="text text_type_digits-default">{element.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default`}>{element.name}</p>
    </Link>
  );
};

Ingredient.propTypes = PropTypes.arrayOf(
  ingredientPropType.isRequired
).isRequired;
