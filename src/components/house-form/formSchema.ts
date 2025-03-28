
import { z } from "zod";

// Form schema
export const formSchema = z.object({
  area: z.string().min(1, "Area is required"),
  bedrooms: z.string().min(1, "Bedrooms are required"),
  bathrooms: z.string().min(1, "Bathrooms are required"),
  squareFeet: z.string().min(1, "Square footage is required"),
  yearBuilt: z.string().min(1, "Year built is required"),
  location: z.string().min(1, "Location is required"),
  propertyType: z.string().min(1, "Property type is required"),
});

export type FormValues = z.infer<typeof formSchema>;
