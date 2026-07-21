import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";
import Button from "../ui/Button";
import { COMPANY } from "../../data/company";

const PATHS = [
  { label: "Contact-center pilot", detail: "QA, compliance, agent scoring", href: "/contact", icon: Zap },
  { label: "API & platform access", detail: "Join the waitlist", href: "/waitlist", icon: ShieldCheck },
];

export default function HomeClosingCta() {
  return (
    <section className="relative overflow-hidden bg-gray-50 border-t border-gray-200">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(37,99,235,0.05),transparent)] pointer-events-none" />

      <div className="page-bleed relative py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-4">
              Get started
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight mb-4">
              Ready to stop losing intelligence?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed mb-6">
              Pilot {COMPANY.name} on your live audio today. Transform your conversations into actionable data.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary-600" /> Deploy in 48 hours</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary-600" /> No system replacements</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600" /> Full SOC2 compliance</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            {PATHS.map((path) => {
              const Icon = path.icon;
              return (
                <Link
                  key={path.href}
                  to={path.href}
                  className="group flex items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border border-gray-200 bg-white hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {path.label}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">{path.detail}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <p className="text-sm text-gray-500 font-medium">
            Questions?{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-primary-600 hover:text-primary-800 hover:underline underline-offset-4 transition-colors">
              {COMPANY.email}
            </a>
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
              Talk to the team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
