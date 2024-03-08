"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { z } from "zod";
import { UserFormSchema } from "./UserFormSchema";

export type User = z.infer<typeof UserFormSchema>;

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    // console.log(user);
    if (user) {
      console.log(`${user.name} deleted successful!`);
      revalidatePath("/dashboard/offers");
      return user;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createUser = async (data: User) => {
  try {
    //ts-ignore
    console.log("action", data);
    let { name, phone, email, username, password, type, status } = data;

    if (!name || !phone || !username || !password) return false;

    password = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      //@ts-nocheck
      data: { name, phone, email, username, password, type, status },
    });
    if (createUser) {
      console.log(`${createUser.name} Create successful!`);
      revalidatePath("/dashboard/offers");
      return createUser;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateUser = async (id: string, data: User) => {
  try {
    const { name, phone, email, username, password, type, status } = data;

    if (!name || !phone || !username) {
      return false;
    }

    let userData = {};
    if (password !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    userData = { ...userData, name, phone, email, username, type, status };
    //ts-ignore
    // const { id, ...data } = data;
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      //ts-ignore
      data: userData,
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
