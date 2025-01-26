import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearIngredient } from '../burger-creator/slice';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      dispatch(clearIngredient());
      return { order: response.order, name: response.name };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
