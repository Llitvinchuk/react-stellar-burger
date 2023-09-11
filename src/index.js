import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import App from "./components/App/App";
import { applyMiddleware, compose, createStore } from "redux";
import { RootReducer } from "./services/reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ProvideAuth } from "./utils/auth";
import { BrowserRouter } from "react-router-dom";
import {
  wsActions,
  wsProfileActions,
} from "./services/actions/WebsocketActions";
import { socketMiddleware } from "./services/middleware/SocketMiddleware";

const wsUrl = "wss://norma.nomoreparties.space/orders";
const store = createStore(
  RootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(wsUrl, wsActions),
      socketMiddleware(wsUrl, wsProfileActions)
    )
  )
);
const state = store.getState((state) => {
  return state;
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProvideAuth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideAuth>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
