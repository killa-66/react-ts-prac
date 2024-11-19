import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import viewedIngredientReducer from './slices/setViewedIngredientSlice';
import { baseApi } from "./baseApi";
import userApi from "./userApi";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    order: orderReducer,
    viewedIngredient: viewedIngredientReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
});
