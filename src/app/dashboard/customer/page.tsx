import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { UserDataTable } from "./data-table";
import { Customer, columns } from "./columns";
import Link from "next/link";
import { Download, User, UserPlus } from "lucide-react";
import prisma from "@/index";

export default async function CustomerPage() {
  // const [toggelAttend, setToggleAttend] = useState();
  // const [query,setQuery] = useState({
  //   attend: true
  // })

  const data: any = await prisma.customer.findMany({});

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Customers" />
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <CreateCustomerSheet /> */}
              
              <Link href={"/registration"}>
                <Button>
                  <UserPlus size="16" className="mr-2" /> Create New Customer
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
