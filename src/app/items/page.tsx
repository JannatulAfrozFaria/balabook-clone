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
    <main className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto min-h-screen px-4">
      <div className="w-full pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center gap-1 text-[16px]">
                  <Home className="h-4 w-4" /> {/* Home icon with custom size */}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/items" className="text-[16px] text-[#7D67FF] font-normal">
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
          <Button className="p-6 rounded-full bg-[#FFED37] text-[16px] text-normal text-black">Add New Item</Button>
        </Link>
      </div>

      <div className="w-full bg-[#F2F2F2] rounded-[30px] p-[30px]">
       
      
        <div className="w-full mt-4 -400">
          <UserDataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
