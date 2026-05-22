import { UNSAFE_withComponentProps, useSearchParams, useSubmit, useFetcher, Form, Link, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, data } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { invariantResponse } from "@epic-web/invariant";
import * as React from "react";
import { a as Button } from "./button-B-8RrXF2.js";
import { E as ErrorPanel, b as FieldContainer, i as inputClassName } from "./form-elements-D3OfaKUp.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { c as H2, P as Paragraph, H as H3, b as H4 } from "./typography-DDpAXXrz.js";
import { b as useDebounce, c as useDoubleCheck, u as useCapturedRouteError } from "./misc-react-D8yAGzlT.js";
import { Readable } from "node:stream";
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { requireAdminUser } from "./session.server-BVOCbXUc.js";
import { e as getErrorMessage } from "./misc-DM3BUXHg.js";
import "clsx";
import "@sentry/react-router";
import "md5-hash";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "zod";
import "litefs-js";
import "litefs-js/remix";
import "./prisma.server-MnXt9BdG.js";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "date-fns";
function normalizePattern(pattern) {
  return pattern.trim();
}
function matchesIgnorePattern(docId, pattern) {
  const normalized = normalizePattern(pattern);
  if (!normalized) return false;
  if (normalized.endsWith("*")) {
    const prefix = normalized.slice(0, -1);
    return docId.startsWith(prefix);
  }
  return docId === normalized;
}
function isDocIdIgnored({
  docId,
  ignoreList
}) {
  return (ignoreList.patterns ?? []).some((p) => matchesIgnorePattern(docId, p));
}
const DEFAULT_MANIFEST_PREFIX = "manifests/";
function getR2Bucket() {
  return getEnv().R2_BUCKET;
}
function getR2ConfigFromEnv() {
  const env = getEnv();
  const endpoint = env.R2_ENDPOINT;
  const accessKeyId = env.R2_ACCESS_KEY_ID;
  const secretAccessKey = env.R2_SECRET_ACCESS_KEY;
  return { endpoint, accessKeyId, secretAccessKey };
}
let _r2Client = null;
let _r2ClientConfig = null;
function getR2Client() {
  const { endpoint, accessKeyId, secretAccessKey } = getR2ConfigFromEnv();
  if (_r2Client && _r2ClientConfig && _r2ClientConfig.endpoint === endpoint && _r2ClientConfig.accessKeyId === accessKeyId && _r2ClientConfig.secretAccessKey === secretAccessKey) {
    return _r2Client;
  }
  _r2ClientConfig = { endpoint, accessKeyId, secretAccessKey };
  _r2Client = new S3Client({
    region: "auto",
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey }
  });
  return _r2Client;
}
async function streamToString(body) {
  if (!body) return "";
  if (typeof body === "string") return body;
  if (body instanceof Uint8Array) return Buffer.from(body).toString("utf8");
  if (typeof body === "object" && body !== null && "transformToString" in body && typeof body.transformToString === "function") {
    return await body.transformToString("utf-8");
  }
  if (body instanceof Readable) {
    const chunks = [];
    for await (const chunk of body) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf8");
  }
  return String(body);
}
function isNotFoundError(error) {
  if (!error || typeof error !== "object") return false;
  const anyErr = error;
  const name = typeof anyErr.name === "string" ? anyErr.name : "";
  const status = anyErr?.$metadata?.httpStatusCode;
  if (name === "NoSuchKey" || name === "NotFound") return true;
  if (status === 404) return true;
  const message = typeof anyErr.message === "string" ? anyErr.message : "";
  return /NoSuchKey|not found/i.test(message);
}
async function getJsonFromR2({
  client,
  bucket,
  key
}) {
  try {
    const res = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    const text = await streamToString(res.Body);
    if (!text.trim()) return null;
    return JSON.parse(text);
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}
async function putJsonToR2({
  client,
  bucket,
  key,
  value
}) {
  const body = JSON.stringify(value, null, 2);
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: "application/json; charset=utf-8"
    })
  );
}
async function listKeysFromR2({
  client,
  bucket,
  prefix
}) {
  const keys = [];
  let token = void 0;
  for (let page = 0; page < 25; page++) {
    const res = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: token
      })
    );
    for (const item of res.Contents ?? []) {
      const key = item.Key;
      if (typeof key === "string") keys.push(key);
    }
    if (!res.IsTruncated) break;
    token = res.NextContinuationToken;
    if (!token) break;
  }
  return keys;
}
function getDefaultIgnoreList() {
  return { version: 1, patterns: [] };
}
function createR2AdminStore() {
  const client = getR2Client();
  const bucket = getR2Bucket();
  const ignoreListKey = getEnv().SEMANTIC_SEARCH_IGNORE_LIST_KEY;
  return {
    source: "r2",
    bucket,
    ignoreListKey,
    listManifestKeys: async () => {
      const keys = await listKeysFromR2({
        client,
        bucket,
        prefix: DEFAULT_MANIFEST_PREFIX
      });
      return keys.filter((k) => k.endsWith(".json")).filter((k) => k !== ignoreListKey).sort((a, b) => a.localeCompare(b));
    },
    getManifest: async (key) => {
      return await getJsonFromR2({
        client,
        bucket,
        key
      });
    },
    putManifest: async (key, value) => {
      await putJsonToR2({ client, bucket, key, value });
    },
    getIgnoreList: async () => {
      return await getJsonFromR2({
        client,
        bucket,
        key: ignoreListKey
      }) ?? getDefaultIgnoreList();
    },
    putIgnoreList: async (value) => {
      await putJsonToR2({ client, bucket, key: ignoreListKey, value });
    }
  };
}
function getSemanticSearchAdminStore() {
  return { store: createR2AdminStore(), configured: true };
}
function getCloudflareApiBaseUrl() {
  return "https://api.cloudflare.com/client/v4";
}
const vectorizeRequestTimeoutMs = 1e4;
function getRequiredVectorizeEnv() {
  const env = getEnv();
  return {
    accountId: env.CLOUDFLARE_ACCOUNT_ID,
    apiToken: env.CLOUDFLARE_API_TOKEN,
    indexName: env.CLOUDFLARE_VECTORIZE_INDEX
  };
}
async function vectorizeDeleteByIds({
  ids
}) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return { result: { deleted: 0 } };
  }
  if (ids.some((id) => typeof id !== "string" || id.trim().length === 0)) {
    throw new TypeError("ids must be a non-empty array of non-empty strings");
  }
  const { accountId, apiToken, indexName } = getRequiredVectorizeEnv();
  const body = JSON.stringify({ ids });
  const doFetch = async (path) => {
    const url = `${getCloudflareApiBaseUrl()}/accounts/${accountId}${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      vectorizeRequestTimeoutMs
    );
    try {
      return await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json"
        },
        body,
        signal: controller.signal
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Cloudflare API transport error (${path}): ${message}`, {
        cause: error
      });
    } finally {
      clearTimeout(timeout);
    }
  };
  const throwIfNotOk = async (response, path) => {
    if (response.ok) return;
    const text = await response.text().catch(() => "");
    throw new Error(
      `Cloudflare API request failed: ${response.status} ${response.statusText} (${path})${text ? `
${text}` : ""}`
    );
  };
  const v2Path = `/vectorize/v2/indexes/${indexName}/delete_by_ids`;
  const v2Response = await doFetch(v2Path);
  if (v2Response.status === 404 || v2Response.status === 405) {
    const legacyPath = `/vectorize/indexes/${indexName}/delete_by_ids`;
    const legacyResponse = await doFetch(legacyPath);
    await throwIfNotOk(legacyResponse, legacyPath);
    return await legacyResponse.json();
  }
  await throwIfNotOk(v2Response, v2Path);
  return await v2Response.json();
}
const handle = {
  getSitemapEntries: () => null
};
const cardClassName = "rounded-2xl bg-gray-100 p-6 ring-1 ring-inset ring-[rgba(0,0,0,0.05)] dark:bg-gray-850 dark:ring-[rgba(255,255,255,0.05)]";
function asPositiveInt(value, fallback) {
  if (!value) return fallback;
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.floor(n));
}
function containsInsensitive(haystack, needle) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}
function filterDocs({
  docs,
  query,
  type,
  showIgnored
}) {
  const q = query.trim();
  return docs.filter((doc) => {
    if (!showIgnored && doc.ignored) return false;
    if (type && doc.type !== type) return false;
    if (!q) return true;
    if (containsInsensitive(doc.docId, q) || containsInsensitive(doc.title, q) || containsInsensitive(doc.url, q) || containsInsensitive(doc.manifestKey, q)) {
      return true;
    }
    return doc.chunks.some((c) => containsInsensitive(c.snippet, q));
  });
}
function sortDocs(docs) {
  return [...docs].sort((a, b) => {
    if (a.ignored !== b.ignored) return a.ignored ? -1 : 1;
    const typeDiff = a.type.localeCompare(b.type);
    if (typeDiff) return typeDiff;
    const titleDiff = a.title.localeCompare(b.title);
    if (titleDiff) return titleDiff;
    return a.docId.localeCompare(b.docId);
  });
}
async function loader({
  request
}) {
  await requireAdminUser(request);
  const url = new URL(request.url);
  const sp = url.searchParams;
  const {
    store,
    message
  } = getSemanticSearchAdminStore();
  const manifestParam = sp.get("manifest") ?? "all";
  const query = sp.get("q") ?? "";
  const type = sp.get("type") ?? "";
  const showIgnored = sp.get("showIgnored") === "true";
  const limit = Math.min(500, Math.max(10, asPositiveInt(sp.get("limit"), 100)));
  const offset = asPositiveInt(sp.get("offset"), 0);
  if (!store || false) {
    return data({
      configured: false,
      message: message ?? "Semantic search admin is not configured on this environment.",
      semanticSearchConfigured: true,
      manifestKeys: [],
      selectedManifest: manifestParam,
      selectedKeys: [],
      query,
      type,
      showIgnored,
      limit,
      offset,
      total: 0,
      docs: [],
      typeOptions: [],
      ignoreList: {
        version: 1,
        patterns: []
      },
      store: null
    }, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  }
  const [manifestKeys, ignoreList] = await Promise.all([store.listManifestKeys(), store.getIgnoreList()]);
  const selectedKeys = manifestParam === "all" ? manifestKeys : manifestKeys.includes(manifestParam) ? [manifestParam] : manifestKeys;
  const manifests = await Promise.all(selectedKeys.map(async (key) => {
    const manifest = await store.getManifest(key);
    return {
      key,
      manifest
    };
  }));
  const rows = [];
  for (const {
    key: manifestKey,
    manifest
  } of manifests) {
    const docs = manifest?.docs ?? {};
    for (const [docId, doc] of Object.entries(docs)) {
      const chunks = Array.isArray(doc?.chunks) ? doc.chunks : [];
      rows.push({
        docId,
        manifestKey,
        type: String(doc?.type ?? ""),
        title: String(doc?.title ?? docId),
        url: String(doc?.url ?? ""),
        sourceUpdatedAt: typeof doc?.sourceUpdatedAt === "string" ? doc.sourceUpdatedAt : void 0,
        transcriptSource: typeof doc?.transcriptSource === "string" ? doc.transcriptSource : void 0,
        chunkCount: chunks.length,
        chunks: chunks.map((c) => ({
          id: String(c?.id ?? ""),
          hash: String(c?.hash ?? ""),
          snippet: String(c?.snippet ?? "")
        })),
        ignored: isDocIdIgnored({
          docId,
          ignoreList
        })
      });
    }
  }
  const filtered = sortDocs(filterDocs({
    docs: rows,
    query,
    type,
    showIgnored
  }));
  const paged = filtered.slice(offset, offset + limit);
  const types = /* @__PURE__ */ new Map();
  for (const r of rows) {
    const key = r.type || "unknown";
    types.set(key, (types.get(key) ?? 0) + 1);
  }
  const typeOptions = [...types.entries()].map(([k, count]) => ({
    type: k,
    count
  })).sort((a, b) => b.count - a.count || a.type.localeCompare(b.type));
  return data({
    configured: true,
    message,
    semanticSearchConfigured: true,
    manifestKeys,
    selectedManifest: manifestParam,
    selectedKeys,
    query,
    type,
    showIgnored,
    limit,
    offset,
    total: filtered.length,
    docs: paged,
    typeOptions,
    ignoreList,
    store: {
      source: store.source,
      bucket: store.bucket,
      ignoreListKey: store.ignoreListKey
    }
  }, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
function uniqPatterns(patterns) {
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const p of patterns) {
    const trimmed = p.trim();
    if (!trimmed) continue;
    if (seen.has(trimmed)) continue;
    seen.add(trimmed);
    result.push(trimmed);
  }
  return result;
}
async function deleteVectorsInBatches(ids) {
  let deleted = 0;
  for (let i = 0; i < ids.length; i += 500) {
    const batch = ids.slice(i, i + 500).filter(Boolean);
    if (batch.length === 0) continue;
    const res = await vectorizeDeleteByIds({
      ids: batch
    });
    const asAny = res;
    const next = typeof asAny?.result?.deleted === "number" ? asAny.result.deleted : typeof asAny?.deleted === "number" ? asAny.deleted : 0;
    deleted += next;
  }
  return deleted;
}
async function action({
  request
}) {
  await requireAdminUser(request);
  const {
    store
  } = getSemanticSearchAdminStore();
  if (!store || false) {
    return data({
      ok: false,
      error: "R2 is not configured for /search/admin."
    }, {
      status: 503
    });
  }
  const formData = await request.formData();
  const intent = formData.get("intent");
  invariantResponse(typeof intent === "string", "intent must be a string");
  if (intent === "ignore-add") {
    const pattern = String(formData.get("pattern") ?? "").trim();
    if (!pattern) return data({
      ok: false,
      error: "pattern is required"
    }, {
      status: 400
    });
    const ignoreList = await store.getIgnoreList();
    const patterns = uniqPatterns([...ignoreList.patterns ?? [], pattern]);
    await store.putIgnoreList({
      version: 1,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      patterns
    });
    return data({
      ok: true
    });
  }
  if (intent === "ignore-remove") {
    const pattern = String(formData.get("pattern") ?? "").trim();
    if (!pattern) return data({
      ok: false,
      error: "pattern is required"
    }, {
      status: 400
    });
    const ignoreList = await store.getIgnoreList();
    const patterns = (ignoreList.patterns ?? []).map((p) => p.trim()).filter(Boolean);
    await store.putIgnoreList({
      version: 1,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      patterns: patterns.filter((p) => p !== pattern)
    });
    return data({
      ok: true
    });
  }
  if (intent === "doc-delete") {
    const docId = String(formData.get("docId") ?? "").trim();
    const scope = String(formData.get("scope") ?? "manifest");
    const manifestKey = String(formData.get("manifestKey") ?? "").trim();
    const addToIgnore = String(formData.get("addToIgnore") ?? "") === "true";
    if (!docId) return data({
      ok: false,
      error: "docId is required"
    }, {
      status: 400
    });
    if (scope !== "all" && !manifestKey) {
      return data({
        ok: false,
        error: 'manifestKey is required unless scope is "all".'
      }, {
        status: 400
      });
    }
    const manifestKeys = scope === "all" ? await store.listManifestKeys() : [manifestKey];
    const vectorIdsToDelete = [];
    const updatedManifests = [];
    for (const key of manifestKeys) {
      const manifest = await store.getManifest(key);
      if (!manifest?.docs?.[docId]) continue;
      const next = structuredClone(manifest);
      const doc = next.docs[docId];
      if (doc?.chunks?.length) {
        for (const c of doc.chunks) {
          if (c?.id) vectorIdsToDelete.push(String(c.id));
        }
      }
      delete next.docs[docId];
      await store.putManifest(key, next);
      updatedManifests.push(key);
    }
    let deletedVectors = 0;
    let vectorDeleteSkipped = false;
    let vectorDeleteError = null;
    if (vectorIdsToDelete.length) {
      try {
        deletedVectors = await deleteVectorsInBatches(vectorIdsToDelete);
      } catch (error) {
        vectorDeleteError = getErrorMessage(error);
      }
    }
    if (addToIgnore) {
      const ignoreList = await store.getIgnoreList();
      const patterns = uniqPatterns([...ignoreList.patterns ?? [], docId]);
      await store.putIgnoreList({
        version: 1,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        patterns
      });
    }
    return data({
      ok: true,
      docId,
      updatedManifests,
      vectorIdsRequested: vectorIdsToDelete.length,
      deletedVectors,
      vectorDeleteSkipped,
      vectorDeleteError
    });
  }
  return data({
    ok: false,
    error: `Unknown intent: ${intent}`
  }, {
    status: 400
  });
}
const search_admin = UNSAFE_withComponentProps(function SearchAdminRoute({
  loaderData: data2
}) {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const syncGetForm = useDebounce((form) => {
    void submit(form, {
      replace: true
    });
  }, 350);
  const ignoreAddFetcher = useFetcher();
  const ignoreAddRef = React.useRef(null);
  React.useEffect(() => {
    if (ignoreAddFetcher.state !== "idle") return;
    const ok = ignoreAddFetcher.data?.ok;
    if (!ok) return;
    if (!ignoreAddRef.current) return;
    ignoreAddRef.current.value = "";
    ignoreAddRef.current.focus();
  }, [ignoreAddFetcher.state, ignoreAddFetcher.data]);
  const nextOffset = data2.offset + data2.limit;
  const prevOffset = Math.max(0, data2.offset - data2.limit);
  const hasPrev = data2.offset > 0;
  const hasNext = nextOffset < data2.total;
  return /* @__PURE__ */ jsx("main", {
    className: "mt-12 mb-24 lg:mt-24 lg:mb-48",
    children: /* @__PURE__ */ jsxs(Grid, {
      rowGap: true,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-full",
        children: [/* @__PURE__ */ jsx(H2, {
          children: "Semantic Search Admin"
        }), /* @__PURE__ */ jsx(Paragraph, {
          textColorClassName: "text-secondary",
          children: "Inspect and curate semantic-search manifests; delete docs from the Vectorize index; manage an ignore list to prevent re-indexing."
        })]
      }), data2.message ? /* @__PURE__ */ jsx("div", {
        className: "col-span-full",
        children: data2.configured ? /* @__PURE__ */ jsx(InfoPanel, {
          children: data2.message
        }) : /* @__PURE__ */ jsx(ErrorPanel, {
          children: data2.message
        })
      }) : null, data2.store ? /* @__PURE__ */ jsx("div", {
        className: "col-span-full",
        children: /* @__PURE__ */ jsx(InfoPanel, {
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-wrap gap-x-3 gap-y-1",
            children: [/* @__PURE__ */ jsxs("span", {
              children: ["Store: ", /* @__PURE__ */ jsx("code", {
                children: data2.store.source
              })]
            }), /* @__PURE__ */ jsxs("span", {
              children: ["Bucket: ", /* @__PURE__ */ jsx("code", {
                children: data2.store.bucket
              })]
            }), /* @__PURE__ */ jsxs("span", {
              children: ["Ignore list key: ", /* @__PURE__ */ jsx("code", {
                children: data2.store.ignoreListKey
              })]
            })]
          })
        })
      }) : null, /* @__PURE__ */ jsx("div", {
        className: "col-span-full",
        children: /* @__PURE__ */ jsxs("div", {
          className: cardClassName,
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-wrap items-baseline justify-between gap-3",
            children: [/* @__PURE__ */ jsx(H3, {
              children: "Browse"
            }), /* @__PURE__ */ jsxs(Paragraph, {
              textColorClassName: "text-secondary",
              children: ["Showing ", data2.docs.length, " of ", data2.total, " docs"]
            })]
          }), /* @__PURE__ */ jsxs(Form, {
            method: "get",
            className: "mt-6 grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-12",
            onChange: (e) => syncGetForm(e.currentTarget),
            children: [/* @__PURE__ */ jsx(FieldContainer, {
              label: "Manifest",
              className: "mb-0 lg:col-span-4",
              children: ({
                inputProps
              }) => /* @__PURE__ */ jsxs("select", {
                ...inputProps,
                name: "manifest",
                defaultValue: data2.selectedManifest,
                className: inputClassName,
                children: [/* @__PURE__ */ jsx("option", {
                  value: "all",
                  children: "All manifests"
                }), data2.manifestKeys.map((k) => /* @__PURE__ */ jsx("option", {
                  value: k,
                  children: k
                }, k))]
              })
            }), /* @__PURE__ */ jsx(FieldContainer, {
              label: "Query",
              className: "mb-0 lg:col-span-4",
              children: ({
                inputProps
              }) => /* @__PURE__ */ jsx("input", {
                ...inputProps,
                type: "search",
                name: "q",
                defaultValue: searchParams.get("q") ?? "",
                placeholder: "Filter by title, URL, docId, or snippet...",
                className: inputClassName
              })
            }), /* @__PURE__ */ jsx(FieldContainer, {
              label: "Type",
              className: "mb-0 lg:col-span-2",
              children: ({
                inputProps
              }) => /* @__PURE__ */ jsxs("select", {
                ...inputProps,
                name: "type",
                defaultValue: data2.type,
                className: inputClassName,
                children: [/* @__PURE__ */ jsx("option", {
                  value: "",
                  children: "All"
                }), data2.typeOptions.map((o) => /* @__PURE__ */ jsxs("option", {
                  value: o.type,
                  children: [o.type, " (", o.count, ")"]
                }, o.type))]
              })
            }), /* @__PURE__ */ jsx(FieldContainer, {
              label: "Limit",
              className: "mb-0 lg:col-span-2",
              children: ({
                inputProps
              }) => /* @__PURE__ */ jsx("input", {
                ...inputProps,
                name: "limit",
                type: "number",
                step: 1,
                min: 10,
                max: 500,
                defaultValue: String(data2.limit),
                className: inputClassName
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:col-span-12",
              children: [/* @__PURE__ */ jsxs("label", {
                className: "flex items-center gap-2 text-lg text-gray-500 dark:text-slate-500",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "checkbox",
                  name: "showIgnored",
                  defaultChecked: data2.showIgnored,
                  value: "true"
                }), "Show ignored"]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-2",
                children: [/* @__PURE__ */ jsx(Button, {
                  size: "medium",
                  type: "button",
                  disabled: !hasPrev,
                  onClick: () => {
                    const next = new URLSearchParams(searchParams);
                    next.set("offset", String(prevOffset));
                    void submit(next, {
                      method: "get",
                      replace: true
                    });
                  },
                  children: "Prev"
                }), /* @__PURE__ */ jsx(Button, {
                  size: "medium",
                  type: "button",
                  disabled: !hasNext,
                  onClick: () => {
                    const next = new URLSearchParams(searchParams);
                    next.set("offset", String(nextOffset));
                    void submit(next, {
                      method: "get",
                      replace: true
                    });
                  },
                  children: "Next"
                })]
              })]
            })]
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full md:col-span-3 lg:col-span-4",
        children: /* @__PURE__ */ jsxs("div", {
          className: cardClassName,
          children: [/* @__PURE__ */ jsx(H3, {
            children: "Ignore list"
          }), /* @__PURE__ */ jsxs(Paragraph, {
            textColorClassName: "text-secondary",
            children: ["Patterns match manifest doc IDs like", " ", /* @__PURE__ */ jsx("code", {
              children: "youtube:dQw4w9WgXcQ"
            }), ". Use a trailing ", /* @__PURE__ */ jsx("code", {
              children: "*"
            }), " ", "for prefixes (ex: ", /* @__PURE__ */ jsx("code", {
              children: "youtube:*"
            }), ")."]
          }), /* @__PURE__ */ jsxs(ignoreAddFetcher.Form, {
            method: "post",
            className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-end",
            onSubmit: () => {
              setTimeout(() => {
                ignoreAddRef.current?.focus();
              }, 0);
            },
            children: [/* @__PURE__ */ jsx("input", {
              type: "hidden",
              name: "intent",
              value: "ignore-add"
            }), /* @__PURE__ */ jsx("div", {
              className: "flex-1",
              children: /* @__PURE__ */ jsx(FieldContainer, {
                label: "Add pattern",
                className: "mb-0",
                children: ({
                  inputProps
                }) => /* @__PURE__ */ jsx("input", {
                  ...inputProps,
                  ref: ignoreAddRef,
                  name: "pattern",
                  type: "text",
                  placeholder: "youtube:abc123 or youtube:*",
                  className: inputClassName,
                  required: true
                })
              })
            }), /* @__PURE__ */ jsx(Button, {
              size: "medium",
              type: "submit",
              className: "w-full sm:w-auto",
              disabled: ignoreAddFetcher.state !== "idle",
              children: ignoreAddFetcher.state === "idle" ? "Add" : "Adding..."
            })]
          }), /* @__PURE__ */ jsx("ul", {
            className: "mt-6 space-y-3",
            children: (data2.ignoreList.patterns ?? []).length ? (data2.ignoreList.patterns ?? []).map((pattern) => /* @__PURE__ */ jsx(IgnorePatternRow, {
              pattern
            }, pattern)) : /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx(Paragraph, {
                textColorClassName: "text-secondary",
                children: "No ignore patterns yet."
              })
            })
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full md:col-span-5 lg:col-span-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: cardClassName,
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-wrap items-baseline justify-between gap-3",
            children: [/* @__PURE__ */ jsx(H3, {
              children: "Docs"
            }), /* @__PURE__ */ jsx(Paragraph, {
              textColorClassName: "text-secondary",
              children: data2.total === 1 ? "1 doc" : `${data2.total} docs`
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-6 space-y-6",
            children: data2.docs.length ? data2.docs.map((doc) => /* @__PURE__ */ jsx(DocCard, {
              doc
            }, `${doc.manifestKey}:${doc.docId}`)) : /* @__PURE__ */ jsx(Paragraph, {
              textColorClassName: "text-secondary",
              children: "No docs match the current filters."
            })
          })]
        })
      })]
    })
  });
});
function IgnorePatternRow({
  pattern
}) {
  const fetcher = useFetcher();
  const dc = useDoubleCheck();
  return /* @__PURE__ */ jsxs("li", {
    className: "flex flex-col gap-3 rounded-xl bg-white/60 p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-black/20",
    children: [/* @__PURE__ */ jsx("code", {
      className: "min-w-0 flex-1 truncate text-sm",
      children: pattern
    }), /* @__PURE__ */ jsxs(fetcher.Form, {
      method: "post",
      children: [/* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "intent",
        value: "ignore-remove"
      }), /* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "pattern",
        value: pattern
      }), /* @__PURE__ */ jsx(Button, {
        size: "small",
        variant: "danger",
        ...dc.getButtonProps({
          type: "submit"
        }),
        disabled: fetcher.state !== "idle",
        className: "w-full sm:w-auto",
        children: fetcher.state === "idle" ? dc.doubleCheck ? "You sure?" : "Remove" : "Removing..."
      })]
    })]
  });
}
function DocCard({
  doc
}) {
  const deleteFetcher = useFetcher();
  const deleteIgnoreFetcher = useFetcher();
  const ignoreFetcher = useFetcher();
  const deleteDc = useDoubleCheck();
  const deleteIgnoreDc = useDoubleCheck();
  const ignoreDc = useDoubleCheck();
  const isDeleting = deleteFetcher.state !== "idle";
  const isDeletingIgnore = deleteIgnoreFetcher.state !== "idle";
  const isIgnoring = ignoreFetcher.state !== "idle";
  const isDeletingAny = isDeleting || isDeletingIgnore;
  const deleteData = deleteFetcher.data;
  const deleteError = deleteData?.ok === false ? String(deleteData.error ?? "Delete failed") : null;
  const deleteResult = deleteData?.ok === true && typeof deleteData.vectorIdsRequested === "number" && typeof deleteData.vectorDeleteSkipped === "boolean" ? deleteData : null;
  const deleteVectorDeleteError = deleteResult && typeof (deleteData?.vectorDeleteError ?? null) === "string" ? String(deleteData.vectorDeleteError) : null;
  const deleteIgnoreData = deleteIgnoreFetcher.data;
  const deleteIgnoreError = deleteIgnoreData?.ok === false ? String(deleteIgnoreData.error ?? "Delete + ignore failed") : null;
  const deleteIgnoreResult = deleteIgnoreData?.ok === true && typeof deleteIgnoreData.vectorIdsRequested === "number" && typeof deleteIgnoreData.vectorDeleteSkipped === "boolean" ? deleteIgnoreData : null;
  const deleteIgnoreVectorDeleteError = deleteIgnoreResult && typeof (deleteIgnoreData?.vectorDeleteError ?? null) === "string" ? String(deleteIgnoreData.vectorDeleteError) : null;
  return /* @__PURE__ */ jsxs("div", {
    className: "rounded-2xl bg-white/60 p-5 dark:bg-black/20",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "min-w-0 flex-1",
        children: [/* @__PURE__ */ jsx(H4, {
          className: "truncate",
          children: doc.url ? /* @__PURE__ */ jsx(Link, {
            to: doc.url,
            className: "underline",
            children: doc.title
          }) : doc.title
        }), /* @__PURE__ */ jsxs(Paragraph, {
          textColorClassName: "text-secondary",
          children: [/* @__PURE__ */ jsx("code", {
            children: doc.docId
          }), " • ", /* @__PURE__ */ jsx("code", {
            children: doc.type
          }), " • chunks:", " ", doc.chunkCount, doc.sourceUpdatedAt ? ` • sourceUpdatedAt: ${doc.sourceUpdatedAt}` : "", doc.transcriptSource ? ` • transcript: ${doc.transcriptSource}` : ""]
        }), /* @__PURE__ */ jsxs(Paragraph, {
          textColorClassName: "text-secondary",
          children: ["Manifest: ", /* @__PURE__ */ jsx("code", {
            children: doc.manifestKey
          }), doc.ignored ? " • ignored" : ""]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end",
        children: [/* @__PURE__ */ jsxs(ignoreFetcher.Form, {
          method: "post",
          children: [/* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "intent",
            value: "ignore-add"
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "pattern",
            value: doc.docId
          }), /* @__PURE__ */ jsx(Button, {
            size: "medium",
            variant: "secondary",
            ...ignoreDc.getButtonProps({
              type: "submit"
            }),
            disabled: isIgnoring,
            title: "Adds an exact ignore pattern for this doc ID",
            className: "w-full sm:w-auto",
            children: isIgnoring ? "Ignoring..." : ignoreDc.doubleCheck ? "Confirm" : "Ignore"
          })]
        }), /* @__PURE__ */ jsxs(deleteFetcher.Form, {
          method: "post",
          children: [/* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "intent",
            value: "doc-delete"
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "docId",
            value: doc.docId
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "manifestKey",
            value: doc.manifestKey
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "scope",
            value: "manifest"
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "addToIgnore",
            value: "false"
          }), /* @__PURE__ */ jsx(Button, {
            size: "medium",
            variant: "danger",
            ...deleteDc.getButtonProps({
              type: "submit"
            }),
            disabled: isDeletingAny,
            className: "w-full sm:w-auto",
            children: isDeletingAny ? "Deleting..." : deleteDc.doubleCheck ? "You sure?" : "Delete"
          })]
        }), /* @__PURE__ */ jsxs(deleteIgnoreFetcher.Form, {
          method: "post",
          children: [/* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "intent",
            value: "doc-delete"
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "docId",
            value: doc.docId
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "manifestKey",
            value: doc.manifestKey
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "scope",
            value: "manifest"
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "addToIgnore",
            value: "true"
          }), /* @__PURE__ */ jsx(Button, {
            size: "medium",
            variant: "danger",
            ...deleteIgnoreDc.getButtonProps({
              type: "submit"
            }),
            disabled: isDeletingAny,
            title: "Deletes now and adds this docId to ignore list",
            className: "w-full sm:w-auto",
            children: isDeletingAny ? "Deleting..." : deleteIgnoreDc.doubleCheck ? "You sure?" : "Delete + ignore"
          })]
        })]
      })]
    }), deleteError ? /* @__PURE__ */ jsx("div", {
      className: "mt-3",
      children: /* @__PURE__ */ jsx(ErrorPanel, {
        children: deleteError
      })
    }) : null, deleteIgnoreError ? /* @__PURE__ */ jsx("div", {
      className: "mt-3",
      children: /* @__PURE__ */ jsx(ErrorPanel, {
        children: deleteIgnoreError
      })
    }) : null, deleteResult ? /* @__PURE__ */ jsxs("div", {
      className: "mt-3",
      children: [/* @__PURE__ */ jsxs(Paragraph, {
        textColorClassName: "text-secondary",
        children: ["Delete result: vectors requested ", deleteResult.vectorIdsRequested, ",", " ", deleteResult.vectorDeleteSkipped ? "Vectorize delete skipped (semantic search env not configured)" : `deleted ${deleteResult.deletedVectors}`, "."]
      }), deleteVectorDeleteError ? /* @__PURE__ */ jsxs(Paragraph, {
        textColorClassName: "text-secondary",
        children: ["Vectorize delete error: ", deleteVectorDeleteError]
      }) : null]
    }) : null, deleteIgnoreResult ? /* @__PURE__ */ jsxs("div", {
      className: "mt-3",
      children: [/* @__PURE__ */ jsxs(Paragraph, {
        textColorClassName: "text-secondary",
        children: ["Delete + ignore result: vectors requested", " ", deleteIgnoreResult.vectorIdsRequested, ",", " ", deleteIgnoreResult.vectorDeleteSkipped ? "Vectorize delete skipped (semantic search env not configured)" : `deleted ${deleteIgnoreResult.deletedVectors}`, "."]
      }), deleteIgnoreVectorDeleteError ? /* @__PURE__ */ jsxs(Paragraph, {
        textColorClassName: "text-secondary",
        children: ["Vectorize delete error: ", deleteIgnoreVectorDeleteError]
      }) : null]
    }) : null, /* @__PURE__ */ jsxs("details", {
      className: "mt-4",
      children: [/* @__PURE__ */ jsx("summary", {
        className: "cursor-pointer text-sm text-slate-600 dark:text-slate-300",
        children: "View chunk snippets"
      }), /* @__PURE__ */ jsx("ul", {
        className: "mt-3 space-y-2",
        children: doc.chunks.map((c) => /* @__PURE__ */ jsxs("li", {
          className: "rounded bg-white/60 p-3 dark:bg-black/20",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-wrap items-baseline justify-between gap-2",
            children: [/* @__PURE__ */ jsx("code", {
              className: "text-xs",
              children: c.id
            }), /* @__PURE__ */ jsx("code", {
              className: "text-xs text-slate-500",
              children: c.hash
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-200",
            children: c.snippet
          })]
        }, c.id))
      })]
    })]
  });
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useCapturedRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    let data2 = "";
    if (error.data != null) {
      if (typeof error.data === "string") {
        data2 = error.data;
      } else {
        try {
          data2 = JSON.stringify(error.data, null, 2);
        } catch {
          data2 = String(error.data);
        }
      }
    }
    const statusLine = `${error.status} ${error.statusText}`.trim();
    return /* @__PURE__ */ jsxs("div", {
      className: "mx-10vw mt-10",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Search admin error"
      }), /* @__PURE__ */ jsxs("pre", {
        className: "whitespace-pre-wrap",
        children: [statusLine, data2 ? `

${data2}` : ""]
      })]
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "mx-10vw mt-10",
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Search admin error"
    }), /* @__PURE__ */ jsx("pre", {
      className: "whitespace-pre-wrap",
      children: getErrorMessage(error)
    })]
  });
});
function InfoPanel({
  children
}) {
  return /* @__PURE__ */ jsx("div", {
    className: "rounded-xl bg-slate-100 p-5 text-base text-slate-700 dark:bg-slate-800/60 dark:text-slate-200",
    children
  });
}
export {
  ErrorBoundary,
  action,
  search_admin as default,
  handle,
  loader
};
//# sourceMappingURL=search.admin-B7vV0uO_.js.map
