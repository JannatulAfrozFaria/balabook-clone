import Link from "next/link";
import { getServerSession } from "next-auth";
import CalenderDateRangePicker from "@/components/ui/CalenderDateRangePicker";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MyBarChart from "@/components/Barchart";
import MyDoughnutChart from "@/components/DonutChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ItemList from "./ItemList";
import { UserDataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "@/index";

// Import Prisma client

// Initialize Prisma client

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

  return (
    <main className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto min-h-screen">
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
                <Link href="/dashboard" className="text-[16px] text-[#7D67FF] font-normal">
                  Dashboard
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
        <div className="">
          <h2 className="text-[14px] font-semibold">Search</h2>
          <div className="w-full flex items-center">
            <Input className="h-[60px] bg-white mt-4 w-[85%]" placeholder="Search" />
            <Button className="p-6 rounded-full bg-[#FFED37] text-[16px] text-normal text-black mt-4 ml-4">Search</Button>
            <h1 className="text-[16px] mt-4 ml-4 cursor-pointer">Clear</h1>
          </div>
        </div>
      
        <div className="w-full mt-4 -400">
          <UserDataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
