import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PredictionResult from '@/components/PredictionResult';
import PriceChart from '@/components/PriceChart';
import { ArrowLeft } from 'lucide-react';
import { predictPropertyPrice } from '@/services/predictionService';
import { useToast } from '@/components/ui/use-toast';

// Mock data for the chart
const generateChartData = (basePrice: number) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map((month, index) => {
    // Create a slight upward trend with small fluctuations
    const trendFactor = 1 + (index * 0.01);
    const randomFactor = 0.95 + (Math.random() * 0.1);
    
    return {
      name: month,
      predictedPrice: Math.round(basePrice * trendFactor * randomFactor),
      averagePrice: Math.round(basePrice * 0.95 * trendFactor * randomFactor),
    };
  });
};

// Mock additional property recommendations
const propertyRecommendations = [
  {
    id: 1,
    address: '123 Maple Street',
    price: 425000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 2,
    address: '456 Oak Avenue',
    price: 389000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1650,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 3,
    address: '789 Pine Lane',
    price: 475000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

// Sample property data
const sampleProperties = [
  {
    id: 1,
    address: 'Lakefront Modern Home, Riverdale, NY',
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    yearBuilt: 2015,
    lotSize: 0.25,
    propertyType: 'House',
    neighborhood: 'Riverdale',
    city: 'New York',
    state: 'NY',
    zipCode: '10471'
  },
  {
    id: 2,
    address: 'Downtown Luxury Condo, Midtown, Atlanta',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2.5,
    squareFeet: 1550,
    yearBuilt: 2018,
    lotSize: 0,
    propertyType: 'Condo',
    neighborhood: 'Midtown',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '30308'
  },
  {
    id: 3,
    address: 'Victorian Townhouse, Georgetown, DC',
    price: 1125000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2200,
    yearBuilt: 1905,
    lotSize: 0.1,
    propertyType: 'Townhouse',
    neighborhood: 'Georgetown',
    city: 'Washington',
    state: 'DC',
    zipCode: '20007'
  }
];

const Prediction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const sampleIdParam = searchParams.get('sampleId');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<any>(null);
  const [predictedPrice, setPredictedPrice] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Check if we have a sample ID from the URL
    if (sampleIdParam) {
      const sampleId = parseInt(sampleIdParam);
      const sampleProperty = sampleProperties.find(p => p.id === sampleId);
      
      if (sampleProperty) {
        setFormData(sampleProperty);
        
        // Use the prediction service for sample properties too
        setIsLoading(true);
        predictPropertyPrice({
          bedrooms: sampleProperty.bedrooms.toString(),
          bathrooms: sampleProperty.bathrooms.toString(),
          squareFeet: sampleProperty.squareFeet.toString(),
          yearBuilt: sampleProperty.yearBuilt.toString(),
          location: sampleProperty.city,
          propertyType: sampleProperty.propertyType,
          area: sampleProperty.neighborhood
        })
        .then(result => {
          setPredictedPrice(result.predictedPrice);
          setConfidence(result.confidence);
          setChartData(generateChartData(result.predictedPrice));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error getting prediction for sample:', error);
          toast({
            title: "Prediction Error",
            description: "There was an error getting the property prediction. Using estimated values instead.",
            variant: "destructive",
          });
          // Fallback to sample price
          setPredictedPrice(sampleProperty.price);
          setConfidence(95); // High confidence for sample properties
          setChartData(generateChartData(sampleProperty.price));
          setIsLoading(false);
        });
      } else {
        // If sample not found, redirect to home
        navigate('/');
      }
    }
    // Check if form data and prediction results exist in location state
    else if (location.state?.formData) {
      setFormData(location.state.formData);
      
      // If we already have prediction results from the form submission
      if (location.state.predictionResult) {
        const result = location.state.predictionResult;
        setPredictedPrice(result.predictedPrice);
        setConfidence(result.confidence);
        setChartData(generateChartData(result.predictedPrice));
        setIsLoading(false);
      } 
      // Otherwise, call the prediction service
      else {
        predictPropertyPrice(location.state.formData)
          .then(result => {
            setPredictedPrice(result.predictedPrice);
            setConfidence(result.confidence);
            setChartData(generateChartData(result.predictedPrice));
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error getting prediction:', error);
            toast({
              title: "Prediction Error",
              description: "There was an error getting your property prediction. Using estimated values instead.",
              variant: "destructive",
            });
            // Generate a fallback prediction
            const basePrice = 300000;
            const bedroomFactor = parseInt(location.state.formData.bedrooms) * 25000;
            const bathroomFactor = parseFloat(location.state.formData.bathrooms) * 15000;
            const sqftFactor = parseInt(location.state.formData.squareFeet) * 150;
            
            const calculatedPrice = basePrice + bedroomFactor + bathroomFactor + sqftFactor;
            setPredictedPrice(calculatedPrice);
            setConfidence(Math.floor(85 + Math.random() * 10));
            
            // Generate chart data based on the predicted price
            setChartData(generateChartData(calculatedPrice));
            setIsLoading(false);
          });
      }
    } else {
      // If no form data or sample ID, redirect to home page
      navigate('/');
    }
  }, [location.state, navigate, sampleIdParam, toast]);

  const handleTryAgain = () => {
    navigate('/');
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container-tight">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground hover:text-foreground mb-6 group transition-colors"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </button>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Analyzing property data...</p>
            </div>
          ) : (
            <>
              {/* Prediction Results */}
              <div className="mb-10">
                <PredictionResult
                  formData={formData}
                  predictedPrice={predictedPrice}
                  confidence={confidence}
                  onTryAgain={handleTryAgain}
                />
              </div>
              
              {/* Price Chart */}
              <div className="mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <PriceChart data={chartData} />
              </div>
              
              {/* Similar Properties */}
              <div className="mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <h2 className="text-2xl font-bold mb-6">Similar Properties in the Area</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {propertyRecommendations.map((property) => (
                    <div
                      key={property.id}
                      className="card-glass overflow-hidden hover:translate-y-[-4px] transition-all duration-300"
                    >
                      <div 
                        className="h-44 bg-cover bg-center"
                        style={{ backgroundImage: `url(${property.imageUrl})` }}
                      />
                      <div className="p-5">
                        <h3 className="font-medium mb-2">{property.address}</h3>
                        <p className="text-primary font-bold mb-2">{formatCurrency(property.price)}</p>
                        <div className="flex text-sm text-muted-foreground">
                          <span className="mr-3">{property.bedrooms} bd</span>
                          <span className="mr-3">{property.bathrooms} ba</span>
                          <span>{property.sqft} sqft</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Prediction;
