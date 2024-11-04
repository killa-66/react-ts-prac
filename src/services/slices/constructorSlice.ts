import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/Ingredient';

interface ConstructorState {
  items: Ingredient[];
}

const initialState: ConstructorState = {
  items: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<Ingredient>) {
      state.items.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearConstructor(state) {
      state.items = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;
