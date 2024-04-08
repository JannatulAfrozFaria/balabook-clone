"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import CustomerForm from "./CustomerForm";

function CreateCustomerSheet() {
  const [entry, setEntry] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button variant="default">Create New Customer</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Creat New Customer</SheetTitle>
            <SheetDescription>
              <CustomerForm entry={entry} setOpen={setOpen} />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CreateCustomerSheet;
