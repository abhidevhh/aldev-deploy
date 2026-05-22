import fs from "node:fs";
import path__default from "node:path";
import { DatabaseSync } from "node:sqlite";
import { verboseReporter, totalTtl, cachified as cachified$1 } from "@epic-web/cachified";
import { remember } from "@epic-web/remember";
import { LRUCache } from "lru-cache";
import { redirect, data } from "react-router";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { getInstanceInfo, getInternalInstanceDomain, getInstanceInfoSync } from "litefs-js";
import "litefs-js/remix";
import { getUser } from "./session.server-DZ6f3pgH.js";
import { t as time } from "./timing.server-Ckj1L-xw.js";
function isMdxOrContentCacheKey(key) {
  return key.endsWith(":compiled") || key.endsWith(":downloaded") || key.endsWith(":dir-list") || key === "blog:mdx-list-items";
}
function isTimeoutLikeError(error) {
  if (error == null || typeof error !== "object") return false;
  const e = error;
  if (e.name === "TimeoutError" || e.name === "AbortError") return true;
  if (typeof e.message === "string" && /timed out|timeout/i.test(e.message)) {
    return true;
  }
  return false;
}
function siteCacheReporter() {
  const base = verboseReporter();
  return (context) => {
    const inner = base(context);
    return (event) => {
      if ((event.name === "refreshValueError" || event.name === "getFreshValueError") && isMdxOrContentCacheKey(context.key) && isTimeoutLikeError(event.error)) {
        console.warn(
          `[cache] ${event.name === "refreshValueError" ? "Background refresh" : "Fresh value fetch"} timed out for ${context.key} (keeping cached value).`,
          event.error
        );
        return;
      }
      inner(event);
    };
  };
}
async function action({
  request
}) {
  const {
    currentIsPrimary,
    primaryInstance
  } = await getInstanceInfo();
  if (!currentIsPrimary) {
    throw new Error(`${request.url} should only be called on the primary instance (${primaryInstance})}`);
  }
  const token = getEnv().INTERNAL_COMMAND_TOKEN;
  const isAuthorized = request.headers.get("Authorization") === `Bearer ${token}`;
  if (!isAuthorized) {
    console.log(`Unauthorized request to ${request.url}, redirecting to solid tunes 🎶`);
    return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }
  const body = await request.json();
  const {
    key,
    cacheValue
  } = body;
  if (cacheValue === void 0) {
    console.log(`Deleting ${key} from the cache from remote`);
    await cache.delete(key);
  } else {
    console.log(`Setting ${key} in the cache from remote`);
    await cache.set(key, cacheValue);
  }
  return data({
    success: true
  });
}
const updatePrimaryCacheValue = async ({
  key,
  cacheValue
}) => {
  const {
    currentIsPrimary,
    primaryInstance
  } = await getInstanceInfo();
  if (currentIsPrimary) {
    throw new Error(`updatePrimaryCacheValue should not be called on the primary instance (${primaryInstance})}`);
  }
  const domain = getInternalInstanceDomain(primaryInstance);
  const token = getEnv().INTERNAL_COMMAND_TOKEN;
  return fetch(`${domain}/resources/cache/sqlite`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      key,
      cacheValue
    })
  });
};
const cacheDb = remember("cacheDb", createDatabase);
function createDatabase(tryAgain = true) {
  const cacheDatabasePath = getEnv().CACHE_DATABASE_PATH;
  const parentDir = path__default.dirname(cacheDatabasePath);
  fs.mkdirSync(parentDir, { recursive: true });
  const db = new DatabaseSync(cacheDatabasePath);
  const { currentIsPrimary } = getInstanceInfoSync();
  if (!currentIsPrimary) return db;
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS cache (
        key TEXT PRIMARY KEY,
        metadata TEXT,
        value TEXT
      )
    `);
  } catch (error) {
    fs.unlinkSync(cacheDatabasePath);
    if (tryAgain) {
      console.error(
        `Error creating cache database, deleting the file at "${cacheDatabasePath}" and trying again...`
      );
      return createDatabase(false);
    }
    throw error;
  }
  return db;
}
const lruInstance = remember(
  "lru-cache",
  () => new LRUCache({ max: 5e3 })
);
const lruCache = {
  set(key, value) {
    const ttl = totalTtl(value.metadata);
    return lruInstance.set(key, value, {
      ttl: ttl === Infinity ? void 0 : ttl,
      start: value.metadata.createdTime
    });
  },
  get(key) {
    return lruInstance.get(key);
  },
  delete(key) {
    return lruInstance.delete(key);
  }
};
const isBuffer = (obj) => Buffer.isBuffer(obj) || obj instanceof Uint8Array;
function bufferReplacer(_key, value) {
  if (isBuffer(value)) {
    return {
      __isBuffer: true,
      data: value.toString("base64")
    };
  }
  return value;
}
function bufferReviver(_key, value) {
  if (value && typeof value === "object" && "__isBuffer" in value && value.data) {
    return Buffer.from(value.data, "base64");
  }
  return value;
}
const preparedGet = cacheDb.prepare(
  "SELECT value, metadata FROM cache WHERE key = ?"
);
const preparedSet = cacheDb.prepare(
  "INSERT OR REPLACE INTO cache (key, value, metadata) VALUES (?, ?, ?)"
);
const preparedDelete = cacheDb.prepare("DELETE FROM cache WHERE key = ?");
const cache = {
  name: "SQLite cache",
  get(key) {
    const result = preparedGet.get(key);
    if (!result) return null;
    return {
      metadata: JSON.parse(result.metadata),
      value: JSON.parse(result.value, bufferReviver)
    };
  },
  async set(key, entry) {
    const { currentIsPrimary, primaryInstance } = await getInstanceInfo();
    if (currentIsPrimary) {
      preparedSet.run(
        key,
        JSON.stringify(entry.value, bufferReplacer),
        JSON.stringify(entry.metadata)
      );
    } else {
      void updatePrimaryCacheValue({
        key,
        cacheValue: entry
      }).then((response) => {
        if (!response.ok) {
          console.error(
            `Error updating cache value for key "${key}" on primary instance (${primaryInstance}): ${response.status} ${response.statusText}`,
            { entry }
          );
        }
      });
    }
  },
  async delete(key) {
    const { currentIsPrimary, primaryInstance } = await getInstanceInfo();
    if (currentIsPrimary) {
      preparedDelete.run(key);
    } else {
      void updatePrimaryCacheValue({
        key,
        cacheValue: void 0
      }).then((response) => {
        if (!response.ok) {
          console.error(
            `Error deleting cache value for key "${key}" on primary instance (${primaryInstance}): ${response.status} ${response.statusText}`
          );
        }
      });
    }
  }
};
const preparedAllKeys = cacheDb.prepare("SELECT key FROM cache LIMIT ?");
async function getAllCacheKeys(limit) {
  return {
    sqlite: preparedAllKeys.all(limit).map((row) => row.key),
    lru: [...lruInstance.keys()]
  };
}
const preparedKeySearch = cacheDb.prepare(
  "SELECT key FROM cache WHERE key LIKE ? LIMIT ?"
);
async function searchCacheKeys(search, limit) {
  return {
    sqlite: preparedKeySearch.all(`%${search}%`, limit).map((row) => row.key),
    lru: [...lruInstance.keys()].filter((key) => key.includes(search))
  };
}
async function shouldForceFresh({
  forceFresh,
  request,
  key
}) {
  if (typeof forceFresh === "boolean") return forceFresh;
  if (typeof forceFresh === "string") return forceFresh.split(",").includes(key);
  if (!request) return false;
  const fresh = new URL(request.url).searchParams.get("fresh");
  if (typeof fresh !== "string") return false;
  if ((await getUser(request))?.role !== "ADMIN") return false;
  if (fresh === "") return true;
  return fresh.split(",").includes(key);
}
async function cachified({
  request,
  timings,
  ...options
}) {
  let cachifiedResolved = false;
  const cachifiedPromise = cachified$1(
    {
      ...options,
      forceFresh: await shouldForceFresh({
        forceFresh: options.forceFresh,
        request,
        key: options.key
      }),
      getFreshValue: async (context) => {
        if (!cachifiedResolved && timings) {
          return time(() => options.getFreshValue(context), {
            timings,
            type: `getFreshValue:${options.key}`,
            desc: `request forced to wait for a fresh ${options.key} value`
          });
        }
        return options.getFreshValue(context);
      }
    },
    siteCacheReporter()
  );
  const result = await time(cachifiedPromise, {
    timings,
    type: `cache:${options.key}`,
    desc: `${options.key} cache retrieval`
  });
  cachifiedResolved = true;
  return result;
}
export {
  action as a,
  cachified as b,
  cache as c,
  shouldForceFresh as d,
  getAllCacheKeys as g,
  lruCache as l,
  searchCacheKeys as s
};
