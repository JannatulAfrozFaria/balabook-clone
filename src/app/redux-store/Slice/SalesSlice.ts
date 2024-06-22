"use client";
//@ts-ignore
import { OrderFormSchema } from "@/app/dashboard/orders/OrderFormSchema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "@prisma/client";
import { totalmem } from "os";

// Define the initial state using that type
const initialState: OrderFormSchema = {
  id: "",
  invoiceId: "",
  source: "POS",
  warehouseId: "",
  userId: "",
  customerId: "",
  products: [],
  orderCalculation: {
    totalmem: 0,
    total: 0,
    vat: 0,
    grossTotal: 0,
    grossTotalRound: 0,
  },
  returnProducts: [],
  returnCalculation: {
    totalmem: 0,
    total: 0,
    vat: 0,
    grossTotal: 0,
    grossTotalRound: 0,
  },
  soldProducts: [],
  soldCalculation: {
    totalmem: 0,
    total: 0,
    vat: 0,
    grossTotal: 0,
    grossTotalRound: 0,
  },

  totalItem: 0,
  total: 0,
  discount: 0,
  vat: 0,
  grossTotal: 0,
  grossTotalRound: 0,
  totalRecievable: 0,

  paidAmount: {
    cash: 0,
    card: { name: "visa", amount: 0 },
    mfs: { name: "bkash", amount: 0 },
  },
  totalRecieved: 0,
  changeAmount: 0,

  status: "Ordered",
  returnActive: false,
  billActive: false,
};

export const salesSlice = createSlice({
  name: "salesSlice",
  initialState,
  reducers: {
    // individual Data
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
            name: state.paidAmount.mfs,
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

    //array type data
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.soldProducts = action.payload;
      salesSlice.caseReducers.setOrderCalculation(state);
      salesSlice.caseReducers.setSoldCalculation(state);
    },
    setSoldProduct: (state, action: PayloadAction<Product[]>) => {
      state.soldProducts = action.payload;
      salesSlice.caseReducers.setSoldCalculation(state);
    },
    setOrderCalculation: (state) => {
      const products = state.products;
      //@ts-ignore
      const total = products.reduce((acc, product) => acc + product.total, 0);
      const grossTotal = products.reduce(
        //@ts-ignore
        (acc, product) => acc + product.total,
        0
      );

      state.orderCalculation = {
        total: total,
        grossTotal: grossTotal,
        grossTotalRound: Math.round(grossTotal),
        totalItem: products.length,
      };
      salesSlice.caseReducers.updateMainTotal(state);
    },
    setSoldCalculation: (state) => {
      const products = state.products;
      //@ts-ignore
      const total = products.reduce((acc, product) => acc + product.total, 0);
      const grossTotal = products.reduce(
        //@ts-ignore
        (acc, product) => acc + product.total,
        0
      );

      state.soldCalculation = {
        total: total,
        grossTotal: grossTotal,
        grossTotalRound: Math.round(grossTotal),
        totalItem: products.length,
      };
    },

    setReturnProducts: (state, action: PayloadAction<Product[]>) => {
      state.returnProducts = action.payload;
      salesSlice.caseReducers.setReturnCalculation(state);
    },

    //calculations
    setReturnCalculation: (state) => {
      const returnProducts = state.returnProducts;
      const total = returnProducts.reduce(
        //@ts-ignore
        (acc, product) => acc + product?.total,
        0
      );
      const grossTotal = returnProducts.reduce(
        //@ts-ignore
        (acc, product) => acc + product?.total,
        0
      );

      state.returnCalculation = {
        total: total,
        grossTotal: grossTotal,
        grossTotalRound: Math.round(grossTotal),
        totalItem: returnProducts.length,
      };
      salesSlice.caseReducers.updateMainTotal(state);
    },

    updateMainTotal: (state) => {
      state.total =
        state.orderCalculation.total || 0 - state.returnCalculation.total || 0;
    },
    resetProducts: (state) => {
      state.products = initialState.products;
      salesSlice.caseReducers.setOrderCalculation(state);
    },
    resetReturnProducts: (state) => {
      state.returnProducts = initialState.returnProducts;
      salesSlice.caseReducers.setReturnCalculation(state);
    },
    //reset
    reset: (state) => (state = initialState),

    setSalesForUpdate: (state, action) => {
      console.log("state", state);
      const saleData = action.payload;
      return (state = { saleData });
    },
    // Add more reducers as needed
  },
});
export const {
  setUserId,
  setCustomerId,
  resetProducts,
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
  setReturnCalculation,
  setBillActive,
  updateMainTotal,
  setOrderCalculation,
  setSoldCalculation,
  resetReturnProducts,
  setSalesForUpdate,
  setSoldProduct,
} = salesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.sales;

export default salesSlice.reducer;
