import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearIngredient: (state) => initialState,
    downIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const currentItem = state.ingredients[action.payload];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = currentItem;
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const currentItem = state.ingredients[index - 1];
      state.ingredients[index - 1] = state.ingredients[index];
      state.ingredients[index] = currentItem;
    }
  },
  selectors: {
    getBunIngredient: (state) => state.bun,
    getConstructorIngredients: (state) => state.ingredients
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredient,
  downIngredient,
  upIngredient
} = burgerConstructorSlice.actions;
export const { getBunIngredient, getConstructorIngredients } =
  burgerConstructorSlice.selectors;
