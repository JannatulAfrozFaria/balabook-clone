"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { CreateOrderSchema } from "./create-order/CreateOrderSchema";
import { generateId } from "@/lib/idGenerator";

export const handleDelete = async (id: string) => {
  try {
    const deleteProduct = await prisma.sales.delete({
      where: {
        id: id,
      },
    });
    //  (deleteOffer);
    if (deleteProduct) {
      //@ts-ignore
      `${deleteProduct?.name} deleted successful!`;
      revalidatePath("/dashboard/offers");
      return deleteProduct;
    }
  } catch (err) {
    return false;
  }
};

export const createOrder = async (data: CreateOrderSchema) => {
  const newInvoiceNo = await generateId("sale");
  const {
    id,
    invoiceId,
    source,
    warehouseId,
    soldProducts,
    soldCalculation,
    userId,
    customerId,
    products,
    orderCalculation,
    returnProducts,
    returnCalculation,
    totalItem,
    returnActive,

    total,
    discount,
    vat,
    grossTotal,
    grossTotalRound,
    totalRecievable,
    totalRecieved,
    changeAmount,
    paidAmount,
    status,
  } = data;

  try {
    if (id === "") {
      const createOrder = await prisma.sales.create({
        data: {
          invoiceId: newInvoiceNo,
          source,
          warehouseId,
          userId,
          customerId,
          products,
          orderCalculation,
          soldProducts,
          soldCalculation,
          returnProducts,
          returnActive,
          returnCalculation,
          totalItem,
          total,
          discount,
          vat,
          grossTotal,
          grossTotalRound,
          totalRecievable,
          totalRecieved,
          changeAmount,
          paidAmount,
          status,
        },
      });
      if (createOrder) {
        `${createOrder.invoiceId} updated successfully!`;
        revalidatePath("/dashboard/sales");
        return createOrder;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const salesById = async (id: string) => {
  try {
    const sales = await prisma.sales.findFirst({
      where: {
        id: id,
      },
      include: {
        customer: {
          select: {
            name: true,
            phone: true,
            address: true,
            email: true,
          },
        },
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
        // warehouse: {
        //   select: {
        //     name: true,
        //     phone: true,
        //     email: true,
        //   },
        // },
      },
    });
    return sales;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateSaleStatus = async (id: string, status: string) => {
  // console.log("Triggered update", id, status);
  try {
    const update = await prisma.sales.update({
      where: {
        id: id,
      },
      //@ts-ignore
      data: { status: status },
    });

    if (update) {
      console.log("update successful");
      revalidatePath("/dashboard/sales");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("sales update error", error);
    return false;
  }
};
