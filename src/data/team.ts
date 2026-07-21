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
    role: "Co-founder & Engineer",
    linkedin: "https://www.linkedin.com/in/rishabh-pareek-46b5181a9/",
    image: "/team/rishabh.png",
    initials: "RP",
    tagline: "Full-stack engineer with deep business acumen.",
    bio: "A versatile full-stack developer who understands that code must serve business goals. Rishabh bridges the gap between complex technical architecture and strategic business outcomes, driving the core product execution for Vhois AI.",
    journey: [
      "Combines deep technical engineering expertise with a sharp business sense.",
      "Built the foundational architecture for Vhois AI's full-stack product.",
      "Ensures every technical decision directly impacts product-market fit and value.",
      "Passionate about creating elegant, scalable solutions for complex enterprise problems.",
    ],
  },
  {
    id: "abhi",
    name: "Abhi Kumar",
    role: "Co-founder & Growth",
    linkedin: "https://www.linkedin.com/in/abhi-srivastava-234a931b1/",
    image: "/team/abhi.png",
    initials: "AK",
    tagline: "Sales, marketing, and growth expert driving Vhois AI to market.",
    bio: "A relentless sales and marketing leader focused on growth and customer acquisition. Abhi translates Vhois AI's technical capabilities into compelling value propositions, building the go-to-market engine that connects our product with enterprises.",
    journey: [
      "Background in driving rapid growth through strategic marketing and enterprise sales.",
      "Owns the customer lifecycle from initial awareness to successful enterprise pilot.",
      "Master at understanding customer pain points and positioning Vhois AI as the solution.",
      "Building the growth engine that will scale Vhois AI across Indian contact centers.",
    ],
  },
];

export { COMPANY, OFFICIAL_EMAIL, SOCIAL_LINKS } from "./company";
