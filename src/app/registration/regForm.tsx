"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect, useState } from "react";
// import sendSms from "@/lib/sms";
import sendMessage from "@/lib/smsSystem";

const RegistrationForm = () => {
  const router = useRouter();
  const [district, setDistrict] = useState([]);
  const [division, setDivision] = useState([]);
  const [diviSelect, setDiviSelect] = useState("");

  //  ("diviSelect",diviSelect)0

  const getDistict = async (division: String) => {
    let url = "https://bdapis.com/api/v1.1/districts";
    if (division !== "") {
      url = `https://bdapis.com/api/v1.1/division/${division}`;
    }

    //  (url)

    await axios
      .get(url)
      .then((res) => {
        //  ("Dis:",res.data.data)
        setDistrict(res.data.data);
      })
      .catch((error) => {
        error;
      });
  };

  const getDivision = async () => {
    await axios
      .get("https://bdapis.com/api/v1.1/divisions")
      .then((res) => {
        setDivision(res.data.data);
      })
      .catch((error) => {
        error;
      });
  };

  useEffect(() => {
    getDistict("");
    getDivision();
  }, []);

  useEffect(() => {
    getDistict(diviSelect);
  }, [diviSelect]);

  // Define the validation schema for the registration form
  const RegistrationFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    email: z.union([z.string().email(), z.literal("")]),
    address: z.string().optional(),
    district: z.string().min(1, { message: "District is required" }),
    division: z.string().min(1, { message: "Division is required" }),
    company: z.string().optional(),
    designation: z.string().optional(),
    // status: z.string().min(1, { message: "Status is required" }),
  });

  // Initialize the form with default values and validation
  const form = useForm<z.infer<typeof RegistrationFormSchema>>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      district: "",
      division: "",
      company: "",
      designation: "",
      // status: "Active",
    },
  });

  // Handle form submission
  async function onSubmit(data: z.infer<typeof RegistrationFormSchema>) {
    //  (data)
    try {
      await axios
        .post("/api/customer", data)
        .then((res) => {
          res.data.customer.phone;

          const to = `${res.data.customer.phone}`;
          const message = `Dear ${res.data.customer.name}, Your registration for the "Event Name" successful,  your Guest ID: ${res.data.customer.customerId}`;

          const send = sendMessage({ message, to });
          send;
          // TODO:: SEND SMS WITH USER ID
          toast.success("Registration Success");

          router.push("/congratulation");
        })
        .catch((error) => {
          error;
          if (error.response.data.error.code === "P2002") {
            let errorMassage = "Data Validation Error";
            const target = error.response.data.error.meta.target;

            if (target === "Customer_phone_key") {
              errorMassage = "This Phone is Already user for an account";
            }
            toast.error(errorMassage);
          } else {
            toast.error("Registration Faild");
          }
        })
        .finally(() => {
          router.refresh();
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-[300px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          {/* Form fields for registration */}
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Division */}

          <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Division</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setDiviSelect(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {division.length > 0 &&
                      division.map((dis) => {
                        // @ts-ignore
                        const divisionValue = dis?.division || "";
                        return (
                          <SelectItem key={divisionValue} value={divisionValue}>
                            {divisionValue}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* District */}
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {district.length > 0 &&
                      district.map((dis) => {
                        // @ts-ignore
                        const distictValue = dis?.district || "";
                        return (
                          <SelectItem key={distictValue} value={distictValue}>
                            {distictValue}
                          </SelectItem>
                        );
                      })}
                    {/* <SelectItem value="assistant">Assistan</SelectItem> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Designation */}
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Designation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          {/* <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                      <SelectTrigger className="">
                          <SelectValue placeholder="Active" />
                      </SelectTrigger>
                  </FormControl>
                      <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                  </Select>
                  
                  <FormMessage />
              </FormItem>
            )}
          /> */}
          <br />
          <Button className="w-full " type="submit">
            Register
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
};

export default RegistrationForm;
