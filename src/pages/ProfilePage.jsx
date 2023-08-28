import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { userDataRequest } from "../utils/api";
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

  const [form, setValue] = useState({
    name: "",
    password: "",
    email: "",
  });

  const user = useSelector((store) => store.authReducer.user);
  useEffect(() => {
    setValue(user);
  }, [user]);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDataRequest(form));
  };

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
        <form className={`${styles.inputs} ml-15`} onSubmit={onSubmit}>
          <div className="mb-6">
            <Input
              value={form?.name || ""}
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              icon={"EditIcon"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={onChange}
            />
          </div>
          <div className="mb-6">
            <Input
              value={form?.email || ""}
              type={"email"}
              placeholder={"Логин"}
              name={"email"}
              icon={"EditIcon"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={onChange}
            />
          </div>
          <div className="mb-6">
            <Input
              value={form?.password || ""}
              type={"password"}
              placeholder={"Пароль"}
              name={"password"}
              icon={"EditIcon"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={onChange}
            />
          </div>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
      </div>
    </main>
  );
};
