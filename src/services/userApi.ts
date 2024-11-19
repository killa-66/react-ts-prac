import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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
  }),
});

export const { useResetPasswordMutation, useSaveNewPasswordMutation } = userApi;
export default userApi;
