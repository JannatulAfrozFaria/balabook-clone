"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ProductFormSchema } from "./create/ProductFormSchema";
// import { ProductFormSchema } from "./create/productFormSchema";

export type Product = z.infer<typeof ProductFormSchema>;

export const handleDelete = async (id: string) => {
  "Tigger Action", id;
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    //  (deleteOffer);
    if (deleteProduct) {
      `${deleteProduct.name} deleted successful!`;
      revalidatePath("/dashboard/offers");
      return deleteProduct;
    }
  } catch (err) {
    err;
    return false;
  }
};

export const saveProduct = async (id: string, data: Product) => {
  try {
    "action", data;
    let {
      name,
      salesType,
      articleCode,
      ean,
      masterCategoryId,
      categoryId,
      unitId,
      brandId,
      vat,
      vatMethod,
      hsCode,
      type,
      shipping,
      featured,
      website,
      slug,
      description,
      specification,
      price,
      promoPrice,
      promoStart,
      promoEnd,
      photo,
      gallery,
      supplierId,
      mrp,
      tp,
      pisInPackege,
      status,
    } = data;

    if (!name || !articleCode) return false;

    if (id !== "") {
      const updateUnit = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          //@ts-ignore
          name,
          salesType,
          articleCode,
          ean,
          masterCategoryId,
          categoryId,
          unitId,
          brandId,
          vat,
          vatMethod,
          hsCode,
          type,
          shipping,
          featured,
          website,
          slug,
          description,
          specification,
          price,
          promoPrice,
          promoStart,
          promoEnd,
          photo,
          supplierId,
          mrp,
          tp,
          pisInPackege,
          status,
        },
      });

      if (updateUnit) {
        `${updateUnit.name} Update successful!`;

        revalidatePath("/dashboard/unit");
        return updateUnit;
      }
    } else {
      const createProduct = await prisma.product.create({
        data: {
          name,
          //@ts-ignore
          salesType,
          articleCode,
          ean,
          masterCategoryId,
          categoryId,
          unitId,
          brandId,
          vat,
          vatMethod,
          hsCode,
          type,
          shipping,
          featured,
          website,
          slug,
          description,
          specification,
          price,
          promoPrice,
          promoStart,
          promoEnd,
          photo,
          supplierId,
          mrp,
          tp,
          pisInPackege,
          status,
        },
      });

      if (createProduct) {
        `${createProduct.name} Create successful!`;

        revalidatePath("/dashboard/unit");
        return createProduct;
      }
    }
  } catch (err) {
    err;
    return false;
  }
};

//import product from csv function
export const importProduct = async (data: any) => {
  "productData", data;

  try {
    const promises = data.map(
      async ({
        name,
        salesType,
        articleCode,
        categoryId,
        brandId,
        supplierId,
        price,
        ean,
        vat,
        vatMethod,
        hsCode,
        shipping,
        featured,
        website,
        slug,
        description,
        specification,
        promoPrice,
        promoStart,
        promoEnd,
        photo,
        mrp,
        tp,
        pisInPackege,
        masterCategoryId,
        status,
        type,
        unitId,
      }) => {
        await prisma.product.create({
          data: {
            name,
            salesType,
            articleCode,
            categoryId,
            brandId,
            supplierId,
            price: price ? parseFloat(price) : null, // Convert price to number
            ean,
            vat,
            vatMethod: vatMethod === "true",
            hsCode,
            shipping,
            featured,
            website,
            slug,
            description,
            specification,
            promoPrice: promoPrice ? parseFloat(promoPrice) : null, // Convert promoPrice to number if needed
            promoStart,
            promoEnd,
            photo,
            mrp,
            tp,
            pisInPackege,
            masterCategoryId,
            status,
            type,
            unitId,
          },
        });
      }
    );

    await Promise.all(promises);
    revalidatePath("/dashboard/product");
  } catch (err) {
    err;
    return false;
  }
};

// PRODUCT SEARCH CUSTOME SELECT
export const searchProductDw = async (queryString: string) => {
  // Check if the queryString contains only numbers
  const isNumericQuery = /^\d+$/.test(queryString);

  isNumericQuery, queryString;

  let productList = [];
  if (isNumericQuery) {
    //  ("check number");
    // If the query is a number, search for matches in the EAN code or article code
    productList = await prisma.product.findMany({
      where: {
        OR: [
          { ean: { equals: queryString } },
          { articleCode: { equals: queryString } },
        ],
      },
      select: {
        id: true,
        name: true,
        articleCode: true,
      },
      take: 10,
    });
  } else {
    const firstWord = queryString.split(" ")[0];
    // If the query is a string, search for matches in the product name
    productList = await prisma.product.findMany({
      where: {
        name: {
          contains: queryString,
          // startsWith: firstWord,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        articleCode: true,
      },
      take: 10,
    });
  }

  return productList.map((product) => ({
    value: product.id,
    label: `${product.name} [${product.articleCode}]`,
  }));
};

export const searchProductById = async (id: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        articleCode: true,
        mrp: true,
        tp: true,
        hsCode: true,
        openingQty: true,
        cogs: true,
        closingQty: true,
        vat: true,

        // Add all other fields you want to fetch here
      },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return product;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
};

export const UpdateProductStatus = async (id: string, status: string) => {
  // console.log("Triggered update", id, status);
  try {
    const update = await prisma.product.update({
      where: {
        id: id,
      },
      //@ts-ignore
      data: { status: status },
    });

    if (update) {
      console.log("update successful");
      revalidatePath("/dashboard/products");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("sales update error", error);
    return false;
  }
};
