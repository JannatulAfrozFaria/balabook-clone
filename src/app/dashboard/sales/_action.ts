"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CreateOrderSchema } from "./create-order/CreateOrderSchema";
import { generateId } from "@/lib/idGenerator";

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const deleteProduct = await prisma.sales.delete({
      where: {
        id: id,
      },
    });
    // console.log(deleteOffer);
    if (deleteProduct) {
      console.log(`${deleteProduct.name} deleted successful!`);
      revalidatePath("/dashboard/offers");
      return deleteProduct;
    }
  } catch (err) {
    console.log(err);
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
    userId,
    customerId,
    products,
    returnProducts,
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
  } = data;

  try {
    if (id === "") {
      console.log("create");
      const createOrder = await prisma.sales.create({
        data: {
          invoiceId: newInvoiceNo,
          source,
          warehouseId,
          userId,
          customerId,
          products,
          returnProducts,
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
        console.log(`${createOrder.invoiceId} updated successfully!`);
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
    const sales = await prisma.sales.findUnique({
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
        warehouse: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });
    console.log(sales);
    return sales;
  } catch (error) {
    console.log(error);
  }
};
