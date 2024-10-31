"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";


export async function fetchItems(limit: number = 20, offset: number = 0) {
  try {
    const items = await prisma.item.findMany({
      take: limit,       // Limit the number of items fetched
      skip: offset,      // Used for pagination if needed
    });
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }
}

export const createItem = async (data: any) => {
  try {
    const { description, account, price, discount, vat, type } = data;

    if (!description || !account || price === undefined) return false;

    const newItem = await prisma.item.create({
      data: { description, account, price, discount, vat, type  },
    });

    if (newItem) {
      console.log(`${newItem.description} created successfully!`);
      revalidatePath("/dashboard/items");
      return newItem;
    }
  } catch (error) {
    console.error("Error creating item:", error);
    return false;
  }
};

export const updateItem = async (id: string, data: any) => {
  try {
    const { description, account, price, discount, vat, type  } = data;

    if (!description || !account || price === undefined) return false;

    const updatedItem = await prisma.item.update({
      where: { id },
      data: { description, account, price, discount, vat, type  },
    });

    if (updatedItem) {
      console.log(`${updatedItem.description} updated successfully!`);
      revalidatePath("/dashboard/items");
      return updatedItem;
    }
  } catch (error) {
    console.error("Error updating item:", error);
    return false;
  }
};

export const deleteItem = async (id: string) => {
  try {
    const deletedItem = await prisma.item.delete({
      where: { id },
    });

    if (deletedItem) {
      console.log(`${deletedItem.description} deleted successfully!`);
      revalidatePath("/dashboard/items");
      return deletedItem;
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
};
