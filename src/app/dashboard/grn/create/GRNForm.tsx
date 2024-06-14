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
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { saveGRN } from "../_action";
import { columns } from "../columns";
import { GRNDataTable } from "./data-table";
import { Label } from "@/components/ui/label";
import SelectPO from "@/components/ui/selectPO";
import { poById } from "../../po/_action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux-store/store";
import { GRNSingleProductDataTable } from "./single-data-table";
import { GRNFormSchema } from "./GRNFormSchema";
import {
  reset,
  setNote,
  setPoInfo,
  setUserId,
} from "@/app/redux-store/Slice/GRNSlice";
import { grnColumns } from "./columns";
import { poColumns } from "./poColumns";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";

interface ProductFormEditProps {
  entry: any;
}

const data: any = [];
function GrnForm({ entry }: ProductFormEditProps) {
  const [id, setId] = useState<string>("");
  const dispatch = useDispatch();
  const [poData, setPoData] = useState<any>({});
  const [singleProduct, setSingleProduct] = useState<any>({});
  const [formattedDate, setFormattedDate] = useState<string>("");
  const router = useRouter();
  const form = useForm();

  const handlePoSelect = async (id: string) => {
    const poDetails = await poById(id);
    // set slice data
    setPoData(poDetails);
    dispatch(setUserId(poDetails?.userId));
    dispatch(
      setPoInfo({
        poNo: poDetails?.id,
        supplierId: poDetails?.supplierId,
      })
    );
  };

  const [poId, setPoId] = useState(false);

  const grnData = useSelector((state: RootState) => state.grn);
  const selectedProductData =
    grnData?.products?.length > 0 ? grnData.products : [];
  //  ("selected product", selectedProductTotal.total);

  async function onSubmitGRn(data: GRNFormSchema) {
    try {
      //@ts-ignore
      //  (grnData);
      const grn = await saveGRN(grnData);
      if (grn) {
        toast.success(grn ? "GRN Creation Success" : "GRN Update Success");
        dispatch(reset());
        setPoData({});
        router.push("/dashboard/grn");
      } else {
        toast.error(grn ? "GRN Creation faield!" : "GRN Update faield!");
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
            onSubmit={form.handleSubmit(onSubmitGRn)}
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
                  {/* <div className="flex items-center space-x-2 ml-4">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            TPN No
                                        </label>
                                    </div> */}
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
                          <SelectPO handleSelect={handlePoSelect} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                                        control={form.control}
                                        name="supplierId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>PO Status </FormLabel>
                                                <FormControl>
                                                    <SelectSupplier handleSelect={handlePoSelect} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                </div>
                {poData?.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4 pb-2 border-b">
                    <p className="font-bold">
                      Vendor:{" "}
                      <span className="font-normal">
                        {poData?.supplier?.name}
                      </span>
                    </p>
                    <p className="font-bold">
                      Po: <span className="font-normal">{poData?.poNo}</span>
                    </p>

                    <p className="font-bold">
                      Phone:{" "}
                      <span className="font-normal">
                        {poData?.supplier?.phone}
                      </span>
                    </p>
                    <p className="font-bold">
                      Date:{" "}
                      <span className="font-normal">
                        {format(new Date(poData?.createdAt), "MM/dd/yyyy")}
                      </span>
                    </p>
                  </div>
                ) : null}
                {/* table, search, import */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-0 mt-2">
                  <GRNDataTable
                    columns={poColumns}
                    data={poData?.products?.length ? poData.products : []}
                    // className="bg-red-400"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 mt-4 pb-2 border-b">
                  <p className="font-bold text-sm">
                    Item:{" "}
                    <span className="font-normal">{poData?.totalItem}</span>
                  </p>
                  {/* <p className="font-bold text-sm">
                    Tax: <span className="font-normal">{poData?.tax}</span>
                  </p> */}
                  <p className="font-bold text-sm">
                    Total: <span className="font-normal">{poData?.total}</span>
                  </p>
                  {/* <p className="font-bold text-sm">
                    Shipping Cost: <span className="font-normal"></span>
                  </p> */}
                  <p className="font-bold text-sm">
                    Gross Total:{" "}
                    <span className="font-normal">{poData?.grossTotal}</span>
                  </p>
                </div>
              </div>

              {/* receivable product list section */}

              <div className="w-1/2 mr-2">
                <h1 className="font-bold">Receivable Products List</h1>

                <div className="grid grid-cols-1 md:grid-cols-1 mb-0 mt-2">
                  <GRNSingleProductDataTable
                    columns={grnColumns}
                    data={selectedProductData}
                  />
                  {/* <FormItem className="">
                    <FormLabel>Shipping Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="TK" />
                    </FormControl>
                    <FormMessage />
                  </FormItem> */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 mt-4 pb-2 border-b">
                    <p className="font-bold text-sm">
                      Item:{" "}
                      <span className="font-normal">{grnData?.totalItem}</span>
                    </p>

                    <p className="font-bold text-sm">
                      Total:{" "}
                      <span className="font-normal">{grnData?.total}</span>
                    </p>

                    <p className="font-bold text-sm">
                      Gross Total:{" "}
                      <span className="font-normal">{grnData?.grossTotal}</span>
                    </p>
                  </div>

                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="message">GRN Note</Label>
                    <Textarea
                      placeholder="Type your GRN Note here."
                      id="message"
                      onChange={(e) => {
                        const { value } = e.target;
                        dispatch(setNote(value));
                      }}
                    />
                  </div>

                  <div className="w-full flex justify-end mt-4">
                    <Button type="submit">
                      Submit <SendHorizonal className="ml-2 h-4 w-4" />{" "}
                    </Button>
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

export default GrnForm;
