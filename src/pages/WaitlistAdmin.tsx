import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database, Lock, RefreshCw, Users, Zap, TrendingUp } from "lucide-react";
import { fetchWaitlistEntries, fetchWaitlistStats, type WaitlistEntry } from "../lib/waitlistApi";
import Button from "../components/ui/Button";

const ADMIN_KEY_STORAGE = "vhois_admin_key";

export default function WaitlistAdmin() {
  const [key, setKey] = useState(() => sessionStorage.getItem(ADMIN_KEY_STORAGE) || "");
  const [inputKey, setInputKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<{ total: number; today: number; byRole: { role: string; count: number }[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (adminKey: string) => {
    setLoading(true);
    setError(null);
    try {
      const [e, s] = await Promise.all([
        fetchWaitlistEntries(adminKey),
        fetchWaitlistStats(adminKey),
      ]);
      setEntries(e);
      setStats(s);
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
              <h1 className="font-mono font-bold text-xl text-platinum">Waitlist Admin</h1>
              <p className="text-xs text-void-600">Protected dashboard</p>
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
            Default dev key: vhois-admin-dev (see .env.example)
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
            <Database className="w-10 h-10 text-platinum" />
            <div>
              <h1 className="font-mono font-bold text-3xl text-platinum">Signal Queue Admin</h1>
              <p className="text-void-600 text-sm">Live SQLite · all waitlist transmissions</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => load(key)} loading={loading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: "Total Signups", value: stats.total, icon: Users },
              { label: "Today", value: stats.today, icon: TrendingUp },
              { label: "Roles Tracked", value: stats.byRole.length, icon: Zap },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass rounded-xl p-6 border border-void-300/40">
                <Icon className="w-6 h-6 text-void-600 mb-3" />
                <p className="text-xs font-mono text-void-600">{label}</p>
                <p className="font-mono font-bold text-4xl text-platinum mt-1">{value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="glass-dark rounded-2xl border border-void-300/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-void-300 font-mono text-xs text-void-600">
                  <th className="p-4">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Capabilities</th>
                  <th className="p-4">Hz</th>
                  <th className="p-4">Queue</th>
                  <th className="p-4">Joined</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((row) => (
                  <tr key={row.id} className="border-b border-void-300/30 hover:bg-void-50/50">
                    <td className="p-4 font-mono text-void-600">{row.id}</td>
                    <td className="p-4 text-platinum font-medium">{row.name}</td>
                    <td className="p-4 text-void-600">{row.email}</td>
                    <td className="p-4">
                      <span className="text-xs font-mono px-2 py-1 rounded bg-void-100 text-platinum">
                        {row.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {row.capabilities.map((c) => (
                          <span key={c} className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-void-300 text-void-600">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-void-600">{row.frequency_hz}</td>
                    <td className="p-4 font-mono text-platinum">#{row.queue_position}</td>
                    <td className="p-4 text-void-600 text-xs">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {entries.length === 0 && (
              <p className="text-center py-16 text-void-600 font-mono">No transmissions yet</p>
            )}
          </div>
        </div>

        {stats && stats.byRole.length > 0 && (
          <div className="mt-8 glass rounded-xl p-6 border border-void-300/40">
            <p className="font-mono text-sm text-void-600 mb-4">BY ROLE</p>
            <div className="flex flex-wrap gap-3">
              {stats.byRole.map((r) => (
                <span key={r.role} className="font-mono text-sm text-platinum">
                  {r.role}: <strong>{r.count}</strong>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
