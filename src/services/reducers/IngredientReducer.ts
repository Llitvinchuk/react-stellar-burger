import { TIngredient } from "../../utils/types";
import {
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  TIngredientsActions,
} from "../actions/IngredientAction";
import {
  CLOSE_INGREDIENT_DETAILS_MODAL,
  OPEN_INGREDIENT_DETAILS_MODAL,
} from "../actions/IngredientDetailsAction";

type TIngredientsState = {
  data: TIngredient[];
  error: boolean | null | string;
  loading: boolean;
  ingredientsFailed: boolean;
};

const initialState: TIngredientsState = {
  loading: false,
  data: [],
  error: null,
  ingredientsFailed: false,
};

export const IngredientsReducer = (
  state: TIngredientsState = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: action.payload.ingredients,
        loading: false,
        error: null,
      };

    case GET_INGREDIENTS_ERROR:
      return {
        ...state,
        loading: false,
        ingredientsFailed: true,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

// export const IngredientDetailsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case OPEN_INGREDIENT_DETAILS_MODAL:
//       return {
//         ...state,
//         showOrderModal: true,
//         chosenIngredient: action.ingredient,
//       };
//     case CLOSE_INGREDIENT_DETAILS_MODAL:
//       return {
//         ...state,
//         showOrderModal: false,
//         chosenIngredient: null,
//       };
//     default:
//       return state;
//   }
// };
