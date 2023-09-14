import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateDataRequest } from "../services/actions/AuthActions";
import styles from "./styles.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfileUser = () => {
  const dispatch = useDispatch();

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
  return (
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
  );
};
