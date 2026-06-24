/** Single source of truth — align AWS Activate application with these values */
export const COMPANY = {
  name: "Vhois AI",
  legalName: "Vhois AI",
  domain: "vhoisai.in",
  website: "https://vhoisai.in",
  email: "info@vhoisai.in",
  tagline: "Conversation intelligence infrastructure",
  description:
    "Vhois AI builds conversation intelligence infrastructure for real-world speech — making calls, meetings, and spoken workflows searchable, auditable, and actionable across Indian languages.",
  jurisdiction: "India",
  productSummary:
    "Speech ingestion, transcription, speaker intelligence, and QA analytics for contact centers, meetings, and enterprise workflows — deployed on AWS.",
} as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/vhoisai/",
  instagram: "https://www.instagram.com/vhoisai/",
} as const;

export const OFFICIAL_EMAIL = COMPANY.email;
