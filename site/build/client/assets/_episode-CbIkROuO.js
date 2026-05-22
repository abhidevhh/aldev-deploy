import { UNSAFE_withComponentProps, redirect } from "react-router";
import { jsx } from "react/jsx-runtime";
import { c as getEpisodeFromParams, d as getEpisodePath } from "./abhi-call-3LF8Y-Fm.js";
import { w as reuseUsefulLoaderHeaders } from "./misc-CQO4K9rH.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { getEpisodes as getCachedEpisodes } from "./transistor.server-C4ChjM7q.js";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "date-fns";
import "@sindresorhus/slugify";
import "uuid";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "zod";
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
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "./user-info.server-D6axXZ8Q.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "react";
const handle = {
  getSitemapEntries: () => null
};
async function loader({
  params,
  request
}) {
  const timings = {};
  const {
    season,
    episode: episodeParam
  } = params;
  if (!season || !episodeParam) {
    throw new Error("params.season or params.episode is not defined");
  }
  const episodes = await getCachedEpisodes({
    request,
    timings
  });
  const episode = getEpisodeFromParams(episodes, {
    season,
    episode: episodeParam
  });
  if (!episode) {
    return redirect("/calls");
  }
  return redirect(getEpisodePath(episode), {
    headers: {
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const $episode = UNSAFE_withComponentProps(function Screen() {
  return /* @__PURE__ */ jsx("div", {
    children: "You should have been redirected... Weird"
  });
});
export {
  $episode as default,
  handle,
  headers,
  loader
};
