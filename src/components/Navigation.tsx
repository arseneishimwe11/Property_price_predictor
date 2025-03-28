
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Info, Mail, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400 py-3',
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-tight flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary font-bold text-xl transition-opacity hover:opacity-90"
        >
          <span className="bg-primary text-white dark:text-black rounded-lg p-1.5">HP</span>
          <span className={cn(
            "transition-colors duration-400",
            isScrolled ? "text-foreground" : "text-foreground"
          )}>HousePredict</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              label={item.label} 
              icon={item.icon} 
              isScrolled={isScrolled}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4 px-6 md:hidden animate-slide-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 py-2 px-3 rounded-lg transition-colors",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {React.createElement(item.icon, { size: 18 })}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Nav link component for desktop navigation
const NavLink = ({ to, label, icon, isScrolled, isActive }: { 
  to: string; 
  label: string; 
  icon: React.ElementType;
  isScrolled: boolean;
  isActive: boolean;
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative flex items-center space-x-1 py-1 transition-colors",
        isActive 
          ? "text-primary font-medium" 
          : cn(
              "hover:text-primary",
              isScrolled ? "text-foreground" : "text-foreground"
            )
      )}
    >
      {React.createElement(icon, { size: 18, className: "opacity-80" })}
      <span>{label}</span>
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
};

// Navigation items
const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail }
];

export default Navigation;
