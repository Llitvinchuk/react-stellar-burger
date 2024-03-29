import React, { useReducer, useEffect, useMemo, useCallback } from "react";
import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";

import {
  addBurgerIngredient,
  moveIngredient,
} from "../../services/actions/BurgerConstructorAction";
import {
  closeOrderDetailsModal,
  openOrderDetailsModal,
  postOrder,
} from "../../services/actions/OrderDetailsAction";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDrop } from "react-dnd";
import { BurgerIngredientMove } from "../BurgerIngredients/BurgerIngredientMove";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

export const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const { isOrderPopupOpened } = useAppSelector((state) => state.orderDetails);

  const bun = useAppSelector((state) => state.burger.bun);

  const ingredients = useAppSelector((state) => state.burger.ingredients);

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      dispatch(addBurgerIngredient(item));
    },
  });

  const moveIngredientHandler = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredient(dragIndex, hoverIndex));
  };

  type TPriceState = {
    count: number;
    ids: any;
  };

  interface IAction {
    type: "change";
  }

  const initialState: TPriceState = {
    count: 0,
    ids: [],
  };

  function reducer(state: TPriceState, action: IAction) {
    switch (action.type) {
      case "change":
        const ingredientPrice = ingredients
          .map((ingredient) => ingredient.price)
          .reduce((prev, current) => {
            return prev + current;
          }, 0);
        const bunsPrice = bun ? bun.price * 2 : 0;
        const total = ingredientPrice + bunsPrice;
        const IDs = [bun?._id, ...ingredients.map((item) => item._id)];
        return { count: total, ids: IDs };
      default:
        return state;
    }
  }

  const [state, dispatchState] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatchState({ type: "change" });
  }, [ingredients, bun]);

  const total = state.count;

  const orderedIngredients = useMemo(
    () => ingredients.map((m) => m._id),
    [ingredients]
  );

  const authUser = useAppSelector((store) => store.authReducer.authUser);

  const navigate = useNavigate();

  function onClick() {
    if (!authUser) {
      navigate("/login?redirect=/");
    } else {
      handleOpenModal();
    }
  }

  const handleOpenModal = useCallback(() => {
    dispatch(openOrderDetailsModal());
    const allIngredients = [...orderedIngredients];

    if (bun) {
      allIngredients.push(bun._id);
    }

    dispatch(postOrder(allIngredients));
  }, [dispatch, orderedIngredients, bun]);

  const handleCloseOrder = () => {
    dispatch(closeOrderDetailsModal());
    navigate("/");
  };

  return (
    <div className={styles.column} ref={drop}>
      <div className={styles.container}>
        {bun ? (
          <div key={`${bun.id}-top`} className={styles.bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) : null}

        <div className={styles.scrolling}>
          {ingredients.map((element) => {
            return Array(element.qty)
              .fill(element)
              .map((el, index) => {
                return (
                  <div key={element.key} className={styles.listItem}>
                    <DragIcon type="primary" />
                    <div key={element.id} className="w-full">
                      <BurgerIngredientMove
                        ingredient={element}
                        moveIngredientItem={moveIngredientHandler}
                      />
                    </div>
                  </div>
                );
              });
          })}
        </div>

        {bun ? (
          <div key={`${bun.id}-bottom`} className={styles.bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
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
            <CurrencyIcon type="primary" />
          </span>
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={onClick}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isOrderPopupOpened && (
        <Modal onClose={handleCloseOrder} title={""}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};
