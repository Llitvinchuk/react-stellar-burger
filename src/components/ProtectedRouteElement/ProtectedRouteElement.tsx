import { FC, ReactElement, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { userDataRequest } from "../../services/actions/AuthActions";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";

type TProtectedProps = {
  anonymous?: boolean;
  element: ReactElement;
};

export const ProtectedRouteElement: FC<TProtectedProps> = ({
  element,
  anonymous = false,
}) => {
  // const [isUserLoaded, setUserLoaded] = useState(false);
  const isLoggedIn = useAppSelector((store) => store.authReducer.authUser);
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  const from = location.state?.from || "/";
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn && !token) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRouteElement;
