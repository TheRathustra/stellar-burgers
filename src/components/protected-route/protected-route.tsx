import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getIsAuthChecked,
  getIsAuthenticated
} from '../../services/user/slice';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: TProtectedRouteProps): React.ReactElement => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const location = useLocation();

  if (!isAuthChecked) {
    return Preloader();
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  component
}: {
  component: React.ReactElement;
}): React.ReactElement => <ProtectedRoute onlyUnAuth component={component} />;
