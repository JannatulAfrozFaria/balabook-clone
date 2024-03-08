import { z } from "zod";

// Define the validation schema for the registration form
export const SiteSettigSchema = z.object({
  site_title: z.string().min(1, { message: "Site Title Required" }),
  event_title: z.string().min(1, { message: "Event Title Required" }),
  logo: z.string().optional(),
  banner: z.string().optional(),
  add1: z.string().optional(),
  add2: z.string().optional(),
  add3: z.string().optional(),
});
