import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/layout/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";
import { FOUNDERS } from "../data/team";
import Button from "../components/ui/Button";

function FounderAvatar({ name, initials, image }: { name: string; initials: string; image?: string }) {
  const [imgError, setImgError] = useState(false);

  if (image && !imgError) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] font-mono font-bold text-2xl text-platinum">
      {initials}
    </div>
  );
}

export default function Team() {
  usePageMeta(
    "Team",
    "Meet the founders building Vhois AI, conversation intelligence infrastructure for real-world speech."
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="page-bleed">
        <PageHero
          eyebrow="Our team"
          title={
            <>
              Founders building
              <br />
              <span className="text-void-600">conversation intelligence.</span>
            </>
          }
          description="We are a founder-led team obsessed with India's hard speech problem, multilingual, noisy, operationally critical conversations that deserve better than forgotten recordings."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 sm:mb-28">
          {FOUNDERS.map((founder, i) => (
            <motion.article
              key={founder.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/[0.1] bg-void-50/40 overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-44 shrink-0 aspect-square sm:aspect-auto sm:min-h-[220px] border-b sm:border-b-0 sm:border-r border-white/[0.08] overflow-hidden">
                  <FounderAvatar
                    name={founder.name}
                    initials={founder.initials}
                    image={founder.image}
                  />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-void-600 mb-1">
                    {founder.role}
                  </p>
                  <h2 className="font-sans font-semibold text-2xl text-platinum mb-2">
                    {founder.name}
                  </h2>
                  <p className="text-sm text-platinum/80 font-medium mb-3 leading-snug">
                    {founder.tagline}
                  </p>
                  <p className="text-sm text-void-600 leading-relaxed mb-5 flex-1">{founder.bio}</p>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button variant="outline" size="sm">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 border-t border-white/[0.06] sm:mx-6 sm:mb-6 sm:pb-6">
                <p className="text-[10px] font-mono uppercase tracking-widest text-void-600 mb-4 pt-6">
                  Founder journey
                </p>
                <ul className="space-y-3">
                  {founder.journey.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-void-600 leading-relaxed">
                      <span className="text-platinum/40 shrink-0">·</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.08] p-8 sm:p-12 bg-gradient-to-br from-red-500/[0.04] to-transparent"
        >
          <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-platinum mb-5">
            Why we are building this
          </h2>
          <div className="space-y-4 text-void-600 leading-relaxed max-w-3xl">
            <p>
              India&apos;s real conversations are multilingual, emotional, code-switched, and often
              recorded in imperfect conditions. They happen in customer calls, team standups, field
              visits, and public forums, and they carry the decisions that move businesses forward.
            </p>
            <p>
              Yet most of this knowledge is trapped in audio files no one has time to review. QA teams
              sample a fraction. Managers rely on memory. Compliance teams hope nothing was missed.
            </p>
            <p>
              Vhois AI exists because these conversations deserve better. We are building the layer
              that makes them searchable, auditable, and actionable, with the rigor of infrastructure,
              not the fragility of a demo.
            </p>
          </div>
          <div className="mt-8">
            <Link to="/about">
              <Button variant="ghost" size="md">
                Read our full story →
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
