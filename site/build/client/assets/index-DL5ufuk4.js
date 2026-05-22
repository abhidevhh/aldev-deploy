import { UNSAFE_withComponentProps, redirect } from "react-router";
import { jsx } from "react/jsx-runtime";
import { getSeasonListItems } from "./simplecast.server-Cliy-rrj.js";
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
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
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
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./markdown.server-C6vYtRmU.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "./misc-DM3BUXHg.js";
import "date-fns";
async function loader({
  request
}) {
  const seasons = await getSeasonListItems({
    request
  });
  const seasonNumber = seasons[seasons.length - 1]?.seasonNumber ?? 1;
  const season = seasons.find((s) => s.seasonNumber === seasonNumber);
  if (!season) {
    return null;
  }
  return redirect(`/chats/${String(season.seasonNumber).padStart(2, "0")}`);
}
const index = UNSAFE_withComponentProps(function ChatsIndex() {
  return /* @__PURE__ */ jsx("div", {
    children: "Oops... You should not see this."
  });
});
export {
  index as default,
  loader
};
//# sourceMappingURL=index-DL5ufuk4.js.map
