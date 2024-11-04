import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/Ingredient';
import { RootState } from '../store';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = createAsyncThunk<Ingredient[], void>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить ингредиенты');
    }
  }
);

interface IngredientsState {
  items: Ingredient[];
  constructorItems: Ingredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  constructorItems: [],
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredientToConstructor: (state, action: PayloadAction<Ingredient>) => {
      state.constructorItems.push(action.payload);
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.constructorItems = state.constructorItems.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.constructorItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  clearConstructor,
} = ingredientsSlice.actions;

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectConstructorIngredients = (state: RootState) => state.ingredients.constructorItems;
export const selectIngredientsLoading = (state: RootState) => state.ingredients.loading;
export const selectIngredientsError = (state: RootState) => state.ingredients.error;
export default ingredientsSlice.reducer;
