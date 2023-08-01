export const SET_POPUP_INGREDIENT = "SET_POPUP_INGREDIENT";
export const DELETE_POPUP_INGREDIENT = "DELETE_POPUP_INGREDIENT";
export const OPEN_INGREDIENT_DETAILS_MODAL = "OPEN_INGREDIENT_DETAILS_MODAL";
export const CLOSE_INGREDIENT_DETAILS_MODAL = "CLOSE_INGREDIENT_DETAILS_MODAL";

export const setPopupIngredient = (item) => {
  return {
    type: SET_POPUP_INGREDIENT,
    popupIngredient: item,
  };
};

export const deletePopupIngredient = () => {
  return {
    type: DELETE_POPUP_INGREDIENT,
  };
};

export const openIngredientDetailsModal = () => {
  return {
    type: OPEN_INGREDIENT_DETAILS_MODAL,
  };
};

export const closeIngredientDetailsModal = () => {
  return {
    type: CLOSE_INGREDIENT_DETAILS_MODAL,
  };
};
