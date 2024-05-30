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
      country,
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
          country,
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

export const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedTime24 = date.toTimeString().split(" ")[0];
  const formattedTime12 = date.toLocaleTimeString("en-US", { hour12: true });

  return {
    date: formattedDate, // Sun May 26, 2024
    time24: formattedTime24, // 15:04:06
    time12: formattedTime12, // 03:04:06 PM
  };
};

export const poById = async (id: string) => {
  try {
    const purchaseOrder = await prisma.purchaseOrder.findFirst({
      where: {
        id: id,
      },
      include: { supplier: { select: { name: true, phone: true } } },
    });

    return purchaseOrder;
  } catch (error) {
    console.error("Error fetching parent PO:", error);
    throw new Error("Failed to fetch PO");
  }
};

export const poDw = async () => {
  try {
    const purchaseOrder = await prisma.purchaseOrder.findMany({
      where: {
        status: "Pending",
      },
      select: {
        id: true,
        poNo: true,
        grossTotal: true,
      },
    });

    let dw = [
      {
        value: "",
        label: "Select PO",
      },
    ];

    // console.log(po);
    purchaseOrder.map(
      (po) =>
        (dw = [
          ...dw,
          {
            value: po.id,
            label: `${po.poNo} [${po.grossTotal}]`,
          },
        ])
    );
    return dw;
  } catch (error) {
    console.error("Error fetching parent PO:", error);
    throw new Error("Failed to fetch PO");
  }
};
