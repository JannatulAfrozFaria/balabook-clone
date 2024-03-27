import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Head from "next/head";
import {
  LogIn,
  User,
  Archive,
  User2,
  Users,
  ShoppingCart,
  Box,
  LayoutDashboard,
} from "lucide-react";
import logo from "../../public/img/logo.png";
import { FC } from "react";
import { Clock, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const data = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen h-screen flex-col">
      {/* Session:{JSON.stringify(data)} */}
      {/* Header */}
      <header className="h-16 py-2 flex justify-between items-center px-8">
        <div className="flex items-center mt-1">
          {/* Your logo goes here */}
          <Image alt="Logo" src={logo} height={60} width={60} />
          <span className="ml-2 font-semibold">Import Management System</span>
        </div>
        <div className="flex justify-center items-center hover:text-[#f15f23]">
          {!data?.user ? (
            <div className="flex justify-center items-center">
              <LogIn className="h-4 w-4 duration-300" />
              <Link
                href="/login"
                className="px-2 py-2 rounded-full font-semibold duration-300"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <LayoutDashboard className="h-4 w-4 duration-300" />
              <Link
                href="/dashboard"
                className="px-2 py-2 rounded-full font-semibold duration-300"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>
      </header>
      {/* Hero Section */}
      <section className="flex-1">
        <div className="h-full flex items-center justify-around">
          <div className="w-3/6  flex items-center justify-center">
            <Image
              src={"/img/home-bg.png"}
              height={550}
              width={650}
              //  style={{
              //   width:"100%",
              //   minHeight:"auto"
              // }}
              alt="ims home"
            />
          </div>
          <div className="w-3/6 mx-14 ">
            <h1 className="text-lg bold mb-6">Import Management System</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="w-full ">
                <CardContent className="pt-4 pb-4 flex">
                  <User className="pe-2 text-[#f15f23]" />
                  <span>User Management</span>
                </CardContent>
              </Card>
              <Card className="w-full ">
                <CardContent className="pt-4 pb-4 flex">
                  <Archive className="pe-2 text-[#f15f23]" />
                  <span>Products Management</span>
                </CardContent>
              </Card>
              <Card className="w-full ">
                <CardContent className="pt-4 pb-4 flex">
                  <Users className="pe-2 text-[#f15f23]" />
                  <span>Party Management</span>
                </CardContent>
              </Card>
              <Card className="w-full ">
                <CardContent className="pt-4 pb-4 flex">
                  <Archive className="pe-2 text-[#f15f23]" />
                  <span>Stock Management</span>
                </CardContent>
              </Card>
              <Card className="w-full ">
                <CardContent className="pt-4 pb-4 flex">
                  <ShoppingCart className="pe-2 text-[#f15f23]" />
                  <span>PO Management</span>
                </CardContent>
              </Card>
              <Card className="w-full ">
                <CardContent className="pt-4 pb-4 flex">
                  <Box className="pe-2 text-[#f15f23]" />
                  <span>GRN Management</span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <footer className="h-16 py-4 text-center">
        {/* <p className="text-sm flex justify-center">
            <Copyright className="h-4 w-4" /> 2024 RASA. All rights reserved.
          </p> */}
        <p className="text-sm text-end pe-6">
          Powered by{" "}
          <Link href="https://techsoulbd.com">
            <b>
              <i>
                <span className="text-sky-600">tech</span>soul
              </i>
            </b>
          </Link>
        </p>
      </footer>
    </main>
  );
}
