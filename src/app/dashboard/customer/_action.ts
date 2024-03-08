"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { RegistrationFormSchema } from "./RegistrationFormSchema";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

export type Customer = z.infer<typeof RegistrationFormSchema>;

// Helper function to generate a random 6-digit unique ID
const generateCustomerId = async (prisma: PrismaClient) => {
  const MAX_RETRIES = 3; // Maximum number of attempts to generate a unique ID

  for (let i = 0; i < MAX_RETRIES; i++) {
    const newCustomerId = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Check if the generated ID already exists in the database
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        customerId: newCustomerId,
      },
    });

    if (!existingCustomer) {
      return newCustomerId;
    }
  }

  throw new Error("Failed to generate a unique customer ID");
};

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const deleteOffer = await prisma.customer.delete({
      where: {
        id: id,
      },
    });
    // console.log(deleteOffer);
    if (deleteOffer) {
      console.log(`${deleteOffer.name} deleted successful!`);
      revalidatePath("/dashboard/customer");
      return deleteOffer;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createCustomer = async (data: Customer) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      district,
      division,
      company,
      designation,
      // @ts-ignore
      attend,
      status,
    } = data;

    // Check if required fields are present
    if (!name || !phone || !district || !division) {
      return false;
    }

    // Generate a random 6-digit unique customer ID
    const customerId = await generateCustomerId(prisma);

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        address,
        district,
        division,
        company,
        designation,
        attend,
        // @ts-ignore
        status,
        customerId,
      },
    });
    //ts-ignore
    console.log(customer);
    if (customer) {
      console.log(`${customer.name} Create successful!`);
      revalidatePath("/dashboard/customer");
      return customer;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const importCustomer = async (data: any) => {
  try {
    data.map(async (customerData: Customer) => {
      const { name, phone, email, district, division } = customerData;

      // Check if required fields are present
      if (!name || !phone || !district || !division) {
        return false;
      }

      // Generate a random 6-digit unique customer ID
      const customerId = await generateCustomerId(prisma);

      const customer = await prisma.customer.create({
        data: { name, phone, email, district, division, customerId },
      });

      console.log(customer);
    });

    // if (customers?.length > 0) {
    //   console.log(customers);
    // return "Customer Import Successful!";
    // }
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    revalidatePath("/dashboard/customer");
    return true;
  }
};

export const updateCustomer = async (id: string, data: Customer) => {
  try {
    console.log(data);
    const {
      name,
      phone,
      email,
      address,
      district,
      division,
      company,
      designation,
      // @ts-ignore
      attend,
      status,
    } = data;
    if (!name || !phone) {
      return false;
    }
    const updatedUser = await prisma.customer.update({
      where: { id: id },
      data: {
        name,
        phone,
        email,
        address,
        district,
        division,
        company,
        designation,
        attend,
        // @ts-ignore
        status,
      },
    });
    if (updatedUser) {
      console.log(`${updatedUser.name} Update successful!`);
      revalidatePath("/dashboard/customer");
      return updatedUser;
    }
  } catch (err) {
    console.log("err", err);
    return false;
  }
};
