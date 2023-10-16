import styles from "./styles.module.css";
import OrderModal from "../components/Order/OrderModal";

export const FeedInfo = () => {
  return (
    <div className={styles.readyOrder}>
      <OrderModal />
    </div>
  );
};
