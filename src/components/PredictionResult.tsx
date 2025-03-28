
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Download, Repeat, Share2, Info, Home, MapPin, BedDouble, Bath, Ruler, Calendar } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PredictionResultProps {
  formData: {
    area: string;
    bedrooms: string;
    bathrooms: string;
    squareFeet: string;
    yearBuilt: string;
    location: string;
    propertyType: string;
  };
  predictedPrice: number;
  confidence: number;
  onTryAgain: () => void;
}

const PredictionResult = ({
  formData,
  predictedPrice,
  confidence,
  onTryAgain,
}: PredictionResultProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (confidence >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  return (
    <Card className="card-glass overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <Badge className={cn('mb-2 px-3 py-1 text-xs font-medium border', getConfidenceColor(confidence))}>
            {confidence}% Confidence
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Estimated Property Value</h2>
          <div className="flex items-center relative">
            <span className="text-4xl md:text-5xl font-bold text-primary animate-fade-in">
              {formatCurrency(predictedPrice)}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Info size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">This estimate is based on recent market data and the property details you provided.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground mt-2 text-sm max-w-md">
            Based on comparable properties and current market conditions in {formData.location}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Property Details Card */}
          <div className="bg-secondary/30 rounded-xl p-5 animate-fade-in">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Home size={18} className="text-primary" />
              Property Details
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <MapPin size={14} />
                  Location
                </span>
                <span className="font-medium">{formData.location}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Home size={14} />
                  Type
                </span>
                <span className="font-medium capitalize">{formData.propertyType}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <BedDouble size={14} />
                  Bedrooms
                </span>
                <span className="font-medium">{formData.bedrooms}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Bath size={14} />
                  Bathrooms
                </span>
                <span className="font-medium">{formData.bathrooms}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Ruler size={14} />
                  Square Feet
                </span>
                <span className="font-medium">{formData.squareFeet}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar size={14} />
                  Year Built
                </span>
                <span className="font-medium">{formData.yearBuilt}</span>
              </li>
            </ul>
          </div>

          {/* Price Insight Card */}
          <div className="bg-primary/5 rounded-xl p-5 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Check size={18} className="text-primary" />
              Price Insights
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per sq.ft</span>
                <span className="font-medium">
                  {formatCurrency(predictedPrice / parseInt(formData.squareFeet))}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground">Neighborhood Average</span>
                <span className="font-medium">
                  {formatCurrency(predictedPrice * 0.98)}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price Range</span>
                <span className="font-medium">
                  {formatCurrency(predictedPrice * 0.93)} - {formatCurrency(predictedPrice * 1.07)}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Monthly Payment</span>
                <span className="font-medium">
                  {formatCurrency((predictedPrice * 0.005))}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Trend</span>
                <span className="font-medium text-green-600">+3.2% Annual Increase</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onTryAgain}
          >
            <Repeat size={16} />
            Try Another Prediction
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 sm:flex-auto flex items-center gap-2">
              <Download size={16} />
              Save Report
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-auto flex items-center gap-2">
              <Share2 size={16} />
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PredictionResult;
