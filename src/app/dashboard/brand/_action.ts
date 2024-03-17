"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { z } from "zod";
import { BrandFormSchema } from "./BrandFormSchema";

export type Brand = z.infer<typeof BrandFormSchema>;

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

// export const updateUser = async (id: string, data: Brand) => {
//   try {
//     const { name, phone, email, username, password, type, status } = data;

//     if (!name || !phone || !username) {
//       return false;
//     }

//     let userData = {};
//     if (password !== "") {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       userData = { ...userData, password: hashedPassword };
//     }

//     userData = { ...userData, name, phone, email, username, type, status };
//     //ts-ignore
//     // const { id, ...data } = data;
//     const updateUser = await prisma.user.update({
//       where: {
//         id: id,
//       },
//       //ts-ignore
//       data: userData,
//     });
//     console.log(updateUser);
//     if (updateUser) {
//       console.log(`${updateUser.name} Update successful!`);
//       revalidatePath("/dashboard/users");
//       return updateUser;
//     }
//   } catch (err) {
//     console.log("err", err);
//     return err;
//   }
// };
