import { motion } from "framer-motion";
import { useState } from "react";
import {
  Send,
  CheckCircle,
  Linkedin,
  Instagram,
  Rocket,
  Plug,
  Handshake,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import PageHero from "../components/layout/PageHero";
import WaitlistParticleField from "../components/waitlist/WaitlistParticleField";
import { usePageMeta } from "../hooks/usePageMeta";
import { SOCIAL_LINKS } from "../data/company";
import CompanyLegalBlock from "../components/layout/CompanyLegalBlock";
import { submitContact } from "../lib/contactApi";

const USE_CASES = [
  "Call Center / Agent Audit",
  "AI Calling Company",
  "Enterprise Meetings",
  "Legal / Courtroom",
  "Government / Public Meetings",
  "Partnership",
  "Other",
] as const;

const INQUIRY_CARDS = [
  {
    icon: Rocket,
    title: "Free pilot",
    description: "Evaluate conversation intelligence on your real audio, calls, meetings, or workflows.",
    cta: "Mention pilot in your message",
  },
  {
    icon: Plug,
    title: "Integration discussion",
    description: "API, webhooks, CRM, dialer, or internal stack, let's map how Vhois fits.",
    cta: "Select your use case below",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "Technology, channel, or go-to-market collaboration across speech intelligence.",
    cta: "Choose Partnership in use case",
  },
  {
    icon: MessageCircle,
    title: "General inquiry",
    description: "Product questions, media, or anything else, we'll route it to the right person.",
    cta: "Send us a message",
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm";

export default function Contact() {
  usePageMeta(
    "Contact",
    "Talk to Vhois AI about call intelligence, meeting intelligence, pilots, integrations, and partnerships."
  );

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    role: "",
    useCase: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitContact({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        useCase: formData.useCase,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-20 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <WaitlistParticleField intensity={0.2} />
      </div>

      <div className="relative page-bleed">
        <PageHero
          eyebrow="Contact"
          title={
            <>
              Let&apos;s talk about the conversations
              <br />
              <span className="text-primary-600">your business is missing.</span>
            </>
          }
          description="Pilots, integrations, partnerships, or a first conversation about speech intelligence, tell us what you're building and we'll respond thoughtfully."
        />

        {/* Inquiry cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14 sm:mb-16">
          {INQUIRY_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 hover:shadow-md hover:border-primary-200 transition-all group"
            >
              <card.icon className="w-6 h-6 text-primary-600 mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <h3 className="font-semibold text-gray-900 text-sm mb-2">{card.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{card.description}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {card.cta}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3 rounded-3xl border border-gray-200 bg-white shadow-xl p-6 sm:p-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-[420px] text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-500 mb-6" strokeWidth={1.5} />
                <h2 className="font-sans font-semibold text-3xl text-gray-900 mb-3">
                  Message received
                </h2>
                <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                  Thank you for reaching out. We review every inquiry and will get back to you as
                  soon as we can.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Company
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClass}
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                      placeholder="+91 ..."
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-role" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Role
                    </label>
                    <input
                      id="contact-role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className={inputClass}
                      placeholder="e.g. Head of Operations"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-usecase" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Use case *
                    </label>
                    <select
                      id="contact-usecase"
                      required
                      value={formData.useCase}
                      onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled className="bg-white text-gray-500">
                        Select use case
                      </option>
                      {USE_CASES.map((uc) => (
                        <option key={uc} value={uc} className="bg-white text-gray-900">
                          {uc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    maxLength={2000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your conversations, volume, languages, and what success looks like..."
                  />
                  <p className="text-[10px] font-mono text-gray-400 mt-1.5">
                    {formData.message.length} / 2000
                  </p>
                </div>

                <Button variant="primary" size="sm" className="w-full sm:w-auto" disabled={submitting} loading={submitting}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                {error && (
                  <p className="text-sm text-red-500 font-mono mt-2" role="alert">
                    {error}
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2 space-y-6"
          >
            <CompanyLegalBlock className="mb-6" compact />

            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                Follow Vhois AI
              </p>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vhois AI on LinkedIn"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-colors text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vhois AI on Instagram"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-colors text-sm font-medium"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Explore first</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Not ready to talk? Learn how we turn speech into structured intelligence.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/about"
                  className="text-sm text-primary-600 hover:underline font-medium"
                >
                  About Vhois AI →
                </Link>
                <Link
                  to="/agent-intelligence"
                  className="text-sm text-primary-600 hover:underline font-medium"
                >
                  Agent intelligence →
                </Link>
                <Link
                  to="/team"
                  className="text-sm text-primary-600 hover:underline font-medium"
                >
                  Meet the founders →
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
