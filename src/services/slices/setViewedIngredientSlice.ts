import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/Ingredient';

interface ViewedIngredientState {
  item: Ingredient | null;
}

const initialState: ViewedIngredientState = {
  item: null,
};

const viewedIngredientSlice = createSlice({
  name: 'viewedIngredient',
  initialState,
  reducers: {
    setViewedIngredient(state, action: PayloadAction<Ingredient | null>) {
      state.item = action.payload;
    },
  },
});

export const { setViewedIngredient } = viewedIngredientSlice.actions;
export default viewedIngredientSlice.reducer;
