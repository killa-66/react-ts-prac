import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice'
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import viewedIngredientReducer from './slices/setViewedIngredientSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    order: orderReducer,
    viewedIngredient: viewedIngredientReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
