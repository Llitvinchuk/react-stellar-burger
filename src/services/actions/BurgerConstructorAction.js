import { v4 as uuidv4 } from "uuid";

export const ADD_BURGER_INGREDIENT = "ADD_BURGER_INGREDIENT";
export const REMOVE_BURGER_INGREDIENT = "REMOVE_BURGER_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const addBurgerIngredient = (ingredient) => {
  return {
    type: ADD_BURGER_INGREDIENT,
    ingredient: {
      ...ingredient,
      key: uuidv4(),
    },
  };
};

export const removeBurgerIngredient = (key) => {
  return {
    type: REMOVE_BURGER_INGREDIENT,
    key: key,
  };
};

export const moveIngredient = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_INGREDIENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
};
