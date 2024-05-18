"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { TPNFormSchema } from "./create/TPNFormSchema";

export type Product = z.infer<typeof TPNFormSchema>;

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    // console.log(deleteOffer);
    if (deleteProduct) {
      console.log(`${deleteProduct.name} deleted successful!`);
      revalidatePath("/dashboard/offers");
      return deleteProduct;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const saveProduct = async (id: string, data: Product) => {
  try {
    console.log("action", data);
    let {
      name,
      articleCode,
      qty,
      mrp,
      tp,
      total,
      vat,
      stock,
      supplier,
      tax,
      hsCode,
      country,
      discount,
      grosTotal,
      grossTotalRound,
      note,
      containerId,
      
    } = data;

    if (!name || !articleCode) return false;

    if (id !== "") {
      const updateUnit = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          //@ts-ignore
          name,
      articleCode,
      qty,
      mrp,
      tp,
      total,
      vat,
      stock,
      supplier,
      tax,
      hsCode,
      country,
      discount,
      grosTotal,
      grossTotalRound,
      note,
      containerId,
        },
      });

      if (updateUnit) {
        console.log(`${updateUnit.name} Update successful!`);

        revalidatePath("/dashboard/unit");
        return updateUnit;
      }
    } else {
      const createProduct = await prisma.product.create({
        data: {
            name,
            articleCode,
            qty,
            mrp,
            tp,
            total,
            vat,
            stock,
            supplier,
            tax,
            hsCode,
            country,
            discount,
            grosTotal,
            grossTotalRound,
            note,
            containerId,
        },
      });

      if (createProduct) {
        console.log(`${createProduct.name} Create successful!`);

        revalidatePath("/dashboard/unit");
        return createProduct;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};