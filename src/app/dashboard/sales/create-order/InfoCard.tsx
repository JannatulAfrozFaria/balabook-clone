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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setCardAmount,
  setCardName,
  setCash,
  setChangeAmount,
  setMfsAmount,
  setMfsName,
  setReceivedAmount,
  setTotalRecievable,
} from "@/app/redux-store/Slice/SalesSlice";
import { RootState } from "@/app/redux-store/store";
import { CreateOrderSchema } from "./CreateOrderSchema";
import { createOrder, saveOrder } from "./../_action";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
//@ts-ignore
export function InfoCard() {
  const dispatch = useDispatch();

  const posData = useSelector((state: RootState) => state.sales);

  const totalRecievable = posData?.total;
  // console.log("totalRecivea", totalRecievable);

  useEffect(() => {
    dispatch(setTotalRecievable(totalRecievable));
  }, [totalRecievable]);

  useEffect(() => {
    const totalReceived =
      parseFloat(posData?.paidAmount?.cash) +
        parseFloat(posData?.paidAmount?.card.amount) +
        parseFloat(posData?.paidAmount?.mfs.amount) || 0;

    const changeAmount = totalReceived - parseFloat(posData?.totalRecievable);

    dispatch(setReceivedAmount(totalReceived));
    dispatch(setChangeAmount(changeAmount));
  }, [posData.paidAmount]);

  // submit order funciton
  //@ts-ignore
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      console.log("product", posData);
      //@ts-ignore
      // const order = await saveOrder(posData);
      const order = await createOrder(posData);
      if (order) {
        console.log("order", order);
      } else {
        console.log("Error", order);
      }
      // console.log("order", order);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between border-b pb-4 font-bold">
        <p>Finalize Order</p>
        {/* <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Due Bill
          </label>
        </div> */}
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Total Item:</p>
        <p>{posData?.totalItem}</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Total:</p>
        <p>{posData?.total} BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Vat/Tax Amount:</p>
        <p>{posData?.vat} BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Gross Total:</p>
        <p>{posData?.grossTotal} BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Gross Total(Round):</p>
        <p>{posData?.grossTotalRound} BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Cash Recieved:</p>
        <Input
          type="text"
          className="w-1/3"
          placeholder="0"
          //@ts-ignore
          onChange={(e) => dispatch(setCash(e.target.value))}
        />
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Card:</p>
        <Select
          // value={cardName && cardName}
          onValueChange={(value: string) => dispatch(setCardName(value))}
        >
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

        <Input
          className="w-1/3"
          placeholder="0" //@ts-ignore
          onChange={(e) => dispatch(setCardAmount(e.target.value))}
        />
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">MFS:</p>
        <Select
          // value={mfsName && mfsName}
          onValueChange={(value: string) => dispatch(setMfsName(value))}
        >
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

        <Input
          className="w-1/3"
          placeholder="0" //@ts-ignore
          onChange={(e) => dispatch(setMfsAmount(e.target.value))}
        />
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
        <Input type="text" className="w-1/3" placeholder="0" />
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="font-medium">Total Recieved:</p>
        <p>{posData?.totalRecieved} BDT</p>
      </div>
      <div className="w-full flex justify-between mt-4 ">
        <p className="font-medium">Change Amount:</p>
        <p>{posData?.changeAmount} BDT</p>
      </div>
      <Separator orientation="horizontal" className="mt-2" />
      <div className="w-full flex justify-center gap-4  mt-8">
        <Button>
          <RotateCcw size={18} className="mr-2" /> Reset
        </Button>
        <Button onClick={onSubmit}>
          <Printer size={18} className="mr-2" /> Generate Order
        </Button>
      </div>
    </>
  );
}
