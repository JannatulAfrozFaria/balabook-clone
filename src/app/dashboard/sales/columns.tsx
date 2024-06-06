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
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Printer,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { SalePrintLog } from "@/components/ui/sell-print-pop";
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
    accessorKey: "no",
    header: "#",
    cell: ({ row }: { row: any }) => {
      const sl = row.index + 1; // row.index gives the zero-based index, add 1 to make it 1-based

      return `${sl}.`;
    },
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },

  {
    accessorKey: "user.name",
    header: "Biller",
  },
  {
    accessorKey: `"customer.name"`,
    header: "Customer",
    cell: ({ row }) => {
      const customer = row?.original?.customer;
      return customer.company !== null ? customer.company : customer?.name;
    },
  },
  {
    accessorKey: "customer.phone",
    header: "Phone",
  },
  {
    accessorKey: "grossTotalRound",
    header: "Amount",
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
      const sales = row.original;
      const [activate, setActive] = useState(false);
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setActive(true)}
              >
                <>
                  <Printer size={16} className="mr-2" /> View
                </>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <Pencil size={16} className="mr-2" /> Edit
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <SalePrintLog open={activate} setOpen={setActive} entry={sales} />
        </>
      );
    },
  },
];
