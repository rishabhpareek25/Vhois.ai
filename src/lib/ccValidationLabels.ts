import { CC_QUESTIONS } from "../data/ccValidationQuestions";

const optionMap = new Map<string, Map<string, string>>();
for (const q of CC_QUESTIONS) {
  if (!q.options) continue;
  const m = new Map(q.options.map((o) => [o.id, o.label]));
  optionMap.set(q.id, m);
}

export function formatAnswer(qId: string, value: string | string[]): string {
  if (Array.isArray(value)) {
    const labels = value.map((v) => optionMap.get(qId)?.get(v) ?? v);
    return labels.join(", ");
  }
  return optionMap.get(qId)?.get(value) ?? value;
}

export function questionTitle(qId: string): string {
  return CC_QUESTIONS.find((q) => q.id === qId)?.title ?? qId;
}
