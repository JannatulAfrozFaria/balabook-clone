"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal} from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string
  customerID: string
  status: "pending" | "processing" | "success" | "failed"
  userID: string
  offerID: string
  Offer:string
  Customer: string
  Phone: string
  amount: number
  date: string
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header:"Order ID"
  },
  {
    accessorKey: "Offer.name",
    header: "Offer"
  },

  {
    accessorKey: "Customer.name",
    header: "Customer"
  },
  {
    accessorKey: "Customer.phone",
    header: "Phone"
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "action",
    header: () => <div className="">Action</div>,
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              View Details
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>Edit User</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
