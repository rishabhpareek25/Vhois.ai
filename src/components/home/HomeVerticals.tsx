import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const VERTICALS = [
  {
    num: "01",
    title: "Contact centers",
    hook: "QA can't scale. 95% of calls never get reviewed.",
    payoff: "100% call audit: agent quality, compliance, revenue signals.",
    href: "/agent-intelligence",
    cta: "Agent Intelligence",
    accent: "from-red-500/20 via-red-500/5 to-transparent",
  },
  {
    num: "02",
    title: "Enterprise meetings",
    hook: "Decisions vanish the moment the meeting ends.",
    payoff: "Searchable meeting intelligence with accountability trails.",
    href: "/contact",
    cta: "Discuss pilot",
    accent: "from-white/10 via-white/5 to-transparent",
  },
  {
    num: "03",
    title: "Governance & legal",
    hook: "Public conversations lack timestamped, auditable records.",
    payoff: "Evidence-backed speech search and export for review.",
    href: "/contact",
    cta: "Talk to us",
    accent: "from-blue-400/10 via-transparent to-transparent",
  },
];

export default function HomeVerticals() {
  return (
    <section className="relative py-10 sm:py-12 border-t border-white/[0.06]">
      <div className="page-bleed">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-tertiary mb-3">
            Where we start
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-[2rem] text-primary tracking-[-0.02em] max-w-2xl">
            Built for conversations that{" "}
            <span className="text-signal">move your business</span>
          </h2>
        </motion.div>

        <div className="space-y-0 divide-y divide-white/[0.08]">
          {VERTICALS.map((v, i) => (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative py-7 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${v.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative lg:col-span-1">
                <span className="font-mono text-sm text-tertiary">{v.num}</span>
              </div>

              <div className="relative lg:col-span-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-primary mb-2">
                  {v.title}
                </h3>
                <p className="text-secondary text-sm sm:text-base leading-relaxed">{v.hook}</p>
              </div>

              <div className="relative lg:col-span-5">
                <p className="text-primary text-sm sm:text-base leading-relaxed font-medium">
                  {v.payoff}
                </p>
              </div>

              <div className="relative lg:col-span-2 flex lg:justify-end items-start">
                <Link
                  to={v.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all border-b border-white/20 pb-0.5 hover:border-white/50"
                >
                  {v.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
