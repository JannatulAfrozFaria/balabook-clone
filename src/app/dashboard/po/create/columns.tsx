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
import { ArrowUpDown, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  customerID: string;
  status: "pending" | "processing" | "success" | "failed";
  userID: string;
  offerID: string;
  Offer: string;
  Customer: string;
  Phone: string;
  amount: number;
  date: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "",
    header: "#",
    cell: ({ row }: { row: any }) => {
      const ranking = row.index + 1; // row.index gives the zero-based index, add 1 to make it 1-based
      const product = row.original;

      return <div>{ranking}</div>;
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

  {
    accessorKey: "tp",
    header: "TP",
  },
  {
    accessorKey: "hsCode",
    header: "HS Code",
  },
  {
    accessorKey: "qty",
    header: () => <div className="">Quantity</div>,
    id: "actions",
    cell: ({ row }: { row: any }) => {
      const product = row.original;

      return (
        <div>
          <Input value={product.qty} className="w-1/10" />
        </div>
      );
    },
  },
  {
    accessorKey: "closingQty",
    header: "Stock",
  },

  {
    accessorKey: "total",
    header: "Total",
  },

  {
    accessorKey: "action",
    header: () => <div className="">Action</div>,
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div>
          <X />
        </div>
      );
    },
  },
];
