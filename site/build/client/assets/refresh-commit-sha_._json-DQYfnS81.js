import { data } from "react-router";
import { c as cache } from "./cache.server-BtbXQaCP.js";
import { c as commitShaKey, i as isRefreshShaInfo } from "./refresh-cache-2TOM0mST.js";
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
import "./timing.server-Ckj1L-xw.js";
import "path";
import "./credits.server-BCsf817q.js";
import "@sindresorhus/slugify";
import "yaml";
import "./github.server-u_4PqFTT.js";
import "@octokit/plugin-throttling";
import "@octokit/rest";
import "./misc-CQO4K9rH.js";
import "date-fns";
import "./mdx.server-CWSqTQTg.js";
import "cloudinary-build-url";
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
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "./resume.server-SKSphO1F.js";
import "./talks.server-CC1vC5Fa.js";
import "./testimonials.server-DAGtgv6g.js";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
async function loader() {
  const result = await cache.get(commitShaKey);
  if (!result) {
    return data(null);
  }
  let value;
  try {
    value = JSON.parse(result.value);
    if (!isRefreshShaInfo(value)) {
      throw new Error(`Invalid value: ${result.value}`);
    }
  } catch (error) {
    console.error(`Error parsing commit sha from cache: ${error}`);
    cache.delete(commitShaKey);
    return data(null);
  }
  return data(value);
}
export {
  loader
};
