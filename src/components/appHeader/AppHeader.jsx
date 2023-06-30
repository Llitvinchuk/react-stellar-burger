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
        <div className={`${styles.constructor}  mr-2`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <BurgerIcon type="primary" />
          </div>
          <p className={`text text_type_main-default`}>Конструктор</p>
        </div>
        <div className={`${styles.constructor}`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ListIcon type="secondary" />
          </div>
          <p className={"text text_type_main-default text_color_inactive"}>
            Лента заказов
          </p>
        </div>
        <div className={`${styles.logo} ${styles.constructor}`}>
          <Logo />
        </div>
        <div className={`${styles.constructor} ${styles.profile}`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ProfileIcon type="secondary" />
          </div>
          <p className={"text text_type_main-default text_color_inactive"}>
            Личный кабинет
          </p>
        </div>
      </nav>
    </header>
  );
};
