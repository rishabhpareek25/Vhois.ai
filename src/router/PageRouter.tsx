import { usePathname } from "../hooks/usePathname";
import Home from "../pages/Home";
import Platform from "../pages/Platform";
import UseCases from "../pages/UseCases";
import Technology from "../pages/Technology";
import Pricing from "../pages/Pricing";
import Developers from "../pages/Developers";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Waitlist from "../pages/Waitlist";
import WaitlistAdmin from "../pages/WaitlistAdmin";
import ComingSoon from "../pages/ComingSoon";
import ForbiddenProductVault from "../pages/ForbiddenProductVault";
import CallCenterQAValidation from "../pages/CallCenterQAValidation";
import CCValidationAdmin from "../pages/CCValidationAdmin";
import AgentIntelligence from "../pages/AgentIntelligence";
import About from "../pages/About";
import Team from "../pages/Team";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import NotFound from "../pages/NotFound";

export default function PageRouter() {
  const pathname = usePathname();

  switch (pathname) {
    case "/":
      return <Home />;
    case "/platform":
      return <Platform />;
    case "/use-cases":
      return <UseCases />;
    case "/technology":
      return <Technology />;
    case "/pricing":
      return <Pricing />;
    case "/developers":
      return <Developers />;
    case "/blog":
      return <Blog />;
    case "/contact":
      return <Contact />;
    case "/about":
      return <About />;
    case "/team":
      return <Team />;
    case "/privacy":
      return <Privacy />;
    case "/terms":
      return <Terms />;
    case "/waitlist":
      return <Waitlist />;
    case "/coming-soon":
      return <ComingSoon />;
    case "/the-forbidden-archive":
      return <ForbiddenProductVault />;
    case "/admin/waitlist":
      return <WaitlistAdmin />;
    case "/call-center-qa":
      return <CallCenterQAValidation />;
    case "/agent-intelligence":
      return <AgentIntelligence />;
    case "/admin/cc-validation":
      return <CCValidationAdmin />;
    default:
      return <NotFound />;
  }
}
