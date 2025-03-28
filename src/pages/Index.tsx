import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HouseForm from '@/components/HouseForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  HomeIcon, 
  TrendingUp, 
  Award, 
  Building, 
  DollarSign,
  BadgeCheck,
  MapPin,
  BarChart3,
  Home,
  ChevronDown,
  X
} from 'lucide-react';

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSamplePredictions, setShowSamplePredictions] = useState(false);

  const scrollToSamples = () => {
    setShowSamplePredictions(true);
    // Add a small delay to ensure the samples are rendered before scrolling
    setTimeout(() => {
      const samplesSection = document.getElementById('sample-predictions');
      if (samplesSection) {
        samplesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 lg:pt-44 pb-16 md:pb-32 overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/2 to-background -z-10" />
        <div className="absolute inset-0 opacity-30 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4f46e5,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,#0ea5e9,transparent_30%)]" />
        </div>
        
        {/* Geometric Shapes - Removed the circle, kept other shapes */}
        <div className="absolute bottom-20 left-[5%] w-40 h-40 md:w-56 md:h-56 opacity-10 -z-5 animate-pulse-slow" style={{animationDelay: '1s'}}>
          <div className="absolute w-full h-full border-[30px] border-blue-400 transform rotate-12" />
        </div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 opacity-20 -z-5" style={{animationDelay: '1.5s'}}>
          <div className="absolute w-full h-full rounded-full bg-indigo-300 mix-blend-multiply blur-xl transform -translate-y-12" />
        </div>
        
        <div className="container-tight relative z-10">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-sm">
              Smart Property Valuation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8">
              Know Your Home's <span className="text-primary relative">
                True Value
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary opacity-30"></span>
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg md:text-xl mb-10">
              Our AI-powered technology delivers accurate property valuations in seconds,
              no complicated forms or waiting periods.
            </p>

            {/* Primary CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button 
                onClick={() => setShowForm(!showForm)} 
                size="lg" 
                className="relative group overflow-hidden text-lg px-8 py-6 h-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {showForm ? "Hide Form" : "Predict My House Price"}
                  {showForm ? <X size={20} /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-auto py-6 border-2"
                onClick={scrollToSamples}
              >
                <span className="flex items-center gap-2">
                  View Sample Predictions
                  <ChevronDown size={18} />
                </span>
              </Button>
            </div>
          </div>
          
          {/* Form */}
          {showForm && (
            <div className="max-w-3xl mx-auto mb-16 md:mb-24 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <HouseForm />
            </div>
          )}
          
          {/* Sample Predictions */}
          <div 
            id="sample-predictions" 
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-16 animate-fade-in ${!showSamplePredictions && 'hidden'}`} 
            style={{ animationDelay: '200ms' }}
          >
            <h2 className="text-2xl font-bold mb-6 col-span-1 md:col-span-3">Sample Property Predictions</h2>
            {samplePredictions.map((sample, index) => (
              <Card key={index} className="overflow-hidden card-glass border-primary/10 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-40 bg-gradient-to-r from-primary/5 to-primary/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home size={64} className="text-primary/20" />
                  </div>
                  <div className="absolute top-3 left-3 bg-primary/80 text-white px-3 py-1 rounded-full text-xs">
                    {sample.type}
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">{sample.location}</h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin size={14} className="mr-1" />
                        {sample.area}
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      ${sample.price.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-muted/50 rounded-md">
                      <div className="text-xs text-muted-foreground">Beds</div>
                      <div className="font-medium">{sample.beds}</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded-md">
                      <div className="text-xs text-muted-foreground">Baths</div>
                      <div className="font-medium">{sample.baths}</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded-md">
                      <div className="text-xs text-muted-foreground">Sq.ft</div>
                      <div className="font-medium">{sample.sqft}</div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between group"
                    onClick={() => window.location.href = `/prediction?sampleId=${sample.id}`}
                  >
                    View Details
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container-tight">
          <div className="text-center mb-16 md:mb-20 animate-fade-in">
            <Badge className="mb-4 bg-secondary text-secondary-foreground px-3 py-1 text-sm">
              Key Advantages
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Why Choose Our House Price Predictor?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our advanced technology provides accurate predictions based on comprehensive market analysis and property details.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-elevation-low border border-border/50 hover:shadow-elevation-medium transition-all duration-300 animate-fade-in group hover:border-primary/20"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="bg-primary/10 text-primary p-3 rounded-lg inline-flex mb-4 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 md:py-32">
        <div className="container-tight">
          <div className="text-center mb-16 md:mb-20 animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary px-3 py-1 text-sm">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our process is simple, transparent, and designed to give you the most accurate house price prediction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div 
                key={step.title} 
                className="relative flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mb-6 z-10 shadow-lg">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-border hidden md:block"></div>
                )}
                <h3 className="font-semibold text-xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16">
            <Button
              onClick={() => {
                setShowForm(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group"
              size="lg"
            >
              Try it now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container-tight">
          <div className="text-center mb-16 md:mb-20 animate-fade-in">
            <Badge className="mb-4 bg-secondary text-secondary-foreground px-3 py-1 text-sm">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Trusted by homeowners, buyers, and real estate professionals across the country.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name} 
                className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-elevation-low border border-border/50 hover:border-primary/20 animate-fade-in hover:shadow-elevation-medium transition-all duration-300"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="italic text-muted-foreground mb-4">"{testimonial.text}"</p>
                  </div>
                  <div className="mt-auto flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 mr-3 flex items-center justify-center text-primary font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container-slim">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm rounded-2xl p-10 md:p-16 border border-primary/10 text-center animate-fade-in shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.15),transparent_70%)]"></div>
            
            <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1 text-sm">
              Get Started
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Predict Your Home's Value?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
              Get an accurate estimate of your property's value in less than a minute. No commitment, just valuable insights.
            </p>
            <Button 
              onClick={() => {
                setShowForm(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              size="lg"
              className="relative group overflow-hidden text-lg px-8 py-6 h-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                Predict My House Price Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Sample Predictions data
const samplePredictions = [
  {
    id: 1,
    type: 'House',
    location: 'Lakefront Modern Home',
    area: 'Riverdale, NY',
    price: 1250000,
    beds: 4,
    baths: 3,
    sqft: 2800
  },
  {
    id: 2,
    type: 'Condo',
    location: 'Downtown Luxury Condo',
    area: 'Midtown, Atlanta',
    price: 850000,
    beds: 2,
    baths: 2.5,
    sqft: 1550
  },
  {
    id: 3,
    type: 'Townhouse',
    location: 'Victorian Townhouse',
    area: 'Georgetown, DC',
    price: 1125000,
    beds: 3,
    baths: 2.5,
    sqft: 2200
  }
];

// Features data
const features = [
  {
    icon: <BarChart3 size={24} />,
    title: 'Accurate Predictions',
    description: 'Our advanced algorithm analyzes thousands of data points to deliver precise property valuations.',
  },
  {
    icon: <Award size={24} />,
    title: 'Trusted by Experts',
    description: 'Real estate professionals rely on our platform for precise valuations and market insights.',
  },
  {
    icon: <Building size={24} />,
    title: 'Comprehensive Analysis',
    description: 'We consider location, property features, market trends, and economic factors in our predictions.',
  },
  {
    icon: <BadgeCheck size={24} />,
    title: 'Property Insights',
    description: 'Receive detailed information about how different factors impact your property\'s value.',
  },
  {
    icon: <DollarSign size={24} />,
    title: 'Investment Guidance',
    description: 'Make informed decisions about buying, selling, or renovating with our market analysis.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Instant Results',
    description: 'Get your property valuation in seconds, no waiting or complicated processes involved.',
  },
];

// How It Works steps
const steps = [
  {
    title: 'Enter Property Details',
    description: 'Provide information about your property including location, size, features, and condition.',
  },
  {
    title: 'AI Analysis',
    description: 'Our machine learning algorithm analyzes your property against current market data and trends.',
  },
  {
    title: 'Get Your Prediction',
    description: 'Receive an accurate price prediction along with detailed insights and market analysis.',
  },
];

// Testimonials data
const testimonials = [
  {
    text: 'The prediction was within 2% of my home\'s actual selling price. Incredibly accurate and helpful for setting the right asking price.',
    name: 'Sarah Johnson',
    role: 'Home Seller',
  },
  {
    text: 'As a real estate agent, I\'ve found this tool invaluable for providing quick, reliable valuations to my clients.',
    name: 'Michael Chen',
    role: 'Real Estate Agent',
  },
  {
    text: 'The detailed breakdown of factors affecting the home value helped us prioritize our renovation projects for maximum ROI.',
    name: 'Jennifer Lopez',
    role: 'Homeowner',
  },
];

export default Index;
