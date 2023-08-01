import { combineReducers } from "redux";
import {
  IngredientDetailsReducer,
  IngredientsReducer,
} from "./IngredientReducer";
import { BurgerConstructorReducer } from "./BurgerConstructorReducer";
import { orderDetailsReducer } from "./OrderDetailsReducer";
import { ingredientDetailsReducer } from "./IngredientDetailsReducer";

export const RootReducer = combineReducers({
  ingredients: IngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burger: BurgerConstructorReducer,
  orderDetails: orderDetailsReducer,
});
