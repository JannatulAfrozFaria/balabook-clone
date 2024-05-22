"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, SendHorizonal } from "lucide-react";

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
import SelectUnit from "@/components/ui/SelectUnit";
import { saveProduct } from "../_action";
import { columns } from "./columns";
import { CreateOrderDataTable } from "./data-table";
import SearchProduct from "@/components/ui/searchProduct";
import CsvUpload from "@/components/CsvUpload";
import { importProduct } from "../../products/_action";
import { CreateOrderFormSchema } from "./CreateOrderFormSchema";
import { InfoCard } from "./InfoCard";

interface ProductFormEditProps {
  entry: any;
}
const data: any = [
  {
    id: 1,
    product: "Product 1",
    stock: 50,
    price: 10.99,
    qty: 2,
    vat: 1.32,
    subTotal: 23.3,
  },
  {
    id: 2,
    product: "Product 2",
    stock: 20,
    price: 15.99,
    qty: 1,
    vat: 1.92,
    subTotal: 17.91,
  },
  {
    id: 3,
    product: "Product 3",
    stock: 75,
    price: 7.99,
    qty: 5,
    vat: 4.8,
    subTotal: 44.75,
  },
  {
    id: 4,
    product: "Product 4",
    stock: 10,
    price: 25.99,
    qty: 2,
    vat: 3.12,
    subTotal: 55.1,
  },
  {
    id: 5,
    product: "Product 5",
    stock: 0,
    price: 5.99,
    qty: 0,
    vat: 0.0,
    subTotal: 0.0,
  },
  {
    id: 6,
    product: "Product 6",
    stock: 30,
    price: 12.99,
    qty: 3,
    vat: 2.34,
    subTotal: 41.31,
  },
  {
    id: 7,
    product: "Product 7",
    stock: 100,
    price: 8.99,
    qty: 10,
    vat: 10.78,
    subTotal: 99.68,
  },
  {
    id: 8,
    product: "Product 8",
    stock: 40,
    price: 22.99,
    qty: 4,
    vat: 4.6,
    subTotal: 96.56,
  },
  {
    id: 9,
    product: "Product 9",
    stock: 60,
    price: 19.99,
    qty: 3,
    vat: 3.6,
    subTotal: 63.57,
  },
  {
    id: 10,
    product: "Product 10",
    stock: 15,
    price: 9.99,
    qty: 6,
    vat: 5.0,
    subTotal: 64.94,
  },
  {
    id: 11,
    product: "Product 11",
    stock: 25,
    price: 13.99,
    qty: 2,
    vat: 1.68,
    subTotal: 30.66,
  },
  {
    id: 12,
    product: "Product 12",
    stock: 35,
    price: 17.99,
    qty: 5,
    vat: 6.0,
    subTotal: 95.95,
  },
  {
    id: 13,
    product: "Product 13",
    stock: 50,
    price: 14.99,
    qty: 4,
    vat: 4.8,
    subTotal: 68.76,
  },
  {
    id: 14,
    product: "Product 14",
    stock: 90,
    price: 6.99,
    qty: 7,
    vat: 4.2,
    subTotal: 52.53,
  },
  {
    id: 15,
    product: "Product 15",
    stock: 45,
    price: 20.99,
    qty: 3,
    vat: 4.8,
    subTotal: 66.57,
  },
  {
    id: 16,
    product: "Product 16",
    stock: 80,
    price: 18.99,
    qty: 4,
    vat: 5.04,
    subTotal: 81.6,
  },
  {
    id: 17,
    product: "Product 17",
    stock: 20,
    price: 10.99,
    qty: 1,
    vat: 1.32,
    subTotal: 12.31,
  },
  {
    id: 18,
    product: "Product 18",
    stock: 5,
    price: 29.99,
    qty: 2,
    vat: 5.76,
    subTotal: 65.74,
  },
  {
    id: 19,
    product: "Product 19",
    stock: 60,
    price: 16.99,
    qty: 6,
    vat: 6.96,
    subTotal: 108.9,
  },
  {
    id: 20,
    product: "Product 20",
    stock: 85,
    price: 11.99,
    qty: 5,
    vat: 3.6,
    subTotal: 62.55,
  },
];
function CreateOrderForm({ entry }: ProductFormEditProps) {
  const [id, setId] = useState<string>("");
  const [mcId, setMcId] = useState<string>("");
  const form = useForm<z.infer<typeof CreateOrderFormSchema>>({
    resolver: zodResolver(CreateOrderFormSchema),
    defaultValues: {
      name: "",
      qty: 0,
      mrp: 0,
      tp: 0,
      total: 0,
      vat: 0,
      stock: 0,
      supplier: "",
      tax: 0,
      hsCode: "",
      country: "",
      supplierId: "",
      discount: 0,
      grosTotal: 0,
      grossTotalRound: 0,
      note: "",
      containerId: "",
    },
  });

  useEffect(() => {
    // console.log(data);
    if (entry?.id) {
      form.setValue("name", entry.name);
      form.setValue("articleCode", entry.articleCode);
      form.setValue("qty", entry.qty);
      form.setValue("mrp", entry.mrp);
      form.setValue("tp", entry.tp);
      form.setValue("total", entry.total);
      form.setValue("vat", entry.vat);
      form.setValue("stock", entry.stock);
      form.setValue("hsCode", entry.hsCode);
      form.setValue("supplier", entry.supplier);
      form.setValue("supplierId", entry.supplierId);
      form.setValue("tax", entry.tax);
      form.setValue("hsCode", entry.hsCode);
      form.setValue("country", entry.country);
      form.setValue("grosTotal", entry.grosTotal);
      form.setValue("grossTotalRound", entry.grossTotalRound);
      form.setValue("note", entry.note);
      // form.setValue("price", entry.price);
      form.setValue("containerId", entry.containerId);
      setId(entry?.id);
    }
  }, []);

  //   const handleSlug = (name: string) => {
  //     const slug = name.split(" ").join("-");
  //     form.setValue("slug", slug);
  //   };

  const handleSupplierId = (id: string) => {
    form.setValue("supplierId", id);
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
    form.setValue("brandId", id);
    setMcId(id);
  };
  //   const handleUnitId = (id: string) => {
  //     form.setValue("unitId", id);
  //     setMcId(id);
  //   };
  const onSearchChange = (query: any) => {
    console.log(query);
  };
  // handleSelectedProduct;
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

  async function onSubmit(data: z.infer<typeof CreateOrderFormSchema>) {
    try {
      console.log("product", data);
      //@ts-ignore
      const product = await saveProduct(id, data);

      if (product) {
        form.reset();
        toast.success(
          id ? "Product Update Success" : "Product Creation Success"
        );
      } else {
        toast.error(id ? "Product Update faield!" : "Product Creation faield!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="flex w-full">
            <div className="w-2/3 mx-4 ">
              {/* masterCategory, shCode, salesType
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0 ">
                <FormField
                  control={form.control}
                  name="promoPrice"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Input placeholder="Manishankar Vakta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="supplierId"
                    render={({ field }) => (
                      <FormItem style={{ width: "70%" }}>
                        <FormControl>
                          <SelectSupplier handleSelect={handleSupplierId} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="">
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
              </div> */}

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
                    name="supplierId"
                    render={({ field }) => (
                      <FormItem style={{ width: "70%" }}>
                        <FormControl>
                          <SelectSupplier handleSelect={handleSupplierId} />
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
                <CreateOrderDataTable columns={columns} data={data} />
              </div>
            </div>

            {/* invoice form */}
            <div className="w-1/3 mx-4">
              <InfoCard />
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
