import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./Slice/ItemSlice";

export const store = configureStore({
  reducer: {
    item: itemReducer, // Ensure this is present
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
