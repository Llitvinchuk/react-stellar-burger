import {
  CLOSE_ORDER_DETAILS_MODAL,
  OPEN_ORDER_DETAILS_MODAL,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  TOrderActions,
  TOrderData,
} from "../actions/OrderDetailsAction";

type TOrderState = {
  orderNum: null | TOrderData;
  orderRequest: boolean;
  orderFailed: boolean;
  isOrderPopupOpened: boolean;
};

const initialState: TOrderState = {
  orderNum: null,
  orderRequest: false,
  orderFailed: false,
  isOrderPopupOpened: false,
};

export const orderDetailsReducer = (
  state: TOrderState = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        orderNum: action.order,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        orderNum: null,
      };
    }
    case OPEN_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        isOrderPopupOpened: true,
      };
    }
    case CLOSE_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        isOrderPopupOpened: false,
      };
    }

    default: {
      return state;
    }
  }
};
