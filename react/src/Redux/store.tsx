import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    number: (state: number = 1) => state,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export type GetStateMethodType = typeof store.getState;
