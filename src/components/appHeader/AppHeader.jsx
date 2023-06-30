import React from "react";
import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
  return (
    <header>
      <nav>
        <a
          href=""
          className={`${styles.constructor} text text_type_main-default  mr-2`}
        >
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <BurgerIcon type="primary" />
          </div>
          <p className={`text text_type_main-default`}>Конструктор</p>
        </a>
        <a href="" className={`${styles.constructor}`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ListIcon type="secondary" />
          </div>
          <p className={"text text_type_main-default text_color_inactive"}>
            Лента заказов
          </p>
        </a>
        <div className={`${styles.logo} ${styles.constructor}`}>
          <Logo />
        </div>
        <a href="" className={`${styles.constructor} ${styles.profile}`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ProfileIcon type="secondary" />
          </div>
          <p className={"text text_type_main-default text_color_inactive"}>
            Личный кабинет
          </p>
        </a>
      </nav>
    </header>
  );
};
