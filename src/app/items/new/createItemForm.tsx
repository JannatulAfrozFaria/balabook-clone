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
import { createItem } from "../_action";
import { useRouter } from "next/navigation";

// Define the schema for item validation
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

function ItemForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof ItemFormSchema>>({
    resolver: zodResolver(ItemFormSchema),
    defaultValues: {
      description: "",
      account: "SALES",
      price: 0,
      discount: 0,
      vat: undefined,
      type: ""
    },
  });

  async function onSubmit(data: z.infer<typeof ItemFormSchema>) {
    try {
      const newItem = await createItem(data);

      if (newItem) {
        toast.success("Item created successfully!");
        form.reset();
        router.push('/items')
      } else {
        toast.error("Item creation failed!");
      }
    } catch (error) {
      console.error("Error submitting item form:", error);
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:item-center w-full mb-6 pl-4 md:pl-0">
        <h1 className="text-[24px] md:text-[48px] font-bold">Add New Item</h1>
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
                  <FormItem className="w-full md:w-1/2"> {/* Full width on mobile, half width on desktop */}
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
                  <FormItem className="w-full md:w-1/2"> {/* Full width on mobile, half width on desktop */}
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
                  <FormItem className="w-full md:w-1/4"> {/* Full width on mobile, 1/4 on desktop */}
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
                  <FormItem className="w-full md:w-1/4"> {/* Full width on mobile, 1/4 on desktop */}
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
                  <FormItem className="w-full md:w-1/4"> {/* Full width on mobile, 1/4 on desktop */}
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
                name="type" // Update the name to match the type you're adding to the item module
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4"> {/* Full width on mobile, 1/4 on desktop */}
                    <FormLabel>Type of Item</FormLabel>
                    <div className="flex gap-6 pt-6">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="service"
                          value="Service"
                          checked={field.value === "Service"} // Check if the value is the selected one
                          onChange={() => field.onChange("Service")} // Update value on selection
                          className="hidden" // Hide the default radio button
                        />
                        <div
                          className={`w-[25px] h-[25px] rounded-lg border-2 transition-colors duration-200 
              ${field.value === "Service" ? "border-[#7D67FF] border-[6px]" : "border-black"}`}
                        ></div>
                        <label htmlFor="service" className="ml-2 cursor-pointer">Service</label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="good"
                          value="Good"
                          checked={field.value === "Good"} // Check if the value is the selected one
                          onChange={() => field.onChange("Good")} // Update value on selection
                          className="hidden" // Hide the default radio button
                        />
                        <div
                          className={`w-[25px] h-[25px] rounded-lg border-2 transition-colors duration-200 
              ${field.value === "Good" ? "border-[#7D67FF] border-[6px]" : "border-black"}`}
                        ></div>
                        <label htmlFor="good" className="ml-2 cursor-pointer">Good</label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="hidden" />
          </div>
        </Form>
      </div>

      <Toaster />
    </div>
  );
}

export default ItemForm;
