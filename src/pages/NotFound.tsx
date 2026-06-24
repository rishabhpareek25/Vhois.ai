import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import Button from "../components/ui/Button";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY } from "../data/company";

export default function NotFound() {
  usePageMeta("Page not found", `${COMPANY.name} — the page you requested could not be found.`);

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center page-bleed">
      <div className="text-center max-w-lg">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-void-600 mb-4">404</p>
        <h1 className="font-sans font-semibold text-4xl sm:text-5xl text-platinum mb-4 tracking-tight">
          Page not found
        </h1>
        <p className="text-void-600 mb-8 leading-relaxed">
          This route doesn&apos;t exist on {COMPANY.domain}. Explore our product or get in touch.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="md">
              Contact us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
