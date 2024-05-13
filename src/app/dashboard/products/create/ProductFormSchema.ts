import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z.string().min(1, "Name is Required"), //done
  salesType: z.string().optional(), //done
  articleCode: z.string().min(1, "Article Code is Required"), //done
  ean: z.string().optional(), //done
  masterCategoryId: z.string().optional(), //done
  categoryId: z.string().optional(), //done
  unitId: z.string().optional(), //done
  brandId: z.string().optional(), //done
  vat: z.number().optional(), //done
  vatMethod: z.boolean().default(false).optional(), //done
  hsCode: z.string().optional(), //done
  type: z.string().optional(), //done
  shipping: z.string().optional(),
  featured: z.string().optional(),
  website: z.string().optional(),
  slug: z.string().optional(), //done
  description: z.string(), //done
  specification: z.string(), //done
  // price: z.number().optional(),
  promoPrice: z.number().optional(), //done
  promoStart: z.date().optional(), //done
  promoEnd: z.date().optional(), //done
  photo: z.string().optional(),
  // gallery: z.string().optional(),
  supplierId: z.string().optional(), //done

  openingQty: z.number().optional(),
  soldQty: z.number().optional(),
  returnQty: z.number().optional(),
  damageQty: z.number().optional(),
  closingQty: z.number().optional(),
  cogs: z.number().optional(),
  mrp: z.number().optional(), //done
  tp: z.number().optional(), //done

  pisInPackege: z.number().optional(), //done
  status: z.string(), //done
});
