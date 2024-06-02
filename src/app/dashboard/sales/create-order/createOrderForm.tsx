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
  setUserId,
} from "@/app/redux-store/Slice/SalesSlice";
import { addToDb } from "@/lib/salesDb";
import SelectCustomer from "@/components/ui/SelectCustomer";
import { useSession } from "next-auth/react";

interface ProductFormEditProps {
  entry: any;
}
const data: any = [];
function CreateOrderForm({ entry }: ProductFormEditProps) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [id, setId] = useState<string>("");
  const [mcId, setMcId] = useState<string>("");
  const form = useForm();

  const handleCustomerId = (id: string) => {
    console.log("customer id", id);
    //@ts-ignore
    dispatch(setCustomerId(id));
  };

  const onSearchChange = (query: any) => {
    console.log(query);
  };

  const salesData = useSelector((state: RootState) => state.sales);
  //getting user information
  //@ts-ignore
  const sessionUserId = session?.user?.id;
  useEffect(() => {
    dispatch(setUserId(sessionUserId));
  }, [sessionUserId]);

  //product selection function
  const handleSelectedProduct = async (productId: string) => {
    try {
      // Check if exist
      const exist = salesData.products.find(
        (poProduct: any) => poProduct.id === productId
      );
      const rest = salesData.products.filter(
        (poProduct: any) => poProduct.id !== productId
      );
      let newProduct;
      if (exist) {
        // inrease qty

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
          qty: 1,
          // @ts-ignore
          total: 1 * product?.tp,
        };
      }

      addToDb(newProduct);
      dispatch(setProducts([...rest, newProduct]));
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  };

  async function onSubmit(data: CreateOrderSchema) {
    // try {
    //   console.log("product", data);
    //   //@ts-ignore
    //   const product = await saveProduct(id, data);
    //   if (product) {
    //     form.reset();
    //     toast.success(
    //       id ? "Product Update Success" : "Product Creation Success"
    //     );
    //   } else {
    //     toast.error(id ? "Product Update faield!" : "Product Creation faield!");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }

  console.log("productData", salesData);
  return (
    <div className="flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
                <CreateOrderDataTable
                  columns={columns}
                  // @ts-ignore
                  data={
                    salesData?.products?.length > 0
                      ? salesData?.products
                          ?.slice()
                          // @ts-ignore
                          .sort((a, b) => a.order - b.order)
                      : []
                  }
                />
              </div>
            </div>

            {/* invoice form */}
            <div className="w-1/3 mx-4">
              <InfoCard salesData={salesData} />
            </div>
          </div>

          {/* <div className="w-full flex justify-end">
            <Button type="submit" className="mr-4">
              Submit <SendHorizonal className="ml-2 h-4 w-4" />{" "}
            </Button>
          </div> */}
        </form>
        {/* <DevTool control={form.control} /> */}
      </Form>
      <Toaster />
    </div>
  );
}

export default CreateOrderForm;
