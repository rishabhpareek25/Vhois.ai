import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Coffee,
  Ghost,
  Crown,
  Laugh,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Button from "../components/ui/Button";
import ComingSoonLink from "../components/ComingSoonLink";

const plans = [
  {
    name: "Schrödinger's Tier",
    price: "$0",
    subPrice: "also $∞",
    period: "/month (maybe)",
    tagline: "Free until you check the invoice",
    icon: Ghost,
    features: [
      "1 million minutes* (*emotionally)",
      "2 concurrent existential crises",
      "Email support (we read them on Tuesdays)",
      "Analytics that judge you gently",
      "Custom models (draw your own)",
      "Priority support (if you bring snacks)",
    ],
    cta: "Start Pretending",
    footnote: "*Minutes may or may not exist until observed",
  },
  {
    name: "Developer Guilt",
    price: "$???",
    subPrice: "pay what you owe",
    period: "/month",
    tagline: "For teams who said 'we'll fix it in prod'",
    icon: Coffee,
    popular: true,
    features: [
      "50M minutes (we counted twice)",
      "50 concurrent requests (49 if Dave's testing)",
      "Priority support (Slack @here energy)",
      "Dashboards your manager will screenshot",
      "Custom models (we trained on your standups)",
      "SLA: We'll try really hard™",
    ],
    cta: "Manifest Pricing",
    footnote: "Finance not consulted. Legally distinct from a real price.",
  },
  {
    name: "Enterprise (lol)",
    price: "Your",
    subPrice: "coffee budget × 10,000",
    period: "",
    tagline: "For companies with a 'synergy' slide deck",
    icon: Crown,
    features: [
      "Unlimited* usage (*limited by universe heat death)",
      "Unlimited speakers (room optional)",
      "Dedicated human who says 'Great question'",
      "Analytics painted on a wall in HQ",
      "On-premise (we fly to you, first class)",
      "Custom SLA written in calligraphy",
    ],
    cta: "Summon Sales",
    footnote: "Includes 1 free 'per my last email' per quarter",
  },
];

const faqs = [
  {
    q: "Is this real pricing?",
    a: "No. We're not selling yet. This page is art. Beautiful, unhinged art. Join the waitlist before we hire a lawyer.",
  },
  {
    q: "Why is the middle plan called Developer Guilt?",
    a: "Because you've definitely shipped voice features at 2am without tests. We see you. We are you.",
  },
  {
    q: "Can I pay in exposure?",
    a: "We accept: USD, EUR, equity, high-quality memes, and referrals from people who actually pick up the phone.",
  },
  {
    q: "What's included in Enterprise?",
    a: "Everything. Plus a meeting that could've been a webhook. Plus someone saying 'let's circle back' with gravitas.",
  },
  {
    q: "When will real pricing launch?",
    a: "When the AI stops asking if we're sure. Join the waitlist — you'll get first access and bragging rights forever.",
  },
];

export default function Pricing() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [billingMode, setBillingMode] = useState<"monthly" | "chaos">("chaos");

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Laugh className="w-12 h-12 text-platinum mx-auto" />
          </motion.div>
          <p className="font-mono text-xs text-void-600 mb-3 tracking-widest">
            PRICING · STATUS: WE HAVE NO IDEA YET
          </p>
          <h1 className="font-mono font-bold text-4xl md:text-7xl mb-4">
            Plans That <span className="text-gradient">Don&apos;t Exist</span>
          </h1>
          <p className="text-void-600 max-w-2xl mx-auto text-lg">
            We haven&apos;t started selling. So we made the only honest pricing page on the internet:
            funny, unhinged, and 100% not legally binding.
          </p>

          <div className="flex justify-center gap-2 mt-8">
            {(["monthly", "chaos"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setBillingMode(mode)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                  billingMode === mode
                    ? "bg-platinum text-void font-bold"
                    : "border border-void-300 text-void-600 hover:text-platinum"
                }`}
              >
                {mode === "monthly" ? "Monthly (boring)" : "Chaos Billing ✦"}
              </button>
            ))}
          </div>
          {billingMode === "chaos" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-mono text-platinum mt-3"
            >
              ✦ All prices fluctuate with moon phase and deploy anxiety
            </motion.p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-platinum text-void font-mono text-xs font-bold rounded-full whitespace-nowrap">
                    Most Chaotic
                  </div>
                )}
                <div
                  className={`glass-dark rounded-2xl p-8 h-full border flex flex-col ${
                    plan.popular ? "border-platinum/50 shadow-glow-white" : "border-void-300/50"
                  }`}
                >
                  <Icon className="w-10 h-10 text-platinum mb-4" />
                  <h3 className="font-mono font-bold text-2xl text-platinum mb-1">{plan.name}</h3>
                  <p className="text-xs text-void-600 mb-4 italic">{plan.tagline}</p>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-mono font-bold text-4xl text-platinum">{plan.price}</span>
                      {plan.subPrice && (
                        <span className="font-mono text-lg text-void-600 line-through decoration-platinum/50">
                          {plan.subPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-void-600">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm text-void-600 flex gap-2">
                        <span className="text-platinum shrink-0">✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] font-mono text-void-700 mb-4">{plan.footnote}</p>
                  {plan.cta === "Summon Sales" ? (
                    <Link to="/contact">
                      <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : (
                    <ComingSoonLink feature={`${plan.name} Plan`}>
                      <Button variant={plan.popular ? "primary" : "outline"} className="w-full" asSpan>
                        {plan.cta}
                      </Button>
                    </ComingSoonLink>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 text-center mb-20 border border-platinum/20"
        >
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-platinum mb-4">
            Real pricing drops when we stop laughing
          </h2>
          <p className="text-void-600 max-w-xl mx-auto mb-8">
            Until then: join the waitlist. Early humans get founder energy, priority access, and the
            right to say &ldquo;I knew them before the pricing page was real.&rdquo;
          </p>
          <Link to="/waitlist">
            <Button variant="primary" size="lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Lock In Early Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <h2 className="font-mono font-bold text-2xl text-center mb-8 text-platinum">
            Honest FAQ (rare)
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <button
                key={faq.q}
                type="button"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full text-left glass rounded-xl p-5 border border-void-300/40 hover:border-platinum/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-platinum shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-mono font-bold text-platinum">{faq.q}</h3>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-void-600 text-sm mt-3 leading-relaxed"
                        >
                          {faq.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
