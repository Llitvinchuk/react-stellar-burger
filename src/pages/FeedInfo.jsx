import { useDispatch, useSelector } from "react-redux";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../services/actions/WebsocketActions";
import { useEffect } from "react";
import styles from "./styles.module.css";
import OrderModal from "../components/Order/OrderModal";

export const FeedInfo = () => {
  return (
    <div className={styles.readyOrder}>
      <OrderModal />
    </div>
  );
};
