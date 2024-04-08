import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import Link from "next/link";

export default async function ProductsPage() {
  const data: any = [];

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Create Purchase Order" />
            <div className="flex items-center space-x-2">
              <Link href="/dashboard/po">
                <Button>Cancle</Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <h2>Create PO Here</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
