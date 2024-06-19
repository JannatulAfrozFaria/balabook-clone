"use client";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

import { Calendar as CalendarIcon, SendHorizonal } from "lucide-react";

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
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import SelectSupplier from "@/components/ui/SelectSupplier";
import SelectBrand from "@/components/ui/SelectBrand";
import { savePo } from "../_action";
import { PoDataTable } from "./data-tables";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserId,
  selectSupplier,
  setlcNo,
  setProducts,
  setContainerId,
  setPiNo,
  setNote,
  reset,
} from "@/app/redux-store/Slice/PoSlice";
import { useSession } from "next-auth/react";
import { RootState } from "@/app/redux-store/store";
import CsvUpload from "@/components/CsvUpload";
import { importProduct, searchProductById } from "../../products/_action";
import SearchProduct from "@/components/ui/searchProduct";
import { addToDb, getStoredCart, removeFromDb } from "@/lib/poDb";
import { redirect, useRouter } from "next/navigation";
import { PoSchema } from "../PoSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns } from "./columns";

interface PoCart {
  id: string;
  name: string;
  articleCode: string;
  mrp: number;
  tp: number;
  hsCode: string;
  openingQty: number;
  cogs: number;
  closingQty: number;
  qty: number;
  total: number;
}
interface ProductFormEditProps {
  entry: any;
}

function ProductForm({ entry }: ProductFormEditProps) {
  const form = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  // @ts-ignore
  const sessionUserId = session?.user?.id;

  //  (sessionUserId);

  const poData = useSelector((state: RootState) => state.purchaseOrder);
  const storeProduct = getStoredCart();

  //  (poData);

  useEffect(() => {
    dispatch(setUserId(sessionUserId));
    dispatch(setProducts(storeProduct));
  }, [sessionUserId]);

  useEffect(() => {
    dispatch(setProducts(storeProduct));
  }, [addToDb]);

  const handleSupplierId = (id: string) => {
    // form.setValue("supplierId", id);
    dispatch(selectSupplier(id));
  };

  const handleBrandId = (id: string) => {};

  // handleRemoveItem

  const handleRemoveItem = (id: string) => {
    removeFromDb(id);
  };

  // handleSelectedProduct;
  const [poProduct, setPoProduct] = useState<PoCart[]>([]);

  const handleSelectedProduct = async (productId: string) => {
    try {
      // Check if exist
      const exist = poData?.products.find(
        (poProduct: any) => poProduct.id === productId
      );
      const rest = poData?.products.filter(
        (poProduct: any) => poProduct.id !== productId
      );
      let newProduct;
      if (exist) {
        // inrease qty

        newProduct = {
          ...exist,
          qty: parseInt(exist.qty) + 1,
          total: parseInt(exist.qty + 1) * exist.tp,
        };
        dispatch(setProducts(rest));
        localStorage.setItem(
          "purchase_cart",
          JSON.stringify([...rest, newProduct])
        );
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

  const [CSV, setCSV] = useState<any>([]);

  const handelImport = async () => {
    //  ("Import", CSV);
    if (CSV?.length > 0) {
      const product = await importProduct(CSV);
      if (product) {
        toast.success("Product Import Success");
      }
    }
  };

  const products = poData ? poData.products : null;

  async function onSubmit(data: PoSchema) {
    try {
      //@ts-ignore
      const PO = await savePo(poData);
      if (PO) {
        toast.success(PO ? "PO Creation Success" : "PO Update Success");
        dispatch(reset());
        router.push("/dashboard/po");
      } else {
        toast.error(PO ? "PO Creation faield!" : "PO Update faield!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // const sortedArray = array.slice().sort((a, b) => a.order - b.order);
  return (
    <div className="flex pt-8">
      <Form {...form}>
        <form
          // onSubmit={onSubmit}
          //@ts-ignore
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="flex w-full">
            <div className="w-full mx-4 ">
              {/* masterCategory, shCode, salesType */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-0 ">
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>

                      <FormControl>
                        <SelectSupplier handleSelect={handleSupplierId} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="lcNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LC No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          value={poData.lcNo}
                          onChange={(e) => {
                            const { value } = e.target;
                            dispatch(setlcNo(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="piNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PI No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="PI No"
                          {...field}
                          value={poData.piNo}
                          onChange={(e) => {
                            const { value } = e.target;
                            dispatch(setPiNo(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        //@ts-ignore
                        defaultValue={
                          poData?.country ? poData.country : "China"
                        }
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="China" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="China">China</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="containerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Container ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="container ID"
                          {...field}
                          value={poData.containerId}
                          onChange={(e) => {
                            const { value } = e.target;
                            dispatch(setContainerId(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center py-2 grid grid-cols-2 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="productSearch"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SearchProduct handleSelect={handleSelectedProduct} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CsvUpload setCSV={setCSV} handelImport={handelImport} />
              </div>

              {/* table, search, import */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-0">
                <PoDataTable
                  columns={columns}
                  data={
                    poData?.products?.length > 0
                      ? poData?.products
                          ?.slice()
                          // @ts-ignore
                          .sort((a, b) => a.order - b.order)
                      : []
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-0">
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Note"
                          {...field}
                          //@ts-ignore
                          value={poData.note}
                          onChange={(e) => {
                            const { value } = e.target;
                            dispatch(setNote(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 mt-4 pb-2 border-b">
                <p className="font-bold">{/* Discount: <span>0.00</span> */}</p>
                <p className="font-bold">{/* Tax: <span>0.00</span> */}</p>
                <p className="font-bold">
                  Total Item: <span>{poData.totalItem}</span>
                </p>
                <p className="font-bold">
                  Gross Total: <span>{poData.grossTotal}</span>
                </p>
                <p className="font-bold">
                  Gross Total Round: <span>{poData.grossTotalRound}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <Button type="submit" className="mr-4">
              Submit <SendHorizonal className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
        {/* <DevTool control={form.control} /> */}
      </Form>
      <Toaster />
    </div>
  );
}

export default ProductForm;
