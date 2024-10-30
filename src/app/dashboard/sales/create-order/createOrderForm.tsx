"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { orderColumn } from "./soldProductColumn";
import { CreateOrderDataTable } from "./data-table";
import SearchProduct from "@/components/ui/searchProduct";
import { searchProductById } from "../../products/_action";
import { CreateOrderSchema } from "./CreateOrderSchema";
import { InfoCard } from "./InfoCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux-store/store";
import {
  setCustomerId,
  setProducts,
  setReturnProducts,
  setUserId,
  setWarehouseId,
} from "@/app/redux-store/Slice/SalesSlice";
import { addToDb, addToReturnDb } from "@/lib/salesDb";
import SelectCustomer from "@/components/ui/SelectCustomer";
import { useSession } from "next-auth/react";
import { log } from "console";
import { ReturnDataTable } from "./return-data-table";


interface ProductFormEditProps {
  entry: any;
}

const data: any = [];

function CreateOrderForm({}) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const form = useForm();

  // console.log("returnActivate", returnActivate);

  const handleCustomerId = (id: string) => {
    //@ts-ignore
    dispatch(setCustomerId(id));
  };

  const onSearchChange = (query: any) => {
    query;
  };

  const salesData = useSelector((state: RootState) => state.sales);
  //getting user information
  //@ts-ignore
  const sessionUserId = session?.user?.id;
  //@ts-ignore
  const sessionUserWarehouseId = session?.user?.warehouseId;

  useEffect(() => {
    dispatch(setUserId(sessionUserId));
    dispatch(setWarehouseId(sessionUserWarehouseId));
  }, [sessionUserId]);

  //product selection function
  const handleSelectedProduct = async (productId: string) => {
    try {
      // TODO:: check if Return
      if (salesData.returnActive) {
        // TODO: IF RETURN
        // Check if exist
        const exist = salesData.returnProducts.find(
          (poProduct: any) => poProduct.id === productId
        );
        const rest = salesData.returnProducts.filter(
          (poProduct: any) => poProduct.id !== productId
        );
        console.log(salesData.returnProducts, rest, exist);
        let newProduct;
        if (exist) {
          // increase qty
          newProduct = {
            ...exist,
            qty: exist.qty + 1,
            total: (exist.qty + 1) * exist.tp,
          };
          addToReturnDb(newProduct);
          dispatch(setReturnProducts([...rest, newProduct]));
        } else {
          // add new
          const product = await searchProductById(productId);

          newProduct = {
            id: product?.id,
            name: product?.name,
            articleCode: product?.articleCode,
            //@ts-ignore
            mrp: product?.mrp !== null ? product.mrp : 0,
            tp: product?.tp !== null ? product.tp : 0,
            hsCode: product.hsCode,
            openingQty: product.openingQty,
            cogs: product.cogs,
            order: salesData.returnProducts.length + 1,
            closingQty: product.closingQty,
            qty: 1,
            // @ts-ignore
            total: 1 * product?.tp,
          };
        }

        if (salesData.returnActive) {
          addToReturnDb(newProduct);
          const product = [...rest, newProduct];
          console.log("return product", product);
          console.log("return product", product);
          dispatch(setReturnProducts([...rest, newProduct]));
        } else {
          addToDb(newProduct);
          dispatch(setProducts([...rest, newProduct]));
        }
      } else {
        // TODO: Not Return
        // Check if exist
        const exist = salesData.products.find(
          (poProduct: any) => poProduct.id === productId
        );
        const rest = salesData.products.filter(
          (poProduct: any) => poProduct.id !== productId
        );
        console.log(salesData.products, rest, exist);
        let newProduct;
        if (exist) {
          // increase qty
          newProduct = {
            ...exist,
            qty: exist.qty + 1,
            total: (exist.qty + 1) * exist.tp,
          };
          dispatch(setProducts(rest));
          addToDb(newProduct);
          dispatch(setProducts([...rest, newProduct]));
        } else {
          // add new
          const product = await searchProductById(productId);

          newProduct = {
            id: product?.id,
            name: product?.name,
            articleCode: product?.articleCode,
            //@ts-ignore
            mrp: product?.mrp !== null ? product.mrp : 0,
            tp: product?.tp !== null ? product.tp : 0,
            hsCode: product.hsCode,
            openingQty: product.openingQty,
            cogs: product.cogs,
            closingQty: product.closingQty,
            order: salesData.products.length + 1,
            qty: 1,
            // @ts-ignore
            total: 1 * product?.tp,
          };
        }

        if (salesData.returnActive) {
          addToReturnDb(newProduct);
          const product = [...rest, newProduct];
          console.log("return product", product);
          console.log("return product", product);
          dispatch(setReturnProducts([...rest, newProduct]));
        } else {
          addToDb(newProduct);
          dispatch(setProducts([...rest, newProduct]));
        }
      }
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  };

  console.log("salesData", salesData);
  return (
    <div className="flex">
      <Form {...form}>
        <form
          //@ts-ignore
          onSubmit={form.handleSubmit()}
          className="w-full space-y-4"
        >
          <div className="flex w-full">
            <div className="w-2/3 mx-4 ">
              <div className="flex items-center py-2 flex w-full  gap-4">
                <FormField
                  control={form.control}
                  name="productSearch"
                  render={({ field }) => (
                    <FormItem className="w-2/3">
                      <FormControl>
                        <SearchProduct handleSelect={handleSelectedProduct} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between w-1/3">
                  <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                      <FormItem style={{ width: "70%" }}>
                        <FormControl>
                          <SelectCustomer handleSelect={handleCustomerId} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="">
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
              {/* table, search, import */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-0">
                {salesData.id !== "" ? (
                  <p className="text-sm font-bold mb-[-10px]">Sold Product</p>
                ) : null}
                {salesData?.returnActive ? (
                  <div className="">
                    <ReturnDataTable
                      columns={columns}
                      data={
                        salesData?.returnProducts?.length > 0
                          ? salesData?.returnProducts
                              ?.slice()
                              // @ts-ignore
                              .sort((a, b) => a.order - b.order)
                          : []
                      }
                    />
                  </div>
                ) : (
                  <CreateOrderDataTable
                    columns={salesData.id != "" ? orderColumn : columns}
                    // @ts-ignore
                    data={
                      salesData.id != ""
                        ? salesData.soldProducts
                        : salesData?.products?.length > 0
                        ? salesData?.products
                            ?.slice()
                            // @ts-ignore
                            .sort((a, b) => a.order - b.order)
                        : []
                    }
                  />
                )}
              </div>

              {/* <div>
                {salesData ? (
                  <p className="text-sm font-bold mb-2">Return Product</p>
                ) : null}
                {salesData ? (
                  <ReturnDataTable columns={columns} data={salesData} />
                ) : null}
              </div> */}
            </div>

            {/* invoice form */}
            <div className="w-1/3 mx-4">
              {
                //@ts-ignore
                <InfoCard salesData={salesData ? salesData : salesData} />
              }
              {/* {returnActive && <div>Return is Active</div>} */}
            </div>
          </div>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}

export default CreateOrderForm;
