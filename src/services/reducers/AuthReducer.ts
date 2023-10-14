import { TAuthActions } from "../actions/AuthActions";

const PASSWORD_RECOVERY: "PASSWORD_RECOVERY" = "PASSWORD_RECOVERY";
const PASSWORD_RESET: "PASSWORD_RESET" = "PASSWORD_RESET";
const REGISTRATION_USER: "REGISTRATION_USER" = "REGISTRATION_USER";
const LOGIN_USER: "LOGIN_USER" = "LOGIN_USER";
const GET_USER: "GET_USER" = "GET_USER";
const UPDATE_USER: "UPDATE_USER" = "UPDATE_USER";
const LOGOUT_USER: "LOGOUT_USER" = "LOGOUT_USER";

type TAuthState = {
  user: null | {
    email: string;
    name: string;
  };
  authUser: boolean;
  passwordReset: boolean;
};

const initialState: TAuthState = {
  user: null,
  passwordReset: false,
  authUser: false,
};

export const authReducer = (
  state: TAuthState = initialState,
  action: TAuthActions
): TAuthState => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
        authUser: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        authUser: false,
      };
    case REGISTRATION_USER:
      return {
        ...state,
        user: action.user,
        authUser: true,
      };

    case GET_USER:
      return {
        ...state,
        user: action.user,
        authUser: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
        authUser: true,
      };
    case PASSWORD_RECOVERY:
      return {
        ...state,
        passwordReset: true,
      };
    case PASSWORD_RESET:
      return {
        ...state,
        passwordReset: false,
      };
    default:
      return state;
  }
};
