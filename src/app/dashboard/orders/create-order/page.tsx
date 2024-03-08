import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { UserDataTable } from "./../data-table";
import { Order, columns } from "./../columns";
import prisma from "../../../../../prisma";
import Link from "next/link";
import OfferGrid from "./OfferGrid";
import { Input } from "@/components/ui/input";

export default async function OrderCreatePage() {
  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Create Orders" />
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <CreateOrderSheet /> */}
              <Link href="/dashboard/orders">
                <Button>Cancle</Button>
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-col">
            {/* <UserDataTable columns={columns} data={data} /> */}
            <div className="w-1/3 pb-4">
              <Input placeholder="Search Offer ... " />
            </div>
            <OfferGrid />
          </div>
        </div>
      </div>
    </main>
  );
}
