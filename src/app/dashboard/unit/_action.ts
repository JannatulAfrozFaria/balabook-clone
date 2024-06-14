"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { UnitFormSchema } from "./UnitFormSchema";

export type Unit = z.infer<typeof UnitFormSchema>;

export const handleDelete = async (id: string) => {
  "Tigger Action", id;
  try {
    const unit = await prisma.unit.delete({
      where: {
        id: id,
      },
    });
    if (unit) {
      `Deleted successful!`;
      revalidatePath("/dashboard/unit");
      return true;
    }
  } catch (err) {
    err;
    return false;
  }
};

export const saveUnit = async (id: string, data: Unit) => {
  try {
    //ts-ignore
    "action", data;
    let { name, code, symbol, description, status } = data;

    if (!name || !symbol) return false;

    if (id !== "") {
      const updateUnit = await prisma.unit.update({
        where: {
          id: id,
        },
        data: {
          name,
          code,
          //@ts-ignore
          symbol,
          description,
          status,
        },
      });

      if (updateUnit) {
        `${updateUnit.name} Update successful!`;

        revalidatePath("/dashboard/unit");
        return updateUnit;
      }
    } else {
      const createUnit = await prisma.unit.create({
        data: {
          name,
          code,
          description,
          //@ts-ignore
          symbol,
          status,
        },
      });

      if (createUnit) {
        `${createUnit.name} Create successful!`;

        revalidatePath("/dashboard/unit");
        return createUnit;
      }
    }
  } catch (err) {
    err;
    return false;
  }
};

export const unitDw = async () => {
  try {
    const units = await prisma.unit.findMany({
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

    //  (units);
    units.map(
      (unit) =>
        (dw = [
          ...dw,
          {
            value: unit.id,
            label: unit.name,
          },
        ])
    );
    return dw;
  } catch (error) {
    console.error("Error fetching parent unit:", error);
    throw new Error("Failed to fetch unit");
  }
};
