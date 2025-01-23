import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getCurrentUser } from '../../services/user/slice';

export const AppHeader: FC = () => {
  const user = useSelector(getCurrentUser);
  return <AppHeaderUI userName={user?.name} />;
};
