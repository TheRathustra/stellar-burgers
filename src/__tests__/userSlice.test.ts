import { initialState, userSlice } from '../services/user/slice';
import { mockStore } from './slices.mock';

function getCurrentState() {
  return mockStore.getState().user;
}

describe('userSlice', () => {

  const loginData = {
    email: 'tes223@mail.ru',
    password: '12345'
  };

  const user = {
    email: 'tes223@mail.ru',
    name: '1234554321'
  };

  const authResponse = {
    success: true,
    refreshToken: 'refreshToken',
    accessToken: 'accessToken',
    user: user
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен вернуть изначальное состояние', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });
});
