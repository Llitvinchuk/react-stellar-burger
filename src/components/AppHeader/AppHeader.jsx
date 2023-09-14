import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink, useLocation, useMatch } from "react-router-dom";

export const AppHeader = () => {
  const isMainPage = useMatch("/");
  const isOrderPage = useMatch("/feed");
  const isProfilePage = useMatch("/profile/*");

  return (
    <header>
      <nav>
        <NavLink
          to={{ pathname: "/" }}
          className={`${styles.constructor} text text_type_main-default  mr-2`}
        >
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <BurgerIcon type={isMainPage ? "primary" : "secondary"} />
          </div>
          <p
            className={`text text_type_main-default ${
              isMainPage ? "" : "text_color_inactive"
            }`}
          >
            Конструктор
          </p>
        </NavLink>
        <NavLink to="/feed" className={`${styles.constructor}`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ListIcon type={isOrderPage ? "primary" : "secondary"} />
          </div>
          <p
            className={`text text_type_main-default ${
              isOrderPage ? "" : "text_color_inactive"
            } ml-2`}
          >
            Лента заказов
          </p>
        </NavLink>
        <div className={`${styles.logo} ${styles.constructor}`}>
          <Logo />
        </div>
        <NavLink
          to="/profile"
          className={`${styles.constructor} ${styles.profile}`}
        >
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ProfileIcon type={isProfilePage ? "primary" : "secondary"} />
          </div>
          <p
            className={`text text_type_main-default ${
              isProfilePage ? "" : "text_color_inactive"
            } ml-2`}
          >
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
