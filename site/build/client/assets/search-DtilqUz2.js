import { data } from "react-router";
import { s as searchKCD, a as SearchQueryTooLongError } from "./search.server-CEHFJkNx.js";
import { h as getDomainUrl } from "./misc-DM3BUXHg.js";
import "node:crypto";
import "zod";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "litefs-js";
import "litefs-js/remix";
import "./session.server-BVOCbXUc.js";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "node:fs/promises";
import "@sindresorhus/slugify";
import "yaml";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "date-fns";
function normalizeSummary(value) {
  if (typeof value !== "string") return void 0;
  const text = value.replace(/\s+/g, " ").trim();
  if (!text) return void 0;
  return text.length > 220 ? `${text.slice(0, 217)}...` : text;
}
async function loader({
  request
}) {
  const query = new URL(request.url).searchParams.get("query");
  const domainUrl = getDomainUrl(request);
  if (typeof query !== "string" || !query) {
    return data({
      error: "Invalid query"
    }, {
      status: 400
    });
  }
  const headers = {
    "Cache-Control": "no-store"
  };
  let payload;
  try {
    payload = await searchKCD({
      query,
      topK: 15,
      request
    });
  } catch (error) {
    if (error instanceof SearchQueryTooLongError) {
      return data({
        error: error.message
      }, {
        status: 400,
        headers
      });
    }
    throw error;
  }
  return data({
    noCloseMatches: payload.noCloseMatches,
    results: payload.results.map((r) => {
      const url = r.url ?? (r.id.startsWith("/") ? r.id : "");
      const absoluteUrl = url.startsWith("http") ? url : url.startsWith("/") ? `${domainUrl}${url}` : url ? `${domainUrl}/${url}` : domainUrl;
      return {
        url: absoluteUrl,
        segment: r.type ?? "Results",
        title: r.title ?? url ?? r.id,
        summary: normalizeSummary(r.summary ?? r.snippet),
        imageUrl: r.imageUrl,
        imageAlt: r.imageAlt
      };
    })
  }, {
    headers
  });
}
export {
  loader
};
//# sourceMappingURL=search-DtilqUz2.js.map
