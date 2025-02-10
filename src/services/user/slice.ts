import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { getUser, login, logout, registerUser } from './actions';
import { TUser } from '@utils-types';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: string;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      Object.assign(state, initialState)
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getCurrentUser: (state) => state.user,
    getTextError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.error =
          (action.meta.rejectedWithValue
            ? (action.payload as SerializedError).message
            : action.error.message) || '';
      });
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error =
          (action.meta.rejectedWithValue
            ? (action.payload as SerializedError).message
            : action.error.message) || '';
      });
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.error =
          (action.meta.rejectedWithValue
            ? (action.payload as SerializedError).message
            : action.error.message) || '';
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    });
  }
});

export const { setUser, resetUser } = userSlice.actions;
export const {
  getCurrentUser,
  getIsAuthChecked,
  getIsAuthenticated,
  getTextError
} = userSlice.selectors;
