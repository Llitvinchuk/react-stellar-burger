import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { userDataRequest } from "../../services/actions/AuthActions";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRouteElement({ element, anonymous = false }) {
  // const [isUserLoaded, setUserLoaded] = useState(false);
  const isLoggedIn = useSelector((store) => store.authReducer.user);
  const location = useLocation();

  const from = location.state?.from || "/";
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
};
