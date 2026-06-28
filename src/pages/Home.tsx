import HorizontalSpectrumVisualizer from "../components/HorizontalSpectrumVisualizer";
import AgentSurveillanceShowcase from "../components/home/AgentSurveillanceShowcase";
import HomeHero from "../components/home/HomeHero";
import ProblemSolution, { HowItWorksStrip } from "../components/home/ProblemSolution";
import HomeVerticals from "../components/home/HomeVerticals";
import HomeClosingCta from "../components/home/HomeClosingCta";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY } from "../data/company";

export default function Home() {
  usePageMeta(
    "Home",
    `${COMPANY.name} | Conversation intelligence for calls and meetings. Make spoken knowledge searchable and actionable.`
  );

  return (
    <div className="relative bg-white selection:bg-primary-500/30 selection:text-primary-900">
      {/* 1. Who we are + the pain, instant clarity */}
      <HomeHero />

      {/* 2. Pipeline animation immediately below the hero */}
      <HowItWorksStrip />

      {/* 3. The Intelligence Gap */}
      <ProblemSolution />

      {/* 4. Flagship product dashboard */}
      <AgentSurveillanceShowcase />

      {/* 5. Proof of tech, Indian audio */}
      <section className="relative py-16 sm:py-20 bg-white">
        {/* Subtle blur separator */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="page-bleed mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gray-400 mb-4">
            Proof
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Built for India’s noisy, code-switched audio
          </h2>
        </div>
        <HorizontalSpectrumVisualizer />
      </section>

      {/* 6. Verticals */}
      <HomeVerticals />

      <HomeClosingCta />
    </div>
  );
}
