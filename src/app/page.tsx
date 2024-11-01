import { getServerSession } from "next-auth";
import Image from "next/image";
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
  // const data = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen h-screen flex-col">
      <h1>Home Page Coming Soon</h1>
    </main>
  );
}
