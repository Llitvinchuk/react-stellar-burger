import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { userDataRequest } from "../../services/actions/AuthActions";

export default function ProtectedRouteElement({ element }) {
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await userDataRequest();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
};
