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

function CreateCustomerSheet() {
  return (
    <div>  
        <Sheet>
            <SheetTrigger>
                <Button>Create New Customer</Button>
            </SheetTrigger>
            <SheetContent >
            <SheetHeader>
                <SheetTitle>Create New Customer</SheetTitle>
                <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
            </SheetContent>
    </Sheet>
  </div>
  )
}

export default CreateCustomerSheet


  