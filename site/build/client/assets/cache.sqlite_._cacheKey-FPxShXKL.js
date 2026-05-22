import { invariantResponse } from "@epic-web/invariant";
import { data } from "react-router";
import { b as cache } from "./cache.server-BWnHcoUK.js";
import { getInstanceInfo, getAllInstances } from "litefs-js";
import { ensureInstance } from "litefs-js/remix";
import { requireAdminUser } from "./session.server-BVOCbXUc.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./timing.server-Ckj1L-xw.js";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
async function loader({
  request,
  params
}) {
  await requireAdminUser(request);
  const searchParams = new URL(request.url).searchParams;
  const currentInstanceInfo = await getInstanceInfo();
  const allInstances = await getAllInstances();
  const instance = searchParams.get("instance") ?? currentInstanceInfo.currentInstance;
  await ensureInstance(instance);
  const {
    cacheKey
  } = params;
  invariantResponse(cacheKey, "cacheKey is required");
  return data({
    instance: {
      hostname: instance,
      region: allInstances[instance],
      isPrimary: currentInstanceInfo.primaryInstance === instance
    },
    cacheKey,
    value: cache.get(cacheKey)
  });
}
export {
  loader
};
//# sourceMappingURL=cache.sqlite_._cacheKey-FPxShXKL.js.map
