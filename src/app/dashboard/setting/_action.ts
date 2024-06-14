"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { SiteSettigSchema } from "./SettingSchema";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

export type SiteSetting = z.infer<typeof SiteSettigSchema>;

export const getSetting = async () => {
  try {
    const siteSetting = await prisma.setting.findMany({});
    //  (siteSetting);
    if (siteSetting) {
      return siteSetting[0];
    }
  } catch (err) {
    err;
    return false;
  }
};

export const saveSiteSetting = async (id: string, data: SiteSetting) => {
  //  ("save");
  try {
    const { site_title, event_title, logo, banner, add1, add2, add3 } = data;

    // Check if required fields are present
    if (!site_title || !event_title) {
      return false;
    }
    let customer;
    if (id !== "") {
      customer = await prisma.setting.update({
        where: {
          id: id,
        },
        //@ts-ignore
        data: { site_title, event_title, logo, banner, add1, add2, add3 },
      });
    } else {
      customer = await prisma.setting.create({
        //@ts-ignore
        data: { site_title, event_title, logo, banner, add1, add2, add3 },
      });
    }
    //ts-ignore
    //  (customer);
    if (customer) {
      `Save successful!`;
      revalidatePath("/dashboard/setting");
      return true;
    }
  } catch (err) {
    err;
    return false;
  }
};
