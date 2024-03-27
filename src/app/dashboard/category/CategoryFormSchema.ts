import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  photo: z.string().optional(),
  description: z.string().optional(),
  code: z.string().min(1, "Code Required"),
  parent: z.string(),
  status: z.string(),
});
