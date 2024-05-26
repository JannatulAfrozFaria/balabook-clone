"use server";
import prisma from "@/index";
import { generateId } from "@/lib/idGenerator";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PoSchema } from "./PoSchema";
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

export const savePo = async (data: PoSchema) => {
  try {
    // Validate data if schema is defined
    // const validatedData = POFormSchema.parse(data);

    const newPoNo = await generateId("po");
    console.log("newPoNo:", newPoNo);
    console.log("data:", data);

    let {
      id,
      poNo,
      total,
      userId,
      piNo,
      products,
      supplierId,
      totalItem,
      note,
      lcNo,
      tax,
      status,
      discount,
      grossTotal,
      grossTotalRound,
      containerId,
    } = data;

    // Validate required fields
    if (totalItem && totalItem < 0) {
      console.error("Supplier ID is missing or total items are zero");
      return false;
    }

    if (id === "") {
      const createPO = await prisma.purchaseOrder.create({
        // where: { id: id },
        data: {
          poNo: newPoNo,
          total,
          user: { connect: { id: userId } },
          piNo,
          products,
          supplier: { connect: { id: supplierId } },
          totalItem,
          note,
          lcNo,
          tax,
          status,
          discount,
          grossTotal,
          grossTotalRound,
          containerId,
        },
      });

      if (createPO) {
        console.log(`${createPO.poNo} updated successfully!`);
        revalidatePath("/dashboard/po");
        return createPO;
      }
    } else {
      const updatePo = await prisma.purchaseOrder.update({
        data: {
          poNo,
          total,
          user: { connect: { id: userId } },
          piNo,
          products,
          supplier: { connect: { id: supplierId } },
          totalItem,
          note,
          lcNo,
          tax,
          status,
          discount,
          grossTotal,
          grossTotalRound,
          containerId,
        },
      });

      if (updatePo) {
        console.log(`${updatePo.poNo} created successfully!`);
        revalidatePath("/dashboard/po");
        return updatePo;
      }
    }
  } catch (err) {
    console.error("Error saving PO:", err);
    return false;
  }
};
