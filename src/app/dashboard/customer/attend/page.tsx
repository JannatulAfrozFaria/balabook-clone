import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { UserDataTable } from "./data-table";
import { Customer, columns } from "./columns";
import Link from "next/link";
import prisma from "../../../../../prisma";
import { ArrowBigLeft, ArrowLeft, Download } from "lucide-react";

export default async function CustomerPage() {
  // const [toggelAttend, setToggleAttend] = useState();
  // const [query,setQuery] = useState({
  //   attend: true
  // })
  //@ts-ignore
  const data: Customer[] = await prisma.customer.findMany({
    where: { attend: true },
  });

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Attend Customers" />
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <CreateCustomerSheet /> */}
              <Link href={"/dashboard/customer"}>
                <Button>
                  <ArrowLeft size="16" className="mr-2" /> Back
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
