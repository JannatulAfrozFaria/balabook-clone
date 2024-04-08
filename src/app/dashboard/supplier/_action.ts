"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { SupplierFormSchema } from "./SupplierFormSchema";

export type Supplier = z.infer<typeof SupplierFormSchema>;

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const supplier = await prisma.supplier.delete({
      where: {
        id: id,
      },
    });
    if (supplier) {
      console.log(`Deleted successful!`);
      revalidatePath("/dashboard/supplier");
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const saveSupplier = async (id: string, data: Supplier) => {
  try {
    //ts-ignore
    console.log("action", data);
    let {
      name,
      phone,
      email,
      address,
      company,
      country,
      designation,
      description,
      status,
    } = data;

    if (!name || !phone) return false;

    if (id !== "") {
      const updateSupplier = await prisma.supplier.update({
        where: {
          id: id,
        },
        data: {
          name,
          phone,
          email,
          address,
          company,
          country,
          designation,
          description,
          // @ts-ignore
          status,
        },
      });

      if (updateSupplier) {
        console.log(`${updateSupplier.name} Update successful!`);

        revalidatePath("/dashboard/supplier");
        return updateSupplier;
      }
    } else {
      const createSupplier = await prisma.supplier.create({
        data: {
          name,
          email,
          phone,
          address,
          company,
          country,
          designation,
          description,
          // @ts-ignore
          status,
        },
      });

      if (createSupplier) {
        console.log(`${createSupplier.name} Create successful!`);

        revalidatePath("/dashboard/supplier");
        return createSupplier;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
