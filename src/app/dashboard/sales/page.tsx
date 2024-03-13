import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { UserDataTable } from "./data-table";
import { Order, columns } from "./columns";
import CreateOrderSheet from "./createOrderSheet";
import prisma from "../../../../prisma";
import Link from "next/link";
import CalenderDateRangePicker from "@/components/ui/CalenderDateRangePicker";

export default async function OrderPage() {
  const data: any = []
  // await prisma.order.findMany({
  //   include: {
  //     Customer: {
  //       select: {
  //         name: true,
  //         phone: true,
  //       }
  //     },
  //     User: {
  //       select: {
  //         name: true,
  //       }
  //     },
  //     Offer: {
  //       select: {
  //         name: true,
  //       }
  //     },
  //   },
  // });

  // console.log(data)

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Sales" />
            <div className="flex items-center space-x-2">
              <CalenderDateRangePicker className="w-full " />
              <Link href="/dashboard/orders/create-order">
                <Button>Create Order</Button>
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
