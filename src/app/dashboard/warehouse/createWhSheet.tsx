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
import UnitForm from "./wareHouseForm";

function CreateWhSheet() {
  const [entry, setEntry] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button variant="default">Create New Warehouse</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create New Warehouse</SheetTitle>
            <SheetDescription>
              <UnitForm entry={entry} setOpen={setOpen} />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CreateWhSheet;
