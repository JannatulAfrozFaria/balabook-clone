"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateId } from "@/lib/idGenerator";
import { DamageFormSchema } from "./create/DamageFromSchema";

export type Damage = z.infer<typeof DamageFormSchema>;

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

export const saveDamage = async (data: Damage) => {
  const newDamageNo = await generateId("adj");
  try {
    let {
      id,
      userId,
      damageNo,
      products,
      note,
      warehouseId,

      total,
      totalItem,
      grossTotal,
      grossTotalRound,
      status,
    } = data;

    // if (!id || !articleCode) return false;

    if (id !== "") {
      const updateUnit = await prisma.damage.update({
        where: {
          id: id,
        },
        data: {
          //@ts-ignore
          user: { connect: { id: userId } },
          damageNo,
          products,
          note,
          warehouse: { connect: { id: warehouseId } },

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
      const createDamage = await prisma.damage.create({
        //@ts-ignore
        data: {
          user: { connect: { id: userId } },
          damageNo: newDamageNo,
          products,
          note,
          warehouse: { connect: { id: warehouseId } },
          total,
          totalItem,
          grossTotal,
          grossTotalRound,
          status,
        },
      });

      if (createDamage) {
        `${createDamage.id} Create successful!`;
        revalidatePath("/dashboard/adjust");
        return createDamage;
      }
    }
  } catch (err) {
    err;
    return false;
  }
};

export const UpdateDamageStatus = async (id: string, status: string) => {
  // console.log("Triggered update", id, status);
  try {
    const update = await prisma.damage.update({
      where: {
        id: id,
      },
      //@ts-ignore
      data: { status: status },
    });

    if (update) {
      console.log("update successful");
      revalidatePath("/dashboard/damage");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("sales update error", error);
    return false;
  }
};
