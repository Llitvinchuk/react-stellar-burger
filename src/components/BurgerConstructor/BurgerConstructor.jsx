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
  const bunsPrice = order.buns.reduce((prev, bun) => {
    return prev + bun.price * 2;
  }, 0);
  const ingredientPrice = order.ingredients
    .map((i) => i.price * i.qty)
    .reduce((prev, current) => {
      return prev + current;
    }, 0);

  const total = ingredientPrice + bunsPrice;

  return (
    <div className={styles.column}>
      <div className={styles.container}>
        {order.buns.map((element) => {
          return (
            <div key={`${element.id}-top`} className={styles.bun}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${element.name} (верх)`}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
          );
        })}

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
                                  stateIngredient.name === element.name
                              )
                            ) {
                              newState[type] = newState[type].map(
                                (stateIngredient) => {
                                  if (stateIngredient.name === element.name) {
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
        {order.buns.map((element) => {
          return (
            <div key={`${element.id}-bottom`} className={styles.bun}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${element.name} (низ)`}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
          );
        })}
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
