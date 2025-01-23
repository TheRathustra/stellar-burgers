import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getOrderModalData,
  getOrderRequest,
  resetOrderModalData
} from '../../services/orders/slice';
import { getIsAuthenticated } from '../../services/user/slice';
import { clearSelectedOrder } from '../../services/feed/slice';
import {
  getBunIngredient,
  getConstructorIngredients
} from '../../services/burger-creator/slice';
import { clearOrder } from '../../services/order-burger/slice';
import { createOrder } from '../../services/orders/actions';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const IsAuthenticated = useSelector(getIsAuthenticated);

  const constructorItems = {
    bun: useSelector(getBunIngredient),
    ingredients: useSelector(getConstructorIngredients)
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!IsAuthenticated) {
      return navigate('/login');
    }
    if (orderRequest) {
      return <Preloader />;
    }

    const newOrder = [
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    dispatch(createOrder(newOrder));
  };

  const closeOrderModal = () => {
    dispatch(clearSelectedOrder());
    dispatch(clearOrder());
    dispatch(resetOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
