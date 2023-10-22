import { TIngredient } from "../../utils/types";

export const SET_POPUP_INGREDIENT: "SET_POPUP_INGREDIENT" =
  "SET_POPUP_INGREDIENT";
export const DELETE_POPUP_INGREDIENT: "DELETE_POPUP_INGREDIENT" =
  "DELETE_POPUP_INGREDIENT";
export const OPEN_INGREDIENT_DETAILS_MODAL: "OPEN_INGREDIENT_DETAILS_MODAL" =
  "OPEN_INGREDIENT_DETAILS_MODAL";
export const CLOSE_INGREDIENT_DETAILS_MODAL: "CLOSE_INGREDIENT_DETAILS_MODAL" =
  "CLOSE_INGREDIENT_DETAILS_MODAL";

type TOpenIngredientDetailsAction = {
  type: typeof OPEN_INGREDIENT_DETAILS_MODAL;
};

type TCloseIngredientDetailsAction = {
  type: typeof CLOSE_INGREDIENT_DETAILS_MODAL;
};
type TSetPopupIngredientAction = {
  type: typeof SET_POPUP_INGREDIENT;
  popupIngredient: TIngredient;
};

type TDeletePopupIngredientAction = {
  type: typeof DELETE_POPUP_INGREDIENT;
};

export type TIngredientsDetailActions =
  | TOpenIngredientDetailsAction
  | TCloseIngredientDetailsAction
  | TSetPopupIngredientAction
  | TDeletePopupIngredientAction;

export const setPopupIngredient = (
  item: TIngredient
): TSetPopupIngredientAction => {
  return {
    type: SET_POPUP_INGREDIENT,
    popupIngredient: item,
  };
};

export const deletePopupIngredient = (): TDeletePopupIngredientAction => {
  return {
    type: DELETE_POPUP_INGREDIENT,
  };
};

export const openIngredientDetailsModal = (): TOpenIngredientDetailsAction => {
  return {
    type: OPEN_INGREDIENT_DETAILS_MODAL,
  };
};

export const closeIngredientDetailsModal =
  (): TCloseIngredientDetailsAction => {
    return {
      type: CLOSE_INGREDIENT_DETAILS_MODAL,
    };
  };
