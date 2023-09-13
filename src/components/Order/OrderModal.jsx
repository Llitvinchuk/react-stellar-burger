import { useParams } from "react-router";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";
import styles from "./Order.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getOrderByNumber } from "../../services/actions/OrderDetailsAction";

export default function OrderModal() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { number } = useParams();

  const ingredients = useSelector((state) => {
    return state.ingredients.data;
  });
  const orderIngredients = [];
  const { orders, userOrders } = useSelector((store) => ({
    orders: store.wsReducer.orders,
    userOrders: store.wsReducer.userOrders,
  }));

  useEffect(() => {
    if (!orders.length) {
      dispatch(getOrderByNumber(number));
    }
  }, []);

  const selectedOrders = location.pathname.includes("/profile/orders")
    ? userOrders
    : orders;

  const order =
    selectedOrders &&
    selectedOrders.find((element) => element.number === parseInt(number));

  order?.ingredients.forEach((order) => {
    const newIngredient = ingredients.find(
      (ingredient) => ingredient._id === order
    );
    if (newIngredient) {
      newIngredient.count = 1;
      orderIngredients.push(newIngredient);
    }
  });

  const mergedIngredients = orderIngredients?.reduce((item, ingredient) => {
    const existingIngredient = item.find((item) => item._id === ingredient._id);
    if (!existingIngredient) {
      if (ingredient.type === "bun") {
        item.push({ ...ingredient, count: 2 });
      } else {
        item.push({ ...ingredient, count: 1 });
      }
    } else {
      if (existingIngredient.count !== undefined && ingredient.type !== "bun") {
        existingIngredient.count++;
      }
    }

    return item;
  }, []);

  const totalPrice = mergedIngredients?.reduce((acc, item) => {
    return acc + item.price * (item.count || 0);
  }, 0);

  return (
    <div className={`${styles.section} `}>
      <h2 className={`text text_type_digits-default mb-10 ${styles.number}`}>
        #{order?.number}
      </h2>
      <h3 className={`text text_type_main-medium mb-3 ${styles.name}`}>
        {order?.name}
      </h3>
      <p
        className={`text text_type_main-default mt-3 text_color_success ${styles.name}`}
      >
        {order?.status === "done" ? "Выполнен" : "В работе"}
      </p>
      <h4 className={`text text_type_main-medium mt-15 ${styles.name} mb-6`}>
        Состав:
      </h4>
      <div className={`${styles.main__list} pr-6`}>
        {mergedIngredients.map((item, index) => (
          <div className={styles.main__listItem} key={index}>
            <div className={styles.main__items}>
              <div className={`${styles.main__ingredient} mr-4`}>
                <img
                  className={styles.main__image}
                  src={item?.image_mobile}
                  alt={item?.name}
                />
              </div>
              <p className="text text_type_main-default">{item?.name}</p>
            </div>

            <div className={styles.priceBlock}>
              <p className={`text text_type_digits-default ${styles.wrap}`}>
                {`${item.type === "bun" ? 2 : item.count} x ${item.price}`}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.footer} mt-10`}>
        <FormattedDate
          className={`text text_type_main-default mr-2`}
          date={new Date()}
        />
        <div className={styles.orderPrice}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}
