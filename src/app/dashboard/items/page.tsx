import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import prisma from "../../../../prisma";
import Link from "next/link";
import { Plus, Undo2 } from "lucide-react";
import { getDeviceType } from "@/lib/deviceDetect";

export default async function OrderPage() {
  // const data = await prisma.sales.findMany({
  //   include: {
  //     customer: {
  //       select: {
  //         name: true, // Select only the name field from the supplier model
  //         phone: true, // Select only the name field from the supplier model
  //         company: true, // Select only the name field from the supplier model
  //       },
  //     },

  //     user: {
  //       select: {
  //         name: true, // Select only the name field from the user model
  //       },
  //     },
  //   },
  // });

  return (
    <main className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto bg-red-400 min-h-screen">
      <h1>Item Page</h1>
    </main>
  );
}
