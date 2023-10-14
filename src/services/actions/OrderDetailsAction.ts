import {
  checkResponse,
  fetchOrderData,
  fetchOrderDataByNumber,
} from "../../utils/api";
import { AppDispatch, TIngredient } from "../../utils/types";

export const SET_POPUP_ORDER: "SET_POPUP_ORDER" = "SET_POPUP_ORDER";
export const OPEN_ORDER_DETAILS_MODAL: "OPEN_ORDER_DETAILS_MODAL" =
  "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL: "CLOSE_ORDER_DETAILS_MODAL" =
  "CLOSE_ORDER_DETAILS_MODAL";

export const POST_ORDER_REQUEST: "POST_ORDER_REQUEST" = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS" = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED: "POST_ORDER_FAILED" = "POST_ORDER_FAILED";
export const GET_ORDER_BY_NUMBER_SUCCESS: "GET_ORDER_BY_NUMBER_SUCCESS" =
  "GET_ORDER_BY_NUMBER_SUCCESS";

export type TOrderData = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

type TGetOrderRequestAction = {
  type: typeof POST_ORDER_REQUEST;
};

type TPlaceOrderSuccessAction = {
  type: typeof POST_ORDER_SUCCESS;
  order: TOrderData;
};

type TPlaceOrderError = {
  type: typeof POST_ORDER_FAILED;
  payload: {
    error: boolean | string | null;
  };
};

type TCloseOrderDetails = {
  type: typeof CLOSE_ORDER_DETAILS_MODAL;
};

type TGetOrderByNumberDetails = {
  type: typeof GET_ORDER_BY_NUMBER_SUCCESS;
  order: TOrderData;
};
type TOpenOrderDetails = {
  type: typeof OPEN_ORDER_DETAILS_MODAL;
};

export type TOrderActions =
  | TGetOrderRequestAction
  | TPlaceOrderSuccessAction
  | TPlaceOrderError
  | TCloseOrderDetails
  | TGetOrderByNumberDetails
  | TOpenOrderDetails;

export const getOrderRequest = (): TGetOrderRequestAction => ({
  type: POST_ORDER_REQUEST,
});
export const getOrderSuccess = (res: TOrderData): TPlaceOrderSuccessAction => {
  return {
    type: POST_ORDER_SUCCESS,
    order: res,
  };
};

export const getOrderByNumberSuccess = (
  res: TOrderData
): TGetOrderByNumberDetails => {
  return { type: GET_ORDER_BY_NUMBER_SUCCESS, order: res };
};

export const getOrderError = (
  error: boolean | string | null
): TPlaceOrderError => ({
  type: POST_ORDER_FAILED,
  payload: { error },
});

export const postOrder = (array: any[]) => {
  return function (dispatch: AppDispatch) {
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

export const getOrderByNumber = (number: number) => {
  return function (dispatch: AppDispatch) {
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

export const openOrderDetailsModal = (): TOpenOrderDetails => {
  return {
    type: OPEN_ORDER_DETAILS_MODAL,
  };
};

export const closeOrderDetailsModal = (): TCloseOrderDetails => {
  return {
    type: CLOSE_ORDER_DETAILS_MODAL,
  };
};
