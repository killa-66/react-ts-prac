import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ingredient } from '../types/Ingredient';

export interface ServerResponse<T> {
  data: T;
  errors?: ServerError;
  code: number;
}

export interface ServerError {
  errors: [
    {
      message: string;
      code: number;
      customData: unknown;
    }
  ];
}

export interface IOrderRequest {
  ingredients: string[];
}

export interface IOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export const baseApi = createApi({
  reducerPath: 'ingredients/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://norma.nomoreparties.space/api/',
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    fetchIngredients: build.query<Ingredient[], void>({
      query: () => ({
        url: 'ingredients',
      }),
      transformResponse: (response: ServerResponse<Ingredient[]>) => {
        return response.data;
      },
    }),
    compliteOrder: build.mutation<IOrderResponse, IOrderRequest>({
      query: (orderRequest) => ({
        url: 'orders',
        method: 'POST',
        body: orderRequest,
      }),
    }),
  }),
});

export const { useFetchIngredientsQuery, useCompliteOrderMutation } = baseApi;
