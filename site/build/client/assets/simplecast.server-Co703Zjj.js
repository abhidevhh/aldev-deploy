import { toHtml } from "hast-util-to-html";
import { toHast } from "mdast-util-to-hast";
import pLimit from "p-limit";
import parseHtml from "rehype-parse";
import rehype2remark from "rehype-remark";
import rehypeStringify from "rehype-stringify";
import parseMarkdown from "remark-parse";
import remark2rehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { z } from "zod";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import omit from "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import sortBy from "lodash/sortBy.js";
import { t as throwIfAborted, w as waitForDelay, d as defaultSleep, i as isAbortError } from "./abort-utils.server-Bx3f6jnJ.js";
import { b as cachified, c as cache } from "./cache.server-BtbXQaCP.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { f as fetchWithTimeout } from "./fetch-with-timeout.server-BL1zZ7UJ.js";
import { s as stripHtml } from "./markdown.server-rwSwVnMd.js";
import { B as typedBoolean } from "./misc-CQO4K9rH.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "react-router";
import "litefs-js";
import "litefs-js/remix";
import "./session.server-DZ6f3pgH.js";
import "./prisma.server-Cj9LRFmw.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "date-fns";
function clampMs(ms, maxDelayMs) {
  if (ms <= 0) return 0;
  return Math.min(ms, maxDelayMs);
}
function parseRetryAfterMs(retryAfterHeader, nowMs) {
  const value = retryAfterHeader.trim();
  if (!value) return null;
  const asNumber = Number(value);
  if (Number.isFinite(asNumber) && asNumber >= 0) {
    return Math.round(asNumber * 1e3);
  }
  const asDateMs = Date.parse(value);
  if (Number.isFinite(asDateMs)) {
    return Math.max(0, asDateMs - nowMs);
  }
  return null;
}
function parseRateLimitResetMs(resetHeader, nowMs) {
  const value = resetHeader.trim();
  if (!value) return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return null;
  if (n > 1e12) return Math.max(0, n - nowMs);
  if (n > 1e9) return Math.max(0, n * 1e3 - nowMs);
  return Math.round(n * 1e3);
}
function getRetryDelayMsFromResponse(res, {
  nowMs = Date.now(),
  defaultDelayMs = 1e3,
  maxDelayMs = 1e3 * 60 * 10
} = {}) {
  const retryAfterHeader = res.headers.get("Retry-After");
  if (retryAfterHeader) {
    const parsed = parseRetryAfterMs(retryAfterHeader, nowMs);
    if (parsed !== null) {
      return { delayMs: clampMs(parsed, maxDelayMs), reason: "retry-after" };
    }
  }
  const resetHeader = res.headers.get("RateLimit-Reset") ?? res.headers.get("X-RateLimit-Reset");
  if (resetHeader) {
    const parsed = parseRateLimitResetMs(resetHeader, nowMs);
    if (parsed !== null) {
      return {
        delayMs: clampMs(parsed, maxDelayMs),
        reason: "rate-limit-reset"
      };
    }
  }
  return {
    delayMs: clampMs(defaultDelayMs, maxDelayMs),
    reason: "default"
  };
}
async function fetchJsonWithRetryAfter(url, {
  headers,
  maxRetries = 5,
  defaultDelayMs = 750,
  maxDelayMs = 1e3 * 60 * 10,
  timeoutMs = 3e4,
  label,
  sleep = defaultSleep,
  retryOn5xx = false,
  signal
} = {}) {
  const requestInit = { headers };
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    throwIfAborted(signal);
    let res;
    try {
      res = timeoutMs ? await fetchWithTimeout(url, requestInit, timeoutMs) : await fetch(url, requestInit);
      throwIfAborted(signal);
    } catch (cause) {
      if (attempt < maxRetries) {
        const delayMs = clampMs(defaultDelayMs * (attempt + 1), maxDelayMs);
        console.warn(
          `${label ?? "request"}: fetch failed (attempt ${attempt + 1}/${maxRetries + 1}), waiting ${Math.round(delayMs)}ms`
        );
        await waitForDelay({ sleep, delayMs, signal });
        continue;
      }
      throw new Error(`${label ?? "request"}: fetch failed`, { cause });
    }
    if (res.status === 429) {
      if (attempt >= maxRetries) {
        throw new Error(`${label ?? "request"}: 429 Too Many Requests`);
      }
      const { delayMs, reason } = getRetryDelayMsFromResponse(res, {
        defaultDelayMs: defaultDelayMs * (attempt + 1),
        maxDelayMs
      });
      console.warn(
        `${label ?? "request"}: 429 (attempt ${attempt + 1}/${maxRetries + 1}), waiting ${Math.round(
          delayMs
        )}ms (${reason})`
      );
      await waitForDelay({ sleep, delayMs, signal });
      continue;
    }
    if (!res.ok) {
      if (retryOn5xx && res.status >= 500 && attempt < maxRetries) {
        const delayMs = clampMs(defaultDelayMs * (attempt + 1), maxDelayMs);
        console.warn(
          `${label ?? "request"}: ${res.status} (attempt ${attempt + 1}/${maxRetries + 1}), waiting ${Math.round(delayMs)}ms`
        );
        await waitForDelay({ sleep, delayMs, signal });
        continue;
      }
      let bodyText = "";
      try {
        bodyText = await res.text();
      } catch {
      }
      throw new Error(
        `${label ?? "request"}: ${res.status} ${res.statusText}${bodyText ? ` - ${bodyText}` : ""}`
      );
    }
    try {
      return await res.json();
    } catch (cause) {
      throw new Error(
        `${label ?? "request"}: failed to parse JSON (${res.status} ${res.statusText})`,
        { cause }
      );
    }
  }
  throw new Error(`${label ?? "request"}: exceeded max retries`);
}
const simplecastCollectionResponseSchema = (itemSchema) => z.object({
  collection: z.array(itemSchema)
});
const simplecastSeasonListItemSchema = z.object({
  href: z.string().min(1),
  number: z.number()
});
const simplecastSeasonsResponseSchema = simplecastCollectionResponseSchema(simplecastSeasonListItemSchema);
const simplecastEpisodeListItemSchema = z.object({
  id: z.string().min(1),
  status: z.string().min(1),
  is_hidden: z.boolean()
});
const simplecastEpisodesListResponseSchema = simplecastCollectionResponseSchema(simplecastEpisodeListItemSchema);
const simplecastEpisodeSchema = z.object({
  id: z.string().min(1),
  is_published: z.boolean(),
  published_at: z.string().min(1).nullable().optional(),
  updated_at: z.string().min(1),
  slug: z.string().min(1),
  transcription: z.string().nullable().optional(),
  long_description: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  image_url: z.string().min(1),
  number: z.number(),
  duration: z.number(),
  title: z.string().min(1),
  season: z.object({
    number: z.number()
  }),
  keywords: z.object({
    collection: z.array(
      z.object({
        value: z.string().min(1)
      })
    )
  }).optional(),
  enclosure_url: z.string().min(1)
});
const youtubeVideoIdPattern = /^[A-Za-z0-9_-]{11}$/;
function isYouTubeVideoId(value) {
  return typeof value === "string" && youtubeVideoIdPattern.test(value);
}
function getYouTubeVideoId(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (isYouTubeVideoId(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const hostname = url.hostname.replace(/^www\./, "");
    if (hostname === "youtu.be") {
      const [pathnameVideoId] = url.pathname.split("/").filter(Boolean);
      return isYouTubeVideoId(pathnameVideoId) ? pathnameVideoId : null;
    }
    if (hostname !== "youtube.com" && hostname !== "m.youtube.com" && hostname !== "music.youtube.com" && hostname !== "youtube-nocookie.com") {
      return null;
    }
    const searchVideoId = url.searchParams.get("v");
    if (isYouTubeVideoId(searchVideoId)) return searchVideoId;
    const pathParts = url.pathname.split("/").filter(Boolean);
    const embeddedVideoId = pathParts[0] === "embed" || pathParts[0] === "shorts" || pathParts[0] === "live" ? pathParts[1] : null;
    return isYouTubeVideoId(embeddedVideoId) ? embeddedVideoId : null;
  } catch {
    return null;
  }
}
function findFirstYouTubeVideoIdInText(text) {
  if (typeof text !== "string") return null;
  for (const match of text.matchAll(/https?:\/\/\S+/g)) {
    const candidate = match[0].replace(/[<>"')\],.;!?]+$/g, "");
    const youtubeVideoId = getYouTubeVideoId(candidate);
    if (youtubeVideoId) return youtubeVideoId;
  }
  return null;
}
function getSimplecastConfig() {
  const env = getEnv();
  return {
    podcastId: env.CHATS_WITH_KENT_PODCAST_ID,
    headers: { authorization: `Bearer ${env.SIMPLECAST_KEY}` },
    seasonsCacheKey: `simplecast:seasons:${env.CHATS_WITH_KENT_PODCAST_ID}`
  };
}
const simplecastEpisodeDetailsLimit = pLimit(3);
const cwkCachedLinkSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1)
}).passthrough();
const cwkCachedGuestSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  github: z.string().optional(),
  x: z.string().optional()
}).passthrough();
const cwkCachedMetaSchema = z.object({
  keywords: z.array(z.string()).optional()
}).catchall(z.string()).optional();
const cwkCachedEpisodeSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  meta: cwkCachedMetaSchema,
  descriptionHTML: z.string(),
  description: z.string(),
  summaryHTML: z.string(),
  publishedAt: z.string().min(1),
  updatedAt: z.string().min(1),
  seasonNumber: z.number(),
  episodeNumber: z.number(),
  homeworkHTMLs: z.array(z.string()),
  resources: z.array(cwkCachedLinkSchema),
  image: z.string().min(1),
  guests: z.array(cwkCachedGuestSchema),
  duration: z.number(),
  transcriptHTML: z.string(),
  simpleCastId: z.string().min(1),
  mediaUrl: z.string().min(1),
  youtubeVideoId: z.string().min(1).optional()
}).passthrough();
const cwkCachedSeasonsSchema = z.array(
  z.object({
    seasonNumber: z.number(),
    episodes: z.array(cwkCachedEpisodeSchema)
  }).passthrough()
);
const getCachedSeasons = async ({
  request,
  forceFresh,
  timings,
  signal
}) => {
  try {
    return await cachified({
      key: getSimplecastConfig().seasonsCacheKey,
      cache,
      request,
      timings,
      // while we're actively publishing the podcast, let's have the cache be
      // shorter
      ttl: 1e3 * 60 * 5,
      // ttl: 1000 * 60 * 60 * 24 * 7,
      staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 30,
      getFreshValue: () => getSeasons({ request, forceFresh, timings, signal }),
      forceFresh,
      checkValue: cwkCachedSeasonsSchema
    });
  } catch (error) {
    if (isAbortError(error)) return [];
    console.error(
      `simplecast: cachified failed to resolve seasons, returning empty fallback`,
      error
    );
    return [];
  }
};
async function getCachedEpisode(episodeId, {
  request,
  forceFresh,
  timings,
  signal
}) {
  const key = `simplecast:episode:${episodeId}`;
  try {
    return await cachified({
      cache,
      request,
      timings,
      key,
      ttl: 1e3 * 60 * 60 * 24 * 7,
      staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 30,
      getFreshValue: () => getEpisode(episodeId, { signal }),
      forceFresh,
      checkValue: cwkCachedEpisodeSchema
    });
  } catch (error) {
    if (isAbortError(error)) return null;
    console.error(
      `simplecast: failed to load episode ${episodeId}, omitting from results`,
      error
    );
    return null;
  }
}
async function getSeasons({
  request,
  forceFresh,
  timings,
  signal
}) {
  throwIfAborted(signal);
  const { podcastId, headers } = getSimplecastConfig();
  const seasonsJson = simplecastSeasonsResponseSchema.parse(
    await fetchJsonWithRetryAfter(
      `https://api.simplecast.com/podcasts/${podcastId}/seasons`,
      {
        headers,
        label: `simplecast seasons (${podcastId})`,
        retryOn5xx: true,
        signal
      }
    )
  );
  const { collection } = seasonsJson;
  const limit = pLimit(2);
  const seasons = await Promise.all(
    collection.map(
      ({ href, number }) => limit(async () => {
        throwIfAborted(signal);
        const seasonId = new URL(href).pathname.split("/").slice(-1)[0];
        if (!seasonId) {
          console.error(
            `Could not determine seasonId from ${href} for season ${number}`
          );
          return;
        }
        const episodes = await getEpisodes(seasonId, {
          request,
          forceFresh,
          timings,
          signal
        });
        if (!episodes.length) return null;
        return { seasonNumber: number, episodes };
      })
    )
  ).then((s) => s.filter(typedBoolean));
  return sortBy(seasons, (s) => Number(s.seasonNumber));
}
async function getEpisodes(seasonId, {
  request,
  forceFresh,
  timings,
  signal
}) {
  throwIfAborted(signal);
  const { headers } = getSimplecastConfig();
  const url = new URL(`https://api.simplecast.com/seasons/${seasonId}/episodes`);
  url.searchParams.set("limit", "300");
  const listJson = simplecastEpisodesListResponseSchema.parse(
    await fetchJsonWithRetryAfter(url.toString(), {
      headers,
      label: `simplecast season ${seasonId} episodes list`,
      retryOn5xx: true,
      signal
    })
  );
  const { collection } = listJson;
  const episodes = await Promise.all(
    collection.filter(({ status, is_hidden }) => status === "published" && !is_hidden).map(
      ({ id }) => getCachedEpisode(id, { request, forceFresh, timings, signal })
    )
  );
  return episodes.filter(typedBoolean);
}
async function getEpisode(episodeId, { signal } = {}) {
  throwIfAborted(signal);
  const { headers } = getSimplecastConfig();
  const json = simplecastEpisodeSchema.parse(
    await simplecastEpisodeDetailsLimit(
      () => fetchJsonWithRetryAfter(
        `https://api.simplecast.com/episodes/${episodeId}`,
        {
          headers,
          label: `simplecast episode ${episodeId}`,
          retryOn5xx: true,
          signal
        }
      )
    )
  );
  const {
    id,
    is_published,
    published_at,
    updated_at,
    slug,
    transcription: transcriptMarkdown,
    long_description: summaryMarkdown,
    description: descriptionMarkdown,
    image_url,
    number,
    duration,
    title,
    season: { number: seasonNumber },
    keywords: keywordsData,
    enclosure_url: mediaUrl
  } = json;
  if (!is_published) {
    return null;
  }
  const keywords = keywordsData?.collection?.map(({ value }) => value) ?? [];
  const [
    { descriptionHTML, youtubeVideoId: descriptionYouTubeVideoId },
    { summaryHTML, homeworkHTMLs, resources, guests, youtubeVideoId },
    transcriptHTML
  ] = await Promise.all([
    parseDescriptionMarkdown(descriptionMarkdown),
    summaryMarkdown ? parseSummaryMarkdown(summaryMarkdown, `${id}-${slug}`) : {
      summaryHTML: "",
      homeworkHTMLs: [],
      resources: [],
      guests: [],
      youtubeVideoId: null
    },
    parseEpisodeMarkdown(transcriptMarkdown)
  ]);
  const publishedAt = published_at ?? updated_at;
  const cwkEpisode = {
    transcriptHTML,
    descriptionHTML,
    description: await stripHtml(descriptionHTML),
    summaryHTML,
    guests,
    slug,
    resources,
    image: image_url,
    episodeNumber: number,
    publishedAt,
    updatedAt: updated_at,
    homeworkHTMLs,
    seasonNumber,
    duration,
    title,
    meta: {
      keywords
    },
    simpleCastId: episodeId,
    mediaUrl,
    youtubeVideoId: youtubeVideoId ?? descriptionYouTubeVideoId ?? void 0
  };
  return cwkEpisode;
}
function removeEls(array, ...els) {
  return array.filter((el) => !els.includes(el));
}
function autoAffiliates() {
  return async function affiliateTransformer(tree) {
    visit(tree, "element", function visitor(linkNode) {
      if (linkNode.tagName !== "a") return;
      if (!linkNode.properties) return;
      if (typeof linkNode.properties.href !== "string") return;
      if (linkNode.properties.href.includes("amazon.com")) {
        const amazonUrl = new URL(linkNode.properties.href);
        if (!amazonUrl.searchParams.has("tag")) {
          amazonUrl.searchParams.set("tag", "kentcdodds-20");
          linkNode.properties.href = amazonUrl.toString();
        }
      }
      if (linkNode.properties.href.includes("egghead.io")) {
        const eggheadUrl = new URL(linkNode.properties.href);
        if (!eggheadUrl.searchParams.has("af")) {
          eggheadUrl.searchParams.set("af", "5236ad");
          linkNode.properties.href = eggheadUrl.toString();
        }
      }
    });
  };
}
function findYouTubeVideoIdInNodes(nodes) {
  let youtubeVideoId = null;
  for (const node of nodes) {
    visit(node, "link", (link) => {
      if (youtubeVideoId) return;
      youtubeVideoId = getYouTubeVideoId(link.url);
    });
    if (youtubeVideoId) break;
    visit(node, "text", (text) => {
      if (youtubeVideoId) return;
      youtubeVideoId = findFirstYouTubeVideoIdInText(text.value);
    });
    if (youtubeVideoId) break;
  }
  return youtubeVideoId;
}
function isYouTubeOnlyNode(node) {
  if (node.type === "link") {
    return Boolean(getYouTubeVideoId(node.url));
  }
  if (node.type === "text") {
    const value = node.value.trim();
    if (!value) return false;
    const youtubeVideoId = findFirstYouTubeVideoIdInText(value);
    if (!youtubeVideoId) return false;
    const textWithoutYouTubeUrls = value.replace(/https?:\/\/\S+/g, (match) => {
      const candidate = match.replace(/[<>"')\],.;!?]+$/g, "");
      return getYouTubeVideoId(candidate) ? "" : match;
    });
    return /^[\s\p{P}]*$/u.test(textWithoutYouTubeUrls);
  }
  return false;
}
function isYouTubeOnlyParagraph(node) {
  if (node.type !== "paragraph") return false;
  const paragraphNode = node;
  return paragraphNode.children.every((child) => {
    if (child.type === "text" && /^[\s\p{P}]*$/u.test(child.value)) return true;
    return isYouTubeOnlyNode(child);
  });
}
async function parseEpisodeMarkdown(input) {
  if (!input) return "";
  const isHTMLInput = input.trim().startsWith("<");
  if (isHTMLInput) {
    return input;
  }
  const result = await unified().use(parseMarkdown).use(remark2rehype).use(rehypeStringify).process(input);
  return result.value.toString();
}
async function parseDescriptionMarkdown(descriptionInput) {
  if (!descriptionInput) {
    return { descriptionHTML: "", youtubeVideoId: void 0 };
  }
  const isHTMLInput = descriptionInput.trim().startsWith("<");
  let youtubeVideoId;
  let removedYouTubeOnlyParagraphs = false;
  const result = await unified().use(isHTMLInput ? parseHtml : parseMarkdown).use(isHTMLInput ? rehype2remark : () => {
  }).use(function extractDescriptionMetadata() {
    return function transformer(tree) {
      tree.children = tree.children.filter((child) => {
        if (!isYouTubeOnlyParagraph(child)) return true;
        removedYouTubeOnlyParagraphs = true;
        youtubeVideoId ??= findYouTubeVideoIdInNodes([child]) ?? void 0;
        return false;
      });
    };
  }).use(remark2rehype).use(rehypeStringify).process(descriptionInput);
  if (isHTMLInput && !removedYouTubeOnlyParagraphs) {
    return {
      descriptionHTML: descriptionInput,
      youtubeVideoId: youtubeVideoId ?? findFirstYouTubeVideoIdInText(descriptionInput) ?? void 0
    };
  }
  return {
    descriptionHTML: result.value.toString(),
    youtubeVideoId: youtubeVideoId ?? findFirstYouTubeVideoIdInText(descriptionInput) ?? void 0
  };
}
async function parseSummaryMarkdown(summaryInput, errorKey) {
  const isHTMLInput = summaryInput.trim().startsWith("<");
  const resources = [];
  const guests = [];
  const homeworkHTMLs = [];
  let youtubeVideoId = null;
  const result = await unified().use(isHTMLInput ? parseHtml : parseMarkdown).use(isHTMLInput ? rehype2remark : () => {
  }).use(function extractMetaData() {
    return function transformer(tree) {
      const sections = {};
      visit(tree, "heading", (heading, index, parent) => {
        if (!parent) {
          console.error(heading, `${errorKey} heading without a parent`);
          return;
        }
        if (heading.depth !== 3) return;
        const nextHeading = parent.children.slice((index ?? 0) + 1).find((n) => n.type === "heading" && n.depth >= 3);
        const endOfSection = nextHeading ? (
          // @ts-expect-error no idea why typescript says something I found can't be indexed 🤷‍♂️
          parent.children.indexOf(nextHeading)
        ) : parent.children.length;
        const headingChildren = parent.children.slice(
          (index ?? 0) + 1,
          endOfSection
        );
        const sectionTitle = heading.children[0]?.value;
        if (!sectionTitle) {
          console.error(`${errorKey}: Section with no title`, heading);
          return;
        }
        sections[sectionTitle] = {
          children: headingChildren,
          remove() {
            parent.children = removeEls(
              parent.children,
              heading,
              ...headingChildren
            );
          }
        };
      });
      for (const [sectionTitle, { children, remove }] of Object.entries(
        sections
      )) {
        if (/kent c. dodds/i.test(sectionTitle)) {
          remove();
          continue;
        }
        if (/resources/i.test(sectionTitle)) {
          remove();
          for (const child of children) {
            visit(child, "listItem", (listItem) => {
              visit(listItem, "link", (link) => {
                visit(link, "text", (text) => {
                  resources.push({
                    name: text.value,
                    url: link.url
                  });
                });
              });
            });
          }
        }
        if (/^(video|youtube|youtube video)$/i.test(sectionTitle)) {
          remove();
          youtubeVideoId ??= findYouTubeVideoIdInNodes(children);
          continue;
        }
        if (/homework/i.test(sectionTitle)) {
          remove();
          for (const child of children) {
            visit(child, "listItem", (listItem) => {
              homeworkHTMLs.push(
                listItem.children.map((c) => {
                  const hastC = toHast(c);
                  if (!hastC) {
                    console.error(
                      `${errorKey}: list item child that returned no hAST.`,
                      c
                    );
                    throw new Error(
                      "This should not happen. mdastToHast of a list item child is falsy."
                    );
                  }
                  return toHtml(hastC);
                }).join("")
              );
            });
          }
        }
        if (/^guest/i.test(sectionTitle)) {
          remove();
          for (const child of children) {
            let company, github, x;
            visit(child, "listItem", (listItem) => {
              const paragraph = listItem.children[0];
              if (paragraph?.type !== "paragraph") {
                console.error(
                  `${errorKey}: guest listItem first child is not a paragraph`,
                  child
                );
                return;
              }
              const [text, link] = paragraph.children;
              if (text?.type !== "text") {
                console.error(
                  `${errorKey}: guest listItem first child's first child is not a text node`,
                  child
                );
                return;
              }
              if (link?.type !== "link") {
                console.error(
                  `${errorKey}: guest listItem first child's second child is not a link node`,
                  child
                );
                return;
              }
              const linkText = link.children[0];
              if (linkText?.type !== "text") {
                console.error(
                  `${errorKey}: guest listItem first child's second child's first child is not a text node`,
                  child
                );
                return;
              }
              const { value: type } = text;
              const { value: name } = linkText;
              if (/company/i.test(type)) {
                company = name;
              }
              if (/github/i.test(type)) {
                github = name.replace("@", "");
              }
              if (/twitter/i.test(type)) {
                x = name.replace("@", "");
              }
              if (/x/i.test(type)) {
                x = name.replace("@", "");
              }
              if (/𝕏/i.test(type)) {
                x = name.replace("@", "");
              }
            });
            guests.push({
              name: sectionTitle.replace(/^guest:?/i, "").trim(),
              company,
              github,
              x
            });
          }
        }
      }
      const [lastElement] = tree.children.slice(-1);
      if (lastElement?.type === "thematicBreak") {
        tree.children = removeEls(tree.children, lastElement);
      }
    };
  }).use(remark2rehype).use(autoAffiliates).use(rehypeStringify).process(summaryInput);
  const summaryHTML = result.value.toString();
  return {
    summaryHTML,
    homeworkHTMLs,
    resources,
    guests,
    youtubeVideoId: youtubeVideoId ?? void 0
  };
}
async function getSeasonListItems({
  request,
  forceFresh,
  timings,
  signal
}) {
  const seasons = await getCachedSeasons({
    request,
    forceFresh,
    timings,
    signal
  });
  const listItemSeasons = [];
  for (const season of seasons) {
    listItemSeasons.push({
      seasonNumber: season.seasonNumber,
      episodes: season.episodes.map((episode) => {
        return omit(
          episode,
          "homeworkHTMLs",
          "resources",
          "summaryHTML",
          "transcriptHTML",
          "meta",
          "descriptionHTML"
        );
      })
    });
  }
  return listItemSeasons;
}
export {
  getSeasonListItems,
  getCachedSeasons as getSeasons,
  parseDescriptionMarkdown,
  parseSummaryMarkdown
};
