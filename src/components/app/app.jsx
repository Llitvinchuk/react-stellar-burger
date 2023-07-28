import styles from "./App.module.css";
import { AppHeader } from "../appHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { useState, useEffect } from "react";
import { URL, checkResponse, getIngredients } from "../../utils/api";
import { BurgerConstructorContext } from "../../utils/BurgerConstructorContext";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

function App() {
  const [order, setOrder] = useState({
    bun: undefined,
    ingredients: [],
  });

  const [ingredients, setIngredients] = useState({
    isLoading: true,
    hasError: false,
    data: [],
  });

  const [state, setState] = useState({
    showOrderModal: false,
    orderNum: null,
  });

  // const toggleOrderModal = () => {
  //   if (!state.showOrderModal) {
  //     const Body = order.ingredients.map((item) => item._id);
  //     fetch("https://norma.nomoreparties.space/api/orders", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ingredients: Body }),
  //     })
  //       .then((response) => {
  //         if (response.ok) return response.json();
  //         setState({
  //           ...state,
  //           showOrderModal: !state.showOrderModal,
  //           orderNum: null,
  //         });
  //         return Promise.reject(response.status);
  //       })
  //       .then((result) => {
  //         setState({
  //           ...state,
  //           showOrderModal: !state.showOrderModal,
  //           orderNum: result.order.number,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else setState({ ...state, showOrderModal: !state.showOrderModal });
  // };

  const toggleOrderModal = () => {
    if (!state.showOrderModal) {
      const Body = order.ingredients.map((item) => item._id);
      fetch(`${URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: Body }),
      })
        .then(
          checkResponse,
          setState({
            ...state,
            showOrderModal: !state.showOrderModal,
            orderNum: null,
          })
        )
        .then((result) => {
          setState({
            ...state,
            showOrderModal: !state.showOrderModal,
            orderNum: result.order.number,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else setState({ ...state, showOrderModal: !state.showOrderModal });
  };

  useEffect(() => {
    setIngredients((prevState) => ({ ...prevState, isLoading: true }));

    getIngredients()
      .then((res) => {
        setIngredients({
          isLoading: false,
          hasError: false,
          data: res.data,
        });
      })
      .catch((error) => {
        setIngredients((prevState) => ({
          ...prevState,
          hasError: true,
          isLoading: false,
        }));
      });
  }, []);

  if (ingredients.isLoading) return <p>Загрузка...</p>;
  else if (ingredients.hasError)
    return <p>Произошла ошибка, пожалуйста попробуйте снова</p>;

  return (
    <div className={styles.app}>
      <AppHeader />
      <BurgerConstructorContext.Provider
        value={{
          data: ingredients.data,
          order: order,
          setOrder: setOrder,
          toggleOrderModal,
          orderNum: state.orderNum,
        }}
      >
        <main className={`${styles.main} ${styles.columns}`}>
          <section className={`${styles.column} ${styles.columns}`}>
            <div className={`${styles.article} ${styles.first__article}`}>
              <BurgerIngredients />
            </div>
          </section>

          <BurgerConstructor />
          {state.showOrderModal ? (
            <Modal onClose={toggleOrderModal} title={""}>
              <OrderDetails />
            </Modal>
          ) : null}
        </main>
      </BurgerConstructorContext.Provider>
    </div>
  );
}

export default App;
