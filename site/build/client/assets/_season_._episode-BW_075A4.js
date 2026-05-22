import { UNSAFE_withComponentProps, redirect } from "react-router";
import { jsx } from "react/jsx-runtime";
import { w as reuseUsefulLoaderHeaders } from "./misc-CQO4K9rH.js";
import { getSeasons as getCachedSeasons } from "./simplecast.server-Co703Zjj.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import "date-fns";
import "hast-util-to-html";
import "mdast-util-to-hast";
import "p-limit";
import "rehype-parse";
import "rehype-remark";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "unist-util-visit";
import "zod";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
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
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
async function loader({
  request,
  params
}) {
  const timings = {};
  const seasonNumber = Number(params.season);
  const episodeNumber = Number(params.episode);
  const seasons = await getCachedSeasons({
    request,
    timings
  });
  const season = seasons.find((s) => s.seasonNumber === seasonNumber);
  if (!season) {
    return redirect("/chats");
  }
  const episode = season.episodes.find((e) => e.episodeNumber === episodeNumber);
  if (!episode) {
    return redirect("/chats");
  }
  return redirect(`/chats/${params.season}/${params.episode}/${episode.slug}`, {
    headers: {
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const $season__$episode = UNSAFE_withComponentProps(function Screen() {
  return /* @__PURE__ */ jsx("div", {
    children: "Weird... You should have been redirected..."
  });
});
export {
  $season__$episode as default,
  headers,
  loader
};
