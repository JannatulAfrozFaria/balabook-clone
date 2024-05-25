"use server";
import prisma from "@/index";
import { generateId } from "@/lib/idGenerator";
import { revalidatePath } from "next/cache";
import { z } from "zod";
// import { POFormSchema } from "./create/PoFormSchema";

// export type Product = z.infer<typeof POFormSchema>;

export const handleDelete = async (id: string) => {
  try {
    const deleteProduct = await prisma.purchaseOrder.delete({
      where: {
        id: id,
      },
    });
    // console.log(deleteOffer);
    if (deleteProduct) {
      console.log(`${deleteProduct.poNo} deleted successful!`);
      revalidatePath("/dashboard/offers");
      return deleteProduct;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const savePo = async (id: string, data: any) => {
  try {
    const newPoNo = await generateId("po");
    console.log("newPoNo", newPoNo);
    console.log("", data);

    let {
      poNo,
      qty,
      mrp,
      tp,
      total,
      vat,
      userId,
      piNo,
      products,
      supplierId,
      totalItem,
      note,
      lcNo,
      tax,
      status,
      country,
      discount,
      grosTotal,
      grossTotalRound,
      containerId,
    } = data;

    if (!supplierId || totalItem > 0) return false;

    if (supplierId !== "") {
      const updateUnit = await prisma.purchaseOrder.update({
        where: {
          id: id,
        },
        data: {
          //@ts-ignore
          poNo,
          qty,
          mrp,
          tp,
          total,
          vat,
          userId,
          piNo,
          products,
          supplierId,
          totalItem,
          note,
          lcNo,
          tax,
          status,
          country,
          discount,
          grosTotal,
          grossTotalRound,
          containerId,
        },
      });

      if (updateUnit) {
        console.log(`${updateUnit.poNo} Update successful!`);

        revalidatePath("/dashboard/po");
        return updateUnit;
      }
    } else {
      const createPO = await prisma.purchaseOrder.create({
        data: {
          poNo,
          qty,
          mrp,
          tp,
          total,
          vat,
          userId,
          piNo,
          products,
          supplierId,
          totalItem,
          note,
          lcNo,
          tax,
          status,
          country,
          discount,
          grosTotal,
          grossTotalRound,
          containerId,
        },
      });

      if (createPO) {
        console.log(`${createPO.poNo} Create successful!`);

        revalidatePath("/dashboard/po");
        return createPO;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
