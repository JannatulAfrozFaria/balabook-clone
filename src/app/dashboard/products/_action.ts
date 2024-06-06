"use server";
import prisma from "@/index";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ProductFormSchema } from "./create/ProductFormSchema";
// import { ProductFormSchema } from "./create/productFormSchema";

export type Product = z.infer<typeof ProductFormSchema>;

export const handleDelete = async (id: string) => {
  console.log("Tigger Action", id);
  try {
    const deleteProduct = await prisma.product.delete({
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

export const saveProduct = async (id: string, data: Product) => {
  try {
    console.log("action", data);
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
        console.log(`${updateUnit.name} Update successful!`);

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
        console.log(`${createProduct.name} Create successful!`);

        revalidatePath("/dashboard/unit");
        return createProduct;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

//import product from csv function
export const importProduct = async (data: any) => {
  try {
    await Promise.all(
      data.map(async (productData: Product) => {
        const {
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
          status,
          type,
        } = productData;

        // Check if required fields are present
        if (!name || !articleCode) {
          return false;
        }

        // Create the product
        const product = await prisma.product.create({
          data: {
            name,
            categoryId,
            brandId,
            supplierId,
            price,
            salesType: salesType || "", // Default value or check for undefined
            articleCode,
            ean: ean || "", // Default value or check for undefined
            vat: vat || 0, // Default value or check for undefined
            vatMethod: vatMethod || "", // Default value or check for undefined
            hsCode: hsCode || "", // Default value or check for undefined
            shipping: shipping || "", // Default value or check for undefined
            featured,
            website,
            slug: slug || "", // Default value or check for undefined
            description,
            specification,
            promoPrice,
            promoStart,
            promoEnd,
            photo,
            mrp,
            tp,
            pisInPackege,
            status,
            type,
          },
        });

        console.log(product);
      })
    );

    // if (products?.length > 0) {
    //   console.log(products);
    //   return "Product Import Successful!";
    // }
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    revalidatePath("/dashboard/products");
    return true;
  }
};

// PRODUCT SEARCH CUSTOME SELECT
export const searchProductDw = async (queryString: string) => {
  // Check if the queryString contains only numbers
  const isNumericQuery = /^\d+$/.test(queryString);

  console.log(isNumericQuery, queryString);

  let productList = [];
  if (isNumericQuery) {
    // console.log("check number");
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
