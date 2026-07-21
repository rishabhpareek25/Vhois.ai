/** Base stream URL — e.g. wss://api.vhoisai.in/v1/pipeline/stream */
const WS_BASE = (import.meta.env.VITE_LIVE_TRANSCRIPTION_WS_URL as string | undefined)?.trim().replace(/\/$/, "");

/** Client key from CLIENT_API_KEYS (query param auth) */
const API_KEY = (import.meta.env.VITE_LIVE_TRANSCRIPTION_API_KEY as string | undefined)?.trim();

/**
 * Optional fixed language — only set when you want to force one language.
 * Leave unset for Sarvam auto-detect (recommended).
 */
export const LIVE_TRANSCRIPTION_FORCED_LANGUAGE = (
  import.meta.env.VITE_LIVE_TRANSCRIPTION_LANGUAGE as string | undefined
)?.trim();

export function isLiveTranscriptionConfigured() {
  return Boolean(WS_BASE && API_KEY);
}

export function buildLiveStreamWebSocketUrl(): string | null {
  if (!WS_BASE || !API_KEY) return null;

  const url = new URL(WS_BASE);
  url.searchParams.set("api_key", API_KEY);
  if (LIVE_TRANSCRIPTION_FORCED_LANGUAGE) {
    url.searchParams.set("language", LIVE_TRANSCRIPTION_FORCED_LANGUAGE);
  }
  return url.toString();
}

/** Outbound audio — pcm_f32le @ 16 kHz mono (100 ms frames) */
export const LIVE_AUDIO_CONFIG = {
  sampleRate: 16000,
  channelCount: 1,
  /** 1600 samples × 4 bytes = 6400 bytes per frame (~100 ms) */
  frameSamples: 1600,
  /** ScriptProcessor buffer (must be power of 2); we send first frameSamples from each callback */
  processorBufferSize: 2048,
  readyTimeoutMs: 30_000,
  wsOpenTimeoutMs: 15_000,
} as const;

export type TranscriptEventData = {
  speaker: string;
  text: string;
  start: number;
  end: number;
  detectedLanguage?: string;
};

export type PipelineReadyMessage = {
  type: "ready";
  languageMode?: string;
  language?: string | null;
  data?: {
    languageMode?: string;
    language?: string | null;
    diarization?: string;
    transcription?: string;
    audioFormat?: {
      sampleRate?: number;
      channels?: number;
      encoding?: string;
    };
  };
};

export type PipelineEvent =
  | PipelineReadyMessage
  | { type: "error"; message: string }
  | { type: "diarization_speaker_start"; data: { speaker: string; timestamp: number } }
  | { type: "diarization_speaker_end"; data: { speaker: string; timestamp: number } }
  | { type: "transcription_partial"; data: TranscriptEventData }
  | { type: "transcription_final"; data: TranscriptEventData };

export function parsePipelineEvent(raw: unknown): PipelineEvent | null {
  let payload: unknown = raw;
  if (typeof raw === "string") {
    try {
      payload = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!payload || typeof payload !== "object") return null;
  const obj = payload as Record<string, unknown>;
  if (typeof obj.type !== "string") return null;
  return obj as PipelineEvent;
}

export function readReadyLanguageMode(msg: PipelineReadyMessage): string {
  return msg.languageMode ?? msg.data?.languageMode ?? (LIVE_TRANSCRIPTION_FORCED_LANGUAGE ? "fixed" : "auto");
}

/** SPEAKER_00 → Speaker 1 */
export function formatSpeakerLabel(speaker: string) {
  const match = speaker.match(/SPEAKER[_-]?(\d+)/i);
  if (match) return `Speaker ${Number(match[1]) + 1}`;
  return speaker.replace(/_/g, " ");
}

/** hi-IN → Hindi */
export function formatDetectedLanguage(code?: string | null) {
  if (!code) return null;
  try {
    const lang = code.split("-")[0];
    return new Intl.DisplayNames(["en"], { type: "language" }).of(lang) ?? code;
  } catch {
    return code;
  }
}

export function formatLanguageBadge(languageMode: string, detectedLanguage?: string | null) {
  if (detectedLanguage) {
    return formatDetectedLanguage(detectedLanguage) ?? detectedLanguage;
  }
  if (languageMode === "auto" || !LIVE_TRANSCRIPTION_FORCED_LANGUAGE) {
    return "Auto";
  }
  return LIVE_TRANSCRIPTION_FORCED_LANGUAGE.toUpperCase();
}
