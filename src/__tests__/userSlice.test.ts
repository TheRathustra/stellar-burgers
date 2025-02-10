import { getUser, login, registerUser, updateUser } from '../services/user/actions';
import { initialState, resetUser, setUser, userSlice } from '../services/user/slice';
import { mockStore } from './slices.mock';

function getCurrentState() {
  return mockStore.getState().user;
}

const loginData = {
  email: 'tes223@mail.ru',
  password: '12345'
};

const testUser = {
  email: 'tes223@mail.ru',
  name: '1234554321'
};

const testUserCredentials = {
  ...testUser,
  password: '12345'
};

const authResponse = {
  success: true,
  refreshToken: 'refreshToken',
  accessToken: 'accessToken',
  user: testUser
};

describe('userSlice', () => {

  afterEach(async () => {
    jest.restoreAllMocks();
    await mockStore.dispatch(resetUser());
  });

  it('должен вернуть изначальное состояние', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('getUser', () => {
    it('должен установить isAuthChecked и isAuthenticated и вернуть пользователя', async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ...authResponse })
        })
      );

      await mockStore.dispatch(getUser());

      const { isAuthChecked, isAuthenticated, user, error } = getCurrentState();
      expect(error).toBe('');
      expect(isAuthChecked).toBe(true);
      expect(isAuthenticated).toBe(true);
      expect(user).toEqual(testUser);
    });

    it('должен установить ошибку', async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              ...authResponse,
              success: false,
              user: null,
              message: 'Ошибка'
            })
        })
      );

      await mockStore.dispatch(getUser());

      const { isAuthChecked, isAuthenticated, error } = getCurrentState();
      expect(error).toBe('Ошибка');
      expect(isAuthChecked).toBe(true);
      expect(isAuthenticated).toBe(false);
    });
  });

  describe('register', () => {
    
    it('должен установить isAuthChecked и isAuthenticated и вернуть пользователя при успешной регистрации', async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ...authResponse, ...testUserCredentials })
        })
      );

      await mockStore.dispatch(registerUser(testUserCredentials));

      const { isAuthChecked, isAuthenticated, user, error } = getCurrentState();
      expect(error).toBe('');
      expect(isAuthChecked).toBe(true);
      expect(isAuthenticated).toBe(true);
      expect(user).toEqual(testUser);
    });

    it('должен установить ошибку', async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              ...authResponse,
              success: false,
              user: null,
              message: 'Ошибка'
            })
        })
      );

      await mockStore.dispatch(registerUser(testUserCredentials));

      const { isAuthChecked, isAuthenticated, error } = getCurrentState();
      expect(error).toBe('Ошибка');
      expect(isAuthChecked).toBe(true);
      expect(isAuthenticated).toBe(false);
    });
  });

  describe('login', () => {
    
    it('должен установить isAuthChecked и isAuthenticated и вернуть пользователя при успешном логине', async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ...authResponse, ...testUserCredentials })
        })
      );

      await mockStore.dispatch(login(testUserCredentials));

      const { isAuthChecked, isAuthenticated, user, error } = getCurrentState();
      expect(error).toBe('');
      expect(isAuthChecked).toBe(true);
      expect(isAuthenticated).toBe(true);
      expect(user).toEqual(testUser);
    });

    it('должен установить ошибку', async () => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              ...authResponse,
              success: false,
              user: null,
              message: 'Ошибка'
            })
        })
      );

      await mockStore.dispatch(login(testUserCredentials));

      const { isAuthChecked, isAuthenticated, error } = getCurrentState();
      expect(error).toBe('Ошибка');
      expect(isAuthChecked).toBe(true);
      expect(isAuthenticated).toBe(false);
    });
  });

});
