import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate, Navigate } from "react-router-dom";

import { registerRequest } from "../services/actions/AuthActions";
import { useAppDispatch } from "../utils/hooks";

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginClick = () => {
    navigate("/login");
  };

  const [form, setValue] = useState(() => ({
    name: "",
    email: "",
    password: "",
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(registerRequest(form));
  };

  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <h2 className="text text_type_main-large mb-6">Регистрация</h2>
      <div className="mb-6">
        <Input
          value={form.name}
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          onChange={onChange}
        />
      </div>
      <div className="mb-6">
        <Input
          value={form.email}
          type={"email"}
          placeholder={"E-mail"}
          name={"email"}
          onChange={onChange}
        />
      </div>
      <div className="mb-6">
        <Input
          value={form.password}
          type={"password"}
          placeholder={"Пароль"}
          name={"password"}
          icon="ShowIcon"
          onChange={onChange}
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium">
        Зарегистрироваться
      </Button>
      <div className={`mt-20 ${styles.footer}`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистированы?
        </p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={loginClick}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
