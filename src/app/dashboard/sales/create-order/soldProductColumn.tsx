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
  ArrowDown,
  ArrowUpDown,
  Barcode,
  ChevronDown,
  MoreHorizontal,
  Undo2,
  X,
} from "lucide-react";
import Link from "next/link";
import { handleDelete } from "../../tpn/_action";
import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux-store/store";
import {
  setProducts,
  setReturnProducts,
  setSoldProduct,
} from "@/app/redux-store/Slice/SalesSlice";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Product = {
  id: string;
  name: string;
  photo: string;
  status: "Active" | "Inactive";
  mrp: number;
  articleCode: string;
  stock: number;
};

const handleDeleteTrigger = async (id: string) => {
  const del = await handleDelete(id);
  if (del) {
    toast.success("Offer Delete Successful!");
  } else {
    toast.error("Deleted Failed!");
  }
};

export const orderColumn: ColumnDef<Product>[] = [
  {
    accessorKey: "articleCode",
    header: "Article Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mrp",
    header: "Price",
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ row, table }) => {
      const product = row.original;
      const dispatch = useDispatch();
      const salesData = useSelector((state: RootState) => state.sales);
      const handleQtyChange = (e: number) => {
        if (salesData.returnActive === true) {
          const exist = salesData.returnProducts.find(
            (saleProduct: any) => saleProduct.id === product.id
          );
          const rest = salesData.returnProducts.filter(
            (saleProduct: any) => saleProduct.id !== product.id
          );
          let newProduct;
          if (exist) {
            // inrease qty

            newProduct = {
              ...exist,
              qty: e.target.value,
              total: parseInt(e.target.value) * exist.tp,
            };
            dispatch(setReturnProducts(rest));

            dispatch(setReturnProducts([...rest, newProduct]));
          } else {
          }
        } else {
          const exist = salesData.products.find(
            (saleProduct: any) => saleProduct.id === product.id
          );
          const rest = salesData.products.filter(
            (saleProduct: any) => saleProduct.id !== product.id
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

            dispatch(setProducts([...rest, newProduct]));
          } else {
          }
        }
      };

      return (
        <input
          type="number"
          //@ts-ignore
          value={product?.qty}
          //@ts-ignore
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
  {
    accessorKey: "",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const dispatch = useDispatch();
      const saleData = useSelector((state: RootState) => state.sales) || [];

      const handleFullReturn = () => {
        const soldProducts = saleData.soldProducts;
        const returnProducts = saleData.returnProducts;
        console.log("Full Return", product);

        const seleted = soldProducts?.find((s: string) => s.id! === product.id);
        const rest = soldProducts?.filter((s: string) => s.id !== product.id);
        dispatch(setReturnProducts([seleted, ...returnProducts]));
        dispatch(setSoldProduct(rest));
      };

      const handleCustomReturn = () => {
        console.log("Custom Return", product.id);
      };

      return (
        <div className="flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={handleCustomReturn}>
                  <ArrowDown size={16} className="cursor-pointer" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Custom Return</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleFullReturn}>
                  <X size={16} className="cursor-pointer" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Full Return</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
