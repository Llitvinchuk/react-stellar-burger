import React from "react";
import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

export const BurgerConstructor = ({ order, setOrder }) => {
  const bunsPrice = order.bun?.price || 0;
  const ingredientPrice = order.ingredients
    .map((ingredient) => ingredient.price * ingredient.qty)
    .reduce((prev, current) => {
      return prev + current;
    }, 0);

  const total = ingredientPrice + bunsPrice;

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
                          setOrder((prevOrder) => {
                            const type =
                              element.type === "bun" ? "buns" : "ingredients";

                            const newState = { ...prevOrder };

                            if (
                              newState[type].find(
                                (stateIngredient) =>
                                  stateIngredient._id === element._id
                              )
                            ) {
                              newState[type] = newState[type].map(
                                (stateIngredient) => {
                                  if (stateIngredient._id === element._id) {
                                    return {
                                      ...stateIngredient,
                                      qty: stateIngredient.qty--,
                                    };
                                  }

                                  return stateIngredient;
                                }
                              );
                            } else {
                              newState[type].push({ ...element, qty: 1 });
                            }

                            return newState;
                          });
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
          <Button type="primary" size="large" htmlType="button">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
