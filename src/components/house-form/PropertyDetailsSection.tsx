
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Move, Ruler, BedDouble, Bath, Calendar } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

interface PropertyDetailsSectionProps {
  form: UseFormReturn<FormValues>;
}

export const PropertyDetailsSection: React.FC<PropertyDetailsSectionProps> = ({ form }) => {
  return (
    <>
      {/* Area */}
      <FormField
        control={form.control}
        name="area"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <Move size={16} className="text-muted-foreground" />
              Area/Neighborhood
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Downtown, West Side" 
                {...field} 
                className="bg-background/50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Square Feet */}
      <FormField
        control={form.control}
        name="squareFeet"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <Ruler size={16} className="text-muted-foreground" />
              Square Feet
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="e.g., 1500" 
                {...field} 
                className="bg-background/50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Bedrooms */}
      <FormField
        control={form.control}
        name="bedrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <BedDouble size={16} className="text-muted-foreground" />
              Bedrooms
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select number of bedrooms" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Bedroom" : "Bedrooms"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Bathrooms */}
      <FormField
        control={form.control}
        name="bathrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <Bath size={16} className="text-muted-foreground" />
              Bathrooms
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select number of bathrooms" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {["1", "1.5", "2", "2.5", "3", "3.5", "4"].map((num) => (
                  <SelectItem key={num} value={num}>
                    {num} {num === "1" ? "Bathroom" : "Bathrooms"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Year Built */}
      <FormField
        control={form.control}
        name="yearBuilt"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel className="flex items-center gap-1.5">
              <Calendar size={16} className="text-muted-foreground" />
              Year Built
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="e.g., 2010" 
                {...field} 
                className="bg-background/50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
