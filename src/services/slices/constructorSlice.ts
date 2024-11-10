import { Ingredient } from './../../types/Ingredient';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface IngredientWithId extends Ingredient {
  uniqueId: string;
}

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
    addIngredient: {
      reducer: (state, action: PayloadAction<IngredientWithId>) => {
        state.otherIngredients.push(action.payload);
      },
      prepare: (ingredient: Ingredient) => {
        return { payload: { ...ingredient, uniqueId: uuidv4() } };
      },
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.otherIngredients.splice(action.payload, 1);
    },
    clearConstructor(state) {
      state.otherIngredients = [];
      state.bun = null;
    },
    reorderIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredient = state.otherIngredients.splice(fromIndex, 1)[0];
      state.otherIngredients.splice(toIndex, 0, ingredient);
    },
  },
});

export const { setBun, addIngredient, removeIngredient, clearConstructor, reorderIngredient } = constructorSlice.actions;
export default constructorSlice.reducer;
