"use client";
import { configureStore } from "@reduxjs/toolkit";
import poReducer from "./Slice/PoSlice";
import grnReducer from "./Slice/GRNSlice";
import salesReducer from "./Slice/SalesSlice";
import tpnReducer from "./Slice/TPNSlice";
import adjustReducer from "./Slice/AdjustSlice";
import damageReducer from "./Slice/DamageSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      purchaseOrder: poReducer, // Add the poSlice reducer to the store
      grn: grnReducer, // Add the poSlice reducer to the store
      sales: salesReducer,
      tpn: tpnReducer,
      adjust: adjustReducer,
      damage: damageReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
