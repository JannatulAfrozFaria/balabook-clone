import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

export default async function CreateProductsPage() {
  const data: any = []; //await prisma.offer.findMany();

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Create New Products" />
            <div className="flex items-center space-x-2">
              <Link href="/dashboard/products">
                <Button>
                  <X className="mr-2" /> Cancle
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            {/* <UserDataTable columns={columns} data={data} /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
