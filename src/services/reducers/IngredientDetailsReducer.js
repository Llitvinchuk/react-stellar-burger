import {
  SET_POPUP_INGREDIENT,
  DELETE_POPUP_INGREDIENT,
  OPEN_INGREDIENT_DETAILS_MODAL,
  CLOSE_INGREDIENT_DETAILS_MODAL,
} from "../actions/IngredientDetailsAction";

const initialState = {
  popupIngredient: null,
  isPopupIngredientOpened: false,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POPUP_INGREDIENT: {
      return {
        ...state,
        popupIngredient: action.popupIngredient,
      };
    }
    case DELETE_POPUP_INGREDIENT: {
      return {
        ...state,
        popupIngredient: null,
      };
    }
    case OPEN_INGREDIENT_DETAILS_MODAL: {
      return {
        ...state,
        isPopupIngredientOpened: true,
      };
    }
    case CLOSE_INGREDIENT_DETAILS_MODAL: {
      return {
        ...state,
        isPopupIngredientOpened: false,
      };
    }
    default: {
      return state;
    }
  }
};
