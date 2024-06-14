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
import { UpdatePOStatus } from "./_action";
import StatusUpdatePop from "@/components/StatusUpdatePop";
export type Offer = {
  id: string;
  pono: string;
  supplier: string;
  supplierId: string;
  cantainerID: string;
  totalItem: number;
  total: number;
  tax: number;
  discount: number;
  grossTotalRound: number;
  status: "Active" | "Inactive";
  price: number;
  user: string;
  userId: string;
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
    accessorKey: "poNo",
    header: "PoNo",
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
    accessorKey: "country",
    header: "Country",
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
  {
    accessorKey: "action",
    header: () => <div className="">Action</div>,
    id: "actions",
    cell: ({ row }) => {
      const po = row.original;
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
        const updateStatus = await UpdatePOStatus(po.id, status);
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
            model="PO"
            operation={status}
          />
          <PoPrintalog open={activate} setOpen={setActive} entry={po} />
        </>
      );
    },
  },
];
