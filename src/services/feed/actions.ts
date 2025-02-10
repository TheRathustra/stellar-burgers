import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feeds/getFeeds', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrderByID',
  async (number: number) => await getOrderByNumberApi(number)
);
