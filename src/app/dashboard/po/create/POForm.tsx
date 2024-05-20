"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

import { format } from "date-fns";
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
import { saveProduct, searchProductDw } from "../_action";
import { PoDataTable } from "./data-tables";
import { columns } from "./columns";
import { POFormSchema } from "./PoFormSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserId,
  selectSupplier,
  setlcNo,
} from "@/app/redux-store/Slice/PoSlice";
import { useSession } from "next-auth/react";
import { RootState } from "@/app/redux-store/store";
import CsvUpload from "@/components/CsvUpload";
import { importProduct } from "../../products/_action";
import SearchProduct from "@/components/ui/searchProduct";

interface ProductFormEditProps {
  entry: any;
}
const data: any = [];

function ProductForm({ entry }: ProductFormEditProps) {
  const [id, setId] = useState<string>("");
  const [mcId, setMcId] = useState<string>("");
  const [products, setProducts] = useState<any>();

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
  const [options, setOptions] = useState<any>([{ value: "", label: "" }]);

  const dispatch = useDispatch();
  const { data: session } = useSession();

  const sessionUserId = session?.user?.id;
  console.log(sessionUserId);

  const poData = useSelector((state: RootState) => state.purchaseOrder);

  useEffect(() => {
    dispatch(setUserId(sessionUserId));
  }, []);
  // useEffect(() => {
  //     // console.log(data);
  //     if (entry?.id) {
  //         // form.setValue("name", entry.name);
  //         // form.setValue("articleCode", entry.articleCode);
  //         // form.setValue("qty", entry.qty);
  //         // form.setValue("mrp", entry.mrp);
  //         // form.setValue("tp", entry.tp);
  //         // form.setValue("total", entry.total);
  //         // form.setValue("vat", entry.vat);
  //         // form.setValue("stock", entry.stock);
  //         // form.setValue("hsCode", entry.hsCode);
  //         // form.setValue("supplier", entry.supplier);
  //         // form.setValue("supplierId", entry.supplierId);
  //         // form.setValue("tax", entry.tax);
  //         // form.setValue("hsCode", entry.hsCode);
  //         // form.setValue("country", entry.country);
  //         // form.setValue("grosTotal", entry.grosTotal);
  //         // form.setValue("grossTotalRound", entry.grossTotalRound);
  //         // form.setValue("note", entry.note);
  //         // // form.setValue("price", entry.price);
  //         // form.setValue("containerId", entry.containerId);
  //         setId(entry?.id);
  //     }
  // }, []);

  //   const handleSlug = (name: string) => {
  //     const slug = name.split(" ").join("-");
  //     form.setValue("slug", slug);
  //   };

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

  // onSearchChange;
  const onSearchChange = async (query: any) => {
    console.log(query);
    const productList = await searchProductDw(query);
    // console.log("prosuctList", prosuctList);
    if (productList.length > 0) {
      setProducts(productList);
    }
  };
  // handleSelectedProduct;
  const handleSelectedProduct = (product: any) => {
    console.log(product);
  };

  // async function onSubmit(data: z.infer<typeof POFormSchema>) {
  //   try {
  //     console.log("product", data);
  //     //@ts-ignore
  //     const product = await saveProduct(id, data);

  //     if (product) {
  //       toast.success(
  //         id ? "Product Update Success" : "Product Creation Success"
  //       );
  //     } else {
  //       toast.error(id ? "Product Update faield!" : "Product Creation faield!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
                        <Input placeholder="Quantity" {...field} />
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
                        <SearchProduct
                          onSearchChange={onSearchChange}
                          handleSelect={handleSelectedProduct}
                          productSList={products}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CsvUpload setCSV={setCSV} handelImport={handelImport} />
              </div>

              {/* table, search, import */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-0">
                <PoDataTable columns={columns} data={data} />
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
                <p className="font-bold">
                  Discount: <span>0.00</span>
                </p>
                <p className="font-bold">
                  Tax: <span>0.00</span>
                </p>
                <p className="font-bold">
                  Total: <span>0.00</span>
                </p>
                <p className="font-bold">
                  Gross Total: <span>0.00</span>
                </p>
                <p className="font-bold">
                  Gross Total Round: <span>0.00</span>
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
