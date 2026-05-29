import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AudioWaveformLogo from "./AudioWaveformLogo";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Platform", path: "/platform" },
  { name: "Use Cases", path: "/use-cases" },
  { name: "Technology", path: "/technology" },
  { name: "Pricing", path: "/pricing" },
  { name: "Developers", path: "/developers" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change so overlay never blocks navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-0 py-0">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <AudioWaveformLogo />
              <div className="flex flex-col leading-none">
                <span className="font-mono font-bold text-lg sm:text-xl text-platinum tracking-wider">
                  Vhois.ai
                </span>
                <span className="text-[9px] sm:text-[10px] text-void-600 font-mono mt-0.5">VOICE INTELLIGENCE</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-platinum"
                        : "text-void-600 hover:text-ash-light"
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-platinum"
                        style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/waitlist">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-4 py-1.5 bg-platinum text-void text-sm font-semibold rounded-md hover:shadow-glow-white-lg transition-all border border-platinum cursor-pointer"
                >
                  Join Waitlist
                </motion.span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-1.5 text-platinum glass rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-void/95 backdrop-blur-xl" />
            <div className="relative h-full flex flex-col items-center justify-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-3xl font-mono font-bold ${
                      location.pathname === item.path ? "text-platinum" : "text-void-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <Link to="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="inline-block px-8 py-4 bg-platinum text-void font-semibold rounded-lg text-xl shadow-glow-white mt-8"
                >
                  Join Waitlist
                </motion.span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
