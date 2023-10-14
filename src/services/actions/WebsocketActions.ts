export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";
export const WS_PROFILE_CONNECTION_START: "WS_AUTH_CONNECTION_START" =
  "WS_AUTH_CONNECTION_START";
export const WS_PROFILE_CONNECTION_SUCCESS: "WS_AUTH_CONNECTION_SUCCESS" =
  "WS_AUTH_CONNECTION_SUCCESS";
export const WS_PROFILE_CONNECTION_ERROR: "WS_AUTH_CONNECTION_ERROR" =
  "WS_AUTH_CONNECTION_ERROR";
export const WS_PROFILE_CONNECTION_CLOSED: "WS_AUTH_CONNECTION_CLOSED" =
  "WS_AUTH_CONNECTION_CLOSED";
export const WS_GET_PROFILE_ORDERS: "WS_GET_AUTH_ORDERS" = "WS_GET_AUTH_ORDERS";

export interface IWSActions {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}
export type TWSOrder = {
  ingredients: Array<string>;
  name: string;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
export interface IWSOrdersPayload {
  success?: boolean;
  orders: Array<TWSOrder>;
  total: number;
  totalToday: number;
}
interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  payload: string;
}

interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  payload: string;
}

interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: Event;
}

interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  payload?: string;
}

interface IWSGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  payload: IWSOrdersPayload;
}

interface IWSProfileConnectionStartAction {
  readonly type: typeof WS_PROFILE_CONNECTION_START;
  payload: string;
}

interface IWSProfileConnectionSuccessAction {
  readonly type: typeof WS_PROFILE_CONNECTION_SUCCESS;
  payload: string;
}

interface IWSProfileConnectionErrorAction {
  readonly type: typeof WS_PROFILE_CONNECTION_ERROR;
  payload: Event;
}

interface IWSProfileConnectionClosedAction {
  readonly type: typeof WS_PROFILE_CONNECTION_CLOSED;
  payload?: string;
}

interface IWSGetProfileOrdersAction {
  readonly type: typeof WS_GET_PROFILE_ORDERS;
  payload: IWSOrdersPayload;
}

export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetOrdersAction;

export type TWSAuthActions =
  | IWSProfileConnectionStartAction
  | IWSProfileConnectionSuccessAction
  | IWSProfileConnectionErrorAction
  | IWSProfileConnectionClosedAction
  | IWSGetProfileOrdersAction;

export const wsActions: IWSActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

export const wsProfileActions: IWSActions = {
  wsInit: WS_PROFILE_CONNECTION_START,
  onOpen: WS_PROFILE_CONNECTION_SUCCESS,
  onClose: WS_PROFILE_CONNECTION_CLOSED,
  onError: WS_PROFILE_CONNECTION_ERROR,
  onMessage: WS_GET_PROFILE_ORDERS,
};
