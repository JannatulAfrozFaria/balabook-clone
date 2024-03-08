import { Button, ButtonProps } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import React from 'react'
import UserForm from "./userForm"


function CreateUserSheet() {
  return (
    <div>  
        <Sheet>
            <SheetTrigger>
             
                <Button variant="default">Create New User</Button>
            </SheetTrigger>
            <SheetContent>
            <SheetHeader>
                <SheetTitle>Creat New User</SheetTitle>
                <SheetDescription>
                  <UserForm />
                </SheetDescription>
            </SheetHeader>
            </SheetContent>
    </Sheet>
  </div>
  )
}

export default CreateUserSheet


  