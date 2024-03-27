"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CategoryFormSchema } from "./CategoryFormSchema";

export type Category = z.infer<typeof CategoryFormSchema>;

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const user = await prisma.brand.delete({
      where: {
        id: id,
      },
    });
    if (user) {
      console.log(`Deleted successful!`);
      revalidatePath("/dashboard/brnad");
      return user;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createBrand = async (data: Brand) => {
  try {
    //ts-ignore
    console.log("action", data);
    let { name, code, logo, description, status } = data;

    if (!name || !code) return false;

    const createBrand = await prisma.brand.create({
      //@ts-ignore
      data: { name, code, description, logo, status },
    });
    if (createBrand) {
      console.log(`${createBrand.name} Create successful!`);

      revalidatePath("/dashboard/brand");
      return createBrand;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateBrand = async (id: string, data: Brand) => {
  try {
    const { name, code, logo, description, status } = data;

    if (!name || !code) {
      return false;
    }

    //ts-ignore
    // const { id, ...data } = data;
    const updateUser = await prisma.brand.update({
      where: {
        id: id,
      },
      //@ts-ignore
      data: { name, code, logo, description, status },
    });
    console.log(updateUser);
    if (updateUser) {
      console.log(`${updateUser.name} Update successful!`);
      revalidatePath("/dashboard/users");
      return updateUser;
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};
