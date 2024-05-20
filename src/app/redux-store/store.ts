"use client";
import { configureStore } from "@reduxjs/toolkit";
import poReducer from "./Slice/PoSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      purchaseOrder: poReducer, // Add the poSlice reducer to the store
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
