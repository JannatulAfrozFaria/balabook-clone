"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
        <p>Finalize Sale</p>
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
      <div className="w-full flex justify-between mt-2">
        <p className="font-medium">Total Item:</p>
        <p>1</p>
      </div>
      <div className="w-full flex justify-between mt-2">
        <p className="font-medium">Total:</p>
        <p>328.00 BDT</p>
      </div>
      <div className="w-full flex justify-between mt-2">
        <p className="font-medium">Vat/Tax Amount:</p>
        <p>328.00 BDT</p>
      </div>
      <div className="w-full flex justify-between mt-2">
        <p className="font-medium">Gross Total:</p>
        <p>328.00 BDT</p>
      </div>
      <div className="w-full flex justify-between mt-2">
        <p className="font-medium">Gross Total(Round):</p>
        <p>328.00 BDT</p>
      </div>
    </>
  );
}
