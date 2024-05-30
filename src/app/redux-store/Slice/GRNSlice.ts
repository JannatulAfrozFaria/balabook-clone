import { GrnSchema } from "./../../dashboard/grn/create/GRNFormSchema";
("use client");
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the initial state using that type
const initialState: GrnSchema = {
  id: "",
  grnNo: "",
  supplierId: "",
  poNoId: "",
  tpnId: "",
  products: [],
  total: 0,
  grossTotal: 0,
  grossTotalRound: 0,
  totalItem: 0,
  tax: 0,
  discount: 0,
  status: "Complete",
  userId: "",
};

export const grnSlice = createSlice({
  name: "grn",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      return {
        ...state,
        userId: action.payload,
      };
    },
    setlcNo: (state, action) => {
      return {
        ...state,
        lcNo: action.payload,
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
      // //@ts-ignore
      const total = products?.reduce(
        (acc: any, product: any) => acc + product.total,
        0
      );
      const grossTotal = products?.reduce(
        (acc: any, product: any) => acc + product.total,
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
export const { setUserId, setlcNo, setProducts, setPiNo, setNote } =
  grnSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.purchaseOrder;

export default grnSlice.reducer;
