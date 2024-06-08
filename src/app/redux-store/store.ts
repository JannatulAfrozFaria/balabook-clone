"use client";
import { configureStore } from "@reduxjs/toolkit";
import poReducer from "./Slice/PoSlice";
import grnReducer from "./Slice/GRNSlice";
import salesReducer from "./Slice/SalesSlice";
import tpnReducer from "./Slice/TPNSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      purchaseOrder: poReducer, // Add the poSlice reducer to the store
      grn: grnReducer, // Add the poSlice reducer to the store
      sales: salesReducer,
      tpn: tpnReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
