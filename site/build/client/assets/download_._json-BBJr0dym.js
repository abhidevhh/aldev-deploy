import { data } from "react-router";
import { getAllUserData } from "./prisma.server-MnXt9BdG.js";
import { requireUser } from "./session.server-BVOCbXUc.js";
import { b as getUserInfo } from "./user-info.server-DQEJabU4.js";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-BOCNblj8.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "./misc-DM3BUXHg.js";
import "date-fns";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:sqlite";
import "@epic-web/cachified";
import "lru-cache";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./misc-react-D8yAGzlT.js";
import "react/jsx-runtime";
import "@sentry/react-router";
import "md5-hash";
import "react";
async function loader({
  request
}) {
  const user = await requireUser(request);
  const sqlite = await getAllUserData(user.id);
  const cache = await getUserInfo(user, {
    request
  });
  return data({
    sqlite,
    cache
  });
}
export {
  loader
};
//# sourceMappingURL=download_._json-BBJr0dym.js.map
