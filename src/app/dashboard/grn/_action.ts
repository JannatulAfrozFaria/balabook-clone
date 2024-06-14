"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateId } from "@/lib/idGenerator";
import { GRNFormSchema } from "./create/GRNFormSchema";
//@ts-ignore
export type Product = z.infer<typeof GRNFormSchema>;

export const handleDelete = async (id: string) => {
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

export const saveGRN = async (data: Product) => {
  const newGrnNo = await generateId("grn");
  try {
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

    data;

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
        `${createGrn.grnNo} created successfully!`;
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
      //      (`${updateGrn.grnNo} created successfully!`);
      //     revalidatePath("/dashboard/po");
      //     return updateGrn;
      //   }
    }
  } catch (err) {
    err;
    return false;
  }
};

export const UpdateGRNStatus = async (id: string, status: string) => {
  // console.log("Triggered update", id, status);
  try {
    const update = await prisma.grn.update({
      where: {
        id: id,
      },
      //@ts-ignore
      data: { status: status },
    });

    if (update) {
      console.log("update successful");
      revalidatePath("/dashboard/sales");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("sales update error", error);
    return false;
  }
};
