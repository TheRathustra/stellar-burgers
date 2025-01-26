import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrder } from '../orders/actions';

export type TOrderBurgerState = {
  order: TOrder | null;
  isOrderLoading: boolean;
};

export const initialState: TOrderBurgerState = {
  order: null,
  isOrderLoading: false
};

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    clearOrder: (state) => initialState
  },
  selectors: {
    getOrder: (state) => state.order,
    getIsOrderLoading: (state) => state.isOrderLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isOrderLoading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isOrderLoading = false;
      });
  }
});

export const { clearOrder } = orderBurgerSlice.actions;
export const { getOrder, getIsOrderLoading } = orderBurgerSlice.selectors;
