/** Single source of truth — align AWS Activate application with these values */
export const COMPANY = {
  name: "Vhois AI",
  legalName: "Vhois AI",
  domain: "vhoisai.in",
  website: "https://vhoisai.in",
  email: "info@vhoisai.in",
  phone: "+91 82331 72503",
  portal: "https://portal.vhoisai.in",
  tagline: "Conversation insights for business",
  description:
    "Vhois AI turns sales calls and meetings into actionable business intelligence — speaker recognition, intent, follow-ups, quality scores, and dashboards.",
  jurisdiction: "India",
  productSummary:
    "AI-powered call analysis for contact centers and sales teams. Transcription, speaker ID, QA monitoring, and leadership dashboards on AWS.",
} as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/vhoisai/",
  instagram: "https://www.instagram.com/vhoisai/",
} as const;

export const OFFICIAL_EMAIL = COMPANY.email;
