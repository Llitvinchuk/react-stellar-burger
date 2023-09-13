import styles from "./App.module.css";
import { AppHeader } from "../AppHeader/AppHeader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/IngredientAction";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Menu from "../Menu/Menu";
import { Registration } from "../../pages/Registration";
import { ResPassword } from "../../pages/ResPassword";
import { ForgotPassword } from "../../pages/ForgotPassword";
import { LoginPage } from "../../pages/Login";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import { ProfilePage } from "../../pages/ProfilePage";
import { IngredientPage } from "../../pages/IngredientSingle";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { OrderPage } from "../../pages/OrderPage";
import { Feed } from "../../pages/Feed";
import { FeedInfo } from "../../pages/FeedInfo";
import { ProfileUser } from "../../pages/ProfileUser";
import { OrderInfo } from "../../pages/OrderInfo";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/WebsocketActions";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const closeIngredientModal = () => {
    navigate(-1);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Menu />} />
        <Route path="/reset-password" element={<ResPassword />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        >
          <Route path="/profile" element={<ProfileUser />} />
          <Route path="/profile/orders" element={<OrderPage />} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<FeedInfo />} />

        <Route
          path="/profile/orders/:number"
          element={<ProtectedRouteElement element={<OrderInfo />} />}
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal
                onClose={closeIngredientModal}
                title={"Детали ингредиента"}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="feed/:number"
            element={
              <Modal onClose={closeIngredientModal}>
                <FeedInfo />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:number"
            element={
              <Modal onClose={closeIngredientModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
