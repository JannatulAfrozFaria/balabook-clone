import { z } from "zod";

// Define the validation schema for the registration form
export const RegistrationFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  email: z.union([z.string().email(), z.literal("")]),
  address: z.string().optional(),
  district: z.string().min(1, { message: "District is required" }),
  division: z.string().min(1, { message: "Division is required" }),
  company: z.string().optional(),
  designation: z.string().optional(),
  status: z.string().min(1, { message: "Status is required" }),
});
