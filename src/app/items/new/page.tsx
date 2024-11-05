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
    <main className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto min-h-screen px-0 md:px-4">
      <div className="w-full pt-8 pl-4 md:pl-0">
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

      
      <ItemForm/>
    </main>
  );
}
