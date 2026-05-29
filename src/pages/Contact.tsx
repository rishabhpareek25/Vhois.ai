import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, Clock, Send, CheckCircle, Copy, Globe } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const offices = [
  {
    city: "San Francisco",
    country: "USA",
    address: "548 Market St, Suite 500",
    timezone: "PST (UTC-8)",
    phone: "+1 (415) 555-0123",
  },
  {
    city: "London",
    country: "UK",
    address: "100 Liverpool Street",
    timezone: "GMT (UTC+0)",
    phone: "+44 20 7946 0958",
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "1 Raffles Place, Tower 2",
    timezone: "SGT (UTC+8)",
    phone: "+65 6789 0123",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-mono font-bold text-5xl md:text-7xl mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-xl text-mist max-w-3xl mx-auto">
            Questions? We're here to help. Reach out and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card glowColor="cyan" className="h-full">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center min-h-[500px] text-center"
                >
                  <CheckCircle className="w-16 h-16 text-neon-green mb-6" />
                  <h2 className="font-mono font-bold text-3xl mb-4">Message Sent!</h2>
                  <p className="text-mist mb-8">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button variant="primary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-neon-cyan transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-mono mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-neon-cyan transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-mono mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-neon-cyan transition-colors"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono mb-2">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-neon-cyan transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                      placeholder="Tell us more about your project..."
                    />
                    <div className="text-xs text-mist mt-1">
                      {formData.message.length} / 1000 characters
                    </div>
                  </div>

                  <Button variant="primary" size="lg" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@vhois.ai",
                  action: "mailto:hello@vhois.ai",
                  id: "email",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+1 (415) 555-0123",
                  action: "tel:+14155550123",
                  id: "phone",
                },
                {
                  icon: Clock,
                  label: "Support Hours",
                  value: "24/7 Available",
                  id: "hours",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="glass rounded-lg p-4 flex items-center gap-4 hover:border-neon-cyan transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-void-100">
                    <item.icon className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-mist font-mono">{item.label}</div>
                    <div className="font-mono font-bold">{item.value}</div>
                  </div>
                  {item.action && (
                    <a
                      href={item.action}
                      className="text-neon-cyan hover:text-neon-purple transition-colors"
                    >
                      {item.id !== "hours" && (
                        <button
                          onClick={() => handleCopy(item.value, item.id)}
                          className="p-2 rounded-lg hover:bg-void-100 transition-colors"
                        >
                          {copied === item.id ? (
                            <CheckCircle className="w-5 h-5 text-neon-green" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Office Locations */}
            <div>
              <h3 className="font-mono font-bold text-xl mb-6">Our Offices</h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="glass rounded-lg p-4 hover:border-neon-cyan transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-void-100">
                        <Globe className="w-6 h-6 text-neon-purple" />
                      </div>
                      <div className="flex-1">
                        <div className="font-mono font-bold text-lg mb-1">
                          {office.city}, {office.country}
                        </div>
                        <div className="text-sm text-mist space-y-1">
                          <div>{office.address}</div>
                          <div>{office.timezone}</div>
                          <a
                            href={`tel:${office.phone}`}
                            className="text-neon-cyan hover:text-neon-purple transition-colors"
                          >
                            {office.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
