"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { CustomerFormSchema } from "./CustomerFormSchema";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export type Customer = z.infer<typeof CustomerFormSchema>;

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

export const saveCustomer = async (id: string, data: Customer) => {
  try {
    //ts-ignore
    console.log("action", data);
    const {
      name,
      phone,
      email,
      photo,
      username,
      password,
      type,
      contactPerson,
      contactPersonPhone,
      company,
      designation,
      bin,
      tin,
      treadLicense,
      creditOption,
      cLimitAmount,
      cLimitDay,
      status,
    } = data;

    if (!name || !phone) return false;

    let userData = {};
    let hashedPassword = "";
    if (password !== "") {
      hashedPassword = await bcrypt.hash(password || "", 10);
      userData = { ...userData, password: hashedPassword };
    }

    userData = {
      ...userData,
      name,
      phone,
      email,
      photo,
      username,
      type,
      contactPerson,
      contactPersonPhone,
      company,
      designation,
      bin,
      tin,
      treadLicense,
      creditOption,
      cLimitAmount,
      cLimitDay,
      status,
    };

    // Generate a random 6-digit unique customer ID
    const customerId = await generateCustomerId(prisma);

    if (id !== "") {
      const updateCustomer = await prisma.customer.update({
        where: {
          id: id,
        },
        data: userData,
      });

      if (updateCustomer) {
        console.log(`${updateCustomer.name} Update successful!`);

        revalidatePath("/dashboard/customer");
        return updateCustomer;
      }
    } else {
      const createUser = await prisma.customer.create({
        data: {
          name,
          phone,
          email,
          photo,
          username,
          password: hashedPassword,
          customerId: customerId,
          //@ts-ignore
          type,
          contactPerson,
          contactPersonPhone,
          company,
          designation,
          bin,
          tin,
          treadLicense,
          creditOption,
          cLimitAmount,
          cLimitDay,
          //@ts-ignore
          status,
        },
      });

      if (createUser) {
        console.log(`${createUser.name} Create successful!`);

        revalidatePath("/dashboard/customer");
        return createUser;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// export const createCustomer = async (data: Customer) => {
//   try {
//     let {
//       name,
//       phone,
//       email,
//       photo,
//       username,
//       password,
//       type,
//       contactPerson,
//       contactPersonPhone,
//       company,
//       designation,
//       bin,
//       tin,
//       treadLicense,
//       creditOption,
//       cLimitAmount,
//       cLimitDay,
//       status,
//     } = data;

//     // Check if required fields are present
//     if (!name || !phone) return false;
//     let passwordGen = password ? password : "12345";
//     password = await bcrypt.hash(passwordGen, 10);

//     // Generate a random 6-digit unique customer ID
//     const customerId = await generateCustomerId(prisma);

//     const customer = await prisma.customer.create({
//       data: {
//         name,
//         phone,
//         email,
//         photo,
//         username,
//         password,
//         customerId: customerId,
//         //@ts-ignore
//         type,
//         contactPerson,
//         contactPersonPhone,
//         company,
//         designation,
//         bin,
//         tin,
//         treadLicense,
//         creditOption,
//         cLimitAmount,
//         cLimitDay,
//         //@ts-ignore
//         status,
//       },
//     });
//     //ts-ignore
//     console.log(customer);
//     if (customer) {
//       console.log(`${customer.name} Create successful!`);
//       revalidatePath("/dashboard/customer");
//       return customer;
//     }
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

export const importCustomer = async (data: any) => {
  try {
    data.map(async (customerData: Customer) => {
      const {
        name,
        phone,
        email,
        photo,
        username,
        password,
        // customerId,
        //@ts-ignore
        type,
        contactPerson,
        contactPersonPhone,
        company,
        designation,
        bin,
        tin,
        treadLicense,
        creditOption,
        cLimitAmount,
        cLimitDay,
        //@ts-ignore
        status,
      } = customerData;

      // Check if required fields are present
      if (!name || !phone) {
        return false;
      }

      // Generate a random 6-digit unique customer ID
      const customerId = await generateCustomerId(prisma);

      const customer = await prisma.customer.create({
        data: { name, phone, email, customerId },
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

// export const updateCustomer = async (id: string, data: Customer) => {
//   try {
//     console.log(data);
//     const {
//       name,
//       phone,
//       email,
//       address,
//       district,
//       division,
//       company,
//       designation,
//       // @ts-ignore
//       attend,
//       status,
//     } = data;
//     if (!name || !phone) {
//       return false;
//     }
//     const updatedUser = await prisma.customer.update({
//       where: { id: id },
//       data: {
//         name,
//         phone,
//         email,
//         address,
//         district,
//         division,
//         company,
//         designation,
//         attend,
//         // @ts-ignore
//         status,
//       },
//     });
//     if (updatedUser) {
//       console.log(`${updatedUser.name} Update successful!`);
//       revalidatePath("/dashboard/customer");
//       return updatedUser;
//     }
//   } catch (err) {
//     console.log("err", err);
//     return false;
//   }
// };
