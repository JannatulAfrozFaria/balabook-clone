"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { TPNFormSchema } from "./create/TPNFormSchema";
import { generateId } from "@/lib/idGenerator";

// export type TPN = z.infer<typeof TPNFormSchema>;

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
export const tpnById = async (id: string) => {
  try {
    const tpnFind = await prisma.tpn.findFirst({
      where: {
        id: id,
      },
      include: {
        whFrom: { select: { name: true, phone: true } },
        whTo: { select: { name: true, phone: true } },
      },
    });

    return tpnFind;
  } catch (error) {
    console.error("Error fetching parent PO:", error);
    throw new Error("Failed to fetch PO");
  }
};

export const saveTpn = async (data: TPNFormSchema) => {
  const newTpnNo = await generateId("tpn");
  "newTpnNo:", newTpnNo;
  try {
    "tpn", data;
    let {
      id,
      tpnNo,
      products,
      totalItem,
      total,
      tax,
      discount,
      grossTotal,
      grossTotalRound,
      whToId,
      whFromId,
      status,
      userId,
    } = data;

    if (id === "") {
      const createProduct = await prisma.tpn.create({
        data: {
          tpnNo: newTpnNo,
          products,
          totalItem,
          total,
          tax,
          discount,
          grossTotal,
          grossTotalRound,
          user: { connect: { id: userId } },
          //@ts-ignore
          whTo: { connect: { id: whToId } },
          //@ts-ignore
          whFrom: { connect: { id: whFromId } },
          //@ts-ignore
          status,
        },
      });

      if (createProduct) {
        `${createProduct.id} Create successful!`;

        revalidatePath("/dashboard/tpn");
        return createProduct;
      }
    } else {
      const updateTpn = await prisma.tpn.update({
        where: {
          id: id,
        },
        data: {
          tpnNo,
          products,
          totalItem,
          total,
          tax,
          discount,
          grossTotal,
          grossTotalRound,

          //@ts-ignore
          status,
        },
      });

      if (updateTpn) {
        `${updateTpn.id} Update successful!`;

        revalidatePath("/dashboard/tpn");
        return updateTpn;
      }
    }
  } catch (err) {
    err;
    return false;
  }
};

export const UpdateTPNStatus = async (id: string, status: string) => {
  // console.log("Triggered update", id, status);
  try {
    const update = await prisma.tpn.update({
      where: {
        id: id,
      },
      //@ts-ignore
      data: { status: status },
    });

    if (update) {
      console.log("update successful");
      revalidatePath("/dashboard/tpn");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("tpn update error", error);
    return false;
  }
};
