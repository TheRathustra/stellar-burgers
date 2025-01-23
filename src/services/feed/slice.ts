import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds, getOrderByNumber } from './actions';

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  currentOrder: TOrder | null;
};

export const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  currentOrder: null
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.currentOrder = null;
    }
  },
  selectors: {
    getAllOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getCurrentOrder: (state) => state.currentOrder,
    getFeedsIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.currentOrder = action.payload.orders[0];
    });
  }
});

export const {
  getAllOrders,
  getTotal,
  getTotalToday,
  getCurrentOrder,
  getFeedsIsLoading
} = feedSlice.selectors;

export const { clearSelectedOrder } = feedSlice.actions;
