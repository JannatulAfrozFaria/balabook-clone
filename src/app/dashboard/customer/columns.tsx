"use client";
import { useState } from "react";
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
import { UpdateCustomerStatus, handleDelete } from "./_action";
import EditCustomerSheet from "./editCustomerSheet";
import { Toaster } from "sonner";
import StatusUpdatePop from "@/components/StatusUpdatePop";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const handleDeleteAction = async (id: string) => {
  const del = handleDelete(id);
  //@ts-ignore
  if (del) {
    `Customer Delete Successful!`;
    // toast.success(`${del.name} deleted successful!`);
  } else {
    `Deleted Faild!`;
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
      const [alertOpen, setAlertOpen] = useState(false);
      const [status, setStatus] = useState("");

      // Button Function
      const handleUpdate = (operation: string) => {
        setStatus(operation);
        setAlertOpen(true);
      };

      // Alert Function
      const updateStatus = async () => {
        setAlertOpen(false);
        const updateStatus = await UpdateCustomerStatus(customer.id, status);
        //@ts-ignore
        if (updateStatus) {
          // tosst successfully updated
          console.log("success");
        } else {
          // toast successfully failed
          console.log("failed");
        }
      };
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
              <DropdownMenuItem onClick={() => handleUpdate("Inactive")}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditCustomerSheet entry={customer} open={open} setOpen={setOpen} />
          <Toaster />
          <StatusUpdatePop
            alertOpen={alertOpen}
            setAlertOpen={setAlertOpen}
            updateStatus={updateStatus}
            model="Customer"
            operation={status}
          />
        </>
      );
    },
  },
];
