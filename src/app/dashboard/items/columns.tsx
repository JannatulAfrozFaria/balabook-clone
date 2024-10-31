"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Ensure this path is correct
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSalesForUpdate } from "@/app/redux-store/Slice/SalesSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteItem } from "./_action";

// This type is used to define the shape of our data.
export type Order = {
  id: string;
  customerID: string;
  status: "Complete" | "Ordered" | "Delete";
  userID: string;
  offerID: string;
  Offer: string;
  Customer: string;
  Phone: string;
  amount: number;
  date: string;
};

export const columns: any = [
 
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
 
  
  {
    accessorKey: "action",
    header: () => <div className=""></div>,
    id: "actions",
    cell: ({ row }) => {
      const sales = row.original; // Get the original row data
      const dispatch = useDispatch();
      const router = useRouter();
      const [selectedAction, setSelectedAction] = useState<string | null>(null); // State to manage the select value

      // Function to handle selection change
      const handleSelectChange = async (value: string) => {
        setSelectedAction(value); // Update the selected action

        if (value === "edit") {
          dispatch(setSalesForUpdate(sales)); // Dispatch action to set sales for update
          router.push(`/dashboard/items/edit/${sales.id}`); // Navigate to the edit page
        } else if (value === "delete") {
          const confirmed = confirm(`Are you sure you want to delete ${sales.description}?`);
          if (confirmed) {
            const result = await deleteItem(sales.id); // Call the delete function
            if (result) {
              // Optionally show a success message or refresh the data
              console.log(`${sales.description} deleted successfully!`);
            }
          }
        }

        // Reset the selected action to null after the operation
        setSelectedAction(null);
      };

      return (
        <div className="flex justify-end">
          <Select value={selectedAction || undefined} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[140px] h-[40px] border-2 border-black rounded-full text-[16px] px-4 py-2 hover:bg-black hover:text-white">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent className="border-2 border-black rounded-xl">
              <SelectGroup>
                <SelectItem value="edit" className="text-[16px]">Edit</SelectItem>
                <SelectItem value="delete" className="text-[16px]">Delete</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
];
