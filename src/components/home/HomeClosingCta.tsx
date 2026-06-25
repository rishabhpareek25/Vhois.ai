import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { COMPANY } from "../../data/company";

const PATHS = [
  { label: "Contact-center pilot", detail: "QA, compliance, agent scoring", href: "/contact" },
  { label: "API & platform access", detail: "Join the waitlist", href: "/waitlist" },
];

export default function HomeClosingCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(255,80,60,0.07),transparent)] pointer-events-none" />

      <div className="page-bleed relative py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-tertiary mb-3">
              Get started
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-[1.75rem] md:text-3xl text-primary tracking-[-0.02em] leading-[1.15]">
              Ready to stop losing conversations?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-secondary max-w-md leading-relaxed">
              Pilot with {COMPANY.name} on live contact-center audio, or join the waitlist for
              platform access.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
            {PATHS.map((path) => (
              <Link
                key={path.href}
                to={path.href}
                className="group flex flex-1 items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
              >
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium text-primary group-hover:text-luminous transition-colors">
                    {path.label}
                  </p>
                  <p className="text-xs text-tertiary mt-0.5 truncate">{path.detail}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-tertiary group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <p className="text-xs text-tertiary font-mono">
            Questions?{" "}
            <a href={`mailto:${COMPANY.email}`} className="link-email text-secondary hover:text-primary">
              {COMPANY.email}
            </a>
          </p>
          <Link to="/contact">
            <Button variant="primary" size="sm">
              Talk to the team
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
