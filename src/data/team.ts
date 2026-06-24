export type Founder = {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  /** Place image in public/team/ and set path e.g. /team/rishabh.jpg */
  image?: string;
  initials: string;
  tagline: string;
  bio: string;
  journey: string[];
};

export const FOUNDERS: Founder[] = [
  {
    id: "rishabh",
    name: "Rishabh Pareek",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/rishabh-pareek-46b5181a9/",
    image: "/team/rishabh.png",
    initials: "RP",
    tagline: "Building speech intelligence from first principles — for India’s real conversations.",
    bio: "Product and technology-driven founder obsessed with a hard problem: making India’s spoken world understandable. From customer calls in Hinglish to noisy field recordings, Rishabh is building Vhois AI so conversations become searchable, auditable, and useful — not lost the moment they end.",
    journey: [
      "Started with a simple frustration: enterprises record everything, understand almost nothing.",
      "Deep focus on multilingual speech — Hindi, Hinglish, regional accents, code-switching, and real-world audio quality.",
      "Believes conversation intelligence is infrastructure, not a feature — who spoke, what mattered, what happens next.",
      "Building Vhois AI to turn spoken knowledge into structured intelligence teams can act on.",
    ],
  },
  {
    id: "abhi",
    name: "Abhi Kumar",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/abhi-srivastava-234a931b1/",
    image: "/team/abhi.png",
    initials: "AK",
    tagline: "Turning ambitious vision into systems that ship and scale.",
    bio: "Co-founder focused on execution, reliability, and building the systems that let Vhois AI operate in production. Abhi helps translate deep speech-intelligence research into a product customers can trust — from ingestion pipelines to quality at scale.",
    journey: [
      "Background in building and operating systems where failure is not an option.",
      "Owns the path from prototype to production — architecture, delivery discipline, and operational clarity.",
      "Partners on turning Vhois AI’s vision into a company that executes consistently.",
      "Committed to building infrastructure that teams can depend on when conversations drive revenue and compliance.",
    ],
  },
];

export { COMPANY, OFFICIAL_EMAIL, SOCIAL_LINKS } from "./company";
