const PASSWORD_RESET_PENDING = "PASSWORD_RESET_PENDING";
const CLEAR_PASSWORD_RESET = "CLEAR_PASSWORD_RESET";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const LOGOUT_USER = "LOGOUT_USER";

const initialState = {
  user: null,
  isAuthorized: false,
  isPasswordResetPending: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
        isAuthorized: true,
      };
    case REGISTER_USER:
      return {
        ...state,
        user: action.user,
        isAuthorized: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthorized: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthorized: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
        isAuthorized: true,
      };
    case PASSWORD_RESET_PENDING:
      return {
        ...state,
        isPasswordResetPending: true,
      };
    case CLEAR_PASSWORD_RESET:
      return {
        ...state,
        isPasswordResetPending: false,
      };
    default:
      return state;
  }
};
