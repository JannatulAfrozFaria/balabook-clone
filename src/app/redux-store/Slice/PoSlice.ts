'use client';
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
  products: any;
  totalItem: number;
  lcNo:string;
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
    products: [],
    totalItem: 0,
    lcNo:"",
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
      setUserId: (state, action) =>{
        return {
          ...state,
          userId: action.payload,
        };
      },
      selectSupplier: (state, action) =>{
        return{
          ...state,
          supplierId: action.payload,
        }
      },
      setlcNo: (state, action) =>{
        return{
          ...state,
          lcNo: action.payload,
        }
      }
      // Add more reducers as needed
    },
  });
export const {setUserId,selectSupplier, setlcNo } = poSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.purchaseOrder;

export default poSlice.reducer;
