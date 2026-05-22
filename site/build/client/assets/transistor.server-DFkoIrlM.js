import slugify from "@sindresorhus/slugify";
import * as uuid from "uuid";
import { i as isAbortError, t as throwIfAborted, w as waitForDelay } from "./abort-utils.server-Bx3f6jnJ.js";
import { c as cachified, s as shouldForceFresh, b as cache } from "./cache.server-BWnHcoUK.js";
import { a as getEpisodePath, b as getAbhiCallEpisodeArtworkAvatar, c as getAbhiCallEpisodeArtworkUrl } from "./abhi-call-HST9AF8V.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { s as stripHtml } from "./markdown.server-C6vYtRmU.js";
import { e as getDirectAvatarForUser } from "./user-info.server-DQEJabU4.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "react-router";
import "litefs-js";
import "litefs-js/remix";
import "./session.server-BVOCbXUc.js";
import "zod";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "./misc-DM3BUXHg.js";
import "date-fns";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./misc-react-D8yAGzlT.js";
import "react/jsx-runtime";
import "@sentry/react-router";
import "md5-hash";
import "react";
function getErrorCode(error) {
  if (!error || typeof error !== "object") return "";
  if ("code" in error && typeof error.code === "string") return error.code;
  if ("cause" in error && error.cause && typeof error.cause === "object" && "code" in error.cause && typeof error.cause.code === "string") {
    return error.cause.code;
  }
  return "";
}
function isTransientNetworkError(error) {
  const code = getErrorCode(error);
  if (code === "ECONNRESET" || code === "ETIMEDOUT" || code === "EPIPE" || code === "ECONNREFUSED" || code === "UND_ERR_CONNECT_TIMEOUT") {
    return true;
  }
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string" && error.message === "fetch failed") {
    return true;
  }
  return false;
}
async function fetchTransitor({
  endpoint,
  method = "GET",
  query = {},
  data,
  signal
}) {
  const env = getEnv();
  const url = new URL(endpoint, "https://api.transistor.fm");
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value);
  }
  const config = {
    method,
    headers: {
      "x-api-key": env.TRANSISTOR_API_SECRET
    }
  };
  if (data) {
    config.body = JSON.stringify(data);
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json"
    };
  }
  const maxRetries = 3;
  let attempt = 0;
  while (true) {
    try {
      throwIfAborted(signal);
      const res = await fetch(url.toString(), config);
      throwIfAborted(signal);
      if (res.status === 429 && attempt < maxRetries) {
        attempt++;
        const retryAfterHeader = res.headers.get("Retry-After");
        const retryAfterSeconds = retryAfterHeader && !Number.isNaN(Number(retryAfterHeader)) ? Number(retryAfterHeader) : 10;
        await waitForDelay({ delayMs: retryAfterSeconds * 1e3, signal });
        continue;
      }
      if (res.status >= 500 && attempt < maxRetries) {
        attempt++;
        await waitForDelay({ delayMs: attempt * 1e3, signal });
        continue;
      }
      const json = await res.json();
      if (!res.ok) {
        const message = json?.errors ? json.errors.map((e) => e.title).join("\n") : `HTTP ${res.status}`;
        throw new Error(message);
      }
      if (json?.errors) {
        throw new Error(
          json.errors.map((e) => e.title).join("\n")
        );
      }
      return json;
    } catch (error) {
      if (isAbortError(error)) throw error;
      if (isTransientNetworkError(error) && attempt < maxRetries) {
        attempt++;
        await waitForDelay({ delayMs: attempt * 1e3, signal });
        continue;
      }
      throw error;
    }
  }
}
async function updateEpisodeTranscriptText({
  episodeId,
  transcriptText
}) {
  const updateData = {
    id: episodeId,
    episode: { transcript_text: transcriptText }
  };
  await fetchTransitor({
    endpoint: `/v1/episodes/${encodeURIComponent(episodeId)}`,
    method: "PATCH",
    data: updateData
  });
}
async function createEpisode({
  audio,
  title,
  summary,
  description,
  keywords,
  user,
  request,
  isAnonymous,
  transcriptText
}) {
  const id = uuid.v4();
  const authorized = await fetchTransitor({
    endpoint: "v1/episodes/authorize_upload",
    query: { filename: `${id}.mp3` }
  });
  const { upload_url, audio_url, content_type } = authorized.data.attributes;
  const episodesPerSeason = 50;
  const currentSeason = await getCurrentSeason();
  await fetch(upload_url, {
    method: "PUT",
    body: new Uint8Array(audio),
    headers: { "Content-Type": content_type }
  });
  const env = getEnv();
  const createData = {
    episode: {
      show_id: env.CALL_KENT_PODCAST_ID,
      season: currentSeason,
      audio_url,
      title,
      summary,
      description,
      keywords,
      increment_number: true,
      transcript_text: transcriptText
    }
  };
  const created = await fetchTransitor({
    endpoint: "v1/episodes",
    method: "POST",
    data: createData
  });
  await fetchTransitor({
    endpoint: `/v1/episodes/${encodeURIComponent(created.data.id)}/publish`,
    method: "PATCH",
    data: {
      episode: {
        status: "published"
      }
    }
  });
  const number = created.data.attributes.number;
  if (typeof number !== "number") {
    throw new Error("Transistor did not return an episode number.");
  }
  const zeroIndexed = number - 1;
  const seasonOffset = Math.floor(zeroIndexed / episodesPerSeason);
  const season = currentSeason + seasonOffset;
  const episodeNumber = zeroIndexed % episodesPerSeason + 1;
  const slug = slugify(created.data.attributes.title);
  const episodePath = getEpisodePath({
    episodeNumber,
    seasonNumber: season,
    slug
  });
  const domainUrl = "https://kentcdodds.com";
  const shortEpisodePath = getEpisodePath({
    episodeNumber,
    seasonNumber: season
  });
  const shortDomain = domainUrl.replace(/^https?:\/\//, "");
  const avatarSize = 1400;
  let hasGravatar = false;
  let gravatarUrl = null;
  if (!isAnonymous) {
    const result = await getDirectAvatarForUser(user, {
      size: avatarSize,
      request,
      forceFresh: true
    });
    hasGravatar = result.hasGravatar;
    gravatarUrl = result.hasGravatar ? result.avatar : null;
  }
  const avatar = getAbhiCallEpisodeArtworkAvatar({
    isAnonymous: isAnonymous ?? false,
    team: user.team,
    gravatarUrl
  });
  const imageUrl = getAbhiCallEpisodeArtworkUrl({
    title,
    url: `${shortDomain}${shortEpisodePath}`,
    name: isAnonymous ? "- Anonymous" : `- ${user.firstName}`,
    avatar,
    avatarIsRound: hasGravatar
  });
  const episodeUrl = `${domainUrl}${episodePath}`;
  const updateData = {
    id: created.data.id,
    episode: {
      alternate_url: episodeUrl,
      image_url: imageUrl,
      description: `${description}

<a href="${episodeUrl}">${title}</a>`,
      number: episodeNumber,
      season
    }
  };
  await fetchTransitor({
    endpoint: `/v1/episodes/${encodeURIComponent(created.data.id)}`,
    method: "PATCH",
    data: updateData
  });
  const returnValue = {
    transistorEpisodeId: created.data.id,
    episodeUrl,
    episodePath,
    imageUrl,
    seasonNumber: season,
    episodeNumber,
    slug
  };
  await getCachedEpisodes({ forceFresh: true });
  return returnValue;
}
async function getEpisodes({ signal } = {}) {
  throwIfAborted(signal);
  const perPage = 100;
  const firstPage = await fetchTransitor({
    endpoint: `/v1/episodes`,
    query: { "pagination[per]": String(perPage), "pagination[page]": "1" },
    signal
  });
  const allEpisodesData = [...firstPage.data];
  const totalPages = firstPage.meta?.totalPages ?? 1;
  for (const page of Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, i) => i + 2
  )) {
    throwIfAborted(signal);
    const pageData = await fetchTransitor({
      endpoint: `/v1/episodes`,
      query: {
        "pagination[per]": String(perPage),
        "pagination[page]": String(page)
      },
      signal
    });
    allEpisodesData.push(...pageData.data);
  }
  const sortedTransistorEpisodes = allEpisodesData.sort((a, b) => {
    const aNumber = a.attributes.number ?? 0;
    const bNumber = b.attributes.number ?? 0;
    if (aNumber < bNumber) {
      return -1;
    } else if (aNumber > bNumber) {
      return 1;
    }
    return 0;
  });
  const episodes = [];
  for (const episode of sortedTransistorEpisodes) {
    throwIfAborted(signal);
    if (episode.attributes.audio_processing) continue;
    if (episode.attributes.status !== "published") continue;
    if (!episode.attributes.number) continue;
    if (!episode.attributes.duration) continue;
    episodes.push({
      transistorEpisodeId: episode.id,
      seasonNumber: episode.attributes.season,
      episodeNumber: episode.attributes.number,
      slug: slugify(episode.attributes.title),
      title: episode.attributes.title,
      summary: episode.attributes.summary,
      descriptionHTML: episode.attributes.description,
      description: await stripHtml(episode.attributes.description),
      keywords: episode.attributes.keywords,
      duration: episode.attributes.duration,
      shareUrl: episode.attributes.share_url,
      mediaUrl: episode.attributes.media_url,
      embedHtml: episode.attributes.embed_html,
      embedHtmlDark: episode.attributes.embed_html_dark,
      imageUrl: episode.attributes.image_url,
      publishedAt: episode.attributes.published_at,
      updatedAt: episode.attributes.updated_at
    });
  }
  return episodes;
}
async function getCurrentSeason() {
  const episodesResponse = await fetchTransitor({
    endpoint: `/v1/episodes`,
    query: {
      "pagination[per]": "1",
      order: "desc"
    }
  });
  const lastEpisode = episodesResponse.data[0];
  const season = lastEpisode?.attributes.season;
  return typeof season === "number" ? season : 1;
}
async function getCachedEpisodes({
  request,
  forceFresh,
  timings,
  signal
}) {
  const episodesCacheKey = `transistor:episodes:${getEnv().CALL_KENT_PODCAST_ID}`;
  try {
    return await cachified({
      cache,
      request,
      timings,
      key: episodesCacheKey,
      getFreshValue: () => getEpisodes({ signal }),
      ttl: 1e3 * 60 * 60 * 24,
      staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 30,
      forceFresh: await shouldForceFresh({
        key: episodesCacheKey,
        forceFresh,
        request
      }),
      checkValue: (value) => Array.isArray(value) && value.every(
        (v) => typeof v.slug === "string" && typeof v.title === "string"
      )
    });
  } catch (error) {
    if (isAbortError(error)) return [];
    console.error(
      `transistor: cachified failed to resolve episodes, returning empty fallback`,
      error
    );
    return [];
  }
}
export {
  createEpisode,
  getCachedEpisodes as getEpisodes,
  updateEpisodeTranscriptText
};
//# sourceMappingURL=transistor.server-DFkoIrlM.js.map
