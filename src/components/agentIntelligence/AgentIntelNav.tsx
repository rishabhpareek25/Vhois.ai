import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import AudioWaveformLogo from "../AudioWaveformLogo";
import { COMPANY } from "../../data/company";

type Props = {
  onIntegrationsClick?: () => void;
};

export default function AgentIntelNav({ onIntegrationsClick }: Props) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-void/80 backdrop-blur-xl"
    >
      <div className="page-bleed flex items-center justify-between gap-4 py-3 min-h-[3.5rem]">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <AudioWaveformLogo />
          <div className="hidden sm:block leading-none">
            <span className="font-mono font-bold text-sm text-platinum">{COMPANY.name}</span>
            <span className="block text-[9px] font-mono text-void-600 tracking-wider">
              AGENT INTELLIGENCE
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onIntegrationsClick}
            className="hidden md:inline-flex text-sm text-void-600 hover:text-platinum transition-colors px-3 py-2"
          >
            Integrations
          </button>
          <Link to="/call-center-qa">
            <Button variant="primary" size="sm" className="text-xs sm:text-sm whitespace-nowrap">
              Free call audit
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 hidden sm:inline" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
