"use client";
//@ts-ignore
import { OrderFormSchema } from "@/app/dashboard/orders/OrderFormSchema";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the initial state using that type
const initialState: OrderFormSchema = {
  id: "",
  invoiceId: "",
  source: "TCM",
  warehouseId: "",
  userId: "",
  customerId: "",
  products: [],
  returnProducts: [],
  returnCalculation: 0,
  totalItem: 0,
  total: 0,
  discount: 0,
  vat: 0,
  grossTotal: 0,
  grossTotalRound: 0,
  totalRecievable: 0,
  totalRecieved: 0,
  changeAmount: 0,
  paidAmount: {
    cash: 0,
    card: { name: "visa", amount: 0 },
    mfs: { name: "bkash", amount: 0 },
  },
  status: "Ordered",
  returnActive: false,
  billActive: false,
};

export const salesSlice = createSlice({
  name: "salesSlice",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      return {
        ...state,
        userId: action.payload,
      };
    },
    setCustomerId: (state, action) => {
      return {
        ...state,
        customerId: action.payload,
      };
    },
    setAmount: (state, action) => {
      return {
        ...state,
        amount: action.payload,
      };
    },
    setWarehouseId: (state, action) => {
      return {
        ...state,
        warehouseId: action.payload,
      };
    },
    setChangeAmount: (state, action) => {
      return {
        ...state,
        changeAmount: action.payload,
      };
    },
    setDiscount: (state, action) => {
      return {
        ...state,
        discount: action.payload,
      };
    },
    setTotalRecievable: (state, action) => {
      return {
        ...state,
        totalRecievable: action.payload,
      };
    },
    setPaidAmount: (state, action) => {
      return {
        ...state,
        paidAmount: action.payload,
      };
    },
    setPaymentMethod: (state, action) => {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },
    setNote: (state, action) => {
      return {
        ...state,
        note: action.payload,
      };
    },
    setStatus: (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    setProducts: (state, action) => {
      const products = action.payload;
      // const totalItem = products.length;
      // //@ts-ignore
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
    setReturnProducts: (state, action) => {
      const products = action.payload;
      // const totalItem = products.length;
      // //@ts-ignore
      const total = products.reduce((acc, product) => acc + product.total, 0);
      const grossTotal = products.reduce(
        (acc, product) => acc + product.total,
        0
      );
      // const grossTotal = total - state.tax - state.discount;
      // const grossTotalRound = ceil(grossTotal);
      return {
        ...state,
        returnProducts: products,
        total: total,
        grossTotal: grossTotal,
        grossTotalRound: Math.round(grossTotal),
        totalItem: products.length,
      };
    },
    setCash: (state, action) => {
      return {
        ...state,
        paidAmount: {
          ...state.paidAmount,
          cash: action.payload,
        },
      };
    },
    setCardName: (state, action) => {
      return {
        ...state,
        paidAmount: {
          ...state.paidAmount,
          card: {
            ...state.paidAmount.card,
            name: action.payload,
          },
        },
      };
    },
    setCardAmount: (state, action) => {
      return {
        ...state,
        paidAmount: {
          ...state.paidAmount,
          card: {
            ...state.paidAmount.card,
            amount: action.payload,
          },
        },
      };
    },
    setMfsName: (state, action) => {
      return {
        ...state,
        paidAmount: {
          ...state.paidAmount,
          mfs: {
            name: action.payload,
            amount: 0,
          },
        },
      };
    },
    setMfsAmount: (state, action) => {
      return {
        ...state,
        paidAmount: {
          ...state.paidAmount,
          mfs: {
            name: state.paidAmount.mfs.name,
            amount: action.payload,
          },
        },
      };
    },
    setReceivedAmount: (state, action) => {
      return {
        ...state,
        totalRecieved: action.payload,
      };
    },
    setReturnActive: (state, action) => {
      return {
        ...state,
        returnActive: action.payload,
      };
    },
    setBillActive: (state, action) => {
      return {
        ...state,
        billActive: action.payload,
      };
    },
    reset: (state) => (state = initialState),
    // Add more reducers as needed
  },
});
export const {
  setUserId,
  setCustomerId,
  setTotalRecievable,
  setAmount,
  setPaidAmount,
  setPaymentMethod,
  setReturnProducts,
  setNote,
  reset,
  setProducts,
  setCash,
  setCardName,
  setCardAmount,
  setMfsName,
  setMfsAmount,
  setReceivedAmount,
  setChangeAmount,
  setDiscount,
  setWarehouseId,
  setStatus,
  setReturnActive,
  setBillActive,
} = salesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.purchaseOrder;

export default salesSlice.reducer;
