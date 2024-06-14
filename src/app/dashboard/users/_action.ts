"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { z } from "zod";
import { UserFormSchema } from "./UserFormSchema";

export type User = z.infer<typeof UserFormSchema>;

export const handleDelete = async (id: string) => {
  "Tigger Action", id;
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    //  (user);
    if (user) {
      `${user.name} deleted successful!`;
      revalidatePath("/dashboard/offers");
      return user;
    }
  } catch (err) {
    err;
    return false;
  }
};

export const createUser = async (data: User) => {
  try {
    //ts-ignore
    "action", data;
    let { name, phone, email, username, password, type, status } = data;

    if (!name || !phone || !username || !password) return false;

    password = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      //@ts-ignore
      data: { name, phone, email, username, password, type, status },
    });
    if (createUser) {
      `${createUser.name} Create successful!`;
      revalidatePath("/dashboard/offers");
      return createUser;
    }
  } catch (err) {
    err;
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
    updateUser;
    if (updateUser) {
      `${updateUser.name} Update successful!`;
      revalidatePath("/dashboard/users");
      return updateUser;
    }
  } catch (err) {
    "err", err;
    return err;
  }
};

export const createUserLogs = async (
  userId: string,
  oInvoice: string,
  module: string,
  otype: string
) => {
  try {
    const createUserLog = await prisma.userLogs.create({
      data: {
        userId: userId,
        otInvoice: oInvoice,
        module: module,
        otType: otype,
        date: new Date(), // Automatically use the current date
      },
      include: {
        user: true, // Include related user information
      },
    });

    if (createUserLog) {
      `User log created successfully!`, createUserLog;
      // revalidatePath("/dashboard/user-logs"); // Adjust the path as needed
      return createUserLog;
    }
  } catch (err) {
    "Error creating user log:", err;
    return false;
  }
};
