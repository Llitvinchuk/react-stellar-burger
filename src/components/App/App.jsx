import styles from "./App.module.css";
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/IngredientAction";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal onClose={closeIngredientModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
