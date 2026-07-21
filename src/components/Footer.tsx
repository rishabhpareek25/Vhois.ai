import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { COMPANY, SOCIAL_LINKS } from "../data/company";
import AudioWaveformLogo from "./AudioWaveformLogo";

const footerLinks = {
  Product: [
    { name: "Platform", path: "/platform" },
    { name: "Use Cases", path: "/use-cases" },
    { name: "Agent Intelligence", path: "/agent-intelligence" },
    { name: "Pricing", path: "/pricing" },
  ],
  Company: [
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
    { name: "Waitlist", path: "/waitlist" },
  ],
  Resources: [
    { name: "Technology", path: "/technology" },
    { name: "Developers", path: "/developers" },
    { name: "Insights", path: "/blog" },
  ],
  Legal: [
    { name: "Privacy", path: "/privacy" },
    { name: "Terms", path: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-0 border-t border-gray-200 bg-gray-50">
      <div className="page-bleed py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-3">
              <AudioWaveformLogo />
              <div className="flex flex-col leading-none">
                <span className="font-mono font-bold text-base text-gray-900">{COMPANY.name}</span>
                <span className="text-[9px] text-gray-500 font-mono mt-1">{COMPANY.domain}</span>
              </div>
            </Link>
            <p className="text-gray-600 text-xs mb-3 max-w-sm leading-relaxed">
              {COMPANY.description}
            </p>
            <a href={`mailto:${COMPANY.email}`} className="link-email inline-flex items-center gap-2 text-xs">
              <Mail className="w-3.5 h-3.5 text-primary-500 shrink-0" strokeWidth={1.5} />
              {COMPANY.email}
            </a>
            <div className="flex gap-2 mt-4">
              {[
                { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
                { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-colors bg-white shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-mono text-[9px] uppercase tracking-widest mb-2.5 text-gray-500 font-bold">
                  {category}
                </h3>
                <ul className="space-y-1.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-[13px] text-gray-600 hover:text-primary-600 transition-colors font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 pt-4 border-t border-gray-200 text-[10px] text-gray-400 text-center sm:text-left font-medium">
          © {new Date().getFullYear()} {COMPANY.legalName} · {COMPANY.jurisdiction} ·{" "}
          <a href={COMPANY.website} className="hover:text-primary-600 transition-colors font-mono">
            {COMPANY.domain}
          </a>
        </p>
      </div>
    </footer>
  );
}
