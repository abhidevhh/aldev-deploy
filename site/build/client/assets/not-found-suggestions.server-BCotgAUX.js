import { jsx, jsxs } from "react/jsx-runtime";
import { useParams, isRouteErrorResponse } from "react-router";
import { u as useCapturedRouteError } from "./misc-react-D8yAGzlT.js";
import { e as getErrorMessage } from "./misc-DM3BUXHg.js";
import fs from "node:fs/promises";
import path__default from "node:path";
import { rankings, matchSorter } from "match-sorter";
import * as YAML from "yaml";
import { a as getImageBuilder } from "./images-D8NqauwH.js";
import { y as notFoundQueryFromPathname, z as sortNotFoundMatches } from "./root-BtDGpB2R.js";
function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => /* @__PURE__ */ jsxs("p", { children: [
    error.status,
    " ",
    error.data
  ] }),
  statusHandlers,
  unexpectedErrorHandler = (error) => /* @__PURE__ */ jsx("p", { children: getErrorMessage(error) })
}) {
  const error = useCapturedRouteError();
  const params = useParams();
  if (typeof document !== "undefined") {
    console.error(error);
  }
  if (isRouteErrorResponse(error)) {
    const handler = statusHandlers?.[error.status] ?? defaultStatusHandler;
    return /* @__PURE__ */ jsx("div", { className: "container mx-auto flex items-center justify-center p-4 lg:p-20", children: handler({ error, params }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto flex items-center justify-center p-4 lg:p-20", children: unexpectedErrorHandler(error) });
}
function normalizePathname(pathname) {
  const cleaned = (pathname.split(/[?#]/)[0] ?? "").trim();
  if (!cleaned) return "/";
  if (cleaned === "/") return "/";
  return cleaned.replace(/\/+$/, "") || "/";
}
function toUrlKey(url) {
  try {
    const u = new URL(url, "https://kentcdodds.com");
    return `${u.pathname}${u.search}`;
  } catch {
    return url;
  }
}
function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}
function asNonEmptyString(value) {
  if (typeof value !== "string") return void 0;
  const trimmed = value.trim();
  return trimmed ? trimmed : void 0;
}
function parseYamlFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u);
  if (!match) return null;
  const raw = match[1] ?? "";
  try {
    const parsed = YAML.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
function humanizeSlug(slug) {
  return slug.replace(/[_/]+/g, " ").replace(/[-.]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\s+/g, " ").trim();
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
const mdxMetaCache = /* @__PURE__ */ new Map();
async function getMdxMeta(filePath) {
  const cached = mdxMetaCache.get(filePath);
  if (cached !== void 0) return cached;
  try {
    const source = await fs.readFile(filePath, "utf8");
    const fm = parseYamlFrontmatter(source) ?? {};
    const title = asNonEmptyString(fm.title);
    const description = asNonEmptyString(fm.description);
    const bannerCloudinaryId = asNonEmptyString(fm.bannerCloudinaryId);
    const bannerAltRaw = fm.bannerAlt;
    const bannerAlt = typeof bannerAltRaw === "string" ? normalizeText(bannerAltRaw) : void 0;
    const draft = fm.draft === true;
    const unlisted = fm.unlisted === true;
    const effectiveTitle = title;
    const effectiveAlt = bannerAlt ?? effectiveTitle ?? "Thumbnail";
    const imageUrl = bannerCloudinaryId ? buildThumbFromCloudinaryId({
      cloudinaryId: bannerCloudinaryId,
      alt: effectiveAlt,
      size: 96
    }) : void 0;
    const meta = {
      title: effectiveTitle,
      summary: description ? normalizeText(description) : void 0,
      imageUrl,
      imageAlt: bannerCloudinaryId ? effectiveAlt : void 0,
      draft,
      unlisted
    };
    mdxMetaCache.set(filePath, meta);
    return meta;
  } catch {
    mdxMetaCache.set(filePath, null);
    return null;
  }
}
async function firstExistingFile(filenames) {
  for (const filename of filenames) {
    try {
      const stat = await fs.stat(filename);
      if (stat.isFile()) return filename;
    } catch {
      continue;
    }
  }
  return null;
}
function getRepoRootDir() {
  return process.cwd();
}
function getStaticIndexItems() {
  return [
    { url: "/", type: "page", title: "Home" },
    { url: "/blog", type: "page", title: "Blog" },
    { url: "/talks", type: "page", title: "Talks" },
    { url: "/calls", type: "page", title: "Call Kent podcast" },
    { url: "/chats", type: "page", title: "Chats" },
    { url: "/youtube", type: "page", title: "YouTube" },
    { url: "/search", type: "page", title: "Search (semantic)" },
    { url: "/resume", type: "page", title: "Resume" },
    { url: "/credits", type: "page", title: "Credits" },
    { url: "/testimonials", type: "page", title: "Testimonials" }
  ];
}
async function getBlogIndexItems(repoRoot) {
  const blogDir = path__default.join(repoRoot, "content", "blog");
  let entries;
  try {
    entries = await fs.readdir(blogDir, { withFileTypes: true });
  } catch {
    return [];
  }
  const items = [];
  for (const entry of entries) {
    const name = entry.name;
    if (!name || name.startsWith(".")) continue;
    if (entry.isFile() && /\.(mdx|md)$/i.test(name)) {
      const slug = name.replace(/\.(mdx|md)$/i, "");
      if (!slug) continue;
      items.push({
        url: `/blog/${slug}`,
        type: "blog",
        title: humanizeSlug(slug) || slug,
        slug,
        filePath: path__default.join(blogDir, name)
      });
      continue;
    }
    if (entry.isDirectory()) {
      const slug = name;
      if (!slug) continue;
      const filePath = await firstExistingFile([
        path__default.join(blogDir, slug, "index.mdx"),
        path__default.join(blogDir, slug, "index.md")
      ]);
      if (!filePath) continue;
      items.push({
        url: `/blog/${slug}`,
        type: "blog",
        title: humanizeSlug(slug) || slug,
        slug,
        filePath
      });
    }
  }
  return items;
}
async function walkPagesDir({
  dir,
  relativeSlug,
  items
}) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const name = entry.name;
    if (!name || name.startsWith(".")) continue;
    if (entry.isSymbolicLink()) continue;
    const absolute = path__default.join(dir, name);
    if (entry.isDirectory()) {
      const nextRelativeSlug = relativeSlug ? path__default.posix.join(relativeSlug, name) : name;
      await walkPagesDir({
        dir: absolute,
        relativeSlug: nextRelativeSlug,
        items
      });
      continue;
    }
    if (!entry.isFile() || !/\.(mdx|md)$/i.test(name)) continue;
    const baseName = name.replace(/\.(mdx|md)$/i, "");
    const slug = baseName === "index" ? relativeSlug : relativeSlug ? path__default.posix.join(relativeSlug, baseName) : baseName;
    if (!slug) continue;
    items.push({
      url: `/${slug}`,
      type: "page",
      title: humanizeSlug(slug) || slug,
      slug,
      filePath: absolute
    });
  }
}
async function getPageIndexItems(repoRoot) {
  const pagesDir = path__default.join(repoRoot, "content", "pages");
  const items = [];
  await walkPagesDir({ dir: pagesDir, relativeSlug: "", items });
  return items;
}
let cachedIndex = null;
let cachedIndexPromise = null;
async function getNotFoundDeterministicIndex() {
  if (cachedIndex) return cachedIndex;
  if (cachedIndexPromise) return cachedIndexPromise;
  cachedIndexPromise = (async () => {
    const repoRoot = getRepoRootDir();
    const [blogs, pages] = await Promise.all([
      getBlogIndexItems(repoRoot),
      getPageIndexItems(repoRoot)
    ]);
    const combined = [...getStaticIndexItems(), ...blogs, ...pages];
    const byUrl = /* @__PURE__ */ new Map();
    for (const item of combined) {
      const url = normalizePathname(item.url);
      if (!url.startsWith("/")) continue;
      const key = toUrlKey(url);
      if (!byUrl.has(key)) byUrl.set(key, { ...item, url });
    }
    cachedIndex = [...byUrl.values()];
    return cachedIndex;
  })().finally(() => {
    cachedIndexPromise = null;
  });
  return cachedIndexPromise;
}
function getQueryCandidates({
  pathname,
  baseQuery
}) {
  const normalized = normalizePathname(pathname);
  const segments = normalized.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] ?? "";
  const lastQuery = lastSegment ? notFoundQueryFromPathname(lastSegment) : "";
  const withoutFirstSegmentQuery = segments.length > 1 ? notFoundQueryFromPathname(segments.slice(1).join("/")) : "";
  const rawPathQuery = normalizeText(
    normalized.replace(/^\/+/, "").replace(/[-_./]+/g, " ")
  );
  const candidates = [
    baseQuery,
    withoutFirstSegmentQuery,
    lastQuery,
    rawPathQuery
  ].map((q) => q.trim());
  const unique = [];
  const seen = /* @__PURE__ */ new Set();
  for (const q of candidates) {
    if (!q) continue;
    const key = q.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(q.length > 120 ? q.slice(0, 120).trim() : q);
  }
  return unique;
}
const matchSorterOptions = {
  keys: [
    { key: "title", threshold: rankings.CONTAINS },
    {
      key: (i) => normalizeText(i.url.replace(/[-_./]+/g, " ")),
      threshold: rankings.CONTAINS,
      maxRanking: rankings.CONTAINS
    },
    {
      key: "url",
      threshold: rankings.CONTAINS,
      maxRanking: rankings.CONTAINS
    },
    {
      key: (i) => i.slug ?? "",
      threshold: rankings.CONTAINS,
      maxRanking: rankings.CONTAINS
    },
    {
      key: "type",
      threshold: rankings.CONTAINS,
      maxRanking: rankings.CONTAINS
    }
  ]
};
function filterIndexItems(items, searchString) {
  if (!searchString) return items;
  const allResults = matchSorter(items, searchString, matchSorterOptions);
  const searches = new Set(
    searchString.split(" ").map((s) => s.trim()).filter(Boolean)
  );
  if (searches.size < 2) return allResults;
  const [firstWord, ...restWords] = searches.values();
  if (!firstWord) return [];
  const individualWordOptions = {
    ...matchSorterOptions,
    keys: matchSorterOptions.keys.map((key) => {
      return {
        ...key,
        maxRanking: rankings.CASE_SENSITIVE_EQUAL,
        threshold: rankings.WORD_STARTS_WITH
      };
    })
  };
  let individualWordResults = matchSorter(
    items,
    firstWord,
    individualWordOptions
  );
  for (const word of restWords) {
    const searchResult = matchSorter(
      individualWordResults,
      word,
      individualWordOptions
    );
    const searchResultSet = new Set(searchResult);
    individualWordResults = individualWordResults.filter(
      (r) => searchResultSet.has(r)
    );
  }
  return Array.from(/* @__PURE__ */ new Set([...allResults, ...individualWordResults]));
}
async function toNotFoundMatch(item) {
  const base = {
    url: item.url,
    type: item.type,
    title: item.title
  };
  if (!item.filePath) return base;
  const meta = await getMdxMeta(item.filePath);
  if (!meta) return base;
  if (meta.draft || meta.unlisted) return null;
  return {
    url: item.url,
    type: item.type,
    title: meta.title ?? base.title,
    summary: meta.summary,
    imageUrl: meta.imageUrl,
    imageAlt: meta.imageAlt
  };
}
async function getNotFoundSuggestions({
  request,
  pathname,
  limit = 8,
  priorities
}) {
  if (process.env.NODE_ENV === "test") return null;
  if (request.method.toUpperCase() !== "GET") return null;
  const resolvedPathname = normalizePathname(
    typeof pathname === "string" && pathname ? pathname : new URL(request.url).pathname
  );
  const query = notFoundQueryFromPathname(resolvedPathname);
  if (!query || query.length < 3) return null;
  const safeLimit = typeof limit === "number" && Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 8;
  if (safeLimit <= 0) return null;
  try {
    const index = await getNotFoundDeterministicIndex();
    if (!index.length) return null;
    const queryCandidates = getQueryCandidates({
      pathname: resolvedPathname,
      baseQuery: query
    });
    const seen = /* @__PURE__ */ new Set();
    const matches = [];
    for (const candidate of queryCandidates) {
      if (matches.length >= safeLimit) break;
      const filtered = filterIndexItems(index, candidate);
      for (const item of filtered) {
        if (matches.length >= safeLimit) break;
        if (normalizePathname(item.url) === resolvedPathname) continue;
        const key = toUrlKey(item.url);
        if (seen.has(key)) continue;
        const match = await toNotFoundMatch(item);
        if (!match) continue;
        seen.add(key);
        matches.push(match);
      }
    }
    const sorted = sortNotFoundMatches(matches, { priorities }).slice(
      0,
      safeLimit
    );
    return { query, matches: sorted };
  } catch (error) {
    console.error("Deterministic 404 suggestions failed", error);
    return null;
  }
}
export {
  GeneralErrorBoundary as G,
  getNotFoundSuggestions as g
};
//# sourceMappingURL=not-found-suggestions.server-BCotgAUX.js.map
