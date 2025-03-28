
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 dark:bg-gray-900 border-t border-border">
      <div className="container-tight py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
              <span className="bg-primary text-white dark:text-black rounded-lg p-1.5">HP</span>
              <span>HousePredict</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Using advanced machine learning algorithms to predict house prices with precision and accuracy.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-foreground mb-4">Resources</h3>
              <ul className="space-y-3">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <Link 
                      to={resource.href} 
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href} 
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest updates on market trends.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 min-w-0 rounded-l-lg bg-background border-r-0 border-input focus:ring-1 focus:ring-primary focus:border-primary text-sm py-2 px-3 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white rounded-r-lg px-4 text-sm transition-colors"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} HousePredict. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social media links
const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: <Facebook size={18} />,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: <Twitter size={18} />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <Instagram size={18} />,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: <Linkedin size={18} />,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: <Github size={18} />,
  },
];

// Resource links
const resources = [
  { name: 'Documentation', href: '#' },
  { name: 'API', href: '#' },
  { name: 'Guides', href: '#' },
  { name: 'Help Center', href: '#' },
];

// Company links
const company = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Careers', href: '#' },
  { name: 'Blog', href: '#' },
];

// Legal links
const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Cookie Policy', href: '#' },
];

export default Footer;
