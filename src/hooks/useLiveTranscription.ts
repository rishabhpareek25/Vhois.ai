import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildLiveStreamWebSocketUrl,
  isLiveTranscriptionConfigured,
  LIVE_AUDIO_CONFIG,
  parsePipelineEvent,
  readReadyLanguageMode,
  type PipelineEvent,
  type PipelineReadyMessage,
} from "../lib/liveTranscriptionConfig";

export type TranscriptTurn = {
  id: string;
  speaker: string;
  text: string;
  isFinal: boolean;
  isSpeaking: boolean;
  start?: number;
  end?: number;
  detectedLanguage?: string;
  timestamp: number;
};

export type LiveSessionState = "idle" | "connecting" | "live" | "stopping" | "error";

export type ConnectionPhase =
  | "opening_channel"
  | "pipeline_warmup"
  | "mic_permission"
  | "signal_lock"
  | "streaming";

const CONNECT_PHASES: { phase: ConnectionPhase; label: string }[] = [
  { phase: "opening_channel", label: "Opening secure audio channel…" },
  { phase: "pipeline_warmup", label: "Warming diarization + transcription pipeline (5–15 s)…" },
  { phase: "mic_permission", label: "Requesting live microphone access…" },
  { phase: "signal_lock", label: "Signal locked — starting live capture…" },
  { phase: "streaming", label: "Live capture active" },
];

function turnId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function waitForWebSocketOpen(ws: WebSocket, timeoutMs: number) {
  return new Promise<void>((resolve, reject) => {
    if (ws.readyState === WebSocket.OPEN) {
      resolve();
      return;
    }

    const timer = window.setTimeout(() => {
      reject(new Error("Could not reach the transcription service."));
    }, timeoutMs);

    ws.onopen = () => {
      window.clearTimeout(timer);
      resolve();
    };

    ws.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("Could not reach the transcription service."));
    };
  });
}

function waitForReadySignal(ws: WebSocket, timeoutMs: number) {
  return new Promise<PipelineReadyMessage>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      ws.removeEventListener("message", onMessage);
      reject(new Error("Pipeline setup timed out after 30 seconds. Please try again."));
    }, timeoutMs);

    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string") return;

      const parsed = parsePipelineEvent(event.data);
      if (!parsed) return;

      if (parsed.type === "error") {
        window.clearTimeout(timer);
        ws.removeEventListener("message", onMessage);
        reject(new Error(parsed.message || "Live stream error"));
        return;
      }

      if (parsed.type === "ready") {
        window.clearTimeout(timer);
        ws.removeEventListener("message", onMessage);
        resolve(parsed);
      }
    };

    ws.addEventListener("message", onMessage);
  });
}

export function useLiveTranscription() {
  const [state, setState] = useState<LiveSessionState>("idle");
  const [connectionPhase, setConnectionPhase] = useState<ConnectionPhase>("opening_channel");
  const [turns, setTurns] = useState<TranscriptTurn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [languageMode, setLanguageMode] = useState("auto");
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const phaseTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);
  const streamingRef = useRef(false);
  const sessionStateRef = useRef<LiveSessionState>("idle");
  const handleEventRef = useRef<(event: PipelineEvent) => void>(() => {});

  const cleanupMedia = useCallback(() => {
    processorRef.current?.disconnect();
    processorRef.current = null;

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (audioContextRef.current?.state !== "closed") {
      void audioContextRef.current?.close();
    }
    audioContextRef.current = null;
  }, []);

  const cleanupSocket = useCallback(() => {
    const ws = wsRef.current;
    wsRef.current = null;
    if (!ws) return;
    ws.onopen = null;
    ws.onmessage = null;
    ws.onerror = null;
    ws.onclose = null;
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
      ws.close();
    }
  }, []);

  const resetTimers = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (phaseTimerRef.current) window.clearInterval(phaseTimerRef.current);
    timerRef.current = null;
    phaseTimerRef.current = null;
  }, []);

  const fullCleanup = useCallback(() => {
    resetTimers();
    cleanupMedia();
    cleanupSocket();
  }, [cleanupMedia, cleanupSocket, resetTimers]);

  const upsertTurn = useCallback(
    (
      speaker: string,
      patch: Partial<
        Pick<TranscriptTurn, "text" | "isFinal" | "isSpeaking" | "start" | "end" | "detectedLanguage">
      >,
      createIfMissing = true
    ) => {
      if (patch.detectedLanguage) {
        setDetectedLanguage(patch.detectedLanguage);
      }

      setTurns((prev) => {
        for (let i = prev.length - 1; i >= 0; i--) {
          if (prev[i].speaker === speaker && !prev[i].isFinal) {
            const updated = [...prev];
            updated[i] = { ...updated[i], ...patch };
            return updated;
          }
        }

        if (!createIfMissing) return prev;

        return [
          ...prev,
          {
            id: turnId(),
            speaker,
            text: patch.text ?? "",
            isFinal: patch.isFinal ?? false,
            isSpeaking: patch.isSpeaking ?? true,
            start: patch.start,
            end: patch.end,
            timestamp: Date.now(),
          },
        ];
      });
    },
    []
  );

  const appendTurn = useCallback((speaker: string, start?: number) => {
    setTurns((prev) => [
      ...prev,
      {
        id: turnId(),
        speaker,
        text: "",
        isFinal: false,
        isSpeaking: true,
        start,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const markSpeakerEnded = useCallback((speaker: string, end?: number) => {
    setTurns((prev) =>
      prev.map((turn) =>
        turn.speaker === speaker && !turn.isFinal
          ? { ...turn, isSpeaking: false, end: end ?? turn.end }
          : turn
      )
    );
  }, []);

  handleEventRef.current = (event: PipelineEvent) => {
    switch (event.type) {
      case "diarization_speaker_start":
        appendTurn(event.data.speaker, event.data.timestamp);
        break;
      case "transcription_partial":
        upsertTurn(event.data.speaker, {
          text: event.data.text,
          isFinal: false,
          isSpeaking: true,
          start: event.data.start,
          end: event.data.end,
          detectedLanguage: event.data.detectedLanguage,
        });
        break;
      case "transcription_final":
        upsertTurn(event.data.speaker, {
          text: event.data.text,
          isFinal: true,
          isSpeaking: false,
          start: event.data.start,
          end: event.data.end,
          detectedLanguage: event.data.detectedLanguage,
        });
        break;
      case "diarization_speaker_end":
        markSpeakerEnded(event.data.speaker, event.data.timestamp);
        break;
      case "error":
        setError(event.message);
        setState("error");
        streamingRef.current = false;
        fullCleanup();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    sessionStateRef.current = state;
  }, [state]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      streamingRef.current = false;
      fullCleanup();
    };
  }, [fullCleanup]);

  const beginPhaseAnimation = useCallback(() => {
    let idx = 0;
    setConnectionPhase(CONNECT_PHASES[0].phase);
    phaseTimerRef.current = window.setInterval(() => {
      idx = Math.min(idx + 1, CONNECT_PHASES.length - 2);
      setConnectionPhase(CONNECT_PHASES[idx].phase);
    }, 2800);
  }, []);

  const startMicPipeline = useCallback(async (ws: WebSocket) => {
    setConnectionPhase("mic_permission");

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        channelCount: LIVE_AUDIO_CONFIG.channelCount,
      },
      video: false,
    });

    if (!mountedRef.current) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    streamRef.current = stream;

    const audioContext = new AudioContext({ sampleRate: LIVE_AUDIO_CONFIG.sampleRate });
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(
      LIVE_AUDIO_CONFIG.processorBufferSize,
      1,
      1
    );
    processorRef.current = processor;

    processor.onaudioprocess = (event) => {
      if (!streamingRef.current || ws.readyState !== WebSocket.OPEN) return;
      const channel = event.inputBuffer.getChannelData(0);
      const frame = channel.subarray(0, LIVE_AUDIO_CONFIG.frameSamples);
      ws.send(frame.buffer.slice(frame.byteOffset, frame.byteOffset + frame.byteLength));
    };

    source.connect(processor);
    processor.connect(audioContext.destination);
  }, []);

  const start = useCallback(async () => {
    const current = sessionStateRef.current;
    if (current === "connecting" || current === "live" || current === "stopping") return;

    const wsUrl = buildLiveStreamWebSocketUrl();
    if (!isLiveTranscriptionConfigured() || !wsUrl) {
      setError(
        "Live demo is not configured. Set VITE_LIVE_TRANSCRIPTION_WS_URL and VITE_LIVE_TRANSCRIPTION_API_KEY."
      );
      setState("error");
      return;
    }

    setError(null);
    setTurns([]);
    setElapsedSec(0);
    setLanguageMode("auto");
    setDetectedLanguage(null);
    setState("connecting");
    beginPhaseAnimation();

    try {
      setConnectionPhase("opening_channel");
      const ws = new WebSocket(wsUrl);
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      await waitForWebSocketOpen(ws, LIVE_AUDIO_CONFIG.wsOpenTimeoutMs);
      if (!mountedRef.current) return;

      setConnectionPhase("pipeline_warmup");

      const readyMessage = await waitForReadySignal(ws, LIVE_AUDIO_CONFIG.readyTimeoutMs);
      if (!mountedRef.current) return;

      setLanguageMode(readReadyLanguageMode(readyMessage));

      ws.onmessage = (event) => {
        if (typeof event.data !== "string") return;
        const parsed = parsePipelineEvent(event.data);
        if (parsed) handleEventRef.current(parsed);
      };

      ws.onclose = () => {
        if (!mountedRef.current) return;
        streamingRef.current = false;
        if (sessionStateRef.current === "live") {
          setError("Connection closed. Start a new session to continue.");
          setState("error");
        } else if (sessionStateRef.current !== "stopping") {
          setState("idle");
        }
        cleanupMedia();
      };

      ws.onerror = () => {
        if (sessionStateRef.current === "live") {
          setError("Stream interrupted. Please start again.");
          setState("error");
          streamingRef.current = false;
          fullCleanup();
        }
      };

      await startMicPipeline(ws).catch(() => {
        throw new Error("Microphone access is required for live capture.");
      });
      if (!mountedRef.current) return;

      setConnectionPhase("signal_lock");
      streamingRef.current = true;
      setConnectionPhase("streaming");
      setState("live");

      timerRef.current = window.setInterval(() => {
        setElapsedSec((s) => s + 1);
      }, 1000);
    } catch (err) {
      streamingRef.current = false;
      fullCleanup();
      const message = err instanceof Error ? err.message : "Unable to start live capture.";
      setError(message);
      setState("error");
    } finally {
      if (phaseTimerRef.current) {
        window.clearInterval(phaseTimerRef.current);
        phaseTimerRef.current = null;
      }
    }
  }, [beginPhaseAnimation, cleanupMedia, fullCleanup, startMicPipeline]);

  const stop = useCallback(async () => {
    if (state !== "live" && state !== "connecting") return;

    setState("stopping");
    streamingRef.current = false;
    resetTimers();

    await new Promise((r) => window.setTimeout(r, 200));
    fullCleanup();

    if (mountedRef.current) {
      setTurns((prev) => prev.map((turn) => ({ ...turn, isSpeaking: false })));
      setState("idle");
    }
  }, [fullCleanup, resetTimers, state]);

  const connectionLabel =
    CONNECT_PHASES.find((p) => p.phase === connectionPhase)?.label ?? CONNECT_PHASES[0].label;

  return {
    state,
    connectionPhase,
    connectionLabel,
    turns,
    error,
    elapsedSec,
    languageMode,
    detectedLanguage,
    isConfigured: isLiveTranscriptionConfigured(),
    start,
    stop,
  };
}
