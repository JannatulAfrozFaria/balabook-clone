"use client";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import ProductForm from "./ProductForm";
import { useState } from "react";

export default function CreateProductsPage() {
  const [product, setProduct] = useState<any>([]);

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex">
              <Link href="/dashboard/products">
                <Button variant="ghost">
                  <ArrowLeft />
                </Button>
              </Link>
              <PageTitle title="Create New Product" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Link href="/dashboard/products">
                  <Button>
                    <X className="mr-2" /> Cancle
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <ProductForm entry={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
