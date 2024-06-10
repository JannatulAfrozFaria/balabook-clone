"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Barcode, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { handleDelete } from "./_action";
import { toast } from "sonner";
import { Toast } from "@/components/ui/toast";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { setRcvAdjustmentTotal } from "@/app/redux-store/Slice/AdjustSlice";
export type Product = {
  id: string;
  name: string;
  photo: string;
  status: "Active" | "Inactive";
  mrp: number;
  articleCode: string;
  stock: number;
};

const handleDeleteTigger = async (id: string) => {
  const del = await handleDelete(id);
  if (del) {
    console.log(`Offer Delete Successful!`);
    // toast.success(`${del.name} deleted successful!`);
  } else {
    console.log(`Deleted Faild!`);
  }
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "no",
    header: "#",
    cell: ({ row }: { row: any }) => {
      const sl = row.index + 1; // row.index gives the zero-based index, add 1 to make it 1-based

      return `${sl}.`;
    },
  },
  {
    accessorKey: "articleCode",
    header: "Article Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "qty",
  //   header: "Quantity",
  // },
  // {
  //   accessorKey: "mrp",
  //   header: "MRP",
  // },
  {
    accessorKey: "tp",
    header: "Price",
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ row }) => {
      const product = row.original;

      const handleChange = (event) => {
        const value = event.target.value;
        console.log(`Quantity for ${product.name} changed to ${value}`);
        // You can add logic here to handle the input change, e.g., updating state or making API calls
      };

      return (
        <Input
          type="number"
          defaultValue={product?.qty}
          onChange={handleChange}
          className="w-20" // Set width or any other Tailwind CSS classes
        />
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row, table }) => {
      const product = row.original;
      const dispatch = useDispatch();
      const handleSelectChange = (value: string) => {
        // Access the product price here
        console.log(`Selected value: ${value}`);
        if (value == "in") {
          dispatch(setRcvAdjustmentTotal(product?.tp));
        }
        // You can perform any additional actions with the selected value and product price here
      };
      return (
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              <SelectItem value="in">In</SelectItem>
              <SelectItem value="out">Out</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  // {
  //   accessorKey: "hsCode",
  //   header: "HS Code",
  // },
  // {
  //   accessorKey: "tax",
  //   header: "Tax",
  // },
  {
    accessorKey: "action",
    header: () => <div className="">Note</div>,
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="h-10 overflow-hidden">
          <Textarea className="h-8 mt-[-4]" />{" "}
          {/* Adjust height and margin using Tailwind CSS classes */}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="">Action</div>,
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return <X className="mr-2 h-4 w-4" />;
    },
  },
];
