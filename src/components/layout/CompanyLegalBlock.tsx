import { Link } from "react-router-dom";
import { Mail, Globe, MapPin } from "lucide-react";
import { COMPANY } from "../../data/company";

type CompanyLegalBlockProps = {
  className?: string;
  compact?: boolean;
};

export default function CompanyLegalBlock({ className = "", compact = false }: CompanyLegalBlockProps) {
  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 ${className}`}
    >
      <p className="text-[10px] font-mono uppercase tracking-widest text-void-600 mb-3">
        Company information
      </p>
      <div className={`space-y-2.5 ${compact ? "text-sm" : "text-sm sm:text-base"}`}>
        <p className="text-platinum font-semibold">{COMPANY.legalName}</p>
        <div className="flex items-start gap-2 text-void-600">
          <Globe className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.5} />
          <a
            href={COMPANY.website}
            className="hover:text-platinum transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {COMPANY.domain}
          </a>
        </div>
        <div className="flex items-start gap-2 text-void-600">
          <Mail className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.5} />
          <a href={`mailto:${COMPANY.email}`} className="hover:text-platinum transition-colors font-mono text-sm">
            {COMPANY.email}
          </a>
        </div>
        <div className="flex items-start gap-2 text-void-600">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.5} />
          <span>{COMPANY.jurisdiction}</span>
        </div>
      </div>
      {!compact && (
        <p className="text-xs text-void-700 mt-4 leading-relaxed">
          Questions about data or terms?{" "}
          <Link to="/contact" className="text-platinum hover:underline">
            Contact us
          </Link>
          .
        </p>
      )}
    </div>
  );
}
