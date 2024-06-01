"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateId } from "@/lib/idGenerator";
import { GRNFormSchema } from "./create/GRNFormSchema";

export type Product = z.infer<typeof GRNFormSchema>;

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

export const saveGRN = async (data: Product) => {
  const newGrnNo = await generateId("grn");
  try {
    console.log("action", data);
    let {
      id,
      grnNo,
      supplierId,
      tpnId,
      products,
      total,
      poNoId,
      grossTotal,
      grossTotalRound,
      totalItem,
      status,
      userId,
      note,
    } = data;

    if (totalItem && totalItem < 0) {
      console.error("Supplier ID is missing or total items are zero");
      return false;
    }

    console.log(data);

    if (id === "") {
      const createGrn = await prisma.grn.create({
        // where: { id: id },
        data: {
          grnNo: newGrnNo,
          supplierId,
          tpnId,
          products,
          total,
          poNoId,
          grossTotal,
          grossTotalRound,
          totalItem,
          status,
          note,
          userId,
        },
      });

      if (createGrn) {
        console.log(`${createGrn.grnNo} created successfully!`);
        revalidatePath("/dashboard/po");
        return createGrn;
      }
      // } else {
      //   const updateGrn = await prisma.gRN.update({
      //     data: {
      //       grnNo: newGrnNo,
      //       supplierId,
      //       poNoId,
      //       tpnId,
      //       products,
      //       total,
      //       grossTotal,
      //       grossTotalRound,
      //       totalItem,
      //       status,
      //       userId,
      //     },
      //   });
      //   if (updateGrn) {
      //     console.log(`${updateGrn.grnNo} created successfully!`);
      //     revalidatePath("/dashboard/po");
      //     return updateGrn;
      //   }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
