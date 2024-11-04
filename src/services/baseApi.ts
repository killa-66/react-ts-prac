import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { Ingredient } from "../types/Ingredient";

export interface ServerResponse<T> {
  data: T
  errors?: ServerError
  code: number
 }

 export interface ServerError {
  errors: [
   {
    message: string
    code: number
    customData: unknown
   }
  ]
 }

export const baseApi = createApi({
    reducerPath: 'ingredients/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://norma.nomoreparties.space/api/',
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        fetchIngredients: build.query<Ingredient[], void>({
            query: () => ({
                url: `ingredients`,
            }),
            transformResponse: (response: ServerResponse<Ingredient[]>) => {
              return response.data
            }
        }),
    })
})

export const { useFetchIngredientsQuery } = baseApi;