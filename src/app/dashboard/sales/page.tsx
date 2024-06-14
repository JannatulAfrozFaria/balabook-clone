import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { UserDataTable } from "./data-table";
import { Order, columns } from "./columns";
import CreateOrderSheet from "./createOrderSheet";
import prisma from "../../../../prisma";
import Link from "next/link";
import { Plus, Undo2 } from "lucide-react";
import { CreateOrderSchema } from "./create-order/CreateOrderSchema";

export default async function OrderPage() {
  const data = await prisma.sales.findMany({
    include: {
      customer: {
        select: {
          name: true, // Select only the name field from the supplier model
          phone: true, // Select only the name field from the supplier model
          company: true, // Select only the name field from the supplier model
        },
      },
      user: {
        select: {
          name: true, // Select only the name field from the user model
        },
      },
    },
  });

  //  ("sales data");

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Sales" />
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <CreateOrderSheet /> */}

              <Link href="/dashboard/sales/create-order">
                <Button className="mr-2">
                  <Plus className="mr-2 h-4 w-4" /> Create Order
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <UserDataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
