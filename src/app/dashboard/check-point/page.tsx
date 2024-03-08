"use client";
//@type-noCheck
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, User, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

export default function CheckPoint() {
  const [customer, setCustomer] = useState({});
  const [isFound, setIsFound] = useState(false);
  const [cId, setCId] = useState("");

  const getCustomer = async () => {
    const url = `/api/customer/customerid/${cId}`;
    setIsFound(false);

    try {
      await axios.get(url).then((res) => {
        if (res.data?.id) {
          toast.success("Guest Found");
          // console.log(res.data)
          if (!res.data.id) {
            setIsFound(false);
          } else {
            setCustomer(res.data);
            setIsFound(true);
          }
        } else {
          revalidatePath("/dashboard/checkpoint");
          toast.error(`Guest Not Found with ID: ${cId}`);
        }
      });
      //@ts-ignore
    } catch (err) {
      console.log(err);
    }
  };

  const checkIn = async (id: { id: string }) => {
    const url = `/api/customer/customerid/${id}`;
    // console.log(cId, url)
    try {
      await axios.put(url, { attend: true }).then((res) => {
        // console.log(res.data)
        toast.success("Guest Checked in Successful");
        getCustomer();
      });
      //@ts-ignore
    } catch (err) {
      console.log(err);
      toast.error("On Guest Found");
    }
  };

  // console.log("customer",customer)
  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Check Point" />
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className=" w-2/6 flex flex-col items-center">
              <User className="h-12 w-12 mb-2" />
              <h2 className="mb-4">REGISTRATION CHECK POINT</h2>
              <div className="flex w-full max-w-sm items-center space-x-2 mb-8">
                <Input
                  onChange={(e) => setCId(e.target.value)}
                  value={cId}
                  placeholder="Serch Customer ID..."
                />
                <Button onClick={() => getCustomer()}>Check</Button>
              </div>
              {
                //@ts-ignore
                !isFound ? (
                  <div className="flex items-center gap-2">
                    <UserX /> Customer Not Found
                  </div>
                ) : (
                  <Card className="w-5/6">
                    <CardHeader className="border-b-2">
                      <CardTitle className="flex items-center gap-2">
                        <UserCheck /> Customer Found
                      </CardTitle>
                      <CardDescription>
                        Registration Description
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="pb-4">
                        <b>Name:</b>{" "}
                        {
                          //@ts-ignore
                          customer.name
                        }
                      </p>
                      <p className="pb-4">
                        <b>Phone:</b>{" "}
                        {
                          //@ts-ignore
                          customer.phone
                        }
                      </p>
                      <p className="pb-4">
                        <b>Customer ID:</b>{" "}
                        {
                          //@ts-ignore
                          customer.customerId
                        }
                      </p>
                      <p className="pb-4">
                        <b>Email:</b>{" "}
                        {
                          //@ts-ignore
                          customer.email
                        }
                      </p>
                      <p className="pb-4">
                        <b>Address:</b>{" "}
                        {
                          //@ts-ignore
                          customer.address
                        }
                      </p>
                      <p className="pb-4">
                        <b>District:</b>{" "}
                        {
                          //@ts-ignore
                          customer.district
                        }
                      </p>
                      <p className="pb-4">
                        <b>Division:</b>{" "}
                        {
                          //@ts-ignore
                          customer.division
                        }
                      </p>
                      <p className="pb-4">
                        <b>Reg Date:</b>{" "}
                        {
                          //@ts-ignore
                          customer.createdAt
                        }
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      {
                        //@ts-ignore
                        !customer.attend ? (
                          <Button
                            className="flex"
                            onClick={
                              //@ts-ignore
                              () => checkIn(customer.id)
                            }
                          >
                            {" "}
                            <Check /> Check In
                          </Button>
                        ) : (
                          <Button variant="outline" className="text-green-600">
                            <Check /> Checked In
                          </Button>
                        )
                      }
                    </CardFooter>
                  </Card>
                )
              }
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
