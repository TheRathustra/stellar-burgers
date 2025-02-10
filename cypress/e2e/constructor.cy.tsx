import type {} from 'cypress';

const bunName = 'Краторная булка N-200i';
const mainName = 'Биокотлета из марсианской Магнолии';
const sauceName = 'Соус Spicy-X';

describe('интерграционное тестирование', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('login');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    setTokens();

    cy.viewport(1300, 800);

    cy.visit('http://localhost:4000/');
 
    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('data');
    });

    cy.wait('@login').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('success');
    });
  });

  it('добавление булочки', function () {

    cy.get('[data-cy=no-bun-1]').should('exist');
    cy.get('[data-cy=no-bun-2]').should('exist');
    cy.get('[data-cy=no-main]').should('exist');
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]').contains(bunName).should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains(bunName).should('exist');

  });

  it('добавление ингредиентов', function () {

    cy.get('[data-cy=constructor]').contains(mainName).should('not.exist');
    cy.get('[data-cy=constructor]').contains(sauceName).should('not.exist');

    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=constructor]').contains(mainName).should('exist');
    cy.get('[data-cy=constructor]').contains(sauceName).should('exist');

  });
});

describe('работа модального окна', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('login');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.viewport(1300, 800);

    setTokens();

    cy.visit('http://localhost:4000');

    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('data');
    });

    cy.wait('@login').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('success');
    });
  });

  this.afterEach(function () {
    cy.clearAllLocalStorage();
    cy.clearCookies();
  });

  it('открытие модального окна', function () {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=bun-ingredients]').contains(bunName).click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains(bunName);
    cy.get('[data-cy=modal-close-button]').click();
  });

  it('открытие модального окна и закрытие на крестик', () => {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=bun-ingredients]').contains(bunName).click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains(bunName);
    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('открытие модального окна и закрытие на оверлей', () => {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=bun-ingredients]').contains(bunName).click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains(bunName);
    cy.get('[data-cy=modal-overlay]').click('top', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('создание заказа', function () {
  
  beforeEach(function () {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('login');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('getOrders');

    setTokens();

    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');

    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('data');
    });

    cy.wait('@login').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('success');
    });
  });

  this.afterEach(function () {
    cy.clearAllLocalStorage();
    cy.clearCookies();
  });

  it('создание заказа бургера', function () {

    const newOrderNumber = '12345';

    cy.get('[data-cy=constructor]').contains(bunName).should('not.exist');
    cy.get('[data-cy=constructor]').contains(sauceName).should('not.exist');
    cy.get('[data-cy=constructor]').contains(mainName).should('not.exist');

    cy.get('[data-cy=order-button]').contains('Оформить заказ').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=constructor]').contains(bunName).should('exist');
    cy.get('[data-cy=constructor]').contains(sauceName).should('exist');
    cy.get('[data-cy=constructor]').contains(mainName).should('exist');

    cy.get('[data-cy=order-number]').should('not.exist');
    cy.get('[data-cy=order-button]').contains('Оформить заказ').click();
    cy.get('[data-cy=order-number]').contains(newOrderNumber).should('exist');

    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor]').contains(bunName).should('not.exist');
    cy.get('[data-cy=constructor]').contains(sauceName).should('not.exist');
    cy.get('[data-cy=constructor]').contains(mainName).should('not.exist');
  });
});

function setTokens() {
  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify('test-refresh-token')
  );

  cy.setCookie('accessToken', 'test-access-token');
  const mockToken = 'mockToken';
  localStorage.setItem('accessToken', mockToken);
}
