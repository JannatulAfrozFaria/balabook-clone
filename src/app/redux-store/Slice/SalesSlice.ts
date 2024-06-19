"use client";
//@ts-ignore
import { OrderFormSchema } from "@/app/dashboard/orders/OrderFormSchema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "@prisma/client";

// Define the initial state using that type
const initialState: OrderFormSchema = {
  id: "",
  invoiceId: "",
  source: "TCM",
  warehouseId: "",
  userId: "",
  customerId: "",
  products: [],
  orderCalculation: [],
  returnProducts: [],
  returnCalculation: [],
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

    //array type data
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      salesSlice.caseReducers.setOrderCalculation(state);
    },
    setOrderCalculation: (state) => {
      const products = state.products;
      const total = products.reduce((acc, product) => acc + product.total, 0);
      const grossTotal = products.reduce(
        (acc, product) => acc + product.total,
        0
      );

      state.orderCalculation = {
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
        (acc, product) => acc + product.total,
        0
      );
      const grossTotal = returnProducts.reduce(
        (acc, product) => acc + product.total,
        0
      );

      state.returnCalculation = {
        total: total,
        grossTotal: grossTotal,
        grossTotalRound: Math.round(grossTotal),
        totalItem: returnProducts.length,
      };
    },
    moveProductToReturn: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex(
        (product: any) => product.id === productId
      );

      if (productIndex !== -1) {
        const product = state.products[productIndex];
        state.products.splice(productIndex, 1);
        state.returnProducts.push(product);

        // Recalculate totals
        state.total = state.products.reduce(
          (acc: any, product: any) => acc + product.total,
          0
        );
        state.grossTotal = state.products.reduce(
          (acc: any, product: any) => acc + product.total,
          0
        );
        state.grossTotalRound = Math.round(state.grossTotal);
        state.totalItem = state.products.length;

        // Recalculate return product totals
        state.returnCalculation = state.returnProducts.reduce(
          (acc: any, product: any) => acc + product.total,
          0
        );
      }
    },
    removeProductFromReturn: (state, action) => {
      const productId = action.payload;
      const productIndex = state.returnProducts.findIndex(
        (product: any) => product.id === productId
      );

      if (productIndex !== -1) {
        const product = state.returnProducts[productIndex];
        state.returnProducts.splice(productIndex, 1);
        state.products.push(product);

        // Recalculate totals
        state.total = state.products.reduce(
          (acc: any, product: any) => acc + product.total,
          0
        );
        state.grossTotal = state.products.reduce(
          (acc: any, product: any) => acc + product.total,
          0
        );
        state.grossTotalRound = Math.round(state.grossTotal);
        state.totalItem = state.products.length;

        // Recalculate return product totals
        state.returnCalculation = state.returnProducts.reduce(
          (acc: any, product: any) => acc + product.total,
          0
        );
      }
    },

    //reset
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
  setReturnCalculation,
  setBillActive,
  moveProductToReturn,
  removeProductFromReturn,
  setOrderCalculation,
} = salesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.sales;

export default salesSlice.reducer;
