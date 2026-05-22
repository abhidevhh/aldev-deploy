import { createHash } from "node:crypto";
import { z } from "zod";
import { c as cachified, b as cache } from "./cache.server-BWnHcoUK.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import fs from "node:fs/promises";
import path__default from "node:path";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import * as YAML from "yaml";
import { i as images, a as getImageBuilder } from "./images-D8NqauwH.js";
const SEARCH_MAX_QUERY_CHARS = 1e3;
class SearchQueryTooLongError extends Error {
  constructor(length, max) {
    super(`Search query too long (${length} chars). Max is ${max}.`);
    this.name = "SearchQueryTooLongError";
    this.length = length;
    this.max = max;
  }
}
function normalizeSearchQuery(query) {
  return query.trim().replace(/\s+/g, " ");
}
function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}
function truncate(value, maxLen) {
  const text = normalizeText(value);
  if (text.length <= maxLen) return text;
  return `${text.slice(0, Math.max(0, maxLen - 3))}...`;
}
function asNonEmptyString(value) {
  if (typeof value !== "string") return void 0;
  const trimmed = value.trim();
  return trimmed ? trimmed : void 0;
}
function getRepoRootDir() {
  return process.cwd();
}
function buildThumbFromCloudinaryId({
  cloudinaryId,
  alt,
  size
}) {
  const builder = getImageBuilder(cloudinaryId, alt);
  return builder({
    quality: "auto",
    format: "auto",
    background: "rgb:e6e9ee",
    resize: { type: "fill", width: size, height: size }
  });
}
function getFallbackPresentation(type) {
  if (type === "ck") {
    return {
      imageUrl: images.microphone({
        quality: "auto",
        format: "auto",
        resize: { type: "pad", width: 96, height: 96 }
      }),
      imageAlt: images.microphone.alt
    };
  }
  if (type === "cwk") {
    return {
      imageUrl: images.kayak({
        quality: "auto",
        format: "auto",
        resize: { type: "pad", width: 96, height: 96 }
      }),
      imageAlt: images.kayak.alt
    };
  }
  if (type === "youtube") {
    return {
      imageUrl: images.microphoneWithHands({
        quality: "auto",
        format: "auto",
        resize: { type: "fill", width: 96, height: 96 }
      }),
      imageAlt: images.microphoneWithHands.alt
    };
  }
  if (type === "podcast") {
    return {
      imageUrl: images.microphone({
        quality: "auto",
        format: "auto",
        resize: { type: "pad", width: 96, height: 96 }
      }),
      imageAlt: images.microphone.alt
    };
  }
  if (type === "talk") {
    return {
      imageUrl: images.kentSpeakingAllThingsOpen({
        quality: "auto",
        format: "auto",
        resize: { type: "fill", width: 96, height: 96 }
      }),
      imageAlt: images.kentSpeakingAllThingsOpen.alt
    };
  }
  if (type === "resume") {
    return {
      imageUrl: images.kentProfile({
        quality: "auto",
        format: "auto",
        resize: { type: "fill", width: 96, height: 96 }
      }),
      imageAlt: images.kentProfile.alt
    };
  }
  return {
    imageUrl: images.abhiBuddyProfileGray({
      quality: "auto",
      format: "auto",
      resize: { type: "pad", width: 96, height: 96 }
    }),
    imageAlt: images.abhiBuddyProfileGray.alt
  };
}
function normalizePathname(pathname) {
  const cleaned = pathname.split(/[?#]/)[0] ?? "";
  if (cleaned === "/") return "/";
  return cleaned.replace(/\/+$/, "") || "/";
}
function inferSlugFromUrl({
  type,
  url
}) {
  if (!url) return null;
  let pathname = url;
  try {
    if (/^https?:\/\//i.test(url)) pathname = new URL(url).pathname;
  } catch {
  }
  pathname = normalizePathname(pathname);
  if (type === "blog") {
    if (!pathname.startsWith("/blog/")) return null;
    const slug = pathname.slice("/blog/".length);
    return slug ? slug : null;
  }
  if (type === "page") {
    if (pathname === "/") return null;
    if (!pathname.startsWith("/")) return null;
    const slug = pathname.slice(1);
    return slug ? slug : null;
  }
  if (type === "talk") {
    if (!pathname.startsWith("/talks/")) return null;
    const slug = pathname.slice("/talks/".length);
    return slug ? slug : null;
  }
  return null;
}
function parseYamlFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/u);
  if (!match) return null;
  const raw = match[1] ?? "";
  try {
    const parsed = YAML.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
async function readMdxSourceForSlug(type, slug) {
  const root = getRepoRootDir();
  if (type === "page") {
    const filename = path__default.join(root, "content", "pages", `${slug}.mdx`);
    return await fs.readFile(filename, "utf8");
  }
  const dirFilename = path__default.join(root, "content", "blog", slug, "index.mdx");
  try {
    return await fs.readFile(dirFilename, "utf8");
  } catch (e) {
    if (e?.code !== "ENOENT" && e?.code !== "ENOTDIR") throw e;
  }
  const fileFilename = path__default.join(root, "content", "blog", `${slug}.mdx`);
  return await fs.readFile(fileFilename, "utf8");
}
const mdxMetaCache = /* @__PURE__ */ new Map();
async function getMdxDocMeta({
  type,
  slug
}) {
  const cacheKey = `${type}:${slug}`;
  const cached = mdxMetaCache.get(cacheKey);
  if (cached) return cached;
  try {
    const source = await readMdxSourceForSlug(type, slug);
    const fm = parseYamlFrontmatter(source);
    const title = asNonEmptyString(fm?.title);
    const description = asNonEmptyString(fm?.description);
    const bannerCloudinaryId = asNonEmptyString(fm?.bannerCloudinaryId);
    const bannerAltRaw = fm?.bannerAlt;
    const bannerAlt = typeof bannerAltRaw === "string" ? normalizeText(bannerAltRaw) : void 0;
    const meta = {
      title,
      summary: description,
      cloudinaryId: bannerCloudinaryId,
      imageAlt: bannerAlt
    };
    mdxMetaCache.set(cacheKey, meta);
    return meta;
  } catch {
    return null;
  }
}
let talksBySlug = null;
async function loadTalksBySlug() {
  if (talksBySlug) return talksBySlug;
  const root = getRepoRootDir();
  const filename = path__default.join(root, "content", "data", "talks.yml");
  const raw = await fs.readFile(filename, "utf8");
  const parsed = YAML.parse(raw);
  if (!Array.isArray(parsed)) {
    talksBySlug = /* @__PURE__ */ new Map();
    return talksBySlug;
  }
  const slugify = slugifyWithCounter();
  slugify.reset();
  const map = /* @__PURE__ */ new Map();
  for (const talk of parsed) {
    const title = typeof talk?.title === "string" ? talk.title : "TBA";
    const slug = slugify(title || "tba");
    const description = typeof talk?.description === "string" ? talk.description : void 0;
    map.set(slug, { title, description });
  }
  talksBySlug = map;
  return map;
}
let creditsBySlug = null;
async function loadCreditsBySlug() {
  if (creditsBySlug) return creditsBySlug;
  const root = getRepoRootDir();
  const filename = path__default.join(root, "content", "data", "credits.yml");
  const raw = await fs.readFile(filename, "utf8");
  const parsed = YAML.parse(raw);
  if (!Array.isArray(parsed)) {
    creditsBySlug = /* @__PURE__ */ new Map();
    return creditsBySlug;
  }
  const slugify = slugifyWithCounter();
  slugify.reset();
  const map = /* @__PURE__ */ new Map();
  for (const person of parsed) {
    const name = typeof person?.name === "string" ? person.name : "Unnamed";
    const slug = slugify(name || "unnamed");
    map.set(slug, {
      name,
      role: typeof person?.role === "string" ? person.role : void 0,
      description: typeof person?.description === "string" ? person.description : void 0,
      cloudinaryId: typeof person?.cloudinaryId === "string" ? person.cloudinaryId : void 0
    });
  }
  creditsBySlug = map;
  return map;
}
let testimonialsBySlug = null;
async function loadTestimonialsBySlug() {
  if (testimonialsBySlug) return testimonialsBySlug;
  const root = getRepoRootDir();
  const filename = path__default.join(root, "content", "data", "testimonials.yml");
  const raw = await fs.readFile(filename, "utf8");
  const parsed = YAML.parse(raw);
  if (!Array.isArray(parsed)) {
    testimonialsBySlug = /* @__PURE__ */ new Map();
    return testimonialsBySlug;
  }
  const slugify = slugifyWithCounter();
  slugify.reset();
  const map = /* @__PURE__ */ new Map();
  for (const t of parsed) {
    const author = typeof t?.author === "string" ? t.author : "Anonymous";
    const slug = slugify(author || "anonymous");
    map.set(slug, {
      author,
      company: typeof t?.company === "string" ? t.company : void 0,
      testimonial: typeof t?.testimonial === "string" ? t.testimonial : void 0,
      cloudinaryId: typeof t?.cloudinaryId === "string" ? t.cloudinaryId : void 0
    });
  }
  testimonialsBySlug = map;
  return map;
}
let resumeMeta = null;
async function loadResumeMeta() {
  if (resumeMeta) return resumeMeta;
  const root = getRepoRootDir();
  const filename = path__default.join(root, "content", "data", "resume.yml");
  const raw = await fs.readFile(filename, "utf8");
  const parsed = YAML.parse(raw);
  const title = typeof parsed?.header?.title === "string" ? parsed.header.title : void 0;
  const summaryItem = typeof parsed?.summary?.short?.[0] === "string" ? parsed.summary.short[0] : typeof parsed?.summary?.long?.[0] === "string" ? parsed.summary.long[0] : void 0;
  resumeMeta = { title, summary: summaryItem };
  return resumeMeta;
}
function isSupportedRepoDocType(type) {
  return type === "blog" || type === "page" || type === "talk" || type === "resume" || type === "credit" || type === "testimonial";
}
async function getSemanticSearchPresentation(result) {
  const fallback = getFallbackPresentation(result.type);
  const fallbackImageUrl = fallback.imageUrl;
  const fallbackImageAlt = fallback.imageAlt;
  const summaryFromSnippet = result.snippet ? truncate(result.snippet, 220) : void 0;
  const base = {
    summary: summaryFromSnippet,
    imageUrl: result.imageUrl ?? fallbackImageUrl,
    imageAlt: result.imageAlt ?? fallbackImageAlt
  };
  const type = result.type;
  if (!type) return base;
  const slug = result.slug ?? inferSlugFromUrl({
    type,
    url: result.url ?? (typeof result.id === "string" ? result.id : void 0)
  }) ?? void 0;
  if (!slug && type !== "resume") return base;
  if (type === "blog" || type === "page") {
    if (!slug) return base;
    const meta = await getMdxDocMeta({ type, slug });
    if (!meta) return base;
    const summary = meta.summary ? truncate(meta.summary, 220) : base.summary;
    const alt = meta.imageAlt ?? meta.title ?? result.title ?? fallback.imageAlt;
    const imageUrl = meta.cloudinaryId ? buildThumbFromCloudinaryId({
      cloudinaryId: meta.cloudinaryId,
      alt,
      size: 96
    }) : base.imageUrl;
    return { summary, imageUrl, imageAlt: alt };
  }
  if (!isSupportedRepoDocType(type)) return base;
  if (type === "talk") {
    if (!slug) return base;
    try {
      const talks = await loadTalksBySlug();
      const talk = talks.get(slug);
      if (!talk) return base;
      const summary = talk.description ? truncate(talk.description, 220) : base.summary;
      return { ...base, summary };
    } catch {
      return base;
    }
  }
  if (type === "credit") {
    if (!slug) return base;
    try {
      const credits = await loadCreditsBySlug();
      const person = credits.get(slug);
      if (!person) return base;
      const summary = person.description ? truncate(person.description, 220) : person.role ? truncate(person.role, 220) : base.summary;
      const alt = person.name || fallbackImageAlt;
      const imageUrl = person.cloudinaryId ? buildThumbFromCloudinaryId({
        cloudinaryId: person.cloudinaryId,
        alt,
        size: 96
      }) : fallbackImageUrl;
      return { summary, imageUrl, imageAlt: alt };
    } catch {
      return base;
    }
  }
  if (type === "testimonial") {
    if (!slug) return base;
    try {
      const testimonials = await loadTestimonialsBySlug();
      const t = testimonials.get(slug);
      if (!t) return base;
      const summary = t.testimonial ? truncate(t.testimonial, 220) : base.summary;
      const alt = t.author || fallbackImageAlt;
      const imageUrl = t.cloudinaryId ? buildThumbFromCloudinaryId({
        cloudinaryId: t.cloudinaryId,
        alt,
        size: 96
      }) : fallbackImageUrl;
      return { summary, imageUrl, imageAlt: alt };
    } catch {
      return base;
    }
  }
  if (type === "resume") {
    try {
      const resume = await loadResumeMeta();
      const summary = resume.summary ? truncate(resume.summary, 220) : base.summary;
      const alt = result.title ?? resume.title ?? fallbackImageAlt;
      return { ...base, summary, imageAlt: alt };
    } catch {
      return base;
    }
  }
  return base;
}
const searchWorkerTimeoutMs = 1e4;
async function requestSearchWorkerJson({
  path,
  method = "GET",
  body
}) {
  const env = getEnv();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), searchWorkerTimeoutMs);
  try {
    const response = await fetch(new URL(path, env.SEARCH_WORKER_URL), {
      method,
      headers: {
        Authorization: `Bearer ${env.SEARCH_WORKER_TOKEN}`,
        ...body ? { "Content-Type": "application/json" } : {}
      },
      body: body ? JSON.stringify(body) : void 0,
      signal: controller.signal
    });
    let json = null;
    let fallbackText = "";
    try {
      json = await response.clone().json();
    } catch {
      fallbackText = await response.text().catch(() => "");
    }
    if (!response.ok || json?.ok === false || json === null) {
      throw new Error(
        json?.ok === false && "error" in json && typeof json.error === "string" ? json.error : `Search worker request failed (${response.status})${fallbackText ? `: ${fallbackText}` : ""}`
      );
    }
    return json;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `Search worker request timed out after ${searchWorkerTimeoutMs}ms`
      );
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
async function querySearchWorkerResults({
  query,
  topK
}) {
  const json = await requestSearchWorkerJson({
    path: "/search",
    method: "POST",
    body: { query, topK }
  });
  if (!("results" in json) || !Array.isArray(json.results)) {
    throw new Error("Search worker returned an invalid results payload");
  }
  return {
    results: json.results,
    lowRankingResults: Array.isArray(json.lowRankingResults) ? json.lowRankingResults : [],
    noCloseMatches: Boolean(json.noCloseMatches)
  };
}
async function getSearchWorkerHealth() {
  return await requestSearchWorkerJson({
    path: "/health"
  });
}
const SEARCH_CACHE_TTL_MS = 1e3 * 60 * 60 * 12;
const SEARCH_CACHE_SWR_MS = 1e3 * 60 * 60 * 24 * 3;
const searchResultItemSchema = z.object({
  id: z.string(),
  score: z.number(),
  type: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
  snippet: z.string().optional(),
  timestampSeconds: z.number().optional(),
  summary: z.string().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional()
}).passthrough();
const searchCachedPayloadV3Schema = z.object({
  v: z.literal(3),
  results: z.array(searchResultItemSchema),
  lowRankingResults: z.array(searchResultItemSchema),
  noCloseMatches: z.boolean()
});
const searchCachedPayloadSchema = z.union([
  searchCachedPayloadV3Schema,
  z.object({
    v: z.literal(2),
    results: z.array(searchResultItemSchema),
    noCloseMatches: z.boolean(),
    lowRankingResults: z.array(searchResultItemSchema).optional()
  }),
  z.array(searchResultItemSchema)
]);
function makeSearchCacheKey({
  query,
  topK,
  workerUrl,
  searchVersion
}) {
  const payload = JSON.stringify({
    v: 3,
    workerUrl,
    searchVersion,
    topK,
    query
  });
  const hash = createHash("sha256").update(payload).digest("hex");
  return `search:kcd:v3:${hash}`;
}
function clampTopK(topK) {
  if (typeof topK === "number" && Number.isFinite(topK)) {
    return Math.max(1, Math.min(15, Math.floor(topK)));
  }
  return 8;
}
function normalizeCachedSearchPayload(raw) {
  if (Array.isArray(raw)) {
    return { results: raw, lowRankingResults: [], noCloseMatches: false };
  }
  return {
    results: raw.results,
    lowRankingResults: raw.lowRankingResults ?? [],
    noCloseMatches: raw.noCloseMatches
  };
}
async function enrichResults(results) {
  return await Promise.all(
    results.map(async (result) => {
      const presentation = await getSemanticSearchPresentation(result);
      return { ...result, ...presentation };
    })
  );
}
async function searchKCD({
  query,
  topK = 8,
  request,
  timings
}) {
  const cleanedQuery = normalizeSearchQuery(query);
  if (!cleanedQuery) {
    return { results: [], lowRankingResults: [], noCloseMatches: false };
  }
  if (cleanedQuery.length > SEARCH_MAX_QUERY_CHARS) {
    throw new SearchQueryTooLongError(
      cleanedQuery.length,
      SEARCH_MAX_QUERY_CHARS
    );
  }
  const safeTopK = clampTopK(topK);
  const workerUrl = getEnv().SEARCH_WORKER_URL;
  const fetchPayload = async () => {
    const { results: results2, lowRankingResults: lowRankingResults2, noCloseMatches: noCloseMatches2 } = await querySearchWorkerResults({
      query: cleanedQuery,
      topK: safeTopK
    });
    return {
      v: 3,
      results: results2,
      lowRankingResults: lowRankingResults2,
      noCloseMatches: noCloseMatches2
    };
  };
  const health = await getSearchWorkerHealth().catch(() => null);
  if (!health || health.ok !== true) {
    const payload = await fetchPayload();
    return {
      results: await enrichResults(payload.results),
      lowRankingResults: await enrichResults(payload.lowRankingResults),
      noCloseMatches: payload.noCloseMatches
    };
  }
  const cacheKey = makeSearchCacheKey({
    query: cleanedQuery,
    topK: safeTopK,
    workerUrl,
    searchVersion: health.syncedAt ?? "never-synced"
  });
  const cached = await cachified({
    cache,
    request,
    timings,
    key: cacheKey,
    ttl: SEARCH_CACHE_TTL_MS,
    staleWhileRevalidate: SEARCH_CACHE_SWR_MS,
    checkValue: searchCachedPayloadSchema,
    getFreshValue: fetchPayload
  });
  const { results, lowRankingResults, noCloseMatches } = normalizeCachedSearchPayload(cached);
  return {
    results: await enrichResults(results),
    lowRankingResults: await enrichResults(lowRankingResults),
    noCloseMatches
  };
}
export {
  SEARCH_MAX_QUERY_CHARS as S,
  SearchQueryTooLongError as a,
  searchKCD as s
};
//# sourceMappingURL=search.server-CEHFJkNx.js.map
