"use client"
import PageTitle from "@/components/ui/PageTitle";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Overview } from "@/components/ui/Overview";
import RecentSales from "@/components/ui/recent-sales";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import prisma from "../../../prisma";
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


const data = [
  { name: 'January', Invoice: 4000, Expense: 2400 },
  { name: 'February', Invoice: 3000, Expense: 1398 },
  { name: 'March', Invoice: 2000, Expense: 9800 },
  { name: 'April', Invoice: 2780, Expense: 3908 },
  { name: 'May', Invoice: 1890, Expense: 4800 },
  { name: 'June', Invoice: 2390, Expense: 3800 },
  { name: 'July', Invoice: 3490, Expense: 4300 },
];

export default async function Dashboard() {
  return (
<main className="flex flex-col gap-6 w-full max-w-full md:max-w-[1440px] mx-auto min-h-screen px-4 ">
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

      <div className="flex flex-col md:flex-row justify-between items-start md:item-start w-full">
        <h1 className="text-[24px] md:text-[48px] font-bold mb-4 md:mb-0">Nicolas IP's Dashboard</h1>
        <div>
          <Select>
            <SelectTrigger className=" w-[120px] md:w-[140px]  h-[30px] md:h-[50px] border-2 border-black rounded-full text-[12px] md:text-[16px] px-4 py-2 hover:bg-black hover:text-white">
              <SelectValue placeholder="Quick Add" />
            </SelectTrigger>
            <SelectContent className="border-2 border-black rounded-xl">
              <SelectGroup>
                <SelectItem value="apple" className="text-[16px]">Invoice</SelectItem>
                <SelectItem value="banana" className="text-[16px]">Expense</SelectItem>
                <SelectItem value="d" className="text-[16px]">Bill</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className=" w-full bg-[#F2F2F2] rounded-[30px] p-[30px]">
        <div className="flex">
          <h2 className="text-[24px] font-semibold">Invoices & Expenses</h2>
          <h4 className="text-[14px] ml-10 font-bold mt-2 text-[#9C9C9C]">This fiscal year</h4>
        </div>
      
        <div className="h-[400px] w-full mt-4">
          <MyBarChart/>
          <div className="w-full h-[100px] flex items-center justify-center">
            <div className="flex items-center">
              <div className="h-[25px] w-[25px] rounded-full bg-[#FFED37]"></div>
              <p className="text-[16px] text-semibold ml-2">Income</p>
            </div>
            <div className="flex items-center ml-12">
              <div className="h-[25px] w-[25px] rounded-full bg-[#7D67FF]"></div>
              <p className="text-[16px] text-semibold ml-2">Expense</p>
            </div>
          </div>
        </div>
      </div>


        <div className=" w-full bg-[#F2F2F2] rounded-[30px] p-[30px]">
        <h2 className="text-[24px] font-semibold">Money Coming In</h2>
        <div className="w-full flex flex-col md:flex-row gap-4 mt-6 ">
            <div className="w-full md:w-1/3 px-4 py-4 rounded-2xl flex flex-col bg-white">
              <p className="text-[16px] text-[#999999] font-bold">Coming Due (1-30 days) </p>
              <h1 className="text-[26px] font-semibold mt-2">€ 0.00</h1>
            </div>
            <div className="w-full md:w-1/3  px-4 py-4 rounded-2xl flex flex-col bg-[#999999]">
              <p className="text-[16px] text-white font-bold">Coming Due (31-60 days)  </p>
              <h1 className="text-[26px] font-bold text-white mt-2">€ 0.00</h1>
            </div>
            <div className="w-full md:w-1/3 px-4 py-4 rounded-2xl flex flex-col bg-[#FABEBA]">
              <p className="text-[16px] text-[#F56258] font-bold">Overdue </p>
              <h1 className="text-[26px] font-semibold text-[#F56258] mt-2">€ 0.00</h1>
            </div>
        </div>

      </div>


      <div className=" w-full bg-[#F2F2F2] rounded-[30px] p-[30px]">
        <h2 className="text-[24px] font-semibold">Money Coming Out</h2>
        <div className="w-full flex flex-col md:flex-row gap-4 mt-6 ">
            <div className="w-full md:w-1/3 px-4 py-4 rounded-2xl flex flex-col bg-white">
              <p className="text-[16px] text-[#999999] font-bold">Coming Due (1-30 days) </p>
              <h1 className="text-[26px] font-semibold mt-2">€ 0.00</h1>
            </div>
            <div className="w-full md:w-1/3  px-4 py-4 rounded-2xl flex flex-col bg-[#999999]">
              <p className="text-[16px] text-white font-bold">Coming Due (31-60 days)  </p>
              <h1 className="text-[26px] font-bold text-white mt-2">€ 0.00</h1>
            </div>
            <div className="w-full md:w-1/3 px-4 py-4 rounded-2xl flex flex-col bg-[#FABEBA]">
              <p className="text-[16px] text-[#F56258] font-bold">Overdue </p>
              <h1 className="text-[26px] font-semibold text-[#F56258] mt-2">€ 0.00</h1>
            </div>
        </div>

      </div>

      <div className=" w-full bg-[#F2F2F2] rounded-[30px] p-[30px]">
        <div className="flex w-full">
          <h2 className="text-[24px] font-semibold">Invoices & Expenses</h2>
          <h4 className="text-[14px] ml-10 font-bold mt-2 text-[#9C9C9C]">This fiscal year</h4>
        </div>
        <div className="w-full p-4 bg-white rounded-2xl flex justify-evenly flex-col md:flex-row gap-4">
          <div className="w-1/2">
            <MyDoughnutChart/>
          </div>
          <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-center ">
          <div className="flex items-center mt-4  ">
              <div className="h-[25px] w-[25px] rounded-full bg-[#FFED37]"></div>
              <p className="text-[16px] text-bold ml-2">Telephone & Internet</p>
            </div>
            <div className="flex items-center mt-4  ">
              <div className="h-[25px] w-[25px] rounded-full bg-[#D6C72E]"></div>
              <p className="text-[16px] text-bold ml-2">Wages and Salaries</p>
            </div>
            <div className="flex items-center mt-4  ">
              <div className="h-[25px] w-[25px] rounded-full bg-[#999999]"></div>
              <p className="text-[16px] text-bold ml-2">
              Travelling Expenses</p>
            </div>
            <div className="flex items-center mt-4  ">
              <div className="h-[25px] w-[25px] rounded-full bg-[#7D67FF]"></div>
              <p className="text-[16px] text-bold ml-2">Utilities</p>
            </div>
            <div className="flex items-center mt-4  ">
              <div className="h-[25px] w-[25px] rounded-full bg-[#6957D6]"></div>
              <p className="text-[16px] text-bold ml-2">Repairs and Maintenance</p>
            </div>
           
          </div>
        </div>
      
      </div>
    </main>
  );
}
