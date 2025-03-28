
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, BarChart2, Target, Compass, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent -z-10" />
          <div className="container-tight relative z-10">
            <div className="flex flex-col items-center text-center animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-sm">
                Our Story
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                About HousePredict
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg">
                We're on a mission to make property valuation accessible, accurate, and transparent for everyone.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container-slim">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  HousePredict was founded with a simple yet powerful vision: to demystify property valuation and empower individuals with accurate, data-driven insights about their home's worth.
                </p>
                <p className="text-muted-foreground mb-6">
                  In a real estate market often clouded by uncertainty and speculation, we bring clarity through advanced machine learning algorithms and comprehensive market analysis.
                </p>
                <div className="space-y-4">
                  {missionPoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" size={18} />
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-80 md:h-full bg-secondary/50 rounded-2xl overflow-hidden animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Team meeting" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-tight">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do, from building our prediction algorithms to supporting our users.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title} 
                  className="bg-background/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-elevation-low border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our talented team combines expertise in data science, real estate, and technology to deliver the most accurate predictions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div 
                  key={member.name} 
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-secondary">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-semibold text-xl">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Mission points
const missionPoints = [
  "Providing accurate, data-driven property valuations to homeowners, buyers, and sellers",
  "Making real estate market insights accessible to everyone, not just industry professionals",
  "Empowering smarter property investment decisions through transparent analysis",
  "Continuously improving our prediction models with the latest market data"
];

// Core values
const values = [
  {
    icon: <Target size={24} />,
    title: "Accuracy",
    description: "We strive for the most precise predictions possible, continuously refining our algorithms with new data and methodologies."
  },
  {
    icon: <Compass size={24} />,
    title: "Transparency",
    description: "We believe in clear explanations of how we arrive at our valuations, giving you insight into the factors that matter."
  },
  {
    icon: <Users size={24} />,
    title: "Accessibility",
    description: "We're committed to making sophisticated property valuation tools available to everyone, regardless of real estate expertise."
  },
  {
    icon: <Award size={24} />,
    title: "Excellence",
    description: "We pursue excellence in everything we do, from the accuracy of our predictions to the quality of our user experience."
  },
  {
    icon: <BarChart2 size={24} />,
    title: "Innovation",
    description: "We constantly explore new technologies and methodologies to improve our prediction capabilities and user experience."
  },
  {
    icon: <CheckCircle size={24} />,
    title: "Integrity",
    description: "We operate with the highest ethical standards, ensuring your data privacy and providing unbiased valuations."
  }
];

// Team members
const team = [
  {
    name: "David Chen",
    role: "Founder & CEO",
    bio: "Former real estate investor with a passion for making property valuation accessible to everyone.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Sarah Johnson",
    role: "Chief Data Scientist",
    bio: "PhD in Machine Learning with expertise in predictive modeling for real estate markets.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Real Estate",
    bio: "15+ years experience as a realtor and property appraiser across multiple markets.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Emily Zhang",
    role: "UX Director",
    bio: "Passionate about creating intuitive, accessible digital experiences for complex data products.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

export default About;
