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
    case "/waitlist":
      return <Waitlist />;
    case "/coming-soon":
      return <ComingSoon />;
    case "/admin/waitlist":
      return <WaitlistAdmin />;
    default:
      return <Home />;
  }
}
