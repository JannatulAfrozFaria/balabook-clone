"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { OfferFormSchema } from "./offerFormSchema";
import { z } from "zod";

export type Offer = z.infer<typeof OfferFormSchema>;

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const deleteOffer = await prisma.offer.delete({
      where: {
        id: id,
      },
    });
    // console.log(deleteOffer);
    if (deleteOffer) {
      console.log(`${deleteOffer.name} deleted successful!`);
      revalidatePath("/dashboard/offers");
      return deleteOffer;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createOffer = async (data: Offer) => {
  try {
    //@ts-ignore
    console.log("action", data);
    //@ts-ignore
    const createOffer = await prisma.offer.create({ data });
    console.log(createOffer);
    if (createOffer) {
      console.log(`${createOffer.name} Create successful!`);
      revalidatePath("/dashboard/offers");
      return createOffer;
    }
  } catch (err) {
    console.log(err);
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
    console.log(updateOffer);
    if (updateOffer) {
      console.log(`${updateOffer.name} Update successful!`);
      revalidatePath("/dashboard/offers");
      return updateOffer;
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};
