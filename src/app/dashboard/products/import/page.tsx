"use client";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import CsvUpload from "@/components/CsvUpload";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
// import { UserDataTable } from "./data-table";
// import { importCustomer } from "../_action";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { UserDataTable } from "../../customer/data-table";
import { importCustomer } from "../../customer/_action";
import { ProductDataTable } from "../data-table";
import { importProduct } from "../_action";

export default function CustomerImportPage() {
  type Customer = {
    id: string;
    name: string;
    phone: string;
    email: string;
    district: string;
    division: string;
  };

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "articleCode",
      header: "ArticleCode",
    },
    {
      accessorKey: "categoryId",
      header: "Category Id",
    },
    {
      accessorKey: "brandId",
      header: "Brand Id",
    },
    {
      accessorKey: "supplierId",
      header: "Supplier Id",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];
  //   const data: any = await prisma.customer.findMany();
  const [CSV, setCSV] = useState<any>([]);

  const handelImport = async () => {
    // console.log("Import", CSV);
    if (CSV?.length > 0) {
      const product = await importProduct(CSV);
      if (product) {
        toast.success("Product Import Success");
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Import Products" />
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <CreateCustomerSheet /> */}
              <CsvUpload setCSV={setCSV} handelImport={handelImport} />
              <Link href={"/dashboard/products"}>
                <Button>
                  <X size="16" className="mr-2" /> Cancle
                </Button>
              </Link>
            </div>
          </div>

          <div className="">
            <ProductDataTable
              columns={columns}
              data={CSV}
              //@ts-ignore
              //   handelImport={handelImport}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
