import { UNSAFE_withComponentProps, useSearchParams, useSubmit, Form, useFetcher, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, data } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { invariantResponse } from "@epic-web/invariant";
import { a as Button } from "./button-B-8RrXF2.js";
import { F as Field, b as FieldContainer, i as inputClassName } from "./form-elements-D3OfaKUp.js";
import { j as SearchIcon } from "./icons-Xl-Om4A1.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { c as H2, H as H3 } from "./typography-DDpAXXrz.js";
import { b as cache, l as lruCache, d as searchCacheKeys, g as getAllCacheKeys } from "./cache.server-BWnHcoUK.js";
import { getInstanceInfo, getAllInstances } from "litefs-js";
import { ensureInstance } from "litefs-js/remix";
import { b as useDebounce, c as useDoubleCheck, u as useCapturedRouteError } from "./misc-react-D8yAGzlT.js";
import { requireAdminUser } from "./session.server-BVOCbXUc.js";
import "clsx";
import "react";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./timing.server-Ckj1L-xw.js";
import "@sentry/react-router";
import "md5-hash";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./misc-DM3BUXHg.js";
import "date-fns";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
const deleteAllMatchingIntent = "delete-all-matching-cache-values";
const defaultCacheKeysLimit = 100;
const maxCacheKeysLimit = 1e4;
function sanitizeCacheKeysLimit(limit) {
  if (!Number.isFinite(limit)) return defaultCacheKeysLimit;
  return Math.min(maxCacheKeysLimit, Math.max(1, Math.floor(limit)));
}
async function getMatchingCacheKeys({
  query,
  limit
}) {
  const sanitizedLimit = sanitizeCacheKeysLimit(limit);
  if (typeof query === "string") {
    return searchCacheKeys(query, sanitizedLimit);
  }
  return getAllCacheKeys(sanitizedLimit);
}
async function loader({
  request
}) {
  await requireAdminUser(request);
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("query");
  const limit = Number(searchParams.get("limit") ?? 100);
  const currentInstanceInfo = await getInstanceInfo();
  const instance = searchParams.get("instance") ?? currentInstanceInfo.currentInstance;
  const instances = await getAllInstances();
  await ensureInstance(instance);
  const cacheKeys = await getMatchingCacheKeys({
    query,
    limit
  });
  return data({
    cacheKeys,
    instance,
    instances,
    currentInstanceInfo
  });
}
async function action({
  request
}) {
  await requireAdminUser(request);
  const searchParams = new URL(request.url).searchParams;
  const formData = await request.formData();
  const {
    currentInstance,
    currentIsPrimary,
    primaryInstance
  } = await getInstanceInfo();
  const instance = formData.get("instance") ?? currentInstance;
  invariantResponse(typeof instance === "string", "instance must be a string");
  await ensureInstance(instance);
  const intent = formData.get("intent");
  if (intent === deleteAllMatchingIntent) {
    invariantResponse(currentIsPrimary, `Bulk delete must run on the primary instance (${primaryInstance})`);
    const query = searchParams.get("query");
    const limit = Number(searchParams.get("limit") ?? 100);
    const {
      sqlite,
      lru
    } = await getMatchingCacheKeys({
      query,
      limit
    });
    for (const cacheKey of sqlite) {
      await cache.delete(cacheKey);
    }
    for (const cacheKey of lru) {
      lruCache.delete(cacheKey);
    }
    return data({
      success: true
    });
  }
  const key = formData.get("cacheKey");
  const type = formData.get("type");
  invariantResponse(typeof key === "string", "cacheKey must be a string");
  invariantResponse(typeof type === "string", "type must be a string");
  switch (type) {
    case "sqlite": {
      await cache.delete(key);
      break;
    }
    case "lru": {
      lruCache.delete(key);
      break;
    }
    default: {
      throw new Error(`Unknown cache type: ${type}`);
    }
  }
  return data({
    success: true
  });
}
const cache_admin = UNSAFE_withComponentProps(function CacheAdminRoute({
  loaderData: data2
}) {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const query = searchParams.get("query") ?? "";
  const limit = searchParams.get("limit") ?? "100";
  const instance = searchParams.get("instance") ?? data2.instance;
  const matchingCacheValuesCount = data2.cacheKeys.sqlite.length + data2.cacheKeys.lru.length;
  const handleFormChange = useDebounce((form) => {
    void submit(form);
  }, 400);
  return /* @__PURE__ */ jsxs("div", {
    className: "mx-10vw",
    children: [/* @__PURE__ */ jsx(H2, {
      className: "mt-3",
      children: "Cache Admin"
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "2xs"
    }), /* @__PURE__ */ jsxs(Form, {
      method: "get",
      className: "flex flex-col gap-4",
      onChange: (e) => handleFormChange(e.currentTarget),
      children: [/* @__PURE__ */ jsx("div", {
        className: "flex-1",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative flex-1",
          children: [/* @__PURE__ */ jsx("button", {
            type: "submit",
            className: "absolute top-0 left-6 flex h-full items-center justify-center border-none bg-transparent p-0 text-slate-500",
            children: /* @__PURE__ */ jsx(SearchIcon, {})
          }), /* @__PURE__ */ jsx("input", {
            type: "search",
            defaultValue: query,
            name: "query",
            placeholder: "Filter Cache Keys",
            className: "text-primary bg-primary border-secondary focus:bg-secondary hover:border-team-current focus:border-team-current w-full rounded-full border py-6 pr-6 pl-14 text-lg font-medium focus:outline-none md:pr-24"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute top-0 right-2 flex h-full w-14 items-center justify-between text-lg font-medium text-slate-500",
            children: /* @__PURE__ */ jsx("span", {
              title: "Total results shown",
              children: matchingCacheValuesCount
            })
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-wrap items-center gap-4",
        children: [/* @__PURE__ */ jsx(Field, {
          label: "Limit",
          name: "limit",
          defaultValue: limit,
          type: "number",
          step: "1",
          min: "1",
          max: "10000",
          placeholder: "results limit"
        }), /* @__PURE__ */ jsx(FieldContainer, {
          label: "Instance",
          id: "instance",
          children: ({
            inputProps
          }) => /* @__PURE__ */ jsx("select", {
            ...inputProps,
            name: "instance",
            defaultValue: instance,
            className: inputClassName,
            children: Object.entries(data2.instances).map(([inst, region]) => /* @__PURE__ */ jsx("option", {
              value: inst,
              children: [inst, `(${region})`, inst === data2.currentInstanceInfo.currentInstance ? "(current)" : "", inst === data2.currentInstanceInfo.primaryInstance ? " (primary)" : ""].filter(Boolean).join(" ")
            }, inst))
          })
        })]
      })]
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "2xs"
    }), /* @__PURE__ */ jsx(DeleteAllMatchingCacheValuesButton, {
      instance,
      matchingCacheValuesCount
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "2xs"
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-4",
      children: [/* @__PURE__ */ jsx(H3, {
        children: "LRU Cache:"
      }), data2.cacheKeys.lru.map((key) => /* @__PURE__ */ jsx(CacheKeyRow, {
        cacheKey: key,
        instance,
        type: "lru"
      }, key))]
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "3xs"
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-4",
      children: [/* @__PURE__ */ jsx(H3, {
        children: "SQLite Cache:"
      }), data2.cacheKeys.sqlite.map((key) => /* @__PURE__ */ jsx(CacheKeyRow, {
        cacheKey: key,
        instance,
        type: "sqlite"
      }, key))]
    })]
  });
});
function DeleteAllMatchingCacheValuesButton({
  instance,
  matchingCacheValuesCount
}) {
  const fetcher = useFetcher();
  const dc = useDoubleCheck();
  if (matchingCacheValuesCount === 0) return null;
  const isDeleting = fetcher.state !== "idle";
  return /* @__PURE__ */ jsxs(fetcher.Form, {
    method: "POST",
    children: [/* @__PURE__ */ jsx("input", {
      type: "hidden",
      name: "intent",
      value: deleteAllMatchingIntent
    }), /* @__PURE__ */ jsx("input", {
      type: "hidden",
      name: "instance",
      value: instance
    }), /* @__PURE__ */ jsx(Button, {
      size: "small",
      variant: "danger",
      disabled: isDeleting,
      ...dc.getButtonProps({
        type: "submit"
      }),
      children: isDeleting ? `deleting ${matchingCacheValuesCount} matching cache values...` : dc.doubleCheck ? `you sure? delete all ${matchingCacheValuesCount} matching cache values` : `delete all ${matchingCacheValuesCount} matching cache values`
    })]
  });
}
function CacheKeyRow({
  cacheKey,
  instance,
  type
}) {
  const fetcher = useFetcher();
  const dc = useDoubleCheck();
  return /* @__PURE__ */ jsxs("div", {
    className: "flex items-center gap-2 font-mono",
    children: [/* @__PURE__ */ jsxs(fetcher.Form, {
      method: "POST",
      children: [/* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "cacheKey",
        value: cacheKey
      }), /* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "instance",
        value: instance
      }), /* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "type",
        value: type
      }), /* @__PURE__ */ jsx(Button, {
        size: "small",
        variant: "danger",
        ...dc.getButtonProps({
          type: "submit"
        }),
        children: fetcher.state === "idle" ? dc.doubleCheck ? "You sure?" : "Delete" : "Deleting..."
      })]
    }), /* @__PURE__ */ jsx("a", {
      href: `/resources/cache/${type}/${encodeURIComponent(cacheKey)}?instance=${instance}`,
      children: cacheKey
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
      children: [/* @__PURE__ */ jsx("div", {
        children: statusLine || "Unexpected response"
      }), data2 ? /* @__PURE__ */ jsx("pre", {
        className: "whitespace-pre-wrap",
        children: data2
      }) : null]
    });
  }
  if (error instanceof Response) {
    const statusLine = error.statusText ? `${error.status} ${error.statusText}`.trim() : error.url ? `${error.status} ${error.url}`.trim() : `Response ${error.status}`;
    return /* @__PURE__ */ jsx("div", {
      children: statusLine || "Unexpected response"
    });
  }
  if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", {
      children: ["An unexpected error occurred: ", error.message]
    });
  } else {
    return /* @__PURE__ */ jsx("div", {
      children: "Unknown error"
    });
  }
});
export {
  ErrorBoundary,
  action,
  cache_admin as default,
  loader
};
//# sourceMappingURL=cache.admin-nWj5KBnn.js.map
