import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../utils/types";

export const ADD_BURGER_INGREDIENT: "ADD_BURGER_INGREDIENT" =
  "ADD_BURGER_INGREDIENT";
export const REMOVE_BURGER_INGREDIENT: "REMOVE_BURGER_INGREDIENT" =
  "REMOVE_BURGER_INGREDIENT";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";

type TAddBurgerIngredientAction = {
  type: typeof ADD_BURGER_INGREDIENT;
  ingredient: TIngredient;
};

type TRemoveBurgerIngredientAction = {
  type: typeof REMOVE_BURGER_INGREDIENT;
  key: string;
};

type TMoveIngredientAction = {
  type: typeof MOVE_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
};

export type TBurgerConstructorActions =
  | TAddBurgerIngredientAction
  | TRemoveBurgerIngredientAction
  | TMoveIngredientAction;

export const addBurgerIngredient = (
  ingredient: TIngredient
): TAddBurgerIngredientAction => {
  return {
    type: ADD_BURGER_INGREDIENT,
    ingredient: {
      ...ingredient,
      key: uuidv4(),
    },
  };
};

export const removeBurgerIngredient = (
  key: string
): TRemoveBurgerIngredientAction => {
  return {
    type: REMOVE_BURGER_INGREDIENT,
    key: key,
  };
};

export const moveIngredient = (
  dragIndex: number,
  hoverIndex: number
): TMoveIngredientAction => {
  return {
    type: MOVE_INGREDIENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
};
