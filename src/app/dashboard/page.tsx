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
import { authOptions } from "../api/auth/[...nextauth]/route";
import CalenderDateRangePicker from "@/components/ui/CalenderDateRangePicker";

export default async function Dashboard() {
  // Get the current date
  const currentDate = new Date();

  // Calculate the start date of the last month
  const lastMonthStartDate = new Date(currentDate);
  lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
  lastMonthStartDate.setDate(1);

  // Calculate the end date of the last month
  const lastMonthEndDate = new Date(currentDate);
  lastMonthEndDate.setDate(0);

  // Offer
  const offerCount = await prisma.offer.count();
  // Customers
  const customerAttendCount = await prisma.customer.count({
    where: {
      attend: true,
    },
  });
  const customerCount = await prisma.customer.count();
  const newCustomersLastMonth = await prisma.customer.count({
    where: {
      createdAt: {
        gte: lastMonthStartDate,
        lte: lastMonthEndDate,
      },
    },
  });

  //Orders
  const totalOrder = await prisma.order.count();

  // const totalSale = await prisma.order.aggregate({
  //   _sum: {
  //     amount: true,
  //   },
  // });

  // console.log(recentOrder);
  // const session = await getServerSession(authOptions)
  // console.log("session",session)
  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex-cols md:flex items-center justify-between space-y-2">
            <PageTitle title="Dashboard" />
            
            <div className="flex-row md:flex items-center justify-center md:space-x-2">
              <CalenderDateRangePicker className="w-full " />
              <div className="flex justify-between mt-3 md:mt-0 gap-2">
                <Button variant="default" >Last 7 days</Button>
                <Button variant="default" >Last 30 days</Button>
                <Button variant="default" >Last 1 year</Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {/* {totalSale?._sum?.amount?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}{" "} */}
                  ৳
                </div>
                <p className="text-xs text-muted-foreground">
                  From {totalOrder} Orders
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{customerCount}</div>
                <p className="text-xs text-muted-foreground">
                  {(newCustomersLastMonth / customerCount).toFixed(2)}% from
                  last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Attend Guest
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customerAttendCount} </div>
                <p className="text-xs text-muted-foreground">
                  Outof {customerCount} Customers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Order
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrder}</div>
                <p className="text-xs text-muted-foreground">Since last hour</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4 col-span-2">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="md:col-span-3 col-span-2">
              <CardHeader>
                <CardTitle>
                  <Link href="/dashboard/orders">Recent Sales</Link>
                </CardTitle>
                <CardDescription>
                  You made {totalOrder} sales this Event.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
