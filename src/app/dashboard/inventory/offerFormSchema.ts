import { z } from "zod";

export const OfferFormSchema = z.object({
  name: z.string().min(1, "Name required"),
  photo: z.string().optional(),
  description: z.string(),
  price: z.string().min(1, "Price Required"),
  offerId: z.string().min(1, "Offer ID required"),
  status: z.string(),
});
