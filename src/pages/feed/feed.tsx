import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/feed/actions';
import { getAllOrders, getFeedsIsLoading } from '../../services/feed/slice';
import { getOrders } from '../../services/orders/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getAllOrders);
  const isLoading = useSelector(getFeedsIsLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getOrders())} />
  );
};
