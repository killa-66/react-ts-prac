import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orderNumber: string | null;
}

const initialState: OrderState = {
  orderNumber: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<string>) {
      state.orderNumber = action.payload;
    },
    clearOrder(state) {
      state.orderNumber = null;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
