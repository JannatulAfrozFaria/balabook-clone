"use client";
import Link from "next/link";
import { getServerSession } from "next-auth";
import CalenderDateRangePicker from "@/components/ui/CalenderDateRangePicker";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react"; // Importing the Home icon
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MyBarChart from "@/components/Barchart";
import MyDoughnutChart from "@/components/DonutChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CustomRadioGroup from "@/components/RadioGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-store/store";
import { AppDispatch } from "@/app/redux-store/store";
import { useState } from "react";
import { setVat } from "@/redux-store/Slice/ItemSlice";
import { saveItem } from "../_action";
import ItemForm from "./createItemForm";

const data = [
  { name: "January", Invoice: 4000, Expense: 2400 },
  { name: "February", Invoice: 3000, Expense: 1398 },
  { name: "March", Invoice: 2000, Expense: 9800 },
  { name: "April", Invoice: 2780, Expense: 3908 },
  { name: "May", Invoice: 1890, Expense: 4800 },
  { name: "June", Invoice: 2390, Expense: 3800 },
  { name: "July", Invoice: 3490, Expense: 4300 },
];

export default function CreateItem() {
  const items = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch<AppDispatch>();

  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [vat, setVatType] = useState("");

  const vatTypes = [
    { value: "VAT_19", label: "VAT 19%" },
    { value: "VAT_9", label: "VAT 9%" },
    { value: "VAT_5", label: "VAT 5%" },
    { value: "REVERSE_CHARGE", label: "Reverse Charge" },
    { value: "TAX_EXEMPT", label: "Tax Exempt" },
    { value: "ZERO_TAX", label: "Zero Tax" },
    { value: "CUSTOM_VAT", label: "Custom VAT" },
  ];

  const accountTypes = [
    { value: "INTEREST_INCOME", label: "Interest Income" },
    { value: "OTHER_REVENUE", label: "Other Revenue" },
    { value: "REALISED_GAIN_ON_FOREIGN_EXCHANGE", label: "Realised Gain on Foreign Exchange" },
    { value: "SALES", label: "Sales" },
  ];

  // const handleSave = async () => {
    

  //   console.log("items", itemData)

  //   // const result = await saveItem(itemData);
  //   // if (result) {
  //   //   console.log("Item saved successfully!", result);
  //   // } else {
  //   //   console.error("Failed to save item.");
  //   // }
  // };

  

  return (
    <main className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto min-h-screen">
      <div className="w-full pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center gap-1 text-[16px]">
                  <Home className="h-4 w-4" /> {/* Home icon with custom size */}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/items" className="text-[16px] text-gray font-normal">
                  Items
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/items/new" className="text-[16px] text-[#7D67FF] font-normal">
                  Add New Item
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* <div className="flex justify-between items-end w-full">
        <h1 className="text-[48px] font-bold">Add New Item</h1>
        <div className="flex gap-6">
          <Button className="p-6 rounded-full bg-white border-2 border-black text-[16px] text-normal text-black">Cancel</Button>
          <Button
            className="p-6 rounded-full bg-[#FFED37] text-[16px] text-normal text-black"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div> */}

      {/* <div className="w-full bg-[#F2F2F2] rounded-[30px] p-[30px]">
        <h2 className="text-[30px] font-semibold mb-4">General Information</h2>
        <div className="bg-white p-6 rounded-2xl">
          <div className="w-full flex items-center gap-6">
            <div className="w-1/2">
              <h2 className="text-[14px] font-semibold">Description <span>*</span></h2>
              <Input className="h-[60px] hover:bg-white bg-[#F2F2F2] mt-4 w-full" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></Input>
            </div>
            <div className="w-1/2">
              <h2 className="text-[14px] font-semibold">Account</h2>
              <Select onValueChange={(value) => setAccount(value)}>
                <SelectTrigger className="h-[60px] bg-[#F2F2F2] hover:bg-white mt-4 w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="border-2 border-[#6366F1] rounded-xl">
                  <SelectGroup>
                    {accountTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-[16px]">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full flex items-center gap-6 mt-6">
            <div className="w-1/4">
              <h2 className="text-[14px] font-semibold">Price <span>*</span></h2>
              <Input
                className="h-[60px] hover:bg-white bg-[#F2F2F2] mt-4 w-full"
                placeholder="0.00"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-1/4">
              <h2 className="text-[14px] font-semibold">Discount <span>*</span></h2>
              <Input className="h-[60px] hover:bg-white bg-[#F2F2F2] mt-4 w-full" placeholder="0.00" onChange={(e) => setDiscount(parseFloat(e.target.value))}></Input>
            </div>
            <div className="w-1/4">
              <h2 className="text-[14px] font-semibold">Value added tax</h2>
              <Select onValueChange={(value) => setVat(value)}>
                <SelectTrigger className="h-[60px] bg-[#F2F2F2] hover:bg-white mt-4 w-full">
                  <SelectValue placeholder="Interest Income" />
                </SelectTrigger>
                <SelectContent className="border-2 border-[#6366F1] rounded-xl">
                  <SelectGroup>
                    {vatTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-[16px]">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/4">
              <h2 className="text-[14px] font-semibold">Value added tax <span>*</span></h2>
              <CustomRadioGroup />
            </div>
          </div>
        </div>
      </div> */}
      <ItemForm/>
    </main>
  );
}
