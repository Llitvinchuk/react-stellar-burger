import { Middleware, MiddlewareAPI } from "redux";
import { IWSActions } from "../actions/WebsocketActions";
import { Dispatch } from "redux";
import { RootState } from "../../utils/types";

export const socketMiddleware = (
  Url: string,
  Actions: IWSActions
): Middleware => {
  return (store: MiddlewareAPI<Dispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = Actions;
      if (type === wsInit) {
        socket = new WebSocket(`${Url}${payload}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
