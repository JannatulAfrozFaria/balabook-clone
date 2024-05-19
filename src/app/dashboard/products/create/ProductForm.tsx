"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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
import { ProductFormSchema } from "./ProductFormSchema";
interface ProductFormEditProps {
  entry: any;
}

function ProductForm({ entry }: ProductFormEditProps) {
  const [id, setId] = useState<string>("");
  const [mcId, setMcId] = useState<string>("");
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      salesType: "Standerd",
      articleCode: "",
      ean: "",
      masterCategoryId: "",
      categoryId: "",
      unitId: "",
      brandId: "",
      vat: 0,
      vatMethod: false,
      hsCode: "",
      type: "",
      shipping: "",
      featured: "false",
      website: "true",
      slug: "",
      description: "",
      specification: "",
      price: 0,
      promoPrice: 0,
      promoStart: new Date(),
      promoEnd: new Date(),
      photo: "",
      // gallery: `${[""]}`,
      supplierId: "",
      openingQty: 0,
      soldQty: 0,
      returnQty: 0,
      damageQty: 0,
      closingQty: 0,
      mrp: 0,
      tp: 0,
      cogs: 0,
      pisInPackege: 0,
      status: "Active",
    },
  });

  useEffect(() => {
    // console.log(data);
    if (entry?.id) {
      form.setValue("name", entry?.name);
      form.setValue("salesType", entry?.salesType);
      form.setValue("articleCode", entry?.articleCode);
      form.setValue("ean", entry?.ean);
      form.setValue("masterCategoryId", entry?.masterCategoryId);
      form.setValue("categoryId", entry?.categoryId);
      form.setValue("unitId", entry?.unitId);
      form.setValue("brandId", entry?.brandId);
      form.setValue("vat", entry?.vat);
      form.setValue("vatMethod", entry?.vatMethod);
      form.setValue("hsCode", entry?.hsCode);
      form.setValue("type", entry?.type);
      form.setValue("shipping", entry?.shipping);
      form.setValue("featured", entry?.featured);
      form.setValue("website", entry?.website);
      form.setValue("slug", entry?.slug);
      form.setValue("description", entry?.description);
      form.setValue("specification", entry?.specification);
      form.setValue("price", entry?.price);
      form.setValue("promoPrice", entry?.promoPrice);
      form.setValue("promoStart", entry?.promoStart);
      form.setValue("promoEnd", entry?.promoEnd);
      form.setValue("photo", entry?.photo);
      // form.setValue("gallery", entry?.gallery);
      form.setValue("supplierId", entry?.supplierId);
      form.setValue("openingQty", entry?.openingQty);
      form.setValue("soldQty", entry?.soldQty);
      form.setValue("returnQty", entry?.returnQty);
      form.setValue("damageQty", entry?.damageQty);
      form.setValue("closingQty", entry?.closingQty);
      form.setValue("mrp", entry?.mrp);
      form.setValue("tp", entry?.tp);
      form.setValue("cogs", entry?.cogs);
      form.setValue("pisInPackege", entry?.pisInPackege);
      form.setValue("status", entry?.status);
      setId(entry?.id);
    }
  }, []);

  const handleSlug = (name: string) => {
    const slug = name.split(" ").join("-");
    form.setValue("slug", slug);
  };

  const handleSupplierId = (id: string) => {
    form.setValue("supplierId", id);
  };

  const handleMcId = (id: string) => {
    form.setValue("masterCategoryId", id);
    setMcId(id);
  };
  const handleCategoryId = (id: string) => {
    form.setValue("categoryId", id);
    setMcId(id);
  };
  const handleBrandId = (id: string) => {
    form.setValue("brandId", id);
    setMcId(id);
  };
  const handleUnitId = (id: string) => {
    form.setValue("unitId", id);
    setMcId(id);
  };

  async function onSubmit(data: z.infer<typeof ProductFormSchema>) {
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
    <div className="flex pt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="flex w-full">
            <div className="w-4/6">
              {/* masterCategory, shCode, salesType */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="masterCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Master Category</FormLabel>

                      <FormControl>
                        <SelectMc handleSelect={handleMcId} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ean"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ean Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Ean Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salesType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sales Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Standard" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Standerd">Standerd</SelectItem>
                          <SelectItem value="Combo">Combo</SelectItem>
                          <SelectItem value="Offer">Offer</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* product name, articleCode */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-4 col-span-1">
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product Name"
                          {...field}
                          onChangeCapture={(e) => handleSlug(e?.target?.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="articleCode"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 col-span-1">
                      <FormLabel>Article Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Article Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* brand, category, slug */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="brandId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>

                      <FormControl>
                        <SelectBrand handleSelect={handleBrandId} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>

                      <FormControl>
                        <SelectCategory
                          handleSelect={handleCategoryId}
                          mcId={mcId}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                                  This is your public display name.
                              </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* unit, alartQty, pices in packeges, HS Code */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="unitId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>

                      <FormControl>
                        <SelectUnit handleSelect={handleUnitId} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Standerd" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Standerd">Standerd</SelectItem>
                          <SelectItem value="Combo">Combo</SelectItem>
                          <SelectItem value="Offer">Offer</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pisInPackege"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Pics in Pack</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${6}`}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      {/* <FormDescription>
                                  This is your public display name.
                              </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hsCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HS Code</FormLabel>
                      <FormControl>
                        <Input placeholder="HS Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* mrp,tp,vat, isVatIn */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${350}`}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mrp"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>MRP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${350}`}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tp"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>TP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${250}`}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-end justify-between">
                  <FormField
                    control={form.control}
                    name="vat"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Vat</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`${0}`}
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vatMethod"
                    render={({ field }) => (
                      <FormItem className="">
                        {/* <FormLabel>In</FormLabel> */}
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* promo -> price, start, end */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="promoPrice"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Promo Price </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="300"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="promoStart"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Promo Start Date </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="promoEnd"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Promo End Date </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* description,specifaction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specification</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Specification" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* show on website, is featured, supplier, status */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Show website</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          // Convert the string value to boolean before calling field.onChange
                          field.onChange(value === "true");
                        }}
                        value={field.value ? "true" : "false"}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Standard" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Show</SelectItem>
                          <SelectItem value="false">Hide</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Standard" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Featured</SelectItem>
                          <SelectItem value="false">Not Featured</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>
                      {/* <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      > */}
                      <FormControl>
                        {/* <SelectTrigger className="">
                            <SelectValue placeholder="Standard" />
                          </SelectTrigger> */}
                        <SelectSupplier handleSelect={handleSupplierId} />
                      </FormControl>
                      {/* <SelectContent>
                          <SelectItem value="Standerd">Standerd</SelectItem>
                          <SelectItem value="Combo">Combo</SelectItem>
                          <SelectItem value="Offer">Offer</SelectItem>
                        </SelectContent>
                      </Select> */}

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Active" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* photo */}
            <div className="w-2/6 flex justify-start items-center gap-4 flex-col mt-4">
              <Image
                alt="product"
                src="/img/product.jpg"
                height={250}
                width={250}
              />
              <div className="flex gap-2">
                <Image
                  alt="product"
                  src="/img/product.jpg"
                  height={80}
                  width={80}
                />
                <Image
                  alt="product"
                  src="/img/product.jpg"
                  height={80}
                  width={80}
                />
                <Image
                  alt="product"
                  src="/img/product.jpg"
                  height={80}
                  width={80}
                />
              </div>
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
        {/* <DevTool control={form.control} /> */}
      </Form>
      <Toaster />
    </div>
  );
}

export default ProductForm;
