import { z } from "zod";

export const DamageFormSchema = z.object({
  name: z.string().min(1, "Name is Required"), //done
  articleCode: z.string().min(1, "Article Code is Required"), //done
  qty: z.number().optional(), //done
  mrp: z.number().optional(), //done
  tp: z.number().optional(), //done
  total: z.number().optional(), //done
  supplierId: z.string().optional(),
  vat: z.number().optional(), //done
  stock: z.number().optional(), //done
  hsCode: z.string().optional(), //done
  supplier: z.string().optional(), //done
  tax: z.number().optional(), //done
  country: z.string().optional(),
  discount: z.number().optional(),
  grosTotal: z.number().optional(),
  grossTotalRound: z.number().optional(), //done
  note: z.string(), //done
  containerId: z.string(), //done
});
