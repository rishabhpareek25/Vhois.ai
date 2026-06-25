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
    <footer className="relative mt-8 sm:mt-10 border-t border-white/[0.06]">
      <div className="page-bleed py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <AudioWaveformLogo />
              <div className="flex flex-col leading-none">
                <span className="font-mono font-bold text-lg text-platinum">{COMPANY.name}</span>
                <span className="text-[10px] text-void-600 font-mono mt-1">{COMPANY.domain}</span>
              </div>
            </Link>
            <p className="text-secondary text-sm mb-4 max-w-sm leading-relaxed">
              {COMPANY.description}
            </p>
            <a href={`mailto:${COMPANY.email}`} className="link-email inline-flex items-center gap-2">
              <Mail className="w-4 h-4 text-tertiary shrink-0" strokeWidth={1.5} />
              {COMPANY.email}
            </a>
            <div className="flex gap-2.5 mt-4">
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
                  className="p-2 rounded-lg border border-white/[0.08] text-void-600 hover:text-platinum hover:border-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-mono text-[10px] uppercase tracking-widest mb-3 text-void-600">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-void-600 hover:text-platinum transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 pt-6 border-t border-white/[0.06] text-xs text-void-700 text-center sm:text-left">
          © {new Date().getFullYear()} {COMPANY.legalName} · {COMPANY.jurisdiction} ·{" "}
          <a href={COMPANY.website} className="hover:text-platinum transition-colors font-mono">
            {COMPANY.domain}
          </a>
        </p>
      </div>
    </footer>
  );
}
