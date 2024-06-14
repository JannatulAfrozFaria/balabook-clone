import PageTitle from "@/components/ui/PageTitle";
import { UserDataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "../../../../prisma";
import { Toast } from "@/components/ui/toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BadgePlus, Plus } from "lucide-react";
import { TPNFormSchema } from "./create/TPNFormSchema";

export default async function ProductsPage() {
  const data: TPNFormSchema = await prisma.tpn.findMany({
    include: {
      whTo: {
        select: {
          name: true, // Select only the name field from the supplier model
        },
      },
      user: {
        select: {
          name: true, // Select only the name field from the supplier model
        },
      },
      whFrom: {
        select: {
          name: true, // Select only the name field from the user model
        },
      },
    },
  });

  "data", data;

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="TPN" />
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              <Link href="/dashboard/tpn/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create TPN
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
