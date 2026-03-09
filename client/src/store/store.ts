import { configureStore } from '@reduxjs/toolkit';
import { formsApi } from '../services/formsApi';
import { formBuilderReducer } from './formBuilderSlice';

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    [formsApi.reducerPath]: formsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(formsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
