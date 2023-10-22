import { ThunkAction } from "redux-thunk";
import { TAuthActions } from "../services/actions/AuthActions";
import { TBurgerConstructorActions } from "../services/actions/BurgerConstructorAction";
import { TIngredientsActions } from "../services/actions/IngredientAction";
import { TIngredientsDetailActions } from "../services/actions/IngredientDetailsAction";
import { TOrderActions } from "../services/actions/OrderDetailsAction";
import {
  TWSActions,
  TWSAuthActions,
} from "../services/actions/WebsocketActions";
import { RootReducer } from "../services/reducers/RootReducer";

export type RootState = ReturnType<typeof RootReducer>;

export type TIngredient = {
  count?: number;
  _id: string;
  image: string;
  name: string;
  price: number;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: string;
  index?: number;
  id?: string;
  qty?: number;
};

export type TAppActions =
  | TAuthActions
  | TBurgerConstructorActions
  | TIngredientsActions
  | TIngredientsDetailActions
  | TOrderActions
  | TWSActions
  | TWSAuthActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TAppActions
>;
export type AppDispatch<TReturnType = void> = (
  action: TAppActions | AppThunk<TReturnType>
) => TReturnType;
export type DispatchFunc = () => AppDispatch;
