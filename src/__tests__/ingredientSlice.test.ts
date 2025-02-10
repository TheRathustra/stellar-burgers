import { getIngredients } from '../services/Ingredients/actions';
import { ingredientSlice, initialState } from '../services/Ingredients/slice';
import { mockStore } from './slices.mock';

const mockIngredients = [
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

function getCurrentState() {
  return mockStore.getState().ingredients;
}

describe('ingredientSlice', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockIngredients })
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен вернуть изначальное состояние', () => {
    expect(ingredientSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('тест загрузки ингридиентов', async () => {

    expect(getCurrentState().isLoading).toBe(false);
    const promise = mockStore.dispatch(getIngredients());
    expect(getCurrentState().isLoading).toBe(true);

    await promise;

    const { ingredients, isLoading } = getCurrentState();
    expect(isLoading).toBe(false);
    expect(ingredients).toEqual(mockIngredients);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
