import update from "immutability-helper";
import {
  ADD_BURGER_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_BURGER_INGREDIENT,
  TBurgerConstructorActions,
} from "../actions/BurgerConstructorAction";
import { TIngredient } from "../../utils/types";

type TBurgerConstructorState = {
  bun: undefined | TIngredient;
  ingredients: TIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: undefined,
  ingredients: [],
};

export const BurgerConstructorReducer = (
  state: TBurgerConstructorState = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENT: {
      if (action.ingredient.type === "bun") {
        return { ...state, bun: action.ingredient };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    }
    case REMOVE_BURGER_INGREDIENT: {
      const newIngredients = state.ingredients.filter(
        (item) => item.key !== action.key
      );

      return {
        ...state,
        ingredients: newIngredients,
      };
    }
    case MOVE_INGREDIENT: {
      const updateIngredients = update([...state.ingredients], {
        $splice: [
          [[action.dragIndex], 1],
          [[action.hoverIndex], 0, [...state.ingredients][action.dragIndex]],
        ] as any,
      });
      return {
        ...state,
        ingredients: updateIngredients,
      };
    }

    default:
      return state;
  }
};
