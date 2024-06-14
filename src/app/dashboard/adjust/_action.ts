"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AdjustFormSchema } from "./create/AdjustFormSchema";
import { generateId } from "@/lib/idGenerator";

export type Adjust = z.infer<typeof AdjustFormSchema>;

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

export const saveAdjust = async (data: Adjust) => {
  const newAdjustNo = await generateId("adj");
  try {
    let {
      id,
      userId,
      adjustMentNo,
      products,
      note,
      warehouseId,
      rcvAdjustmentQty,
      rcvAdjustmentTotal,
      issueAdjustQty,
      issueAdjustTotal,
      total,
      totalItem,
      grossTotal,
      grossTotalRound,
      status,
    } = data;

    // if (!id || !articleCode) return false;

    if (id !== "") {
      const updateUnit = await prisma.adjust.update({
        where: {
          id: id,
        },
        data: {
          //@ts-ignore
          user: { connect: { id: userId } },
          adjustMentNo,
          products,
          note,
          warehouse: { connect: { id: warehouseId } },
          rcvAdjustmentQty,
          rcvAdjustmentTotal,
          issueAdjustQty,
          issueAdjustTotal,
          total,
          totalItem,
          grossTotal,
          grossTotalRound,
          status,
        },
      });

      if (updateUnit) {
        `${updateUnit.id} Update successful!`;

        revalidatePath("/dashboard/adjust");
        return updateUnit;
      }
    } else {
      const createAdjust = await prisma.adjust.create({
        data: {
          user: { connect: { id: userId } },
          adjustMentNo: newAdjustNo,
          products,
          note,
          warehouse: { connect: { id: warehouseId } },
          rcvAdjustmentQty,
          rcvAdjustmentTotal,
          issueAdjustQty,
          issueAdjustTotal,
          total,
          totalItem,
          grossTotal,
          grossTotalRound,
          status,
        },
      });

      if (createAdjust) {
        `${createAdjust.id} Create successful!`;
        revalidatePath("/dashboard/adjust");
        return createAdjust;
      }
    }
  } catch (err) {
    err;
    return false;
  }
};

export const UpdateAdjustStatus = async (id: string, status: string) => {
  // console.log("Triggered update", id, status);
  try {
    const update = await prisma.adjust.update({
      where: {
        id: id,
      },
      //@ts-ignore
      data: { status: status },
    });

    if (update) {
      console.log("update successful");
      revalidatePath("/dashboard/adjust");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("sales update error", error);
    return false;
  }
};
