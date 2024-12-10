import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import { rootReducer } from './rootReducer';
import userApi from './userApi';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
