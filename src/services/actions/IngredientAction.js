import { URL, checkResponse } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const getIngredientsRequest = () => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (ingredients) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: ingredients,
  };
};

export const getIngredientsError = (error) => ({
  type: GET_INGREDIENTS_ERROR,
  payload: {
    error,
  },
});

export const fetchIngredients = () => {
  return (dispatch) => {
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
