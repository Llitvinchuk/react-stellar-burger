import React from "react";
import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../../utils/auth";
import { NavLink, useLocation, useMatch } from "react-router-dom";

export const AppHeader = () => {
  const auth = useAuth();
  const location = useLocation();
  return (
    <header>
      <nav>
        <NavLink
          to={{ pathname: "/" }}
          className={`${styles.constructor} text text_type_main-default  mr-2`}
        >
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <BurgerIcon
              type={location.pathname === "/" ? "primary" : "secondary"}
            />
          </div>
          <p
            className={`text text_type_main-default ${
              location.pathname === "/" ? "" : "text_color_inactive"
            }`}
          >
            Конструктор
          </p>
        </NavLink>
        <NavLink href="" className={`${styles.constructor}`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ListIcon
              type={location.pathname === "/orders" ? "primary" : "secondary"}
            />
          </div>
          <p
            className={`text text_type_main-default ${
              location.pathname === "/orders" ? "" : "text_color_inactive"
            } ml-2`}
          >
            Лента заказов
          </p>
        </NavLink>
        <div className={`${styles.logo} ${styles.constructor}`}>
          <Logo />
        </div>
        <NavLink
          to={auth.user ? { pathname: "/profile" } : { pathname: "/login" }}
          className={`${styles.constructor} ${styles.profile}`}
        >
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ProfileIcon
              type={location.pathname === "/profile" ? "primary" : "secondary"}
            />
          </div>
          <p
            className={`text text_type_main-default ${
              location.pathname === "/profile" ? "" : "text_color_inactive"
            } ml-2`}
          >
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
