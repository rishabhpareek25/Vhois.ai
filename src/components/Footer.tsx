import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, Github, Linkedin, Twitter, Send } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", path: "/platform" },
    { name: "Pricing", path: "/pricing" },
    { name: "API Reference", path: "/developers" },
    { name: "Changelog", path: "/blog" },
  ],
  Company: [
    { name: "About Us", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/" },
    { name: "Contact", path: "/contact" },
  ],
  Resources: [
    { name: "Documentation", path: "/developers" },
    { name: "API Status", path: "/" },
    { name: "Support", path: "/contact" },
    { name: "Community", path: "/" },
  ],
  Legal: [
    { name: "Privacy Policy", path: "/" },
    { name: "Terms of Service", path: "/" },
    { name: "Cookie Policy", path: "/" },
    { name: "GDPR", path: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-32 glass-dark overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(100, 100, 100, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(80, 80, 80, 0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative w-10 h-10"
              >
                <div className="absolute inset-0 bg-void-300 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                <Activity className="w-10 h-10 text-platinum relative z-10" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-2xl text-platinum">Vhois.ai</span>
                <span className="text-xs text-void-600">VOICE INTELLIGENCE</span>
              </div>
            </Link>
            <p className="text-void-600 text-sm mb-6 max-w-sm">
              Enterprise-grade AI infrastructure for voice processing. Engineered for the future
              of technology.
            </p>

            {/* Newsletter */}
            <div className="glass p-4 rounded-lg">
              <p className="text-sm font-semibold mb-3 text-platinum">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-void-50 border border-void-300 rounded-lg text-sm focus:outline-none focus:border-void-600 transition-colors text-platinum"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-platinum text-void rounded-lg hover:shadow-glow-white transition-all"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-2 glass rounded-lg text-void-600 hover:text-platinum transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-mono font-bold text-sm mb-4 text-platinum">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-void-600 hover:text-platinum transition-colors relative group"
                    >
                      <span>{link.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-platinum group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-void-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-void-600">
              © {new Date().getFullYear()} Vhois.ai. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-void-600 hover:text-platinum transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-void-600 hover:text-platinum transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-void-600 hover:text-platinum transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
