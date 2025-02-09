import { feedSlice, initialState } from '../services/feed/slice';
import { getFeeds, getOrderByNumber } from '../services/feed/actions';
import { mockStore } from './slices.mock';

const mockCurrentOrder = '67a87594133acd001be4fa3e';

const expectedResult = {
  orders: [
    {
      _id: mockCurrentOrder,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0943'
      ],
      status: 'done',
      name: 'Краторный space бессмертный метеоритный бургер',
      createdAt: '2025-02-09T09:29:56.891Z',
      updatedAt: '2025-02-09T09:29:57.539Z',
      number: 67984
    },
    {
      _id: '67a859c1133acd001be4f9fb',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2025-02-09T07:31:13.900Z',
      updatedAt: '2025-02-09T07:31:14.557Z',
      number: 67983
    },
    {
      _id: '67a788d0133acd001be4f6fb',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2025-02-08T16:39:44.016Z',
      updatedAt: '2025-02-08T16:39:44.656Z',
      number: 67939
    }
  ],
  total: 67610,
  totalToday: 84,
  isLoading: false,
  currentOrder: null
};

function getCurrentState() {
  return mockStore.getState().feeds;
}

describe('feedSlice', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, ...expectedResult })
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен вернуть изначальное состояние', () => {
    expect(feedSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должны загрузить заказы', async () => {
    expect(getCurrentState().isLoading).toBe(false);

    const promise = mockStore.dispatch(getFeeds());

    expect(getCurrentState().isLoading).toBe(true);

    await promise;

    const { orders, isLoading } = getCurrentState();
    expect(isLoading).toBe(false);
    expect(orders).toEqual(expectedResult.orders);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('должны получить заказ по номеру', async () => {
    const promise = mockStore.dispatch(getOrderByNumber(0));
    await promise;

    const { currentOrder } = getCurrentState();
    expect(currentOrder?._id).toBe(mockCurrentOrder);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
