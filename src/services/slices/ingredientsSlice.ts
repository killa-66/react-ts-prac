import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/Ingredient';


interface IngredientsState {
  items: Ingredient[];
}

const initialState: IngredientsState = {
  items: [],
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredints: (state, action) => {
      state.items = action.payload
    }
  },
});

export const { setIngredints } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
