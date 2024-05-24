"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

import { format, set } from "date-fns";
import { Calendar as CalendarIcon, SendHorizonal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import productPhoto from "./img/product.jpg";
import Image from "next/image";
import { DevTool } from "@hookform/devtools";
import SelectSupplier from "@/components/ui/SelectSupplier";
import SelectMc from "@/components/ui/SelectMc";
import SelectCategory from "@/components/ui/SelectCategory";
import SelectBrand from "@/components/ui/SelectBrand";
import { saveProduct } from "../_action";
import { PoDataTable } from "./data-tables";
import { columns } from "./columns";
// import { POFormSchema } from "./PoFormSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserId,
  selectSupplier,
  setlcNo,
  setProducts,
} from "@/app/redux-store/Slice/PoSlice";
import { useSession } from "next-auth/react";
import { RootState } from "@/app/redux-store/store";
import CsvUpload from "@/components/CsvUpload";
import { importProduct, searchProductById } from "../../products/_action";
import SearchProduct from "@/components/ui/searchProduct";
import { addToDb, getStoredCart, removeFromDb } from "@/lib/poDb";

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
  const [id, setId] = useState<string>("");
  const [mcId, setMcId] = useState<string>("");

  const form = useForm();
  //   const form = useForm<z.infer<typeof POFormSchema>>({
  //     resolver: zodResolver(POFormSchema),
  //     defaultValues: {
  //       name: "",
  //       qty: 0,
  //       mrp: 0,
  //       tp: 0,
  //       total: 0,
  //       vat: 0,
  //       stock: 0,
  //       supplier: "",
  //       tax: 0,
  //       hsCode: "",
  //       country: "",
  //       supplierId: "",
  //       discount: 0,
  //       grosTotal: 0,
  //       grossTotalRound: 0,
  //       note: "",
  //       containerId: "",
  //       lcNo:"",
  //     },
  //   });

  const dispatch = useDispatch();
  const { data: session } = useSession();

  const sessionUserId = session?.user?.id;

  const poData = useSelector((state: RootState) => state.purchaseOrder);
  const storeProduct = getStoredCart();

  console.log(poData);

  useEffect(() => {
    dispatch(setUserId(sessionUserId));
    dispatch(setProducts(storeProduct));
  }, []);

  useEffect(() => {
    dispatch(setProducts(storeProduct));
  }, [addToDb]);

  const handleSupplierId = (id: string) => {
    // form.setValue("supplierId", id);
    dispatch(selectSupplier(id));
  };

  //   const handleMcId = (id: string) => {
  //     form.setValue("masterCategoryId", id);
  //     setMcId(id);
  //   };
  //   const handleCategoryId = (id: string) => {
  //     form.setValue("categoryId", id);
  //     setMcId(id);
  //   };
  const handleBrandId = (id: string) => {
    // form.setValue( id);
    setMcId(id);
  };

  // handleRemoveItem

  const handleRemoveItem = (id: string) => {
    removeFromDb(id);
  };

  // handleSelectedProduct;
  const [poProduct, setPoProduct] = useState<PoCart[]>([]);

  const handleSelectedProduct = async (productId: string) => {
    try {
      // Check if exist
      const exist = poData.products.find(
        (poProduct) => poProduct.id === productId
      );
      const rest = poData.products.filter(
        (poProduct) => poProduct.id !== productId
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
          mrp: product?.mrp | 0,
          tp: product?.tp | 0,
          hsCode: product.hsCode,
          openingQty: product.openingQty,
          cogs: product.cogs,
          closingQty: product.closingQty,
          qty: 1,
          total: 1 * product.tp,
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
    // console.log("Import", CSV);
    if (CSV?.length > 0) {
      const product = await importProduct(CSV);
      if (product) {
        toast.success("Product Import Success");
      }
    }
  };

  const products = poData ? poData.products : null;

  // Calculate length of items
  const itemsLength: number = products.length;

  // Calculate gross total of items
  const grossTotal: number = products.reduce(
    (acc, product) => acc + product.total,
    0
  );

  console.log("Length of items:", itemsLength);
  console.log("Gross total of items:", grossTotal);
  // const sortedArray = array.slice().sort((a, b) => a.order - b.order);
  return (
    <div className="flex pt-8">
      <Form {...form}>
        <form
          // onSubmit={onSubmit}
          className="w-full space-y-4"
        >
          <div className="flex w-full">
            <div className="w-full mx-4 ">
              {/* masterCategory, shCode, salesType */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-0 ">
                <FormField
                  control={form.control}
                  name="supplierId"
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
                  name="qty"
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
                  name="qty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PI No</FormLabel>
                      <FormControl>
                        <Input placeholder="PI No" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <SelectBrand handleSelect={handleBrandId} />
                      </FormControl>
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
                        <Input placeholder="container ID" {...field} />
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
                  data={poData?.products
                    ?.slice()
                    .sort((a, b) => a.order - b.order)}
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
                        <Textarea placeholder="Note" {...field} />
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
