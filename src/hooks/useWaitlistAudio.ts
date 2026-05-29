import { useCallback, useRef } from "react";

type Tone = "step" | "type" | "select" | "success" | "error";

export function useWaitlistAudio() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  };

  const playTone = useCallback((tone: Tone) => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const profiles: Record<Tone, { freq: number; duration: number; vol: number; type: OscillatorType }> = {
        step: { freq: 440, duration: 0.12, vol: 0.06, type: "sine" },
        type: { freq: 620, duration: 0.04, vol: 0.025, type: "triangle" },
        select: { freq: 520, duration: 0.08, vol: 0.05, type: "sine" },
        success: { freq: 880, duration: 0.35, vol: 0.08, type: "sine" },
        error: { freq: 220, duration: 0.15, vol: 0.05, type: "square" },
      };

      const p = profiles[tone];
      osc.type = p.type;
      osc.frequency.setValueAtTime(p.freq, now);
      if (tone === "success") {
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.2);
      }
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(p.vol, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + p.duration);
      osc.start(now);
      osc.stop(now + p.duration + 0.05);
    } catch {
      // Audio optional — silent fail
    }
  }, []);

  return { playTone };
}
