"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { OfferFormSchema } from "./offerFormSchema";
import { z } from "zod";

export type Offer = z.infer<typeof OfferFormSchema>;

export const handleDelete = async (id: string) => {
  "Tigger Action", id;
  try {
    const deleteOffer = await prisma.offer.delete({
      where: {
        id: id,
      },
    });
    //  (deleteOffer);
    if (deleteOffer) {
      `${deleteOffer.name} deleted successful!`;
      revalidatePath("/dashboard/offers");
      return deleteOffer;
    }
  } catch (err) {
    err;
    return false;
  }
};

export const createOffer = async (data: Offer) => {
  try {
    //@ts-ignore
    "action", data;
    //@ts-ignore
    const createOffer = await prisma.offer.create({ data });
    createOffer;
    if (createOffer) {
      `${createOffer.name} Create successful!`;
      revalidatePath("/dashboard/offers");
      return createOffer;
    }
  } catch (err) {
    err;
    return false;
  }
};

export const updateOffer = async (id: string, data: Offer) => {
  try {
    //ts-ignore
    // const { id, ...data } = data;
    const updateOffer = await prisma.offer.update({
      where: {
        id: id,
      },
      //@ts-ignore
      data: data,
    });
    updateOffer;
    if (updateOffer) {
      `${updateOffer.name} Update successful!`;
      revalidatePath("/dashboard/offers");
      return updateOffer;
    }
  } catch (err) {
    "err", err;
    return err;
  }
};
