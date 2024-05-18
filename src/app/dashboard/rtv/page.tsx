import PageTitle from "@/components/ui/PageTitle";
import { UserDataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "../../../../prisma";
import { Toast } from "@/components/ui/toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";

export default async function ProductsPage() {
  const data: any = []

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="RTV" />
            <div className="flex items-center space-x-2">
              <Link href="/dashboard/rtv/create">
                <Button><BadgePlus className="mr-2 h-4 w-4"/> Create RTV</Button>
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
