"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { WireHouseFormSchema } from "./WireHouseFormSchema";

export type Unit = z.infer<typeof WireHouseFormSchema>;

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const unit = await prisma.wareHouse.delete({
      where: {
        id: id,
      },
    });
    if (unit) {
      console.log(`Deleted successful!`);
      revalidatePath("/dashboard/warehouse");
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const saveUnit = async (id: string, data: Unit) => {
  try {
    //ts-ignore
    console.log("action", data);
    let { name, company, code, address, type, email, phone, status } = data;

    if (!name ) return false;

    if (id !== "") {
      const updateUnit = await prisma.wareHouse.update({
        where: {
          id: id,
        },
        data: {
          name,
          company,
          code,
          address,
          type,
          email,
          phone,
          status,
        },
      });

      if (updateUnit) {
        console.log(`${updateUnit.name} Update successful!`);

        revalidatePath("/dashboard/unit");
        return updateUnit;
      }
    } else {
      const createUnit = await prisma.wareHouse.create({
        data: {
          name,
          company,
          code,
          address,
          type,
          email,
          phone,
          status,
        },
      });

      if (createUnit) {
        console.log(`${createUnit.name} Create successful!`);

        revalidatePath("/dashboard/warehouse");
        return createUnit;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const unitDw = async () => {
  try {
    const wareHouses = await prisma.wareHouse.findMany({
      where: {
        status: "Active",
      },
      select: {
        id: true,
        name: true,
      },
    });

    let dw = [
      {
        value: "",
        label: "Select Unit",
      },
    ];

    // console.log(units);
    wareHouses.map(
      (wareHouse) =>
        (dw = [
          ...dw,
          {
            value: wareHouse.id,
            label: wareHouse.name,
          },
        ])
    );
    return dw;
  } catch (error) {
    console.error("Error fetching parent unit:", error);
    throw new Error("Failed to fetch unit");
  }
};
