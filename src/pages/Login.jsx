import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate, Navigate, useLocation, redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../services/actions/AuthActions";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const redirectPath = query?.get("redirect");

  const authUser = useSelector((store) => store.authReducer.authUser);

  useEffect(() => {
    if (authUser) {
      if (redirectPath) {
        return navigate(redirectPath);
      }
      navigate("/profile");
    }
  }, [authUser, navigate, redirectPath]);

  const registrButtonClick = () => {
    navigate("/register");
  };

  const resetPasswordClick = () => {
    navigate("/forgot-password");
  };

  const dispatch = useDispatch();

  const [form, setValue] = useState(() => ({ email: "", password: "" }));

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(form));
  };

  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <h2 className="text text_type_main-large mb-6">Вход</h2>
      <div className="mb-6">
        <Input
          value={form.email || ""}
          type={"email"}
          placeholder={"E-mail"}
          name={"email"}
          onChange={onChange}
        />
      </div>
      <div className="mb-6">
        <Input
          value={form.password || ""}
          type={"password"}
          placeholder={"Пароль"}
          name={"password"}
          icon="ShowIcon"
          onChange={onChange}
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium">
        Войти
      </Button>
      <div className={`mt-20 ${styles.footer}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вы новый пользователь?
        </p>
        <Button
          onClick={registrButtonClick}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Button
          onClick={resetPasswordClick}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          Восстановить пароль
        </Button>
      </div>
    </form>
  );
};
