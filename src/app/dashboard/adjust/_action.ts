"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AdjustFormSchema } from "./create/AdjustFormSchema";
import { generateId } from "@/lib/idGenerator";

export type Adjust = z.infer<typeof AdjustFormSchema>;

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

export const saveAdjust = async (data: Adjust) => {
  const newAdjustNo = await generateId("adj");
  console.log("AdjustNo", newAdjustNo);
  try {
    console.log("action", data);
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
        },
      });

      if (updateUnit) {
        console.log(`${updateUnit.id} Update successful!`);

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
        },
      });

      if (createAdjust) {
        console.log(`${createAdjust.id} Create successful!`);
        revalidatePath("/dashboard/adjust");
        return createAdjust;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
