/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_LIVE_TRANSCRIPTION_WS_URL?: string;
  readonly VITE_LIVE_TRANSCRIPTION_API_KEY?: string;
  readonly VITE_LIVE_TRANSCRIPTION_LANGUAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
