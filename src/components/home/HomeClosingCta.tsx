import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import Button from "../ui/Button";
import { COMPANY } from "../../data/company";
import { CTA } from "../../data/homeContent";
import SectionHeading from "./SectionHeading";

export default function HomeClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(255,80,60,0.07),transparent)] pointer-events-none" />

      <div className="page-bleed relative py-10 sm:py-14">
        <div className="max-w-3xl">
          <SectionHeading
            label={CTA.label}
            title={CTA.title}
            description={CTA.description}
            accent="ember"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8"
          >
            <Link to="/contact">
              <Button variant="primary" size="sm">
                Request a personalized demo
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="sm">
                Schedule a discovery call
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8 pt-6 border-t border-white/[0.06] text-sm text-secondary"
          >
            <a href={`mailto:${COMPANY.email}`} className="link-email hover:text-primary">
              {COMPANY.email}
            </a>
            <a href={`tel:${CTA.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-primary">
              <Phone className="w-3.5 h-3.5" />
              {CTA.phone}
            </a>
            <a
              href={CTA.portal}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              portal.vhoisai.in
            </a>
            <span className="text-tertiary">{COMPANY.website.replace("https://", "")}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
