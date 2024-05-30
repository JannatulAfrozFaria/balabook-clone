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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { Toast } from "@/components/ui/toast";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
export type Offer = {
  id: string;
  name: string;
  photo: string;
  status: "active" | "deactive";
  price: number;
  offerID: string;
  description: string;
};

const handleDeleteTigger = async (id: string) => {
  // const del = await handleDelete(id);
  // if (del) {
  //   console.log(`Offer Delete Successful!`);
  //   // toast.success(`${del.name} deleted successful!`);
  // } else {
  //   console.log(`Deleted Faild!`);
  // }
};

export const columns: ColumnDef<Offer>[] = [
  {
    accessorKey: "",
    header: "#",
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
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Total",
  },

  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },
  {
    accessorKey: "action",
    header: () => <div className="">Action</div>,
    id: "actions",
    cell: ({ row }) => {
      const po = row.original;

      return <Checkbox />;
    },
  },
];
