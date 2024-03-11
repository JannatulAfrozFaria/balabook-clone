import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import React from 'react'
import OfferForm from "./offerForm"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"


function CreateOfferSheet() {
  return (
    <div>  
        <Sheet>
            <SheetTrigger>
                <Button>Create New Offer</Button>
            </SheetTrigger>
            <SheetContent>
            <SheetHeader>
                <SheetTitle>Create New Offer</SheetTitle>
                <SheetDescription>
                <OfferForm />
                </SheetDescription>
            </SheetHeader>
            </SheetContent>
    </Sheet>
  </div>
  )
}

export default CreateOfferSheet


  