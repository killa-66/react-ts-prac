import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/Ingredient';

interface ConstructorState {
  bun: Ingredient | null;
  otherIngredients: Ingredient[];
}

const initialState: ConstructorState = {
  bun: null,
  otherIngredients: [],
};
const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<Ingredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<Ingredient>) {
      state.otherIngredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.otherIngredients.splice(action.payload, 1);
    },
    clearConstructor(state) {
      state.otherIngredients = [];
      state.bun = null;
    },
  },
});

export const { setBun, addIngredient, removeIngredient, clearConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;
