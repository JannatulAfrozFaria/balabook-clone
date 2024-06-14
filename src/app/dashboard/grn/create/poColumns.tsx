"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "@/app/redux-store/Slice/GRNSlice";
import { RootState } from "@/app/redux-store/store";
import { Checkbox } from "@/components/ui/checkbox"; // Ensure you have this import correctly pointing to your Checkbox component

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

export const poColumns: ColumnDef<GRN>[] = [
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
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "action",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const po = row.original;
      const dispatch = useDispatch();
      const selectedProductData =
        useSelector((state: RootState) => state.grn.products) || [];

      const isSelected = selectedProductData.some((item) => item.id === po.id);

      const handleCheckboxClick = () => {
        if (isSelected) {
          const updatedSelectedProducts = selectedProductData.filter(
            (item) => item.id !== po.id
          );
          dispatch(setSelectedProduct(updatedSelectedProducts));
        } else {
          const newSelectedProduct = {
            ...po,
            order: selectedProductData.length + 1,
          };
          dispatch(
            setSelectedProduct([...selectedProductData, newSelectedProduct])
          );
        }
      };

      return <Checkbox checked={isSelected} onClick={handleCheckboxClick} />;
    },
  },
];
