import React, {
  useState,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerConstructorContext } from "../../utils/BurgerConstructorContext";

export const BurgerConstructor = () => {
  const { order, setOrder, toggleOrderModal } = useContext(
    BurgerConstructorContext
  );

  const initialState = {
    count: 0,
    ids: [],
  };

  function reducer(state, action) {
    switch (action.type) {
      case "change":
        const ingredientPrice = order.ingredients
          .map((ingredient) => ingredient.price * ingredient.qty)
          .reduce((prev, current) => {
            return prev + current;
          }, 0);
        const bunsPrice = order.bun?.price * 2 || 0;
        const total = ingredientPrice + bunsPrice;
        const IDs = [
          order.bun?._id,
          ...order.ingredients.map((item) => item._id),
        ];
        return { count: total, ids: IDs };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "change" });
  }, [order]);

  const total = state.count;

  const handleClose = (element) => {
    setOrder((prevOrder) => {
      const type = element.type === "bun" ? "bun" : "ingredients";

      const newState = { ...prevOrder };

      if (
        newState[type].some(
          (stateIngredient) => stateIngredient._id === element._id
        )
      ) {
        newState[type] = newState[type].map((stateIngredient) => {
          if (stateIngredient._id === element._id) {
            return {
              ...stateIngredient,
              qty: stateIngredient.qty - 1,
            };
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
    <div className={styles.column}>
      <div className={styles.container}>
        {order.bun ? (
          <div key={`${order.bun.id}-top`} className={styles.bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${order.bun.name} (верх)`}
              price={order.bun.price}
              thumbnail={order.bun.image}
            />
          </div>
        ) : null}

        <div className={styles.scrolling}>
          {order.ingredients.map((element) => {
            return Array(element.qty)
              .fill(element)
              .map((el, index) => {
                return (
                  <div
                    key={`${element.id}-${index}`}
                    className={styles.listItem}
                  >
                    <DragIcon type="primary" />
                    <div key={element.id} className="w-full">
                      <ConstructorElement
                        text={`${element.name} (низ)`}
                        price={element.price}
                        thumbnail={element.image}
                        handleClose={() => {
                          handleClose(element);
                        }}
                      />
                    </div>
                  </div>
                );
              });
          })}
        </div>

        {order.bun ? (
          <div key={`${order.bun.id}-bottom`} className={styles.bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${order.bun.name} (низ)`}
              price={order.bun.price}
              thumbnail={order.bun.image}
            />
          </div>
        ) : null}
      </div>
      <div className={`${styles.currency}  `}>
        <div className={`${styles.order_button} `}>
          <span
            className={`${styles.currencyText} text text_type_digits-medium `}
          >
            {total}
            <CurrencyIcon />
          </span>
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={toggleOrderModal}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};
