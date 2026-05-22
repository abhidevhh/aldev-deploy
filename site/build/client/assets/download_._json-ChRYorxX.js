import { data } from "react-router";
import { getAllUserData } from "./prisma.server-Cj9LRFmw.js";
import { requireUser } from "./session.server-DZ6f3pgH.js";
import { f as getUserInfo } from "./user-info.server-D6axXZ8Q.js";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-Bsg0upig.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "./misc-CQO4K9rH.js";
import "date-fns";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:sqlite";
import "@epic-web/cachified";
import "lru-cache";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./misc-react-BeZfIuw-.js";
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
