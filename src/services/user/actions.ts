import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk(
  'users/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      if (!response.success) {
        return rejectWithValue(response);
      }
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'users/registerUser',
  async (data, { rejectWithValue }) => {
    const response = await registerUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;
    setTokens(accessToken, refreshToken);

    return user;
  }
);

export const login = createAsyncThunk<TUser, TLoginData>(
  'users/login',
  async (data, { rejectWithValue }) => {
    const response = await loginUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    const { user, refreshToken, accessToken } = response;
    setTokens(accessToken, refreshToken);

    return user;
  }
);

export const logout = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();
    if (!response.success) {
      return rejectWithValue(response);
    }
    resetTokens();
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'users/updateUser',
  async (data, { rejectWithValue }) => {
    const response = await updateUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

const resetTokens = () => {
  localStorage.clear();
  deleteCookie('accessToken');
};
