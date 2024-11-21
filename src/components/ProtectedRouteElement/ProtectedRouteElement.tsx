import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

interface TProtectedProps {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component}: TProtectedProps): React.JSX.Element => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
      const { from } = location.state ?? { from: { pathname: "/ "} };
      return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
      return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}: {component: React.JSX.Element}): React.JSX.Element => (
  <Protected onlyUnAuth={true} component={component} />
);