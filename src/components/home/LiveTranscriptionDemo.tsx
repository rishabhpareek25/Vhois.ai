import { useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Radio,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { formatSpeakerLabel, formatLanguageBadge } from "../../lib/liveTranscriptionConfig";
import { useLiveTranscription, type TranscriptTurn } from "../../hooks/useLiveTranscription";

const SPEAKER_PALETTE = [
  { chip: "text-indigo-700", dot: "bg-indigo-500", line: "border-indigo-500" },
  { chip: "text-sky-700", dot: "bg-sky-500", line: "border-sky-500" },
  { chip: "text-violet-700", dot: "bg-violet-500", line: "border-violet-500" },
  { chip: "text-emerald-700", dot: "bg-emerald-500", line: "border-emerald-500" },
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
    <div className="relative py-8 sm:py-10">
      <div className="flex items-center justify-center gap-2 mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary-500"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary-600 mb-1.5">
          Signal transmitting
        </p>
        <motion.p
          key={label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 font-medium"
        >
          {label}
        </motion.p>
        <p className="mt-1 text-[10px] text-gray-400">Pipeline warm-up · 5–15 s</p>
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

function TranscriptTurnRow({ turn }: { turn: TranscriptTurn }) {
  const style = speakerStyle(turn.speaker);
  const label = formatSpeakerLabel(turn.speaker);
  const showPartial = turn.isSpeaking && !turn.isFinal;
  const displayText = turn.text.trim() || (turn.isSpeaking ? "…" : "…");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      className={`border-l-2 pl-2.5 py-1.5 ${style.line} ${showPartial ? "opacity-90" : ""}`}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <span className={`text-[10px] font-bold uppercase tracking-wide ${style.chip}`}>
          {label}
        </span>
        {showPartial && (
          <span className="text-[9px] font-mono text-primary-500 uppercase">live</span>
        )}
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

  const statusDot =
    state === "live"
      ? "bg-red-500"
      : state === "connecting"
        ? "bg-amber-400 animate-pulse"
        : state === "error"
          ? "bg-orange-500"
          : "bg-primary-500";

  return (
    <section id="live-demo" className="relative pt-8 sm:pt-10 pb-10 sm:pb-14 bg-white overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.05),transparent_70%)]" />
      </div>

      <div className="page-bleed relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-5 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600 mb-3">
            <Sparkles className="w-3 h-3 text-primary-600" />
            Try it live
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight leading-tight mb-2">
            Live transcription · <span className="text-gradient">speaker diarization</span>
          </h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            Speak in Hindi, English, or mixed — each voice streams in its own lane.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="rounded-2xl border border-gray-200 bg-white shadow-soft overflow-hidden"
        >
          {/* Compact toolbar */}
          <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-b border-gray-100 bg-gray-50/80">
            <div className="flex items-center gap-2 min-w-0">
              <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot}`} />
              <span className="text-xs font-semibold text-gray-900 truncate">Live capture</span>
              {isLive && (
                <span className="text-[10px] font-mono text-gray-400 tabular-nums hidden sm:inline">
                  {formatElapsed(elapsedSec)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono text-gray-500">
              <span className="px-1.5 py-0.5 rounded bg-white border border-gray-200">{languageLabel}</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-gray-200 hidden sm:inline">
                {activeSpeakers} spk
              </span>
              {isLive && (
                <span className="px-1.5 py-0.5 rounded bg-white border border-gray-200 sm:hidden tabular-nums">
                  {formatElapsed(elapsedSec)}
                </span>
              )}
            </div>
          </div>

          {/* Transcript / connecting area */}
          <div className="px-3 sm:px-4 py-3 min-h-[200px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              {state === "connecting" ? (
                <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <SignalTransmission label={connectionLabel} />
                  <div className="text-center -mt-2">
                    <button
                      type="button"
                      onClick={() => void stop()}
                      className="text-[11px] text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="console" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {(isLive || state === "stopping") && <LiveWaveBars active={isLive} />}

                  <div
                    ref={feedRef}
                    className="max-h-[240px] sm:max-h-[280px] overflow-y-auto space-y-2 scroll-smooth pr-0.5"
                  >
                    {visibleTurns.length === 0 && state === "idle" && (
                      <div className="py-8 sm:py-10 text-center">
                        <Mic className="w-5 h-5 text-primary-500 mx-auto mb-2 opacity-80" />
                        <p className="text-sm font-medium text-gray-800">Tap start and speak</p>
                        <p className="text-[11px] text-gray-400 mt-1 max-w-xs mx-auto">
                          ~15 s to connect · auto language · speaker lanes
                        </p>
                        {!isConfigured && (
                          <p className="mt-2 text-[10px] font-mono text-amber-700">
                            Set WS URL + API key in .env
                          </p>
                        )}
                      </div>
                    )}

                    {visibleTurns.map((turn) => (
                      <TranscriptTurnRow key={turn.id} turn={turn} />
                    ))}

                    {isLive && visibleTurns.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-10 animate-pulse">Listening…</p>
                    )}
                  </div>

                  {error && (
                    <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-orange-50 px-2.5 py-2 text-xs text-orange-800">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
                      <span>{error}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Compact action bar */}
          <div className="px-3 sm:px-4 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3">
            <p className="text-[10px] sm:text-[11px] text-gray-400 truncate hidden sm:block">
              {isLive ? "Streaming · 16 kHz mono" : "Wait for pipeline, then speak"}
            </p>
            <div className="flex items-center gap-2 ml-auto w-full sm:w-auto">
              {!isLive ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => void start()}
                  disabled={isBusy || !isConfigured}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBusy ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      {state === "stopping" ? "Stopping…" : "Connecting…"}
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" />
                      Start
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => void stop()}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
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
