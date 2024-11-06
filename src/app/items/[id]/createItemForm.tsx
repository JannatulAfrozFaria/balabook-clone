"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { createItem, updateItem } from "../_action"; // Import the updateItem function
import { useRouter } from "next/navigation";

const ItemFormSchema = z.object({
  description: z.string().min(1, "Description is required"),
  account: z.enum([
    "INTEREST_INCOME",
    "OTHER_REVENUE",
    "REALISED_GAIN_ON_FOREIGN_EXCHANGE",
    "SALES",
  ]),
  price: z.number().min(0, "Price must be a positive number"),
  discount: z.number().min(0).max(100).optional(),
  type: z.string().optional(),
  vat: z
    .enum([
      "VAT_19",
      "VAT_9",
      "VAT_5",
      "REVERSE_CHARGE",
      "TAX_EXEMPT",
      "ZERO_TAX",
      "CUSTOM_VAT",
    ])
    .optional(),
});

interface ItemFormProps {
  itemData: {
    description: string;
    account: string;
    price: number;
    discount?: number;
    vat?: string;
    type?: string;
  };
}

function ItemForm({ itemData }: ItemFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof ItemFormSchema>>({
    resolver: zodResolver(ItemFormSchema),
    defaultValues: {
      description: itemData.description || "",
      account: itemData.account || "SALES",
      price: itemData.price || 0,
      discount: itemData.discount || 0,
      vat: itemData.vat,
      type: itemData.type || "",
    },
  });

  async function onSubmit(data: z.infer<typeof ItemFormSchema>) {
    try {
      // If an item ID is present, update the item
      const updatedItem = await updateItem(itemData.id, data); // Pass item ID and new data

      if (updatedItem) {
        toast.success("Item updated successfully!");
        form.reset();
        router.push('/items');
      } else {
        toast.error("Item update failed!");
      }
    } catch (error) {
      console.error("Error submitting item form:", error);
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:item-center w-full mb-6 pl-4 md:pl-0">
        <h1 className="text-[24px] md:text-[48px] font-bold">Edit Item</h1>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Button className="p-2 md:p-6 rounded-full bg-white border-2 border-black text-[16px] text-normal text-black">
            Cancel
          </Button>
          <Button
            className="p-2 md:p-6 rounded-full bg-[#9ECE39] text-[16px] text-normal text-black"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="w-full bg-[#F2F2F2] rounded-[0px] md:rounded-[30px] p-[10px] md:p-[30px]">
        <h2 className="text-[18px] md:text-[30px] font-semibold mb-4">General Information</h2>
        <Form {...form} >
          <div className="bg-white p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Description <span>*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Item description"
                        className="h-[60px] hover:bg-white bg-[#F2F2F2] mt-4 w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Account Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-[60px] bg-[#F2F2F2] hover:bg-white mt-4 w-full">
                          <SelectValue placeholder="Select Account Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-2 border-[#6366F1] rounded-xl">
                        <SelectItem value="INTEREST_INCOME">Interest Income</SelectItem>
                        <SelectItem value="OTHER_REVENUE">Other Revenue</SelectItem>
                        <SelectItem value="REALISED_GAIN_ON_FOREIGN_EXCHANGE">
                          Realised Gain on Foreign Exchange
                        </SelectItem>
                        <SelectItem value="SALES">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6 w-full">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>Price <span>*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        type="number"
                        className="h-[60px] hover:bg-white bg-[#F2F2F2] mt-4 w-full"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>Discount (%)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        type="number"
                        className="h-[60px] hover:bg-white bg-[#F2F2F2] mt-4 w-full"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vat"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>VAT Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-[60px] bg-[#F2F2F2] hover:bg-white mt-4 w-full">
                          <SelectValue placeholder="Select VAT Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-2 border-[#6366F1] rounded-xl">
                        <SelectItem value="VAT_19">19% VAT</SelectItem>
                        <SelectItem value="VAT_9">9% VAT</SelectItem>
                        <SelectItem value="VAT_5">5% VAT</SelectItem>
                        <SelectItem value="REVERSE_CHARGE">Reverse Charge</SelectItem>
                        <SelectItem value="TAX_EXEMPT">Tax Exempt</SelectItem>
                        <SelectItem value="ZERO_TAX">Zero Tax</SelectItem>
                        <SelectItem value="CUSTOM_VAT">Custom VAT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>Type of Item</FormLabel>
                    <div className="flex gap-6 pt-6">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          value="BASIC"
                          onChange={field.onChange}
                          checked={field.value === "BASIC"}
                        />
                        <label className="ml-2">Basic</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          value="PREMIUM"
                          onChange={field.onChange}
                          checked={field.value === "PREMIUM"}
                        />
                        <label className="ml-2">Premium</label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ItemForm;
