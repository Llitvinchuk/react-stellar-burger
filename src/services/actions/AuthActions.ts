import { request, fetchWithRefresh, URL } from "../../utils/api";

import { AppDispatch } from "../../utils/types";

const PASSWORD_RECOVERY: "PASSWORD_RECOVERY" = "PASSWORD_RECOVERY";
const PASSWORD_RESET: "PASSWORD_RESET" = "PASSWORD_RESET";
const REGISTRATION_USER: "REGISTRATION_USER" = "REGISTRATION_USER";
const LOGIN_USER: "LOGIN_USER" = "LOGIN_USER";
const GET_USER: "GET_USER" = "GET_USER";
const UPDATE_USER: "UPDATE_USER" = "UPDATE_USER";
const LOGOUT_USER: "LOGOUT_USER" = "LOGOUT_USER";

interface IPasswordRecovery {
  type: typeof PASSWORD_RECOVERY;
}
interface IPasswordReset {
  type: typeof PASSWORD_RESET;
}
interface IRegistrationUser {
  type: typeof REGISTRATION_USER;
  user: TUser;
}
interface ILoginUser {
  type: typeof LOGIN_USER;
  user: TUser;
}
interface IGetUser {
  type: typeof GET_USER;
  user: TUser;
}
interface IUpdateUser {
  type: typeof UPDATE_USER;
  user: TUser;
}
interface ILogoutUser {
  type: typeof LOGOUT_USER;
}

export type TUser = {
  email: string;
  name: string;
};

export type TAuthActions =
  | IPasswordRecovery
  | IPasswordReset
  | IRegistrationUser
  | ILoginUser
  | IGetUser
  | IUpdateUser
  | ILogoutUser;

export const passwordRecoveryRequest = (email: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await request("/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      dispatch({ type: PASSWORD_RECOVERY });
    } catch (err) {
      console.log(err);
    }
  };
};

export const passwordResetRequest = (password: string, code: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await request("/password-reset/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token: code }),
      });
      dispatch({ type: PASSWORD_RESET });
    } catch (err) {
      console.log(err);
    }
  };
};

export const registerRequest = (user: TUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await request("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      dispatch({ type: REGISTRATION_USER, user: response.user });
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginRequest = (user: TUser) => {
  return async (dispatch: AppDispatch) => {
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
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetchWithRefresh(`${URL}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("accessToken"),
        },
      });

      dispatch({ type: GET_USER, user: response.user });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateDataRequest = (user: TUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetchWithRefresh(`${URL}/auth/user`, {
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
  return async (dispatch: AppDispatch) => {
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
