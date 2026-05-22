import { UNSAFE_withComponentProps, redirect } from "react-router";
import { jsx } from "react/jsx-runtime";
import { getEpisodes as getCachedEpisodes } from "./transistor.server-DFkoIrlM.js";
import { g as getEpisodesBySeason } from "./_layout-D0EXzqUf.js";
import "@sindresorhus/slugify";
import "uuid";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BWnHcoUK.js";
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
import "./session.server-BVOCbXUc.js";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./abhi-call-HST9AF8V.js";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "./misc-DM3BUXHg.js";
import "date-fns";
import "./markdown.server-C6vYtRmU.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "@reach/tabs";
import "./button-B-8RrXF2.js";
import "./grid-Bsvu4qfo.js";
import "./icons-Xl-Om4A1.js";
import "./podcast-subs-8WIttgcO.js";
import "./root-BtDGpB2R.js";
import "@tanstack/react-hotkeys";
import "framer-motion";
import "spin-delay";
import "@reach/dialog";
import "./typography-DDpAXXrz.js";
import "./arrow-button-DBVn13Kl.js";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "mdx-bundler/client/index.js";
import "./theme-D6IyWRbl.js";
import "@conform-to/zod/v4";
import "cookie";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./form-elements-D3OfaKUp.js";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-omJeRY6i.js";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "./login.server-Bn92r_Ja.js";
import "./seo-B3cPpSFw.js";
import "./theme.server-D5mszc13.js";
import "./header-section-BSZTMYmt.js";
import "./hero-section-CoHGsAuJ.js";
import "./blog.server-C4fS0n4p.js";
import "p-limit";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import "match-sorter";
import "./mdx.server-CumfvRLd.js";
import "@remark-embedder/core";
import "@remark-embedder/transformer-oembed";
import "lz-string";
import "mdx-bundler";
import "p-queue";
import "reading-time";
import "remark-autolink-headings";
import "remark-gfm";
import "remark-slug";
import "unist-util-visit";
import "http";
import "https";
import "metascraper";
import "metascraper-description";
import "metascraper-image";
import "metascraper-title";
import "./github.server-CeJRQaMc.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
async function loader({
  request
}) {
  const episodes = await getCachedEpisodes({
    request
  });
  const seasons = getEpisodesBySeason(episodes);
  const seasonNumber = seasons[seasons.length - 1]?.seasonNumber ?? 1;
  const season = seasons.find((s) => s.seasonNumber === seasonNumber);
  if (!season) {
    return null;
  }
  return redirect(`/calls/${String(season.seasonNumber).padStart(2, "0")}`);
}
const index = UNSAFE_withComponentProps(function CallsIndex() {
  return /* @__PURE__ */ jsx("div", {
    children: "Oops... You should not see this."
  });
});
export {
  index as default,
  loader
};
//# sourceMappingURL=index-DZfk9ZOH.js.map
