"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "@/app/redux-store/Slice/GRNSlice";
import { RootState } from "@/app/redux-store/store";
export type GRN = {
  id: string;
  articleCode: string;
  name: string;
  tp: number;
  quantity: number;
  total: number;
  status: "active" | "deactive";
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

export const grnColumns: ColumnDef<GRN>[] = [
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
];
