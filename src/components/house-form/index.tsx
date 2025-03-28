
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { predictPropertyPrice } from "@/services/predictionService";
import { formSchema, FormValues } from "./formSchema";
import { LocationSection } from "./LocationSection";
import { PropertyDetailsSection } from "./PropertyDetailsSection";
import { SubmitButton } from "./SubmitButton";

const HouseForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: "",
      bedrooms: "",
      bathrooms: "",
      squareFeet: "",
      yearBuilt: "",
      location: "",
      propertyType: "house",
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Call the prediction service
      const result = await predictPropertyPrice(data);
      
      // Navigate to prediction page with form data and prediction results
      navigate("/prediction", { 
        state: { 
          formData: data,
          predictionResult: result 
        } 
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Prediction Error",
        description: "There was an error getting your property prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="card-glass overflow-hidden">
      <div className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocationSection form={form} />
              <PropertyDetailsSection form={form} />
            </div>

            <div className="pt-2">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default HouseForm;
