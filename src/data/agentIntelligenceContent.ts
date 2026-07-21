import {
  Headphones,
  Phone,
  Upload,
  FileSpreadsheet,
  Cloud,
  Webhook,
  HardDrive,
  Building2,
  type LucideIcon,
} from "lucide-react";

export const HERO_DASHBOARD_CARDS = [
  { label: "Agent Score", value: "72", unit: "/100", accent: "text-platinum" },
  { label: "Missed Revenue", value: "₹4.2L", unit: "this week", accent: "text-amber-300" },
  { label: "Compliance Risk", value: "3", unit: "calls flagged", accent: "text-red-300" },
  { label: "Hot Leads", value: "18", unit: "ready to close", accent: "text-emerald-300" },
  { label: "Urgent Review", value: "7", unit: "need action", accent: "text-orange-300" },
] as const;

export const HIDDEN_RISKS = [
  "Missed sales & upsell moments",
  "Rude or dismissive handling",
  "Script & compliance violations",
  "Wrong call outcomes logged",
  "Angry customers not escalated",
  "Promised follow-ups never made",
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload or connect calls",
    description: "Dialer, CRM, API, cloud storage, or batch upload, online and offline.",
    icon: Upload,
  },
  {
    step: "02",
    title: "Vhois analyzes every word",
    description: "Intent, compliance, sentiment, revenue signals, and agent behavior, at scale.",
    icon: Headphones,
  },
  {
    step: "03",
    title: "Managers get a command view",
    description: "Scores, risks, hot leads, and proof-backed findings, not random samples.",
    icon: Building2,
  },
] as const;

export const AGENT_TYPES = [
  {
    title: "Sales agents",
    tag: "Revenue intelligence",
    items: ["Missed revenue", "Hot leads", "Objection handling", "Follow-up gaps"],
    accent: "from-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Customer support",
    tag: "Experience intelligence",
    items: ["Angry customers", "Poor handling", "Unresolved issues", "Escalation risk"],
    accent: "from-blue-500/10 border-blue-500/20",
  },
  {
    title: "Collection agents",
    tag: "Compliance intelligence",
    items: ["Harsh language", "Compliance risk", "Payment intent", "Promise-to-pay"],
    accent: "from-amber-500/10 border-amber-500/20",
  },
  {
    title: "Field agents & surveyors",
    tag: "On-ground intelligence",
    items: ["Proof of visit", "Pitch compliance", "Sentiment signals", "Speaker attribution"],
    accent: "from-violet-500/10 border-violet-500/20",
  },
  {
    title: "BPO & call centers",
    tag: "QA at scale",
    items: ["Campaign reports", "Agent scorecards", "Client-ready QA", "100% coverage"],
    accent: "from-red-500/10 border-red-500/20",
  },
  {
    title: "AI calling companies",
    tag: "Bot performance",
    items: ["Bot performance", "Wrong outcomes", "Failed conversations", "Handoff quality"],
    accent: "from-cyan-500/10 border-cyan-500/20",
  },
] as const;

export const ONLINE_CHANNELS = [
  "Dialer & CRM integrations",
  "REST API & webhooks",
  "Live cloud recordings",
  "Real-time streaming audit",
] as const;

export const OFFLINE_CHANNELS = [
  "Field sales recorders & tablets",
  "Retail kiosks & physical rooms",
  "WhatsApp voice notes & batch uploads",
] as const;

export const DASHBOARD_METRICS = [
  { label: "Calls analyzed", value: "12,847", delta: "+100% coverage" },
  { label: "Agent quality score", value: "78.4", delta: "fleet average" },
  { label: "Missed revenue", value: "₹18.6L", delta: "recoverable" },
  { label: "Compliance violations", value: "23", delta: "with proof" },
  { label: "Interested customers", value: "142", delta: "this month" },
  { label: "Risky calls", value: "31", delta: "urgent review" },
  { label: "Follow-up required", value: "89", delta: "not in CRM" },
  { label: "Customer sentiment", value: "64%", delta: "positive trend" },
] as const;

export const EVIDENCE_TIMELINE = [
  { time: "00:42", event: "Customer interested", type: "positive" as const },
  { time: "01:18", event: "Agent interrupted customer", type: "risk" as const },
  { time: "02:05", event: "Pricing objection raised", type: "neutral" as const },
  { time: "03:12", event: "Follow-up promised", type: "positive" as const },
  { time: "04:30", event: "Compliance line missed", type: "critical" as const },
] as const;

export type IntegrationCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const INTEGRATIONS: IntegrationCard[] = [
  { title: "Manual Upload", description: "Drag-drop recordings for instant audit.", icon: Upload },
  { title: "CSV Batch", description: "Bulk metadata + audio paths at scale.", icon: FileSpreadsheet },
  { title: "Cloud Storage", description: "S3, GCS, Azure, sync folders automatically.", icon: Cloud },
  { title: "Dialer / CRM", description: "Ozonetel, Exotel, Zoho, Salesforce & more.", icon: Phone },
  { title: "API / Webhook", description: "Push calls as they complete. Get findings back.", icon: Webhook },
  { title: "Client Storage", description: "Audio stays on your infra. We analyze in place.", icon: HardDrive },
];
