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
import EditCategorySheet from "./editCategorySheet";
import { useState } from "react";
import { handleDelete } from "./_action";
import { Toaster } from "@/components/ui/sonner";
export type Category = {
  id: string;
  name: string;
  photo: string;
  status: "Active" | "Inactive";
  code: string;
  parent: string;
  description: string;
};

const handleDeleteTigger = async (id: string) => {
  const del = await handleDelete(id);
  if (del) {
    console.log(`Category Delete Successful!`);
    toast.success(`Category Deleted successful!`);
  } else {
    console.log(`Deleted Faild!`);
    toast.success(`Category Deleted Field!`);
  }
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },

  {
    accessorKey: "parent",
    header: "Parent",
    cell: ({ row }) => {
      const category = row.original.parent;
      //@ts-ignore
      return <>{category?.name || "Master Category"}</>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
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
      const category = row.original;
      const [open, setOpen] = useState(false);
      const handleEdit = () => setOpen(true);

      return (
        <>
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
              <DropdownMenuItem onClick={() => handleEdit()}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteTigger(category.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditCategorySheet entry={category} open={open} setOpen={setOpen} />
          <Toaster />
        </>
      );
    },
  },
];
