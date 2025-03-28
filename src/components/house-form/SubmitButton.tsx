
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <Button 
      type="submit" 
      className={cn(
        "w-full relative group overflow-hidden rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300",
        isSubmitting && "opacity-90 pointer-events-none"
      )}
      disabled={isSubmitting}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
        {isSubmitting ? "Processing..." : "Predict Price"}
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
      </span>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </Button>
  );
};
