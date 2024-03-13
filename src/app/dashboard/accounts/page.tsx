import PageTitle from "@/components/ui/PageTitle";
import { UserDataTable } from "./data-table";
import { columns } from "./columns";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Archive,
  BadgeCheck,
  BoxIcon,
  Boxes,
  CircleDollarSign,
  File,
  PencilRuler,
} from "lucide-react";

export default async function ProductsPage() {
  const data: any = []; //await prisma.offer.findMany();

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Accounts" />
            <div className="flex items-center space-x-2">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <File className="mr-2 h-3 w-3" /> Accounts Head{" "}
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      All Categories{" "}
                      {/* <MenubarShortcut>⌘T</MenubarShortcut> */}
                    </MenubarItem>
                    <MenubarItem>Create New</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>
                    <BadgeCheck className="mr-2 h-3 w-3" /> Jurnal
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>All Brands</MenubarItem>
                    <MenubarItem>Create New</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>
                    <PencilRuler className="mr-2 h-3 w-3" /> Ledger
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>All Unit</MenubarItem>
                    <MenubarItem>Create New</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>
                    <PencilRuler className="mr-2 h-3 w-3" /> Assets List
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>All Unit</MenubarItem>
                    <MenubarItem>Create New</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <Link href="/dashboard/products">
                <Button>
                  <CircleDollarSign className="mr-2 h-4 w-4" /> Collection
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
