import { Button, ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import BrandForm from "./brandForm";

function CreateBrandSheet() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button variant="default">Create New Brand</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Creat New Brand</SheetTitle>
            <SheetDescription>
              <BrandForm />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CreateBrandSheet;
