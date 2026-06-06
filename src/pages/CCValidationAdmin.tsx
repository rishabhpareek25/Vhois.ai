import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  Lock,
  RefreshCw,
  Users,
  TrendingUp,
  Zap,
  ChevronDown,
  Building2,
  Phone,
  Mail,
  MapPin,
  X,
} from "lucide-react";
import Button from "../components/ui/Button";
import { CC_QUESTIONS } from "../data/ccValidationQuestions";
import { fetchCCValidationEntries, type CCValidationEntry } from "../lib/ccValidationApi";
import { formatAnswer } from "../lib/ccValidationLabels";

const ADMIN_KEY_STORAGE = "vhois_admin_key";

export default function CCValidationAdmin() {
  const [key, setKey] = useState(() => sessionStorage.getItem(ADMIN_KEY_STORAGE) || "");
  const [inputKey, setInputKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [entries, setEntries] = useState<CCValidationEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<CCValidationEntry | null>(null);

  const load = async (adminKey: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCCValidationEntries(adminKey);
      setEntries(data);
      setAuthed(true);
      sessionStorage.setItem(ADMIN_KEY_STORAGE, adminKey);
      setKey(adminKey);
    } catch {
      setError("Invalid admin key or API unreachable. Use WAITLIST_ADMIN_SECRET from GitHub secrets.");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (key) load(key);
  }, []);

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = entries.filter((e) => e.created_at?.startsWith(today)).length;
    const avgScore =
      entries.length > 0
        ? Math.round(
            entries.reduce((s, e) => s + e.pilot_readiness_score, 0) / entries.length
          )
        : 0;
    const hotLeads = entries.filter((e) => e.pilot_readiness_score >= 70).length;
    return { total: entries.length, today: todayCount, avgScore, hotLeads };
  }, [entries]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    load(inputKey);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-2xl p-8 max-w-md w-full border border-void-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-platinum" />
            <div>
              <h1 className="font-mono font-bold text-xl text-platinum">CC Validation Admin</h1>
              <p className="text-xs text-void-600">Call center QA intelligence responses</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Admin secret key"
              className="w-full px-4 py-3 bg-void-50 border border-void-300 rounded-lg text-platinum focus:outline-none focus:border-platinum"
            />
            {error && <p className="text-sm text-red-400 font-mono">{error}</p>}
            <Button variant="primary" size="md" className="w-full" loading={loading}>
              Unlock Dashboard
            </Button>
          </form>
          <p className="text-[10px] text-void-700 mt-4 font-mono">
            Same key as /admin/waitlist · WAITLIST_ADMIN_SECRET
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <Headphones className="w-10 h-10 text-platinum" />
            <div>
              <h1 className="font-mono font-bold text-3xl text-platinum">QA Pulse Admin</h1>
              <p className="text-void-600 text-sm">Call center QA validation submissions</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => load(key)} loading={loading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Responses", value: stats.total, icon: Users },
            { label: "Today", value: stats.today, icon: TrendingUp },
            { label: "Avg Pilot Score", value: `${stats.avgScore}%`, icon: Zap },
            { label: "Hot Leads (≥70%)", value: stats.hotLeads, icon: Headphones },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass rounded-xl p-5 border border-void-300/40">
              <Icon className="w-5 h-5 text-void-600 mb-2" />
              <p className="text-[10px] font-mono text-void-600 uppercase">{label}</p>
              <p className="font-mono font-bold text-3xl text-platinum mt-1">{value}</p>
            </div>
          ))}
        </div>

        <div className="glass-dark rounded-2xl border border-void-300/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-void-300 font-mono text-xs text-void-600">
                  <th className="p-4">Company</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Pilot Score</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {entries.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-void-300/30 hover:bg-void-50/50 cursor-pointer"
                    onClick={() => setSelected(row)}
                  >
                    <td className="p-4 text-platinum font-medium">{row.company}</td>
                    <td className="p-4">
                      <p className="text-platinum">{row.name}</p>
                      <p className="text-xs text-void-600">{row.email}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-mono px-2 py-1 rounded bg-void-100 text-platinum">
                        {row.role}
                      </span>
                    </td>
                    <td className="p-4 text-void-600">{row.city}</td>
                    <td className="p-4">
                      <span
                        className={`font-mono font-bold ${
                          row.pilot_readiness_score >= 70
                            ? "text-platinum"
                            : row.pilot_readiness_score >= 50
                              ? "text-ash"
                              : "text-void-600"
                        }`}
                      >
                        {row.pilot_readiness_score}%
                      </span>
                    </td>
                    <td className="p-4 text-void-600 text-xs whitespace-nowrap">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="p-4 text-void-600">
                      <ChevronDown className="w-4 h-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {entries.length === 0 && (
              <p className="text-center py-16 text-void-600 font-mono">
                No validation packets yet · share /call-center-qa
              </p>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-void/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-dark rounded-2xl border border-void-300/60 p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-mono text-void-600 uppercase">Validation packet</p>
                  <h2 className="text-2xl font-bold text-platinum">{selected.company}</h2>
                  <p className="text-void-600 text-sm mt-1">{selected.name} · {selected.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-lg hover:bg-void-100 text-void-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6 text-sm">
                {[
                  { icon: Mail, label: selected.email },
                  { icon: Phone, label: selected.phone },
                  { icon: MapPin, label: selected.city },
                  { icon: Building2, label: `Pilot score ${selected.pilot_readiness_score}%` },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-void-600">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {CC_QUESTIONS.filter((q) => q.type !== "contact").map((q) => {
                  const raw = selected.answers[q.id];
                  if (!raw || (Array.isArray(raw) && raw.length === 0)) return null;
                  return (
                    <div
                      key={q.id}
                      className="rounded-xl border border-void-300/40 bg-void-50/30 p-4"
                    >
                      <p className="text-[10px] font-mono text-void-600 mb-1">
                        Q{q.number} · {q.phase}
                      </p>
                      <p className="text-sm text-ash mb-2">{q.title}</p>
                      <p className="text-platinum font-medium text-sm">
                        {formatAnswer(q.id, raw)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-void-700 font-mono mt-6">
                Submitted {new Date(selected.created_at).toLocaleString()} · ID {selected.id}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
