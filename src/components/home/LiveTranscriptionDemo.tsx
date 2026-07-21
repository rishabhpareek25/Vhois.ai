import { useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Radio,
  Users,
  Waves,
  Loader2,
  AlertCircle,
  Sparkles,
  Globe,
} from "lucide-react";
import { formatSpeakerLabel, formatLanguageBadge } from "../../lib/liveTranscriptionConfig";
import { useLiveTranscription, type TranscriptTurn } from "../../hooks/useLiveTranscription";

const SPEAKER_PALETTE = [
  { chip: "text-indigo-700", dot: "bg-indigo-500", line: "border-l-indigo-500" },
  { chip: "text-sky-700", dot: "bg-sky-500", line: "border-l-sky-500" },
  { chip: "text-violet-700", dot: "bg-violet-500", line: "border-l-violet-500" },
  { chip: "text-emerald-700", dot: "bg-emerald-500", line: "border-l-emerald-500" },
];

function speakerStyle(speaker: string) {
  const normalized = speaker.toLowerCase().replace(/\s+/g, "");
  const hash = normalized.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return SPEAKER_PALETTE[hash % SPEAKER_PALETTE.length];
}

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function SignalTransmission({ label }: { label: string }) {
  return (
    <div className="relative py-6 sm:py-8 px-2">
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary-300/50 to-transparent" />

      <div className="relative flex items-center justify-center gap-2 sm:gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary-500"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-primary-200/60"
        animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mt-5 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-[10px] font-semibold uppercase tracking-wider">
          <Radio className="w-3 h-3 animate-pulse" />
          Connecting
        </div>
        <motion.p
          key={label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs sm:text-sm text-gray-600 font-medium max-w-sm mx-auto leading-snug"
        >
          {label}
        </motion.p>
      </div>
    </div>
  );
}

function LiveWaveBars({ active }: { active: boolean }) {
  return (
    <div className="flex items-end justify-center gap-0.5 h-6 mb-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full bg-primary-500/70"
          animate={
            active
              ? { height: ["20%", `${30 + ((i * 17) % 50)}%`, "20%"] }
              : { height: "16%" }
          }
          transition={
            active
              ? { duration: 0.5 + (i % 4) * 0.07, repeat: Infinity, ease: "easeInOut", delay: i * 0.03 }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

function TranscriptTurnCard({ turn }: { turn: TranscriptTurn }) {
  const style = speakerStyle(turn.speaker);
  const label = formatSpeakerLabel(turn.speaker);
  const showPartial = turn.isSpeaking && !turn.isFinal;
  const displayText = turn.text.trim() || (turn.isSpeaking ? "Listening…" : "…");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-l-[3px] pl-2.5 pr-1 py-1.5 ${style.line} ${showPartial ? "opacity-90" : ""}`}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide ${style.chip}`}>
          <span className={`w-1 h-1 rounded-full ${style.dot} ${turn.isSpeaking ? "animate-pulse" : ""}`} />
          {label}
        </span>
        {showPartial && <span className="text-[9px] font-mono text-primary-600 uppercase">Live</span>}
        {turn.isFinal && turn.end != null && (
          <span className="text-[9px] font-mono text-gray-400 tabular-nums ml-auto">{turn.end.toFixed(1)}s</span>
        )}
      </div>
      <p className="text-[13px] sm:text-sm text-gray-800 leading-snug">
        {displayText}
        {showPartial && turn.text.trim() && (
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-3.5 bg-primary-500 ml-0.5 align-middle"
          />
        )}
      </p>
    </motion.div>
  );
}

export default function LiveTranscriptionDemo() {
  const {
    state,
    connectionLabel,
    turns,
    error,
    elapsedSec,
    languageMode,
    detectedLanguage,
    isConfigured,
    start,
    stop,
  } = useLiveTranscription();

  const feedRef = useRef<HTMLDivElement>(null);
  const isBusy = state === "connecting" || state === "stopping";
  const isLive = state === "live";

  const visibleTurns = useMemo(
    () => turns.filter((turn) => turn.text.trim() || turn.isSpeaking),
    [turns]
  );

  const languageLabel = formatLanguageBadge(languageMode, detectedLanguage);
  const activeSpeakers = useMemo(() => new Set(turns.map((t) => t.speaker)).size, [turns]);

  useEffect(() => {
    if (!feedRef.current) return;
    feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [visibleTurns, state]);

  const statusBadge = (() => {
    if (state === "live") return { text: "Live", className: "bg-red-50 text-red-700 border-red-100" };
    if (state === "connecting") return { text: "Connecting", className: "bg-amber-50 text-amber-700 border-amber-100" };
    if (state === "stopping") return { text: "Stopping", className: "bg-gray-100 text-gray-600 border-gray-200" };
    if (state === "error") return { text: "Error", className: "bg-orange-50 text-orange-700 border-orange-100" };
    return { text: "Ready", className: "bg-primary-50 text-primary-700 border-primary-100" };
  })();

  return (
    <section id="live-demo" className="relative pt-8 sm:pt-10 pb-10 sm:pb-12 bg-white overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.05),transparent_70%)]" />
      </div>
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />

      <div className="page-bleed relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-5 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-primary-600" />
            Try it live
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-tight leading-tight mb-2">
            Live transcription with{" "}
            <span className="text-gradient">speaker diarization</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            Speak naturally — Hindi, English, or mixed. Each voice gets its own lane, streamed in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.04 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-gray-200 bg-white shadow-soft overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center shrink-0">
                  <Waves className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="font-semibold text-sm text-gray-900 truncate leading-tight">Live Capture</p>
                  <p className="text-[10px] text-gray-500 truncate leading-tight">Diarization · auto language</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wide ${statusBadge.className}`}
                >
                  {isLive && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                    </span>
                  )}
                  {statusBadge.text}
                </span>
                <span
                  className="inline-flex items-center gap-1 text-[10px] text-gray-600 px-1.5 py-0.5 rounded bg-white border border-gray-200"
                  title={detectedLanguage ? `Detected: ${detectedLanguage}` : "Language auto-detected"}
                >
                  <Globe className="w-2.5 h-2.5 text-primary-500" />
                  {languageLabel}
                </span>
                {isLive && (
                  <span className="text-[10px] font-mono text-gray-500 tabular-nums px-1.5 py-0.5 rounded bg-white border border-gray-200">
                    {formatElapsed(elapsedSec)}
                  </span>
                )}
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-gray-600 px-1.5 py-0.5 rounded bg-white border border-gray-200">
                  <Users className="w-2.5 h-2.5 text-primary-500" />
                  {activeSpeakers}
                </span>
              </div>
            </div>

            <div className="px-3 sm:px-4 py-3">
              <AnimatePresence mode="wait">
                {state === "connecting" && (
                  <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <SignalTransmission label={connectionLabel} />
                    <div className="flex justify-center -mt-1 pb-1">
                      <button
                        type="button"
                        onClick={() => void stop()}
                        className="text-[11px] font-medium text-gray-500 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {state !== "connecting" && (
                  <motion.div key="console" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {(isLive || state === "stopping") && <LiveWaveBars active={isLive} />}

                    <div
                      ref={feedRef}
                      className="min-h-[140px] max-h-[240px] sm:max-h-[280px] overflow-y-auto rounded-xl bg-gray-50/70 px-2 py-2 space-y-1.5 scroll-smooth"
                    >
                      {visibleTurns.length === 0 && state === "idle" && (
                        <div className="min-h-[120px] flex flex-col items-center justify-center text-center px-2 py-4">
                          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-2">
                            <Mic className="w-4 h-4 text-primary-600" />
                          </div>
                          <p className="text-xs font-medium text-gray-800 mb-0.5">Tap start to capture live audio</p>
                          <p className="text-[11px] text-gray-500 max-w-xs leading-snug">
                            Pipeline warm-up takes ~5–15s, then speak — each speaker gets a lane.
                          </p>
                          {!isConfigured && (
                            <p className="mt-2 text-[10px] font-mono text-amber-700 bg-amber-50 border border-amber-100 rounded px-2 py-1">
                              Set VITE_LIVE_TRANSCRIPTION_WS_URL and API key in .env
                            </p>
                          )}
                        </div>
                      )}

                      {visibleTurns.map((turn) => (
                        <TranscriptTurnCard key={turn.id} turn={turn} />
                      ))}

                      {isLive && visibleTurns.length === 0 && (
                        <div className="min-h-[100px] flex items-center justify-center">
                          <p className="text-xs text-gray-500 animate-pulse">Listening…</p>
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="mt-2 flex items-start gap-1.5 rounded-lg border border-orange-100 bg-orange-50 px-2.5 py-2 text-xs text-orange-800">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-3 sm:px-4 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3">
              <p className="text-[11px] text-gray-500 leading-snug hidden sm:block flex-1">
                {isLive ? "Streaming · stop when done" : "Connect, wait for ready, then speak"}
              </p>

              {!isLive ? (
                <motion.button
                  whileTap={{ scale: isBusy ? 1 : 0.98 }}
                  onClick={() => void start()}
                  disabled={isBusy || !isConfigured}
                  className="ml-auto inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isBusy ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      {state === "stopping" ? "Stopping…" : "Connecting…"}
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" />
                      Start live capture
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => void stop()}
                  className="ml-auto inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  <MicOff className="w-3.5 h-3.5" />
                  Stop
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
