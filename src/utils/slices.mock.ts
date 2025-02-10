import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/store';

export const mockStore = configureStore({
  reducer: rootReducer
});
