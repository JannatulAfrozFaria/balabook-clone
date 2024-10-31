"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the item slice state
interface ItemState {
  id?: string;
  description?: string;
  action?: string;
  price?: number;
  discount?: number;
  vat?: string;
  total?: number;
}

// Define the initial state using that type
const initialState: ItemState = {
  id: "",
  description: "",
  action: "",
  price: 0,
  discount: 0,
  vat: "vat 19", // Default VAT
  total: 0,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setAction: (state, action: PayloadAction<string>) => {
      state.action = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
      // state.total = (state.price - (state.price * (state.discount ?? 0)) / 100) * (1 + (state.vat === "vat 19" ? 0.19 : 0)); // Calculate total based on VAT and discount
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      // state.total = (state?.price - (state.price * state.discount) / 100) * (1 + (state.vat === "vat 19" ? 0.19 : 0)); // Update total on discount change
    },
    setVat: (state, action: PayloadAction<string>) => {
      state.vat = action.payload;
      // state.total = (state.price - (state.price * (state.discount ?? 0)) / 100) * (1 + (state.vat === "vat 19" ? 0.19 : 0)); // Update total on VAT change
    },
  },
});

// Export actions to use in components
export const { setDescription, setAction, setPrice, setDiscount, setVat } = itemSlice.actions;

// Selector to access item state
export const selectItem = (state: RootState) => state.item;

export default itemSlice.reducer;
