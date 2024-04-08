import PageTitle from "@/components/ui/PageTitle";
import { UserDataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CalenderDateRangePicker from "@/components/ui/CalenderDateRangePicker";

export default async function ProductsPage() {
  const data: any = [];

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Purchase Order" />
            <div className="flex items-center space-x-2">
              <CalenderDateRangePicker />
              <Link href="/dashboard/po/create">
                <Button>Create PO</Button>
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
