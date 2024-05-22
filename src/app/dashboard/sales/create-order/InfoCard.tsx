"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Printer, RotateCcw } from "lucide-react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function InfoCard() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <div className="w-full flex justify-between border-b pb-4 font-bold">
        <p>Finalize Order</p>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Due Bill
          </label>
        </div>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Total Item:</p>
        <p>1</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Total:</p>
        <p>328.00 BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Vat/Tax Amount:</p>
        <p>328.00 BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Gross Total:</p>
        <p>328.00 BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Gross Total(Round):</p>
        <p>328.00 BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Cash Recieved:</p>
        <Input type="text" className="w-1/3" placeholder="1" />
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Card:</p>
        <Select value={"visa"}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Visa" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="visa">Visa</SelectItem>
              <SelectItem value="dbbl">DBBL</SelectItem>
              <SelectItem value="mtb">MTB</SelectItem>
              <SelectItem value="city">City</SelectItem>
              <SelectItem value="amex">Amex</SelectItem>
              <SelectItem value="ebl">EBL</SelectItem>
              <SelectItem value="brac">Brac</SelectItem>
              <SelectItem value="masterCard">Master Card</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input className="w-1/3" placeholder="1" />
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">MFS:</p>
        <Select value={"bkash"}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Bkash" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="bkash">Bkash</SelectItem>
              <SelectItem value="nagad">Nagad</SelectItem>
              <SelectItem value="upay">Upay</SelectItem>
              <SelectItem value="rocket">Rocket</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input className="w-1/3" placeholder="1" />
      </div>
      <div className="w-full flex justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Discount
          </label>
        </div>
        <Input type="text" className="w-1/3" placeholder="1" />
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Total Recieved:</p>
        <p>-328.00 BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4 ">
        <p className="font-medium">Change Amount:</p>
        <p>-328.00 BDT</p>
      </div>
      <Separator orientation="horizontal" className="mt-2" />
      <div className="w-full flex justify-center gap-4  mt-8">
        <Button>
          <RotateCcw size={18} className="mr-2" /> Reset
        </Button>
        <Button>
          <Printer size={18} className="mr-2" /> Generate Order
        </Button>
      </div>
    </>
  );
}
