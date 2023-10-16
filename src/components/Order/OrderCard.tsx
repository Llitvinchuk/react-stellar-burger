import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Order.module.css";
import { useEffect, useState } from "react";
import { TWSOrder } from "../../services/actions/WebsocketActions";
import { useAppSelector } from "../../utils/hooks";
import { TIngredient } from "../../utils/types";

type OrderCardProps = {
  order: TWSOrder;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderIngr, setOrderIngr] = useState<TIngredient[]>([]);

  const ingredients = useAppSelector((state) => {
    return state.ingredients.data;
  });

  useEffect(() => {
    if (order && order.ingredients) {
      const items: TIngredient[] = order.ingredients.map(
        (item) =>
          ingredients?.find(
            (newIngredient) => newIngredient._id === item
          ) as TIngredient
      );
      setOrderIngr(items);
    }
  }, [ingredients, order]);

  const totalPrice = (ingredients: TIngredient[]) => {
    const bun = ingredients?.find((ingredient) => ingredient?.type === "bun");
    const otherIngredient = ingredients.filter(
      (ingredient) => ingredient?.type !== "bun"
    );
    const otherIngredientPrice = otherIngredient.reduce(
      (acc, item) => acc + item?.price * (item?.count || 1),
      0
    );
    const bunPrice = bun ? bun.price * 2 : 0;

    return bunPrice + otherIngredientPrice;
  };

  const openOrderModal = () => {
    if (location.pathname.indexOf("feed") === -1) {
      navigate(`/profile/orders/${order.number}`, {
        state: { background: location },
      });
    } else {
      navigate(`/feed/${order.number}`, { state: { background: location } });
    }
  };

  return (
    <div className={styles.orderCard} onClick={openOrderModal}>
      <div className={styles.orderCardHeader}>
        <p className={`text text_type_digits-default`}>#{order.number}</p>
        <FormattedDate
          className={`text text_type_main-default text_color_inactive mr-2`}
          date={new Date(order.updatedAt)}
        />
      </div>
      <p className={`${styles.orderBurgerName} text text_type_main-medium`}>
        {order.name}
      </p>
      <div>
        <p
          className={
            order?.status === "done"
              ? "text text_type_main-default text_color_success"
              : "text text_type_main-default"
          }
        >
          {order?.status === "done" ? "Выполнен" : "Готовится"}
        </p>
      </div>
      <div className={styles.orderFooter}>
        <div className={styles.orderIngredients}>
          {orderIngr?.map((item, index) => {
            if (index === 0 && orderIngr?.length > 6) {
              return (
                <div key={index} className={styles.imageContainer}>
                  <img
                    className={styles.image}
                    src={item?.image_mobile}
                    alt={item?.name}
                  />
                  <p className={`${styles.count} text text_type_main-default`}>
                    +{orderIngr?.length - 6}
                  </p>
                </div>
              );
            } else if (index <= 6) {
              return (
                <div key={index} className={styles.imageContainer}>
                  <img
                    className={styles.image}
                    src={item?.image_mobile}
                    alt={item?.name}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className={styles.orderPrice}>
          <p className="text text_type_digits-default mr-2">
            {totalPrice(orderIngr)}
          </p>
          <CurrencyIcon type={"primary"} />
        </div>
      </div>
    </div>
  );
};
