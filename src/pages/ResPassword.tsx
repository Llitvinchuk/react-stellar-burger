import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate, Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { passwordResetRequest } from "../services/actions/AuthActions";
import { useAppDispatch } from "../utils/hooks";

export const ResPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginClick = () => {
    navigate("/login");
  };

  const [form, setValue] = useState({ password: "", code: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(passwordResetRequest(form.password, form.code));
    navigate("/login");
  };

  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <h2 className="text text_type_main-large mb-6">Восстановление пароля</h2>
      <div className="mb-6">
        <Input
          value={form.password}
          type={"password"}
          placeholder={"Введите новый пароль"}
          name={"password"}
          icon="ShowIcon"
          onChange={onChange}
        />
      </div>
      <div className="mb-6">
        <Input
          value={form.code}
          type={"text"}
          placeholder={"Введите код из письма"}
          name={"code"}
          onChange={onChange}
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium">
        Сохранить
      </Button>
      <div className={`mt-20 ${styles.footer}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
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
