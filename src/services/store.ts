import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from './user/slice';
import { ingredientSlice } from './Ingredients/slice';
import { feedSlice } from './feed/slice';
import { ordersSlice } from './orders/slice';
import { burgerConstructorSlice } from './burger-creator/slice';

const rootReducer = combineSlices(
  userSlice,
  feedSlice,
  ingredientSlice,
  ordersSlice,
  burgerConstructorSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
