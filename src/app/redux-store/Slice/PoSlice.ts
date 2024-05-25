"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// Define a type for the slice state
interface poState {
  poNo: string;
  supplierId: string;
  containerId: string;
  piNo: string;
  products: any;
  totalItem: number;
  note: string;
  lcNo: string;
  total: number;
  tax: number;
  discount: number;
  grossTotal: number;
  grossTotalRound: number;
  status: string;
  userId: string;
}

// Define the initial state using that type
const initialState: poState = {
  poNo: "",
  supplierId: "",
  containerId: "",
  piNo: "",
  products: [],
  totalItem: 0,
  note: "",
  lcNo: "",
  total: 0,
  tax: 0,
  discount: 0,
  grossTotal: 0,
  grossTotalRound: 0,
  status: "Pending",
  //@ts-ignore
  userId: ``,
};

export const poSlice = createSlice({
  name: "purchaseOrder",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      return {
        ...state,
        userId: action.payload,
      };
    },
    selectSupplier: (state, action) => {
      return {
        ...state,
        supplierId: action.payload,
      };
    },
    setlcNo: (state, action) => {
      return {
        ...state,
        lcNo: action.payload,
      };
    },
    setContainerId: (state, action) => {
      return {
        ...state,
        containerId: action.payload,
      };
    },
    setPiNo: (state, action) => {
      return {
        ...state,
        piNo: action.payload,
      };
    },
    setNote: (state, action) => {
      return {
        ...state,
        note: action.payload,
      };
    },
    setProducts: (state, action) => {
      console.log(action.payload);
      const products = action.payload;
      // const totalItem = products.length;
      // //@ts-nocheck
      const total = products.reduce((acc, product) => acc + product.total, 0);
      const grossTotal = products.reduce(
        (acc, product) => acc + product.total,
        0
      );
      // const grossTotal = total - state.tax - state.discount;
      // const grossTotalRound = ceil(grossTotal);
      return {
        ...state,
        products: products,
        total: total,
        grossTotal: grossTotal,
        grossTotalRound: Math.round(grossTotal),
        totalItem: products.length,
      };
    },
    // Add more reducers as needed
  },
});
export const {
  setUserId,
  selectSupplier,
  setlcNo,
  setProducts,
  setContainerId,
  setPiNo,
  setNote,
} = poSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.purchaseOrder;

export default poSlice.reducer;
