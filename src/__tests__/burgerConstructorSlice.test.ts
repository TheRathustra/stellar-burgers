import {
  addIngredient,
  burgerConstructorSlice,
  clearIngredient,
  downIngredient,
  initialState,
  removeIngredient
} from '../services/burger-creator/slice';

const ingredients = [
  {
    id: '643d69a5c3f7b9001cfa093c',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    id: '643d69a5c3f7b9001cfa0941',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    id: '643d69a5c3f7b9001cfa0940',
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0
  }
];

describe('burgerConstructorSlice', () => {
  it('должен вернуть изначальное состояние', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('должен добавить булку', () => {
    const newBun = ingredients[0];

    const newState = burgerConstructorSlice.reducer(
      undefined,
      addIngredient(newBun)
    );
    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun?._id).toBe(newBun.id);
  });

  it('должен добавить ингридиент', () => {
    const newingredient = ingredients[1];

    const newState = burgerConstructorSlice.reducer(
      undefined,
      addIngredient(newingredient)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]._id).toBe(newingredient.id);
  });

  it('должен очистить ингридиенты', () => {
    const newState = burgerConstructorSlice.reducer(
      undefined,
      clearIngredient()
    );

    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun?._id).toBe(undefined);
  });

  it('должен удалить ингридиент', () => {
    const initialState = {
      bun: ingredients[0],
      ingredients: [ingredients[1]]
    };
    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient(ingredients[1]._id)
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  it('должен поменять ингредиент местами', () => {
    const ingredient1 = ingredients[1];
    const ingredient2 = ingredients[2];
    const initialState = {
      bun: ingredients[0],
      ingredients: [ingredient1, ingredient2]
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      downIngredient(0)
    );

    expect(newState.ingredients).toEqual([ingredient2, ingredient1]);
  });
});
