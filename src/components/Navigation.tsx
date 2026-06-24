import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AudioWaveformLogo from "./AudioWaveformLogo";
import { COMPANY } from "../data/company";

const navItems = [
  { name: "Platform", path: "/platform" },
  { name: "Use Cases", path: "/use-cases" },
  { name: "About", path: "/about" },
  { name: "Team", path: "/team" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="page-bleed py-2.5">
          <div className="flex items-center justify-between gap-4 min-h-[3.25rem] sm:min-h-14">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <AudioWaveformLogo />
              <div className="flex flex-col leading-none">
                <span className="font-mono font-bold text-base sm:text-lg text-platinum tracking-wide">
                  {COMPANY.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-void-600 font-mono mt-0.5 hidden xs:block">
                  {COMPANY.domain}
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 min-w-0 flex-1 justify-center">
              <Link
                to="/"
                className={`text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                  location.pathname === "/" ? "text-platinum" : "text-void-600 hover:text-platinum"
                }`}
              >
                Home
              </Link>
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="shrink-0">
                  <span
                    className={`relative text-sm font-medium whitespace-nowrap transition-colors ${
                      location.pathname === item.path
                        ? "text-platinum"
                        : "text-void-600 hover:text-platinum"
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-platinum"
                      />
                    )}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link to="/waitlist">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-4 py-1.5 bg-platinum text-void text-sm font-semibold rounded-md border border-platinum cursor-pointer"
                >
                  Join Waitlist
                </motion.span>
              </Link>
            </div>

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
            <div className="relative h-full flex flex-col items-center justify-center gap-6 px-6">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-2xl font-mono font-bold ${
                  location.pathname === "/" ? "text-platinum" : "text-void-600"
                }`}
              >
                Home
              </Link>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-mono font-bold ${
                      location.pathname === item.path ? "text-platinum" : "text-void-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <Link to="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                <span className="inline-block px-8 py-3 bg-platinum text-void font-semibold rounded-lg text-lg mt-4">
                  Join Waitlist
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
