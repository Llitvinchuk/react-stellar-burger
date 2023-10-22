import { URL, checkResponse } from "../../utils/api";
import { AppDispatch, TIngredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR: "GET_INGREDIENTS_ERROR" =
  "GET_INGREDIENTS_ERROR";

type TGetIngredientsRequestAction = {
  type: typeof GET_INGREDIENTS_REQUEST;
};

type TGetIngredientsSuccess = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: {
    ingredients: TIngredient[];
  };
};

type TGetIngredientsErrorAction = {
  type: typeof GET_INGREDIENTS_ERROR;
  payload: {
    error: string;
  };
};

export type TIngredientsActions =
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccess
  | TGetIngredientsErrorAction;

export const getIngredientsRequest = (): TGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (
  ingredients: TIngredient[]
): TGetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: { ingredients },
  };
};

export const getIngredientsError = (
  error: string
): TGetIngredientsErrorAction => ({
  type: GET_INGREDIENTS_ERROR,
  payload: {
    error,
  },
});

export const fetchIngredients = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());

    fetch(`${URL}/ingredients`)
      .then(checkResponse)
      .then((res) => {
        dispatch(getIngredientsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getIngredientsError(err.message));
      });
  };
};
