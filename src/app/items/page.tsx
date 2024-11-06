import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react"; // Importing the Home icon

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { UserDataTable } from "./data-table";
import { columns } from "./columns";
import { fetchItems } from "./_action";
import prisma from "../../../prisma";

export default async function Items() {
  // Fetch item data from the Prisma database
  // const items = await prisma.item.findMany(); // Adjust the model name as needed
  // const data = items.map(item => ({
  //   id: item.id, // Ensure you have a unique identifier
  //   description: item.description,
  //   type: item.type,
  //   price: item.price,
  // }));

  const data: any = await prisma.item.findMany({
   
  });


  // const data = await fetchItems(); // Fetches 20 items by default
  return (
    <main className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto min-h-screen p-6 bg-[#F2F2F2] ">
      <div className="w-1/6 bg-white p-3 rounded-md">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center gap-1 text-[16px]">
                  <span>Dashboard</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/items" className="text-[16px] text-[#9ECE39] font-medium">
                  Items
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-end w-full">
        <h1 className="text-[48px] font-bold">Items</h1>
        <Link href="/items/new">
          <Button className="p-6 rounded-md bg-[#9ECE39] text-[16px] text-normal text-white">Add Items</Button>
        </Link>
      </div>

      <div className="w-full ">
       
      
        <div className="w-full mt-4 -400">
          <UserDataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
