import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrder, getOrders } from './actions';

type TordersState = {
  orders: TOrder[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
  isLoading: boolean;
  error: string;
};

export const initialState: TordersState = {
  orders: [],
  orderModalData: null,
  orderRequest: false,
  isLoading: false,
  error: ''
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModalData: (state) => {
      state.orderModalData = null;
    },
    resetOrders: (state) => {
      Object.assign(state, initialState)
    }
  },
  selectors: {
    getOrderModalData: (state) => state.orderModalData,
    getOrderRequest: (state) => state.orderRequest,
    getUserOrders: (state) => state.orders,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.meta.rejectedWithValue
            ? (action.payload as SerializedError).message
            : action.error.message) || '';
      });
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orders.push(action.payload.order);
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const {
  getOrderModalData,
  getOrderRequest,
  getUserOrders,
  getOrderError
} = ordersSlice.selectors;

export const { resetOrderModalData, resetOrders } = ordersSlice.actions;
