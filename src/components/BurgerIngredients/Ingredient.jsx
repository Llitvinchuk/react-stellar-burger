import { useMemo, useState } from "react";
import styles from "./BurgerIngredients.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

export const Ingredient = ({ element, order, setOrder }) => {
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

  const onClick = () => {
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
  };

  return (
    <div className={styles.ingredient}>
      <div onClick={onClick} className={styles.counter}>
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

Ingredient.propTypes = PropTypes.arrayOf(
  ingredientPropType.isRequired
).isRequired;
