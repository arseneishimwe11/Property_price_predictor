
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

// Form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const Contact = () => {
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // In a real application, you would send the form data to your backend
    console.log(data);
    
    // Show success toast
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    form.reset();
  };

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
                Get In Touch
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Contact Us
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg">
                Have questions about our house price prediction service? We're here to help.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {/* Contact Information */}
              <div className="animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Whether you have a question about our predictions, need help with the tool, or want to explore partnership opportunities, our team is ready to assist you.
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start">
                      <div className="bg-primary/10 text-primary p-2 rounded-md mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{item.label}</h3>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary hover:bg-secondary/70 text-foreground p-2 rounded-full transition-colors"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="card-glass p-6 md:p-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this regarding?" {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can we help you?"
                              rows={5}
                              {...field}
                              className="bg-background/50 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full group relative overflow-hidden rounded-xl"
                      disabled={form.formState.isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                        <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-slim">
            <div className="text-center mb-12 md:mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find quick answers to common questions about our house price prediction service.
              </p>
            </div>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-elevation-low border border-border/50"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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

// Contact information
const contactInfo = [
  {
    icon: <MapPin size={20} />,
    label: "Address",
    value: "123 Market Street, Suite 456, San Francisco, CA 94105",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "info@housepredict.com",
  },
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
  {
    icon: <Clock size={20} />,
    label: "Business Hours",
    value: "Monday - Friday: 9:00 AM - 5:00 PM PST",
  },
];

// Social media links
import { Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: <Facebook size={20} />,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: <Twitter size={20} />,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: <Linkedin size={20} />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <Instagram size={20} />,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: <Github size={20} />,
  },
];

// FAQs
const faqs = [
  {
    question: "How accurate are the house price predictions?",
    answer: "Our predictions are typically within 5-10% of actual selling prices. We use advanced machine learning algorithms trained on millions of property transactions, combined with local market data for maximum accuracy."
  },
  {
    question: "What factors are considered in the prediction?",
    answer: "Our model considers over 50 factors including location, property size, number of bedrooms and bathrooms, property age, recent comparable sales, neighborhood trends, school districts, and economic indicators."
  },
  {
    question: "Is my data secure when I use your service?",
    answer: "Absolutely. We take data privacy very seriously. The information you provide is encrypted and used solely for generating your property valuation. We never sell your personal data to third parties."
  },
  {
    question: "Can I use this prediction for mortgage applications?",
    answer: "While our predictions provide valuable insights, mortgage lenders typically require official appraisals. However, our estimates can help you gauge if an appraiser's valuation is reasonable."
  },
  {
    question: "How often is your prediction model updated?",
    answer: "We update our algorithms monthly with the latest market data and property transactions to ensure our predictions reflect current market conditions accurately."
  }
];

export default Contact;
