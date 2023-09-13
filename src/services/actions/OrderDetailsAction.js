import {
  checkResponse,
  fetchOrderData,
  fetchOrderDataByNumber,
} from "../../utils/api";

export const SET_POPUP_ORDER = "SET_POPUP_ORDER";
export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL = "CLOSE_ORDER_DETAILS_MODAL";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const GET_ORDER_BY_NUMBER_SUCCESS = "GET_ORDER_BY_NUMBER_SUCCESS";

export const getOrderRequest = () => ({ type: POST_ORDER_REQUEST });
export const getOrderSuccess = (res) => ({
  type: POST_ORDER_SUCCESS,
  order: res,
});

export const getOrderByNumberSuccess = (res) => ({
  type: GET_ORDER_BY_NUMBER_SUCCESS,
  order: res,
});

export const getOrderError = (error) => ({
  type: POST_ORDER_FAILED,
  payload: error,
});

export const postOrder = (array) => {
  return function (dispatch) {
    dispatch(getOrderRequest());
    fetchOrderData(array)
      .then((res) => {
        dispatch(getOrderSuccess(res));
      })
      .catch((err) => {
        dispatch(getOrderError(err.message));
      });
  };
};

export const getOrderByNumber = (number) => {
  return function (dispatch) {
    // dispatch(getOrderRequest());
    fetchOrderDataByNumber(number)
      .then((res) => {
        dispatch(getOrderByNumberSuccess(res));
      })
      .catch((err) => {
        console.log(`🚀 ~ err:`, err);
        // dispatch(getOrderError(err.message));
      });
  };
};

export const openOrderDetailsModal = () => {
  return {
    type: OPEN_ORDER_DETAILS_MODAL,
  };
};

export const closeOrderDetailsModal = () => {
  return {
    type: CLOSE_ORDER_DETAILS_MODAL,
  };
};
