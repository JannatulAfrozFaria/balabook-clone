"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "@/app/redux-store/Slice/GRNSlice";
import { RootState } from "@/app/redux-store/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Printer, Trash } from "lucide-react";
import { PoPrintalog } from "@/components/ui/po-print-pop";
import { useState } from "react";
import { GrnPrintLog } from "@/components/ui/grn-print-pop";
import StatusUpdatePop from "@/components/StatusUpdatePop";
import { UpdateGRNStatus } from "./_action";
export type Offer = {
  id: string;
  name: string;
  photo: string;
  status: "active" | "deactive";
  price: number;
  offerID: string;
  description: string;
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
    accessorKey: "grnNo",
    header: "GRN No",
  },
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "supplier.name",
    header: "Supplier",
  },
  {
    accessorKey: "totalItem",
    header: "Total Item",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },

  {
    accessorKey: "action",
    header: () => <div className="">Action</div>,
    id: "actions",
    cell: ({ row }) => {
      const grn = row.original;
      const [activate, setActive] = useState(false);
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
        const updateStatus = await UpdateGRNStatus(grn.id, status);
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
              <DropdownMenuItem>
                {/* <Link href={`/dashboard/offers/${offer.id}`}> */}
                <Pencil size={16} className="mr-2" /> Edit
                {/* </Link> */}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdate("Delete")}>
                <Trash size={16} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <StatusUpdatePop
            alertOpen={alertOpen}
            setAlertOpen={setAlertOpen}
            updateStatus={updateStatus}
            model="GRN"
            operation={status}
          />
          <GrnPrintLog open={activate} setOpen={setActive} entry={grn} />
        </>
      );
    },
  },
];
