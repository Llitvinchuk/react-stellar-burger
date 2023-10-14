import { GET_ORDER_BY_NUMBER_SUCCESS } from "../actions/OrderDetailsAction";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_GET_PROFILE_ORDERS,
  TWSOrder,
  IWSActions,
  TWSActions,
  TWSAuthActions,
} from "../actions/WebsocketActions";

export type TOrdersState = {
  wsConnected: boolean;
  wsError?: Event;
  wsProfileConnected: boolean;
  wsAuthError?: Event;
  orders: Array<TWSOrder>;
  userOrders: Array<TWSOrder>;
  total: number;
  totalToday: number;
  wsProfileError?: Event;
};

export const initialState: TOrdersState = {
  wsConnected: false,
  wsError: undefined,
  wsProfileConnected: false,
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  wsProfileError: undefined,
};

export const wsReducer = (
  state: TOrdersState = initialState,
  action: TWSActions | TWSAuthActions
): TOrdersState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnected: false,
        wsError: undefined,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: undefined,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: undefined,
        orders: [],
        total: 0,
        totalToday: 0,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        wsConnected: true,
        wsError: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    case WS_PROFILE_CONNECTION_START:
      return {
        ...state,
        wsProfileConnected: false,
        wsProfileError: undefined,
      };

    case WS_PROFILE_CONNECTION_SUCCESS:
      return {
        ...state,
        wsProfileConnected: true,
        wsProfileError: undefined,
      };

    case WS_PROFILE_CONNECTION_ERROR:
      return {
        ...state,
        wsProfileConnected: false,
        wsProfileError: action.payload,
      };

    case WS_PROFILE_CONNECTION_CLOSED:
      return {
        ...state,
        wsProfileConnected: false,
        wsProfileError: undefined,
        userOrders: [],
        total: 0,
        totalToday: 0,
      };

    case WS_GET_PROFILE_ORDERS:
      return {
        ...state,
        wsProfileConnected: true,
        wsProfileError: undefined,
        userOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    // case GET_ORDER_BY_NUMBER_SUCCESS: {
    //   return {
    //     ...state,
    //     orders: [...state.orders, ...action.order.orders],
    //   };
    // }
    default:
      return state;
  }
};
