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
export type Offer = {
  id: string;
  pono: string;
  supplier: string;
  supplierId: string;
  cantainerID: string;
  totalItem: number;
  total: number;
  tax: number;
  discount: number;
  grossTotalRound: number;
  status: "Active" | "Inactive";
  price: number;
  user: string;
  userId: string;
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
    accessorKey: "no",
    header: "#",
    cell: ({ row }: { row: any }) => {
      const sl = row.index + 1; // row.index gives the zero-based index, add 1 to make it 1-based

      return `${sl}.`;
    },
  },
  {
    accessorKey: "poNo",
    header: "PoNo",
  },
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "supplier.name",
    header: "Supplier",
  },
  {
    accessorKey: "totalItem",
    header: "Total Item",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: () => <div className="">Action</div>,
    id: "actions",
    cell: ({ row }) => {
      const offer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(offer.id)}
            >
              View Details
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/offers/${offer.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteTigger(offer.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
