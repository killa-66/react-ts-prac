import { useEffect } from 'react';
import { useGetUserQuery } from '../services/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../services/store';
import { loginSuccess, logout } from '../services/slices/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);

  const token = localStorage.getItem('accessToken');
  const { data, error, isLoading } = useGetUserQuery(undefined, {
    skip: !token || isAuthenticated,
  });

  useEffect(() => {
    if (data) {
      dispatch(loginSuccess({ token: token!, user: data.user }));
    } else if (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
    }
  }, [data, error, dispatch, token]);

  return { isAuthenticated, isLoading, user };
};
