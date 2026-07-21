import AgentSurveillanceShowcase from "../components/home/AgentSurveillanceShowcase";
import HomeHero from "../components/home/HomeHero";
import ProblemSolution from "../components/home/ProblemSolution";
import HomeSolution from "../components/home/HomeSolution";
import HomeHowItWorks from "../components/home/HomeHowItWorks";
import HomeCapabilities from "../components/home/HomeCapabilities";
import HomeWhyDifferent from "../components/home/HomeWhyDifferent";
import HomeImpact from "../components/home/HomeImpact";
import HomeVision from "../components/home/HomeVision";
import HomeVerticals from "../components/home/HomeVerticals";
import HomeClosingCta from "../components/home/HomeClosingCta";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY } from "../data/company";

export default function Home() {
  usePageMeta(
    "Home",
    `${COMPANY.name} turns business calls into actionable intelligence: transcription, speaker insights, QA, and dashboards for sales teams.`
  );

  return (
    <div className="relative">
      <HomeHero />
      <ProblemSolution />
      <HomeSolution />
      <HomeHowItWorks />
      <HomeCapabilities />
      <HomeWhyDifferent />
      <AgentSurveillanceShowcase />
      <HomeImpact />
      <HomeVerticals />
      <HomeVision />
      <HomeClosingCta />
    </div>
  );
}
