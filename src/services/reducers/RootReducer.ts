import { combineReducers } from "redux";
import { IngredientsReducer } from "./IngredientReducer";
import { BurgerConstructorReducer } from "./BurgerConstructorReducer";
import { orderDetailsReducer } from "./OrderDetailsReducer";
import { ingredientDetailsReducer } from "./IngredientDetailsReducer";
import { authReducer } from "./AuthReducer";
import { wsReducer } from "./WebsocketReducer";

export const RootReducer = combineReducers({
  ingredients: IngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burger: BurgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  authReducer: authReducer,
  wsReducer: wsReducer,
});
