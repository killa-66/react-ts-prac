import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/Ingredient';

interface ConstructorState {
  products: Ingredient[];
}

const initialState: ConstructorState = {
  products: [],
};

const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<Ingredient>) {
      state.products.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.products = state.products.filter(item => item._id !== action.payload);
    },
    clearConstructor(state) {
      state.products = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;
