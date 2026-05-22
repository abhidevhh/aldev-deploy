import { z } from "zod";
const nonEmptyString = z.string().trim().min(1);
const absoluteHttpUrlString = z.string().trim().refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}, "must be an absolute URL");
const schemaBase = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),
  PORT: nonEmptyString,
  MOCKS: z.enum(["true", "false"]).optional(),
  STARTUP_SHORTCUTS: z.enum(["true", "false"]).optional(),
  EXPIRED_SESSIONS_CLEANUP_DISABLED: z.enum(["true", "false"]).optional(),
  ALLOWED_ACTION_ORIGINS: z.string().trim().optional(),
  FLY_APP_NAME: nonEmptyString,
  FLY_REGION: nonEmptyString,
  FLY_MACHINE_ID: nonEmptyString,
  LITEFS_DIR: nonEmptyString,
  // Used by LiteFS + tooling. Optional because it can be derived from
  // `DATABASE_URL` when using SQLite `file:` URLs.
  DATABASE_PATH: z.string().trim().optional(),
  DATABASE_URL: nonEmptyString,
  CACHE_DATABASE_PATH: nonEmptyString,
  BOT_GITHUB_TOKEN: nonEmptyString,
  CALL_KENT_PODCAST_ID: nonEmptyString,
  CHATS_WITH_KENT_PODCAST_ID: nonEmptyString,
  KIT_API_KEY: nonEmptyString,
  KIT_API_SECRET: nonEmptyString,
  DISCORD_ADMIN_USER_ID: nonEmptyString,
  DISCORD_BLUE_CHANNEL: nonEmptyString,
  DISCORD_BLUE_ROLE: nonEmptyString,
  DISCORD_BOT_TOKEN: nonEmptyString,
  DISCORD_CALL_KENT_CHANNEL: nonEmptyString,
  DISCORD_CLIENT_ID: nonEmptyString,
  DISCORD_CLIENT_SECRET: nonEmptyString,
  DISCORD_GUILD_ID: nonEmptyString,
  DISCORD_LEADERBOARD_CHANNEL: nonEmptyString,
  DISCORD_MEMBER_ROLE: nonEmptyString,
  DISCORD_PRIVATE_BOT_CHANNEL: nonEmptyString,
  DISCORD_RED_CHANNEL: nonEmptyString,
  DISCORD_RED_ROLE: nonEmptyString,
  DISCORD_SCOPES: nonEmptyString,
  DISCORD_YELLOW_CHANNEL: nonEmptyString,
  DISCORD_YELLOW_ROLE: nonEmptyString,
  INTERNAL_COMMAND_TOKEN: nonEmptyString,
  MAGIC_LINK_SECRET: nonEmptyString,
  MAILGUN_DOMAIN: nonEmptyString,
  MAILGUN_SENDING_KEY: nonEmptyString,
  REFRESH_CACHE_SECRET: nonEmptyString,
  SENTRY_AUTH_TOKEN: z.string().trim().optional(),
  // Sentry is optional; validate required combos in `superRefine`.
  SENTRY_DSN: z.string().trim().optional(),
  SENTRY_ORG: z.string().trim().optional(),
  SENTRY_PROJECT: z.string().trim().optional(),
  SENTRY_PROJECT_ID: z.string().trim().optional(),
  SESSION_SECRET: nonEmptyString,
  SIMPLECAST_KEY: nonEmptyString,
  TRANSISTOR_API_SECRET: nonEmptyString,
  TWITTER_BEARER_TOKEN: nonEmptyString,
  VERIFIER_API_KEY: nonEmptyString,
  CF_INTERNAL_SECRET: nonEmptyString,
  // Unified search service via Cloudflare Worker.
  SEARCH_WORKER_URL: absoluteHttpUrlString,
  SEARCH_WORKER_TOKEN: nonEmptyString,
  // Semantic search + AI features via Cloudflare Workers AI + Vectorize (+ AI Gateway).
  CLOUDFLARE_ACCOUNT_ID: nonEmptyString,
  CLOUDFLARE_API_TOKEN: nonEmptyString,
  /** AI Gateway "id" is the gateway name you create in Cloudflare. */
  CLOUDFLARE_AI_GATEWAY_ID: nonEmptyString,
  /**
   * Optional embedding AI Gateway id.
   * Used by semantic-search embeddings (runtime queries + indexing jobs).
   * Falls back to `CLOUDFLARE_AI_GATEWAY_ID` when omitted.
   */
  CLOUDFLARE_AI_EMBEDDING_GATEWAY_ID: z.string().trim().optional(),
  /**
   * AI Gateway authenticated gateway token (used as `cf-aig-authorization`).
   */
  CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN: nonEmptyString,
  CLOUDFLARE_VECTORIZE_INDEX: nonEmptyString,
  CLOUDFLARE_AI_EMBEDDING_MODEL: z.string().trim().optional().default("@cf/google/embeddinggemma-300m"),
  CLOUDFLARE_AI_TRANSCRIPTION_MODEL: z.string().trim().optional().default("@cf/openai/whisper-large-v3-turbo"),
  CLOUDFLARE_AI_TEXT_TO_SPEECH_MODEL: z.string().trim().optional().default("@cf/deepgram/aura-2-en"),
  CLOUDFLARE_AI_TEXT_MODEL: z.string().trim().optional().default("@cf/meta/llama-3.1-8b-instruct"),
  CLOUDFLARE_AI_CALL_KENT_METADATA_MODEL: z.string().trim().optional(),
  CLOUDFLARE_AI_CALL_KENT_TRANSCRIPT_FORMAT_MODEL: z.string().trim().optional(),
  // Semantic search admin tooling (R2 manifests + ignore list).
  R2_BUCKET: nonEmptyString,
  // Optional: derived from CLOUDFLARE_ACCOUNT_ID when omitted.
  R2_ENDPOINT: z.string().trim().optional(),
  R2_ACCESS_KEY_ID: nonEmptyString,
  R2_SECRET_ACCESS_KEY: nonEmptyString,
  // Call Kent audio storage bucket.
  CALL_KENT_R2_BUCKET: nonEmptyString,
  // Cloudflare Queue config for offloaded FFmpeg jobs.
  CALL_KENT_AUDIO_CF_QUEUE_ID: nonEmptyString,
  CALL_KENT_AUDIO_CF_API_BASE_URL: z.string().trim().optional(),
  // HMAC secret used by the FFmpeg processor callback route.
  CALL_KENT_AUDIO_PROCESSOR_CALLBACK_SECRET: nonEmptyString,
  SEMANTIC_SEARCH_IGNORE_LIST_KEY: z.string().trim().optional().default("manifests/ignore-list.json"),
  GITHUB_REF: z.string().trim().optional().default("main"),
  // Optional: /youtube route + indexing scripts.
  YOUTUBE_PLAYLIST_ID: z.string().trim().default("PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf")
});
const schema = schemaBase.superRefine((values, ctx) => {
  if (values.SENTRY_DSN && !values.SENTRY_PROJECT_ID) {
    ctx.addIssue({
      code: "custom",
      message: "SENTRY_PROJECT_ID is required when SENTRY_DSN is set",
      path: ["SENTRY_PROJECT_ID"]
    });
  }
  if (!values.DATABASE_PATH && !values.DATABASE_URL.startsWith("file:")) {
    ctx.addIssue({
      code: "custom",
      message: "DATABASE_PATH is required when DATABASE_URL is not a SQLite file: URL",
      path: ["DATABASE_PATH"]
    });
  }
  const port = Number(values.PORT);
  if (!Number.isFinite(port) || port <= 0) {
    ctx.addIssue({
      code: "custom",
      message: "PORT must be a positive number",
      path: ["PORT"]
    });
  }
});
function computeAllowedActionOrigins(values) {
  const configuredOrigins = values.ALLOWED_ACTION_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? [];
  if (configuredOrigins.length > 0) return configuredOrigins;
  if (values.NODE_ENV !== "production") return ["**"];
  const productionOrigins = ["kentcdodds.com", "*.kentcdodds.com"];
  if (values.FLY_APP_NAME) {
    productionOrigins.push(`${values.FLY_APP_NAME}.fly.dev`);
  }
  return productionOrigins;
}
function deriveDatabasePath(values) {
  if (values.DATABASE_PATH) return values.DATABASE_PATH;
  return values.DATABASE_URL.slice("file:".length);
}
let _cache;
function getEnv() {
  const keys = Object.keys(schemaBase.shape);
  const fingerprint = keys.map((k) => `${String(k)}=${process.env[String(k)] ?? ""}`).join("\0");
  if (_cache?.fingerprint === fingerprint) return _cache.env;
  const parsed = schema.safeParse(process.env);
  if (parsed.success === false) {
    throw parsed.error;
  }
  const values = parsed.data;
  const derivedR2Endpoint = typeof values.R2_ENDPOINT === "string" && values.R2_ENDPOINT.trim() ? values.R2_ENDPOINT.trim() : `https://${values.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const callKentAudioCfApiBaseUrl = typeof values.CALL_KENT_AUDIO_CF_API_BASE_URL === "string" && values.CALL_KENT_AUDIO_CF_API_BASE_URL.trim() ? values.CALL_KENT_AUDIO_CF_API_BASE_URL.trim() : "https://api.cloudflare.com/client/v4";
  const env = {
    ...values,
    PORT: Number(values.PORT),
    MOCKS: values.MOCKS === "true",
    DATABASE_PATH: deriveDatabasePath(values),
    allowedActionOrigins: computeAllowedActionOrigins(values),
    FLY_MACHINE_ID: values.FLY_MACHINE_ID ?? "unknown",
    R2_ENDPOINT: derivedR2Endpoint,
    CALL_KENT_AUDIO_CF_API_BASE_URL: callKentAudioCfApiBaseUrl,
    CLOUDFLARE_AI_EMBEDDING_GATEWAY_ID: values.CLOUDFLARE_AI_EMBEDDING_GATEWAY_ID || values.CLOUDFLARE_AI_GATEWAY_ID,
    CLOUDFLARE_AI_CALL_KENT_METADATA_MODEL: values.CLOUDFLARE_AI_CALL_KENT_METADATA_MODEL ?? values.CLOUDFLARE_AI_TEXT_MODEL,
    CLOUDFLARE_AI_CALL_KENT_TRANSCRIPT_FORMAT_MODEL: values.CLOUDFLARE_AI_CALL_KENT_TRANSCRIPT_FORMAT_MODEL ?? values.CLOUDFLARE_AI_TEXT_MODEL
  };
  _cache = { fingerprint, env };
  return env;
}
function getPublicEnv() {
  const env = getEnv();
  return {
    MODE: env.NODE_ENV,
    DISCORD_CLIENT_ID: env.DISCORD_CLIENT_ID,
    SENTRY_DSN: env.SENTRY_DSN
  };
}
export {
  getPublicEnv as a,
  getEnv as g
};
//# sourceMappingURL=env.server-DPCBxZtL.js.map
