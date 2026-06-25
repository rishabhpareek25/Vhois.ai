import {
  Headphones,
  Users,
  Phone,
  Mic,
  Shield,
  BarChart3,
  Bell,
  FileCheck,
  Languages,
  Upload,
  IndianRupee,
  FlaskConical,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

export type CCOption = { id: string; label: string };
export type CCQuestion = {
  id: string;
  number: number;
  phase: string;
  phaseLabel: string;
  scanTag: string;
  title: string;
  hint?: string;
  type: "single" | "multi" | "contact";
  options?: CCOption[];
  maxSelect?: number;
  icon: LucideIcon;
};

export const CC_PHASES = [
  "OPERATIONS BASELINE",
  "QA COVERAGE GAP",
  "INTELLIGENCE PRIORITY",
  "LANGUAGE & DEPLOYMENT",
  "COMMERCIAL SIGNAL",
  "PILOT HANDSHAKE",
  "IDENTITY LOCK",
] as const;

export const CC_QUESTIONS: CCQuestion[] = [
  {
    id: "q1",
    number: 1,
    phase: "OPERATIONS BASELINE",
    phaseLabel: "α",
    scanTag: "CALL-TYPE-SCAN",
    title: "What type of calls do you mostly handle?",
    type: "single",
    icon: Headphones,
    options: [
      { id: "sales", label: "Sales calls" },
      { id: "support", label: "Customer support calls" },
      { id: "collection", label: "Collection / recovery calls" },
      { id: "lead-qual", label: "Lead qualification calls" },
      { id: "booking", label: "Appointment / booking calls" },
      { id: "mixed", label: "Mixed calls" },
      { id: "other", label: "Other" },
    ],
  },
  {
    id: "q2",
    number: 2,
    phase: "OPERATIONS BASELINE",
    phaseLabel: "α",
    scanTag: "AGENT-FLEET-SCAN",
    title: "How many agents do you currently manage?",
    type: "single",
    icon: Users,
    options: [
      { id: "1-10", label: "1–10 agents" },
      { id: "11-25", label: "11–25 agents" },
      { id: "26-50", label: "26–50 agents" },
      { id: "51-100", label: "51–100 agents" },
      { id: "100+", label: "100+ agents" },
    ],
  },
  {
    id: "q3",
    number: 3,
    phase: "OPERATIONS BASELINE",
    phaseLabel: "α",
    scanTag: "VOLUME-PROJECTION",
    title: "Approximately how many calls do you handle per month?",
    type: "single",
    icon: Phone,
    options: [
      { id: "<1k", label: "Less than 1,000" },
      { id: "1k-5k", label: "1,000–5,000" },
      { id: "5k-20k", label: "5,000–20,000" },
      { id: "20k-50k", label: "20,000–50,000" },
      { id: "50k+", label: "50,000+" },
    ],
  },
  {
    id: "q4",
    number: 4,
    phase: "QA COVERAGE GAP",
    phaseLabel: "β",
    scanTag: "RECORDING-STATUS",
    title: "Do you currently record your calls?",
    type: "single",
    icon: Mic,
    options: [
      { id: "all", label: "Yes, all calls" },
      { id: "some", label: "Yes, some calls" },
      { id: "no", label: "No" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "q5",
    number: 5,
    phase: "QA COVERAGE GAP",
    phaseLabel: "β",
    scanTag: "QA-METHOD-DETECT",
    title: "How do you currently check call quality?",
    type: "single",
    icon: Shield,
    options: [
      { id: "manual-qa", label: "Manual QA team" },
      { id: "team-leaders", label: "Team leaders randomly check calls" },
      { id: "complaints", label: "Only after customer complaints" },
      { id: "none", label: "We do not check regularly" },
      { id: "software", label: "Using software" },
      { id: "other", label: "Other" },
    ],
  },
  {
    id: "q6",
    number: 6,
    phase: "QA COVERAGE GAP",
    phaseLabel: "β",
    scanTag: "COVERAGE-RATIO",
    title: "What percentage of calls are you able to review today?",
    type: "single",
    icon: BarChart3,
    options: [
      { id: "<5", label: "Less than 5%" },
      { id: "5-10", label: "5–10%" },
      { id: "10-25", label: "10–25%" },
      { id: "25-50", label: "25–50%" },
      { id: ">50", label: "More than 50%" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "q7",
    number: 7,
    phase: "INTELLIGENCE PRIORITY",
    phaseLabel: "γ",
    scanTag: "AI-UTILITY-SIGNAL",
    title: "If an AI tool could audit 100% of your calls automatically, would it be useful?",
    type: "single",
    icon: BarChart3,
    options: [
      { id: "very", label: "Very useful" },
      { id: "somewhat", label: "Somewhat useful" },
      { id: "unsure", label: "Not sure" },
      { id: "not", label: "Not useful" },
    ],
  },
  {
    id: "q8",
    number: 8,
    phase: "INTELLIGENCE PRIORITY",
    phaseLabel: "γ",
    scanTag: "INSIGHT-MATRIX",
    title: "Which insights would be most valuable for you?",
    hint: "Select up to 5",
    type: "multi",
    maxSelect: 5,
    icon: BarChart3,
    options: [
      { id: "losing-agents", label: "Which agents are losing potential customers" },
      { id: "missed-followup", label: "Which customers were interested but not followed up" },
      { id: "misbehavior", label: "Agent misbehavior or rude language" },
      { id: "compliance", label: "Script / compliance violations" },
      { id: "wrong-outcome", label: "Wrong call outcome marked by agent" },
      { id: "escalation", label: "Customer anger / escalation detection" },
      { id: "agent-score", label: "Agent-wise quality score" },
      { id: "transcript", label: "Call summary and transcript" },
      { id: "objections", label: "Top customer objections" },
      { id: "daily-report", label: "Daily manager report" },
      { id: "client-report", label: "Client-ready QA report" },
    ],
  },
  {
    id: "q9",
    number: 9,
    phase: "INTELLIGENCE PRIORITY",
    phaseLabel: "γ",
    scanTag: "DASHBOARD-PRIORITY",
    title: "What would you want to see first in the dashboard?",
    type: "single",
    icon: BarChart3,
    options: [
      { id: "agent-rank", label: "Agent performance ranking" },
      { id: "risky-calls", label: "Risky / bad calls list" },
      { id: "missed-revenue", label: "Missed revenue opportunities" },
      { id: "compliance", label: "Compliance violations" },
      { id: "sentiment", label: "Customer sentiment report" },
      { id: "campaign", label: "Campaign-wise call performance" },
      { id: "daily", label: "Daily summary report" },
    ],
  },
  {
    id: "q10",
    number: 10,
    phase: "INTELLIGENCE PRIORITY",
    phaseLabel: "γ",
    scanTag: "ALERT-CHANNEL",
    title: "Would automatic alerts for bad calls be useful?",
    hint: "Rude language, complaints, compliance violations, missed follow-ups",
    type: "single",
    icon: Bell,
    options: [
      { id: "yes-very", label: "Yes, very useful" },
      { id: "maybe", label: "Maybe useful" },
      { id: "not-required", label: "Not required" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "q11",
    number: 11,
    phase: "INTELLIGENCE PRIORITY",
    phaseLabel: "γ",
    scanTag: "EVIDENCE-CHAIN",
    title: "Would you prefer the system to show proof for every AI finding?",
    hint: "Timestamp, transcript line, and audio clip",
    type: "single",
    icon: FileCheck,
    options: [
      { id: "required", label: "Yes, required" },
      { id: "good", label: "Good to have" },
      { id: "not-needed", label: "Not needed" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "q12",
    number: 12,
    phase: "LANGUAGE & DEPLOYMENT",
    phaseLabel: "δ",
    scanTag: "LINGUISTIC-SPECTRUM",
    title: "Which languages do your calls usually contain?",
    hint: "Select all that apply",
    type: "multi",
    icon: Languages,
    options: [
      { id: "hindi", label: "Hindi" },
      { id: "english", label: "English" },
      { id: "hinglish", label: "Hinglish" },
      { id: "marathi", label: "Marathi" },
      { id: "gujarati", label: "Gujarati" },
      { id: "tamil", label: "Tamil" },
      { id: "telugu", label: "Telugu" },
      { id: "kannada", label: "Kannada" },
      { id: "bengali", label: "Bengali" },
      { id: "punjabi", label: "Punjabi" },
      { id: "other-regional", label: "Other regional languages" },
    ],
  },
  {
    id: "q13",
    number: 13,
    phase: "LANGUAGE & DEPLOYMENT",
    phaseLabel: "δ",
    scanTag: "DEPLOY-MODE",
    title: "How would you prefer to use this product initially?",
    type: "single",
    icon: Upload,
    options: [
      { id: "upload", label: "Upload call recordings manually" },
      { id: "integrate", label: "Connect with our dialer / CRM" },
      { id: "weekly", label: "Receive weekly reports only" },
      { id: "dashboard", label: "Use full dashboard" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "q14",
    number: 14,
    phase: "LANGUAGE & DEPLOYMENT",
    phaseLabel: "δ",
    scanTag: "WTP-SIGNAL",
    title: "If this product helps you find missed sales, bad calls, and script violations, would you consider paying for it?",
    type: "single",
    icon: IndianRupee,
    options: [
      { id: "yes-definitely", label: "Yes, definitely" },
      { id: "yes-reasonable", label: "Yes, if pricing is reasonable" },
      { id: "maybe-trial", label: "Maybe after a free trial" },
      { id: "unsure", label: "Not sure" },
      { id: "no", label: "No" },
    ],
  },
  {
    id: "q15",
    number: 15,
    phase: "COMMERCIAL SIGNAL",
    phaseLabel: "ε",
    scanTag: "PRICING-MODEL",
    title: "What pricing model would you prefer?",
    type: "single",
    icon: IndianRupee,
    options: [
      { id: "per-hour", label: "Per audio hour" },
      { id: "per-agent", label: "Per agent per month" },
      { id: "fixed", label: "Fixed monthly plan" },
      { id: "reports-only", label: "Pay only for reports" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "q16",
    number: 16,
    phase: "COMMERCIAL SIGNAL",
    phaseLabel: "ε",
    scanTag: "BUDGET-BAND",
    title: "What monthly budget would feel reasonable for this type of product?",
    type: "single",
    icon: IndianRupee,
    options: [
      { id: "<10k", label: "Less than ₹10,000/month" },
      { id: "10-25k", label: "₹10,000–₹25,000/month" },
      { id: "25-50k", label: "₹25,000–₹50,000/month" },
      { id: "50k-1L", label: "₹50,000–₹1,00,000/month" },
      { id: "1L+", label: "₹1,00,000+/month" },
      { id: "depends", label: "Depends on results" },
    ],
  },
  {
    id: "q17",
    number: 17,
    phase: "COMMERCIAL SIGNAL",
    phaseLabel: "ε",
    scanTag: "PILOT-READINESS",
    title: "Would you be open to a pilot where we analyze your past calls and show a sample report?",
    type: "single",
    icon: FlaskConical,
    options: [
      { id: "yes-immediately", label: "Yes, immediately" },
      { id: "yes-discussion", label: "Yes, after discussion" },
      { id: "maybe", label: "Maybe" },
      { id: "not-now", label: "Not now" },
      { id: "no", label: "No" },
    ],
  },
  {
    id: "q18",
    number: 18,
    phase: "PILOT HANDSHAKE",
    phaseLabel: "ζ",
    scanTag: "SAMPLE-CORPUS",
    title: "How many call recordings can you share for a pilot?",
    type: "single",
    icon: FlaskConical,
    options: [
      { id: "10-50", label: "10–50 calls" },
      { id: "50-100", label: "50–100 calls" },
      { id: "100-500", label: "100–500 calls" },
      { id: "500+", label: "500+ calls" },
      { id: "cannot", label: "Cannot share calls" },
      { id: "need-approval", label: "Need approval first" },
    ],
  },
  {
    id: "q19",
    number: 19,
    phase: "PILOT HANDSHAKE",
    phaseLabel: "ζ",
    scanTag: "DECISION-MAKER",
    title: "Who would make the decision to use this product?",
    type: "single",
    icon: UserCheck,
    options: [
      { id: "founder", label: "Founder / Owner" },
      { id: "ops", label: "Operations Head" },
      { id: "cc-manager", label: "Call Center Manager" },
      { id: "sales", label: "Sales Head" },
      { id: "compliance", label: "Compliance Head" },
      { id: "client", label: "Client / Brand" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "q20",
    number: 20,
    phase: "IDENTITY LOCK",
    phaseLabel: "Ω",
    scanTag: "CONTACT-SEAL",
    title: "Share your contact details for pilot / demo discussion",
    hint: "Encrypted transmission. We respond within 24 hours.",
    type: "contact",
    icon: UserCheck,
  },
];

export const TICKER_ALERTS = [
  "AGENT #47: compliance script skipped at 02:14",
  "CALL #8821: customer agreed, no follow-up logged",
  "HINDI/HINGLISH mix: sentiment drop detected",
  "AGENT #12: rude tone flag at 04:33",
  "MISSED REVENUE: interested lead marked 'not interested'",
  "SCRIPT VIOLATION: mandatory disclosure missing",
  "ESCALATION: customer anger score 0.91",
  "QA COVERAGE: only 4.2% of calls reviewed manually",
  "BEST CALL: objection handled, deal closed",
  "REGIONAL: Marathi code-switch detected, audit OK",
];

export function coverageFromQ6(id: string | undefined): number {
  const map: Record<string, number> = {
    "<5": 4,
    "5-10": 8,
    "10-25": 18,
    "25-50": 38,
    ">50": 55,
    unsure: 7,
  };
  return map[id ?? ""] ?? 5;
}

export function computePilotScore(answers: Record<string, string | string[]>): number {
  let score = 18;
  const q = (k: string) => answers[k] as string | undefined;
  if (q("q7") === "very") score += 22;
  else if (q("q7") === "somewhat") score += 10;
  if (q("q10") === "yes-very") score += 12;
  else if (q("q10") === "maybe") score += 5;
  if (q("q14") === "yes-definitely") score += 18;
  else if (q("q14") === "yes-reasonable") score += 12;
  else if (q("q14") === "maybe-trial") score += 6;
  if (q("q17") === "yes-immediately") score += 22;
  else if (q("q17") === "yes-discussion") score += 14;
  else if (q("q17") === "maybe") score += 6;
  const q18 = q("q18");
  if (q18 && !["cannot", "need-approval"].includes(q18)) score += 12;
  if (q("q4") === "all") score += 5;
  return Math.min(97, score);
}
