"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CategoryFormSchema } from "./CategoryFormSchema";

export type Category = z.infer<typeof CategoryFormSchema>;

export const handleDelete = async (id: string) => {
  "Tigger Action", id;
  try {
    const user = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    if (user) {
      `Deleted successful!`;
      revalidatePath("/dashboard/category");
      return true;
    }
  } catch (err) {
    err;
    return false;
  }
};

export const saveCategory = async (id: string, data: Category) => {
  try {
    let { name, code, photo, parentId, description, status } = data;

    if (!name || !parentId) return false;
    if (id !== "") {
      const updateCategory = await prisma.category.update({
        where: {
          id: id,
        },
        data: {
          name,
          code,
          photo,
          parentId,
          description,
          status,
        },
      });

      if (updateCategory) {
        `${updateCategory.name} Update successful!`;

        revalidatePath("/dashboard/category");
        return updateCategory;
      }
      if (id !== "") {
      }
    } else {
      const createCategory = await prisma.category.create({
        data: {
          name,
          code,
          photo,
          parentId,
          description,
          status,
        },
      });

      if (createCategory) {
        `${createCategory.name} Create successful!`;

        revalidatePath("/dashboard/category");
        return createCategory;
      }
    }
    // const savedCategories = [];

    // for (const category of data) {
    //   const { name, code, photo, parentId, description, status } = category;

    //   if (!name || !code) continue;

    //   if (id !== "") {
    //     const updateCategory = await prisma.category.update({
    //       where: { id: id },
    //       data: {
    //         name,
    //         code,
    //         photo,
    //         parentId: parentId || null,
    //         description,
    //         status,
    //       },
    //     });

    //     if (updateCategory) {
    //        (`${updateCategory.name} updated successfully!`);
    //       savedCategories.push(updateCategory);
    //     }
    //   } else {
    //     const createCategory = await prisma.category.create({
    //       data: {
    //         name,
    //         code,
    //         description,
    //         photo,
    //         parentId: parentId || null,
    //         status,
    //       },
    //     });

    //     if (createCategory) {
    //        (`${createCategory.name} created successfully!`);
    //       savedCategories.push(createCategory);
    //     }
    //   }
    // }

    // revalidatePath("/dashboard/category");
    // return savedCategories;
  } catch (err) {
    err;
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

    //  (categories);
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

// Sub Category List
export const categoryDw = async (id?: string) => {
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

    //  (categories);
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

//Master Category List
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

    //  (categories);
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
export const importCategory = async (data: any, isParent: boolean) => {
  try {
    "Importing category", isParent;
    if (isParent) {
      const category = await prisma.category.createMany({
        //@ts-ignore
        data: data.map(({ name, code, description, status }) => ({
          name,
          code,
          description,
          status,
        })),
      });

      if (category.count > 0) {
        `${category.count} Categories created successfully!`;
        revalidatePath("/dashboard/category");
        return category;
      }
    } else {
      ("Importing subcategories");

      const promises = data.map(
        //@ts-ignore
        async ({ name, code, parentId, description, status }) => {
          await prisma.category.create({
            data: {
              name,
              code,
              description,
              parentId: parentId,
              status,
            },
          });
        }
      );

      await Promise.all(promises);
      revalidatePath("/dashboard/category");
    }
  } catch (error) {
    console.error("Error importing categories:", error);
  }
};
