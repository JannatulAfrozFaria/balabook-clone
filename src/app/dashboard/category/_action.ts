"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CategoryFormSchema } from "./CategoryFormSchema";

export type Category = z.infer<typeof CategoryFormSchema>;

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const user = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    if (user) {
      console.log(`Deleted successful!`);
      revalidatePath("/dashboard/category");
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const saveCategory = async (id: string, data: Category) => {
  try {
    //ts-ignore
    console.log("action", data);
    let { name, code, photo, parentId, description, status } = data;

    if (!name || !code) return false;

    if (id !== "") {
      const updateCategory = await prisma.category.update({
        where: {
          id: id,
        },
        data: {
          name,
          code,
          photo,
          //@ts-ignore
          parentId: parentId || null,
          description,
          status,
        },
      });

      if (updateCategory) {
        console.log(`${updateCategory.name} Create successful!`);

        revalidatePath("/dashboard/brand");
        return updateCategory;
      }
    } else {
      const createCategory = await prisma.category.create({
        data: {
          name,
          code,
          description,
          //@ts-ignore
          photo,
          //@ts-ignore
          parentId: parentId || null,
          status,
        },
      });

      if (createCategory) {
        console.log(`${createCategory.name} Create successful!`);

        revalidatePath("/dashboard/brand");
        return createCategory;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const parentCategory = async () => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      select: {
        id: true,
        name: true,
      },
    });

    let dw = [
      {
        value: "",
        label: "Select Category",
      },
    ];

    // console.log(categories);
    categories.map(
      (category) =>
        (dw = [
          ...dw,
          {
            value: category.id,
            label: category.name,
          },
        ])
    );
    return dw;
  } catch (error) {
    console.error("Error fetching parent categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
