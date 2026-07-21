import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Headset, ShieldAlert, LineChart } from "lucide-react";

const VERTICALS = [
  {
    num: "01",
    title: "Sales & Revenue Teams",
    hook: "Sales conversations hold the key to objections, pricing tolerance, and buying signals.",
    payoff: "Automatically log prospect intent and missed upsell opportunities directly into your CRM.",
    href: "/contact",
    cta: "Optimize Sales",
    icon: TrendingUp,
    color: "blue"
  },
  {
    num: "02",
    title: "Customer Support & Success",
    hook: "QA managers can't scale to review 100% of support calls, leaving service gaps unnoticed.",
    payoff: "Audit every interaction for empathy, script adherence, and first-call resolution.",
    href: "/agent-intelligence",
    cta: "Improve QA",
    icon: Headset,
    color: "green"
  },
  {
    num: "03",
    title: "Compliance & Risk",
    hook: "Missed disclaimers or improper conduct can lead to massive fines.",
    payoff: "Receive automated alerts the moment a regulatory script is skipped or breached.",
    href: "/contact",
    cta: "Ensure Compliance",
    icon: ShieldAlert,
    color: "red"
  },
  {
    num: "04",
    title: "Product & Marketing",
    hook: "Customer feedback is siloed in support tickets and lost after calls.",
    payoff: "Track feature requests, competitor mentions, and market trends across all conversations.",
    href: "/contact",
    cta: "Track Trends",
    icon: LineChart,
    color: "amber"
  },
];

export default function HomeVerticals() {
  return (
    <section className="relative pt-12 pb-8 bg-white border-t border-gray-100">
      <div className="page-bleed">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-2">
            Where we start
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight leading-tight">
            Built for Your Industry
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {VERTICALS.map((v, i) => {
            const Icon = v.icon;
            // Map colors to reliable tailwind classes
            const iconBg = v.color === 'blue' ? 'bg-blue-50' : v.color === 'green' ? 'bg-green-50' : v.color === 'red' ? 'bg-red-50' : 'bg-amber-50';
            const iconColor = v.color === 'blue' ? 'text-blue-600' : v.color === 'green' ? 'text-green-600' : v.color === 'red' ? 'text-red-600' : 'text-amber-600';
            
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative border-t border-gray-200 py-6 sm:py-8 hover:bg-gray-50/50 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center">
                  
                  {/* Serial Number - Now highly visible */}
                  <div className="lg:col-span-1 hidden lg:block">
                    <span className={`text-3xl font-display font-bold ${iconColor} opacity-50 group-hover:opacity-100 transition-opacity`}>
                      {v.num}
                    </span>
                  </div>

                  {/* Title & Hook */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3 mb-2 lg:hidden">
                      <span className={`text-xl font-display font-bold ${iconColor}`}>
                        {v.num}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {v.title}
                      </h3>
                    </div>
                    <h3 className="hidden lg:block text-xl sm:text-2xl font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {v.hook}
                    </p>
                  </div>

                  {/* Payoff */}
                  <div className="lg:col-span-5 flex items-start gap-4 mt-2 lg:mt-0">
                    <div className={`mt-1 p-2.5 rounded-xl ${iconBg} ${iconColor} shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-gray-800 font-medium text-sm sm:text-base leading-relaxed">
                      {v.payoff}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="lg:col-span-2 flex lg:justify-end mt-4 lg:mt-0">
                    <Link
                      to={v.href}
                      className={`inline-flex items-center gap-2 text-sm font-bold text-gray-400 ${iconColor.replace('text-', 'group-hover:text-')} transition-colors hover:gap-3`}
                    >
                      {v.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
