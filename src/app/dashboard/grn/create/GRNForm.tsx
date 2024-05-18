"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import SelectUnit from "@/components/ui/SelectUnit";
import { saveProduct } from "../_action";
import { columns } from "../columns";
import { GRNDataTable } from "./data-table";
import { GRNFormSchema } from "./GRNFormSchema";
import PageTitle from "@/components/ui/PageTitle";
import { Label } from "@/components/ui/label";

interface ProductFormEditProps {
    entry: any;
}
const data: any = []
function AdjustForm({ entry }: ProductFormEditProps) {
    const [id, setId] = useState<string>("");
    const [mcId, setMcId] = useState<string>("");
    const form = useForm<z.infer<typeof GRNFormSchema>>({
        resolver: zodResolver(GRNFormSchema),
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

    async function onSubmit(data: z.infer<typeof GRNFormSchema>) {
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
        <div className="w-full flex">
            <div className="flex pt-8 w-full ">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4"
                    >
                        <div className="flex w-full">
                            <div className="w-1/2 mx-4 ">
                                <div className="w-full flex mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Purchase Order No
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            TPN No
                                        </label>
                                    </div>
                                </div>

                                {/* masterCategory, shCode, salesType */}
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-0">
                                    <FormField
                                        control={form.control}
                                        name="supplierId"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Warehouse </FormLabel> */}
                                                <FormControl>
                                                    <SelectSupplier handleSelect={handleSupplierId} />
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
                                                <FormLabel>PO Status </FormLabel>
                                                <FormControl>
                                                    <SelectSupplier handleSelect={handleSupplierId} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4 pb-2 border-b">
                                    <p className="font-bold">Vendor: <span className="font-normal"></span></p>
                                    <p className="font-bold">Po: <span className="font-normal"></span></p>

                                    <p className="font-bold">Phone: <span className="font-normal"></span></p>
                                    <p className="font-bold">Date: <span className="font-normal"></span></p>
                                </div>
                                {/* table, search, import */}
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-0">
                                    <GRNDataTable columns={columns} data={data} className="bg-red-400" />
                                </div>
                            </div>

                            {/* receivable product list section */}

                            <div className="w-1/2 mr-2">
                                <h1 className="font-bold">Receivable Products List</h1>

                                <div className="grid grid-cols-1 md:grid-cols-1 mb-0">
                                    <GRNDataTable columns={columns} data={data} />
                                    <FormItem className="">
                                        <FormLabel>Shipping Cost</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="TK"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 mt-4 pb-2 border-b">
                                        <p className="font-bold text-sm">Item: <span className="font-normal"></span></p>
                                        <p className="font-bold text-sm">Tax: <span className="font-normal"></span></p>
                                        <p className="font-bold text-sm">Total: <span className="font-normal"></span></p>
                                        <p className="font-bold text-sm">Shipping Cost: <span className="font-normal"></span></p>
                                        <p className="font-bold text-sm">Grand Total: <span className="font-normal"></span></p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                                    </div>

                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="message">GRN Note</Label>
                                        <Textarea placeholder="Type your GRN Note here." id="message" />
                                    </div>

                                    <div className="w-full flex justify-end mt-4">
                                    <Button type="submit">Submit <SendHorizonal className="ml-2 h-4 w-4"/> </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                    {/* <DevTool control={form.control} /> */}
                </Form>
                <Toaster />
            </div>



        </div>

    );
}

export default AdjustForm;
