import React, { useCallback, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { passwordRecoveryRequest } from "../services/actions/AuthActions";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const singInClick = () => {
    navigate("/login");
  };

  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: "" });

  const onChange = (e) => {
    setValue({ email: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(passwordRecoveryRequest(form.email));
    navigate("/reset-password");
  };

  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <h2 className="text text_type_main-large mb-6">Восстановление пароля</h2>
      <div className="mb-6">
        <Input
          value={form.email || ""}
          type={"email"}
          placeholder={"Укажите e-mail"}
          name={"email"}
          onChange={onChange}
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium">
        Восстановить
      </Button>
      <div className={`mt-20 ${styles.footer}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={singInClick}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
