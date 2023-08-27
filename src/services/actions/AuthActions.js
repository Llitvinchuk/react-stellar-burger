import { request, requestWithTokenRefresh } from "../../utils/api";

const PASSWORD_RESET_PENDING = "PASSWORD_RESET_PENDING";
const CLEAR_PASSWORD_RESET = "CLEAR_PASSWORD_RESET";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const LOGOUT_USER = "LOGOUT_USER";

export const passwordRecoveryRequest = (email) => {
  return async (dispatch) => {
    try {
      await request("/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      dispatch({ type: PASSWORD_RESET_PENDING });
    } catch (err) {
      console.log(err);
    }
  };
};

export const passwordResetRequest = (password, code) => {
  return async (dispatch) => {
    try {
      await request("/password-reset/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token: code }),
      });
      dispatch({ type: CLEAR_PASSWORD_RESET });
    } catch (err) {
      console.log(err);
    }
  };
};

export const registerRequest = (user) => {
  return async (dispatch) => {
    try {
      const response = await request("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      dispatch({ type: REGISTER_USER, user: response.user });
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginRequest = (user) => {
  return async (dispatch) => {
    try {
      const response = await request("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      dispatch({ type: LOGIN_USER, user: response.user });
    } catch (err) {
      console.log(err);
    }
  };
};

export const userDataRequest = () => {
  return async (dispatch) => {
    try {
      const response = await requestWithTokenRefresh("/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("accessToken"),
        },
      });

      dispatch({ type: SET_USER, user: response.user });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateDataRequest = (user) => {
  return async (dispatch) => {
    try {
      const response = await requestWithTokenRefresh("/auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(user),
      });

      dispatch({ type: UPDATE_USER, user: response.user });
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutRequest = () => {
  return async (dispatch) => {
    try {
      await request("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          token: localStorage.getItem("refreshToken"),
        }),
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch({ type: LOGOUT_USER });
    } catch (err) {
      console.log(err);
    }
  };
};
