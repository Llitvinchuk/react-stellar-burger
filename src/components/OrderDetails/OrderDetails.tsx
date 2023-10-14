import styles from "./OrderDetails.module.css";
import doneIcon from "../../images/graphics.svg";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../utils/hooks";

const OrderDetails = () => {
  const { orderNum } = useAppSelector((state) => state.orderDetails);

  return (
    <div>
      <p className="mt-30 text text_type_digits-large">
        {orderNum?.order?.number || ""}
      </p>
      <p className={`${styles.mediumText} mt-8 text text_type_main-medium`}>
        идентефикатор заказа
      </p>
      <div className={`${styles.doneIcon}`}>
        <img src={doneIcon} />
      </div>
      <p className={`${styles.smallText} mb-2 text text_type_main-small`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.smallText} mb-30 text text_type_main-small text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
