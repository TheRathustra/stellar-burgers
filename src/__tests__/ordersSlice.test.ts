import { createOrder, getOrders } from '../services/orders/actions';
import { ordersSlice, initialState } from '../services/orders/slice';
import { mockStore } from './slices.mock';

const expectedResultUserOrders = {
  success: true,
  orders: [
    {
      _id: '67a89b95133acd001be4fb0c',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943'
      ],
      status: 'done',
      name: 'Space флюоресцентный люминесцентный бургер',
      createdAt: '2025-02-09T12:12:05.921Z',
      updatedAt: '2025-02-09T12:12:06.558Z',
      number: 68010
    }
  ],
  total: 68010,
  totalToday: 1
};

const initialOrder: string[] = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa0949',
  '643d69a5c3f7b9001cfa0948',
  '643d69a5c3f7b9001cfa0942'
];

const expectedResultNewOrder = {
  success: true,
  order: {
    ingredients: [
      {
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
        _id: '643d69a5c3f7b9001cfa0949',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0948',
        name: 'Кристаллы марсианских альфа-сахаридов',
        type: 'main',
        proteins: 234,
        fat: 432,
        carbohydrates: 111,
        calories: 189,
        price: 762,
        image: 'https://code.s3.yandex.net/react/code/core.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    ],
    _id: '67a89e24133acd001be4fb14',
    owner: {
      name: '1234554321',
      email: 'tes223@mail.ru',
      createdAt: '2025-02-09T10:49:31.181Z',
      updatedAt: '2025-02-09T10:49:31.181Z'
    },
    status: 'done',
    name: 'Краторный экзо-плантаго spicy альфа-сахаридный бургер',
    createdAt: '2025-02-09T12:23:00.127Z',
    updatedAt: '2025-02-09T12:23:00.796Z',
    number: 68013,
    price: 7762
  },
  name: 'Краторный экзо-плантаго spicy альфа-сахаридный бургер'
};

function getCurrentState() {
  return mockStore.getState().orders;
}

describe('ordersSlice', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен вернуть изначальное состояние', () => {
    expect(ordersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должны быть загружены заказы пользователя', async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ...expectedResultUserOrders })
      })
    );

    expect(getCurrentState().isLoading).toBe(false);

    const promise = mockStore.dispatch(getOrders());

    expect(getCurrentState().isLoading).toBe(true);

    await promise;

    const { orders, isLoading, error } = getCurrentState();

    expect(isLoading).toBe(false);
    expect(error).toBe('');
    expect(orders).toEqual(expectedResultUserOrders.orders);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('должнен создаться новый заказ пользователя', async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ...expectedResultNewOrder })
      })
    );

    expect(getCurrentState().orderRequest).toBe(false);

    const promise = mockStore.dispatch(createOrder(initialOrder));

    expect(getCurrentState().orderRequest).toBe(true);

    await promise;

    const { orderModalData, orderRequest } = getCurrentState();

    expect(orderRequest).toBe(false);
    expect(orderModalData).toEqual(expectedResultNewOrder.order);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
