"use client";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import Link from "next/link";
import PoForm from "./POForm";
import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux-store/store";

export default function PoCreate() {
  return (
    <main className="flex min-h-screen flex-col gap-0 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-4 pt-4">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex">
              <Link href="/dashboard/po">
                <Button variant="ghost">
                  <ArrowLeft />
                </Button>
              </Link>
              <PageTitle title="Create Purchase Order" />
            </div>

            <div className="flex items-center space-x-2">
              <Link href="/dashboard/po">
                <Button>
                  <X className="mr-2 h-4 w-4" /> Cancle
                </Button>
              </Link>
            </div>
          </div>
          {/* <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <h2>Create PO Here</h2>
          </div> */}
        </div>
      </div>
      <div className="grid gap-0 md:grid-cols-1 lg:grid-cols-1">
        <PoForm entry={""} />
      </div>
    </main>
  );
}
