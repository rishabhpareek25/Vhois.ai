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
    <div className="relative">
      {/* 1. Who we are + the pain, instant clarity */}
      <HomeHero />

      {/* 2. Problem vs solution, side by side */}
      <ProblemSolution />

      {/* 3. What we actually build */}
      <HowItWorksStrip />

      {/* 4. Proof of tech, Indian audio */}
      <section className="relative py-8 sm:py-10 border-y border-white/[0.06] bg-white/[0.01]">
        <div className="page-bleed mb-5 sm:mb-6 text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-tertiary mb-2">
            Engineered for India
          </p>
          <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-primary tracking-tight">
            Hindi, Hinglish, regional accents.{" "}
            <span className="text-secondary font-sans font-normal">noisy real-world audio</span>
          </h2>
        </div>
        <HorizontalSpectrumVisualizer />
      </section>

      {/* 5. Flagship product, depth for buyers who scroll */}
      <AgentSurveillanceShowcase />

      {/* 6. Verticals */}
      <HomeVerticals />

      <HomeClosingCta />
    </div>
  );
}
