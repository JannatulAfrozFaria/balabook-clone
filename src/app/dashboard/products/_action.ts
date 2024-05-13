"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ProductFormSchema } from "./create/productFormSchema";

export type Product = z.infer<typeof ProductFormSchema>;

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
      salesType,
      articleCode,
      ean,
      masterCategoryId,
      categoryId,
      unitId,
      brandId,
      vat,
      vatMethod,
      hsCode,
      type,
      shipping,
      featured,
      website,
      slug,
      description,
      specification,
      price,
      promoPrice,
      promoStart,
      promoEnd,
      photo,
      gallery,
      supplierId,
      mrp,
      tp,
      pisInPackege,
      status,
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
          salesType,
          articleCode,
          ean,
          masterCategoryId,
          categoryId,
          unitId,
          brandId,
          vat,
          vatMethod,
          hsCode,
          type,
          shipping,
          featured,
          website,
          slug,
          description,
          specification,
          price,
          promoPrice,
          promoStart,
          promoEnd,
          photo,
          supplierId,
          mrp,
          tp,
          pisInPackege,
          status,
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
          //@ts-ignore
          salesType,
          articleCode,
          ean,
          masterCategoryId,
          categoryId,
          unitId,
          brandId,
          vat,
          vatMethod,
          hsCode,
          type,
          shipping,
          featured,
          website,
          slug,
          description,
          specification,
          price,
          promoPrice,
          promoStart,
          promoEnd,
          photo,
          supplierId,
          mrp,
          tp,
          pisInPackege,
          status,
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
