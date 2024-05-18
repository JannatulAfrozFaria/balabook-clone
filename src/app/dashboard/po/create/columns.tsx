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
    header:"#"
  },
  {
    accessorKey: "articleCode",
    header: "Article Code"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "mrp",
    header: "MRP"
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
    header: "Quantity",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
