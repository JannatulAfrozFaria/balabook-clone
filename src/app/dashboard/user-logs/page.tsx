import PageTitle from "@/components/ui/PageTitle";
import React, { useEffect, useState } from "react";
import CalenderDateRangePicker from "@/components/ui/CalenderDateRangePicker";
import { Link } from "lucide-react";
import { UserDataTable } from "../customer/data-table";
import { UserLogsDataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "@/index";
import { getBrowserInfo, getDeviceType } from "@/lib/deviceDetect";

export default async function UserLogsPage() {
  const data: any = await prisma.userLogs.findMany({});

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="User logs" />
            <div className="flex items-center space-x-2">
              {/* @ts-ignore */}
              <CalenderDateRangePicker />
              {/* <Link href="/dashboard/po/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create PO
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <UserLogsDataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
