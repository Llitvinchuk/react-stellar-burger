import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_GET_PROFILE_ORDERS,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_CONNECTION_START,
} from "../services/actions/WebsocketActions";
import styles from "./styles.module.css";
import { OrderCard } from "../components/Order/OrderCard";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../utils/hooks";
import { RootState } from "../utils/types";

export const OrderPage = () => {
  const dispatch = useAppDispatch();

  const { usersOrders } = useSelector((store: RootState) => ({
    usersOrders: store.wsReducer.userOrders,
  }));

  const token = localStorage.getItem("accessToken")?.split(" ")?.[1];

  useEffect(() => {
    dispatch({
      type: WS_PROFILE_CONNECTION_START,
      payload: `?token=${token}`,
    });
    // dispatch({
    //   type: WS_GET_PROFILE_ORDERS,
    //   payload: `?token=${token}`,
    // });
    return () => {
      dispatch({ type: WS_PROFILE_CONNECTION_CLOSED });
    };
  }, [dispatch, token]);

  const reverseOrders = usersOrders?.reverse();
  return (
    <div>
      <section className={styles.OrdersSection}>
        {reverseOrders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </section>
    </div>
  );
};
