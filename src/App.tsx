import { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import PageRouter from "./router/PageRouter";
import { usePathname } from "./hooks/usePathname";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-4 bg-white text-gray-900 rounded-full shadow-soft-lg hover:shadow-glow-primary transition-shadow border border-gray-100"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const IMMERSIVE_ROUTES = new Set([
  "/call-center-qa",
  "/agent-intelligence",
  "/waitlist",
  "/the-forbidden-archive",
]);

function AppContent() {
  const location = useLocation();
  const pathname = usePathname();
  const immersive = IMMERSIVE_ROUTES.has(pathname);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, location.pathname, location.hash]);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <>
      {!immersive && <Navigation />}
      <main key={pathname}>
        <PageRouter />
      </main>
      {!immersive && <Footer />}
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-white text-gray-900 overflow-x-hidden">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <AppContent />
        </div>
      </div>
    </BrowserRouter>
  );
}
