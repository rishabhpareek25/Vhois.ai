import { useCallback } from "react";
import WaitlistParticleField from "../components/waitlist/WaitlistParticleField";
import AgentIntelNav from "../components/agentIntelligence/AgentIntelNav";
import AgentIntelHero from "../components/agentIntelligence/AgentIntelHero";
import AgentIntelBridge from "../components/agentIntelligence/AgentIntelBridge";
import AgentIntelProblem from "../components/agentIntelligence/AgentIntelProblem";
import AgentIntelHowItWorks from "../components/agentIntelligence/AgentIntelHowItWorks";
import AgentIntelTypes from "../components/agentIntelligence/AgentIntelTypes";
import AgentIntelChannels from "../components/agentIntelligence/AgentIntelChannels";
import AgentIntelDashboard from "../components/agentIntelligence/AgentIntelDashboard";
import AgentIntelEvidence from "../components/agentIntelligence/AgentIntelEvidence";
import AgentIntelIntegrations from "../components/agentIntelligence/AgentIntelIntegrations";
import AgentIntelPilotCTA from "../components/agentIntelligence/AgentIntelPilotCTA";
import { COMPANY } from "../data/company";

export default function AgentIntelligence() {
  const scrollToIntegrations = useCallback(() => {
    document.getElementById("integrations")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative min-h-screen">
      <WaitlistParticleField intensity={0.2} />
      <AgentIntelNav onIntegrationsClick={scrollToIntegrations} />

      <AgentIntelHero onIntegrationsClick={scrollToIntegrations} />
      <AgentIntelProblem />
      <AgentIntelBridge />
      <AgentIntelHowItWorks />
      <AgentIntelTypes />
      <AgentIntelChannels />
      <AgentIntelDashboard />
      <AgentIntelEvidence />
      <AgentIntelIntegrations />
      <AgentIntelPilotCTA />

      <footer className="page-bleed py-8 border-t border-white/[0.06] text-center">
        <p className="text-xs font-mono text-void-700">
          © {new Date().getFullYear()} {COMPANY.name} · {COMPANY.domain}
        </p>
      </footer>
    </div>
  );
}
