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
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { Toast } from "@/components/ui/toast";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useState } from "react";
import { PoPrintalog } from "@/components/ui/po-print-pop";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/app/redux-store/Slice/PoSlice";
import { RootState } from "@/app/redux-store/store";
import { addToDb } from "@/lib/tpnDb";
export type Offer = {
  id: string;
  name: string;
  articleCode: string;
  mrp: number;
  tp: number;
  hsCode: string;
  openingQty: number;
  cogs: number;
  closingQty: number;
  qty: number;
  total: number;
};

const handleDeleteTigger = async (id: string) => {
  // const del = await handleDelete(id);
  // if (del) {
  //    (`Offer Delete Successful!`);
  //   // toast.success(`${del.name} deleted successful!`);
  // } else {
  //    (`Deleted Faild!`);
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
    accessorKey: "articleCode",
    header: "Article Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "tp",
    header: "Price",
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ row, table }) => {
      const product = row.original;
      const dispatch = useDispatch();
      const poData = useSelector((state: RootState) => state.purchaseOrder);
      const handleQtyChange = (e: number) => {
        const exist = poData.products.find(
          (poProduct: any) => poProduct.id === product.id
        );
        const rest = poData.products.filter(
          (poProduct: any) => poProduct.id !== product.id
        );
        let newProduct;
        if (exist) {
          // inrease qty

          newProduct = {
            ...exist,
            qty: e.target.value,
            total: parseInt(e.target.value) * exist.tp,
          };
          dispatch(setProducts(rest));
          localStorage.setItem("tpn", JSON.stringify([...rest, newProduct]));
          dispatch(setProducts([...rest, newProduct]));
        } else {
        }
      };

      return (
        <input
          type="number"
          value={product.qty}
          onChange={handleQtyChange}
          className="w-full border rounded p-1"
        />
      );
    },
  },
  {
    accessorKey: "vat",
    header: "Vat",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
