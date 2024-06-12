"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateId } from "@/lib/idGenerator";
import { DamageFormSchema } from "./create/DamageFromSchema";

export type Damage = z.infer<typeof DamageFormSchema>;

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

export const saveDamage = async (data: Damage) => {
  const newDamageNo = await generateId("adj");
  console.log("AdjustNo", newDamageNo);
  try {
    console.log("action", data);
    let {
      id,
      userId,
      damageNo,
      products,
      note,
      warehouseId,
      rcvDamageQty,
      rcvDamageTotal,
      issueDamageQty,
      issueDamageTotal,
      total,
      totalItem,
      grossTotal,
      grossTotalRound,
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
          rcvDamageQty,
          rcvDamageTotal,
          issueDamageQty,
          issueDamageTotal,
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
      const createDamage = await prisma.damage.create({
        data: {
          user: { connect: { id: userId } },
          damageNo: newDamageNo,
          products,
          note,
          warehouse: { connect: { id: warehouseId } },
          rcvDamageQty,
          rcvDamageTotal,
          issueDamageQty,
          issueDamageTotal,
          total,
          totalItem,
          grossTotal,
          grossTotalRound,
        },
      });

      if (createDamage) {
        console.log(`${createDamage.id} Create successful!`);
        revalidatePath("/dashboard/adjust");
        return createDamage;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
