import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutRequest,
  updateDataRequest,
} from "../services/actions/AuthActions";

const styleActive = `${styles.link} ${styles.link_active} text text_type_main-medium`;
const styleInactive = `${styles.link} text text_type_main-medium text_color_inactive`;

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const logoutClick = () => {
    dispatch(logoutRequest());
  };

  return (
    <main className={styles.section}>
      <div className={styles.fillings}>
        <div>
          <NavLink
            to={"/profile"}
            className={
              location.pathname === "/profile" ? styleActive : styleInactive
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={"/profile/orders"}
            className={
              location.pathname === "/profile/orders"
                ? styleActive
                : styleInactive
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to={"/"}
            className={location.pathname === "/" ? styleActive : styleInactive}
            onClick={logoutClick}
          >
            Выход
          </NavLink>
          <p
            className={`${styles.p} pt-20 text text_type_main-small text_color_inactive `}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <Outlet />
      </div>
    </main>
  );
};
