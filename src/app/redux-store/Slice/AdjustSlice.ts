"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// Define a type for the slice state
interface adjustState {
  id: string;
  products?: any;
  note?: string;
  warehouseId?: string;
  userId?: string;
  adjustRcvQty?: string;
  adjustRcvTota?: string;
  adjustIssueQty?: string;
  adjustIssueTota?: string;
}

// Define the initial state using that type
const initialState: adjustState = {
  id: "",
  products: [],
  note: "",
  warehouseId: "",
  userId: ``,
};

export const adjustSlice = createSlice({
  name: "adjust",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      return {
        ...state,
        userId: action.payload,
      };
    },
    setWareHouseId: (state, action) => {
      return {
        ...state,
        warehouseId: action.payload,
      };
    },
    setRcvAdjustmentQty: (state, action) => {
      return {
        ...state,
        adjustRcvQty: action.payload,
      };
    },
    setRcvAdjustmentTotal: (state, action) => {
      return {
        ...state,
        adjustRcvTota: action.payload,
      };
    },
    setProducts: (state, action) => {
      console.log(action.payload);
      const products = action.payload;
      // const totalItem = products.length;
      // //@ts-nocheck
      const total = products?.reduce((acc, product) => acc + product.total, 0);
      const grossTotal = products?.reduce(
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
        totalItem: products?.length,
      };
    },
    // Add more reducers as needed
  },
});
export const {
  setUserId,
  setWareHouseId,
  setProducts,
  setRcvAdjustmentQty,
  setRcvAdjustmentTotal,
} = adjustSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.adjust;

export default adjustSlice.reducer;
