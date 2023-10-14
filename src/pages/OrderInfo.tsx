import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { WS_PROFILE_CONNECTION_START } from "../services/actions/WebsocketActions";
import styles from "./styles.module.css";
import OrderModal from "../components/Order/OrderModal";
import { useAppDispatch } from "../utils/hooks";

export const OrderInfo = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken")?.split(" ")?.[1];

  useEffect(() => {
    dispatch({ type: WS_PROFILE_CONNECTION_START, payload: `?token=${token}` });
  }, [dispatch, token]);

  return (
    <div className={styles.readyOrder}>
      <OrderModal />
    </div>
  );
};
