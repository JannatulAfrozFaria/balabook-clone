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
import { columns } from "./columns";

import { RTVFormSchema } from "./RTVFormSchema";
import { RTVDataTable } from "./data-table";

interface ProductFormEditProps {
    entry: any;
}
const data: any = []
function RTVForm({ entry }: ProductFormEditProps) {
    const [id, setId] = useState<string>("");
    const [mcId, setMcId] = useState<string>("");
    const form = useForm<z.infer<typeof RTVFormSchema>>({
        resolver: zodResolver(RTVFormSchema),
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

    async function onSubmit(data: z.infer<typeof RTVFormSchema>) {
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
                        <div className="w-full mx-4 ">
                            {/* masterCategory, shCode, salesType */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0 ">
                                <FormField
                                    control={form.control}
                                    name="supplierId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Warehouse From</FormLabel>                                         
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
                                            <FormLabel>Warehouse To</FormLabel>

                                            <FormControl>
                                                <SelectSupplier handleSelect={handleSupplierId} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* table, search, import */}
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-0">
                                <RTVDataTable columns={columns} data={data} />
                            </div>
                           

                        </div>

                    </div>

                    <div className="w-full flex justify-end">
                        <Button type="submit" className="mr-4">Submit <SendHorizonal className="ml-2 h-4 w-4"/> </Button>
                    </div>
                </form>
                {/* <DevTool control={form.control} /> */}
            </Form>
            <Toaster />
        </div>
    );
}

export default RTVForm;
