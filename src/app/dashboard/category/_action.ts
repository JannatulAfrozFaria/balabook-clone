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

export const saveCategory = async (id: string, categories: Category[]) => {
  try {
    const savedCategories = [];

    for (const category of categories) {
      const { name, code, photo, parentId, description, status } = category;

      if (!name || !code) continue;

      if (id !== "") {
        const updateCategory = await prisma.category.update({
          where: { id: id },
          data: {
            name,
            code,
            photo,
            parentId: parentId || null,
            description,
            status,
          },
        });

        if (updateCategory) {
          console.log(`${updateCategory.name} updated successfully!`);
          savedCategories.push(updateCategory);
        }
      } else {
        const createCategory = await prisma.category.create({
          data: {
            name,
            code,
            description,
            photo,
            parentId: parentId || null,
            status,
          },
        });

        if (createCategory) {
          console.log(`${createCategory.name} created successfully!`);
          savedCategories.push(createCategory);
        }
      }
    }

    revalidatePath("/dashboard/category");
    return savedCategories;
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

export const categoryDw = async (id: string) => {
  try {
    let categories;

    if (id !== "") {
      categories = await prisma.category.findMany({
        where: {
          parentId: id,
        },
        select: {
          id: true,
          name: true,
        },
      });
    } else {
      categories = await prisma.category.findMany({
        where: {
          parentId: { not: null },
        },
        select: {
          id: true,
          name: true,
        },
      });
    }

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

export const categoryMCDw = async () => {
  try {
    let categories;

    categories = await prisma.category.findMany({
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

//import product from csv function
export const importCategory = async (data: any, isPatent: boolean) => {
  console.log("Importing category");
  try {
    if (isPatent) {
      const category = await prisma.category.createMany({
        data: data.map(({ name, code, description, status }) => ({
          name,
          code,
          description,
          // photo,
          // parentId: parentId || "",
          status,
        })),
      });

      if (category.count > 0) {
        console.log(`${category.count} Categories created successfully!`);
        revalidatePath("/dashboard/category");
        return category;
      }
    } else {
      console.log("subCategory");
    }
  } catch (error) {
    console.log(error);
  }
};
