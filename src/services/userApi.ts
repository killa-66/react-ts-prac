import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loginSuccess, logout } from './slices/userSlice';

export interface IUser {
  email: string;
  name: string;
}

export interface IPasswordResetResponse {
  success: boolean;
  message: string;
}

export interface IPasswordResetRequest {
  email: string;
}

export interface IPasswordSaveRequest {
  password: string;
  token: string;
}

export interface IAuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface ILogoutResponse {
  success: boolean;
  message: string;
}

export interface ILogoutRequest {
  token: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface IUserResponse {
  success: boolean;
  user: IUser;
}

const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://norma.nomoreparties.space/api/',
  }),
  endpoints: (build) => ({
    resetPassword: build.mutation<IPasswordResetResponse, IPasswordResetRequest>({
      query: (body) => ({
        url: 'password-reset',
        method: 'POST',
        body,
      }),
    }),
    saveNewPassword: build.mutation<IPasswordResetResponse, IPasswordSaveRequest>({
      query: (body) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<IAuthResponse, IAuthRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, refreshToken, user } = data;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          dispatch(
            loginSuccess({
              token: accessToken,
              user,
            })
          );
        } catch (error) {
          console.error('Ошибка авторизации:', error);
        }
      },
    }),
    register: build.mutation<IAuthResponse, IRegisterRequest>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, refreshToken, user } = data;
          localStorage.setItem('refreshToken', refreshToken);
          dispatch(
            loginSuccess({
              token: accessToken,
              user,
            })
          );
        } catch (error) {
          console.error('Ошибка регистрации:', error);
        }
      },
    }),
    logout: build.mutation<ILogoutResponse, ILogoutRequest>({
      query: (body) => ({
        url: 'auth/logout',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {

          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');

          dispatch(logout());
        } catch (error) {
          console.error('Ошибка при выходе:', error);
        }
      },
    }),
    refreshToken: build.mutation<IAuthResponse, void>({
      query: () => ({
        url: 'auth/token',
        method: 'POST',
      }),
    }),
    getUser: build.query<IUserResponse, void>({
      query: () => {
        const token = localStorage.getItem('accessToken');
        return {
          url: 'auth/user',
          method: 'GET',
          headers: {
            Authorization: `Bearer${token}`,
          },
        };
      },
    }),
    setUser: build.mutation<IUserResponse, IUser>({
      query: (body) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: 'auth/user',
          method: 'PATCH',
          body,
          headers: {
            Authorization: `Bearer${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useResetPasswordMutation,
  useSaveNewPasswordMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useLoginMutation,
  useGetUserQuery,
  useSetUserMutation,
} = userApi;
export default userApi;
