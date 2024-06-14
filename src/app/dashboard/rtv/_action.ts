"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { RTVFormSchema } from "./create/RTVFormSchema";

export type Product = z.infer<typeof RTVFormSchema>;

export const handleDelete = async (id: string) => {
  "Tigger Action", id;
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    //  (deleteOffer);
    if (deleteProduct) {
      `${deleteProduct.name} deleted successful!`;
      revalidatePath("/dashboard/offers");
      return deleteProduct;
    }
  } catch (err) {
    err;
    return false;
  }
};

export const saveProduct = async (id: string, data: Product) => {
  try {
    "action", data;
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
        `${updateUnit.name} Update successful!`;

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
        `${createProduct.name} Create successful!`;

        revalidatePath("/dashboard/unit");
        return createProduct;
      }
    }
  } catch (err) {
    err;
    return false;
  }
};
