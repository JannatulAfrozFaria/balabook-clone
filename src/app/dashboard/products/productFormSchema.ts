import { z } from "zod";

export const OfferFormSchema = z.object({
  name: z.string().min(1, "Name required"),
  code: z.string().min(1, "Code required"),
  articleCode: z.string().min(1, "Article Code required"),
  masterCategory: z.string(),
  category: z.string(),
  unitId: z.string().optional(),
  brandId: z.string().optional(),
  vat: z.number().optional(),
  hsCode: z.string().optional(),
  type: z.string().optional(),
  shipping: z.number().optional(),
  featured: z.string().optional(),
  website: z.string().optional(),
  slug: z.string().optional(),
  price: z.number().optional(),
  promoPrice: z.number().optional(),
  promoStart: z.string().optional(),
  promoEnd: z.string().optional(),
  photo: z.string().optional(),
  gallery: z.string().optional(),
  supplier: z.string().optional(),
  pisInPackege: z.string().optional(),
  status: z.string(),
});
