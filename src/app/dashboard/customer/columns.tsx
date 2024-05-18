"use client";
import  {useState}  from "react";
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
import { handleDelete } from "./_action";
import EditCustomerSheet from "./editCustomerSheet";
import { Toaster } from "sonner";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const handleDeleteAction = async (id: string) => {
  const del = handleDelete(id);
  //@ts-ignore
  if (del) {
    console.log(`Customer Delete Successful!`);
    // toast.success(`${del.name} deleted successful!`);
  } else {
    console.log(`Deleted Faild!`);
  }
};

export type Customer = {
  id: string;
  customerId: string;
  name: string;
  phone: string;
  status: "Active" | "Inactive";
  email: string;
  attend: boolean;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "UserName",
  },
  {
    accessorKey: "customerId",
    header: "Customer ID",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "addreass",
    header: "Address",
    id: "address",
    cell: ({ row }) => {
      const customer = row.original;

      return <>Address</>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    // accessorKey: "amount",
    header: () => <div className="">Action</div>,
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit()}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteAction(customer.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditCustomerSheet entry={customer} open={open} setOpen={setOpen} />
          <Toaster />
        </>
      );
    },
  },
];
