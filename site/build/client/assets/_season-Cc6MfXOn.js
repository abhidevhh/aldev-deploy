import { UNSAFE_withComponentProps, Link, UNSAFE_withErrorBoundaryProps, useParams, isRouteErrorResponse, data } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { p as useChatsEpisodeUIState, M as MissingSomething, S as ServerError } from "./root-XTBE-Fp5.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { Y as TriangleIcon } from "./icons-DQAXl5Y1.js";
import { b as H3, P as Paragraph } from "./typography-DBSbiCOF.js";
import { g as getAbhiEpisodePath } from "./chats-with-abhi-CQPpfNES.js";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import orderBy from "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import { u as useCapturedRouteError } from "./misc-react-BeZfIuw-.js";
import { getSeasonListItems } from "./simplecast.server-Co703Zjj.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { b as formatDate, c as formatDuration, w as reuseUsefulLoaderHeaders } from "./misc-CQO4K9rH.js";
import "@tanstack/react-hotkeys";
import "clsx";
import "framer-motion";
import "react";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "@reach/dialog";
import "./arrow-button-DsHCk3Gf.js";
import "./button-C3vj8DF4.js";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "emoji-regex";
import "lru-cache";
import "mdx-bundler/client/index.js";
import "./theme-Ct2STwdZ.js";
import "@conform-to/zod/v4";
import "cookie";
import "zod";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./form-elements-DKDR40lU.js";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-YMEmucWd.js";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./env.server-DPCBxZtL.js";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "./session.server-DZ6f3pgH.js";
import "./prisma.server-Cj9LRFmw.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./seo-nV2HC6Me.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-D6axXZ8Q.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-B2Ylwupf.js";
import "./hero-section-BNEKo3U8.js";
import "date-fns";
import "@sentry/react-router";
import "md5-hash";
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
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
const handle = {
  getSitemapEntries: async (request) => {
    const seasons = await getSeasonListItems({
      request
    });
    return seasons.map((season) => {
      return {
        route: `/chats/${season.seasonNumber.toString().padStart(2, "0")}`,
        priority: 0.4
      };
    });
  }
};
async function loader({
  params,
  request
}) {
  if (!params.season) {
    throw new Error("params.season is not defined");
  }
  const timings = {};
  const seasons = await getSeasonListItems({
    request,
    timings
  });
  const seasonNumber = Number(params.season);
  const season = seasons.find((s) => s.seasonNumber === seasonNumber);
  if (!season) {
    throw new Response(`No season for ${params.season}`, {
      status: 404
    });
  }
  return data({
    season
  }, {
    headers: {
      "Cache-Control": "public, max-age=600",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const $season = UNSAFE_withComponentProps(function ChatsSeason({
  loaderData
}) {
  const {
    season
  } = loaderData;
  const {
    sortOrder
  } = useChatsEpisodeUIState();
  const episodes = orderBy(season.episodes, "episodeNumber", sortOrder);
  return episodes.map((episode) => /* @__PURE__ */ jsx(Link, {
    className: "group focus:outline-none",
    to: getAbhiEpisodePath(episode),
    children: /* @__PURE__ */ jsxs(Grid, {
      nested: true,
      className: "relative border-b border-gray-200 py-10 lg:py-5 dark:border-gray-600",
      children: [/* @__PURE__ */ jsx("div", {
        className: "bg-secondary absolute -inset-px -mx-6 hidden rounded-lg group-hover:block group-focus:block"
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative col-span-1 flex-none",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute inset-0 flex scale-0 transform items-center justify-center opacity-0 transition group-hover:scale-100 group-hover:opacity-100 group-focus:opacity-100",
          children: /* @__PURE__ */ jsx("div", {
            className: "flex-none rounded-full bg-white p-4 text-gray-800",
            children: /* @__PURE__ */ jsx(TriangleIcon, {
              size: 12
            })
          })
        }), /* @__PURE__ */ jsx("img", {
          className: "h-16 w-full rounded-lg object-cover",
          src: episode.image,
          alt: episode.title,
          loading: "lazy"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "text-primary relative col-span-3 flex flex-col md:col-span-7 lg:col-span-11 lg:flex-row lg:items-center lg:justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mb-3 text-xl font-medium lg:mb-0",
          children: [/* @__PURE__ */ jsx("span", {
            className: "inline-block w-10 lg:text-lg",
            children: `${episode.episodeNumber.toString().padStart(2, "0")}.`
          }), episode.title]
        }), /* @__PURE__ */ jsxs("div", {
          className: "text-lg font-medium text-gray-400 lg:text-right",
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("time", {
              dateTime: episode.publishedAt,
              children: formatDate(episode.publishedAt)
            })
          }), /* @__PURE__ */ jsx("div", {
            children: formatDuration(episode.duration)
          })]
        })]
      })]
    })
  }, episode.slug));
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useCapturedRouteError();
  const params = useParams();
  if (isRouteErrorResponse(error)) {
    console.error("CatchBoundary", error);
    if (error.status === 404) {
      return /* @__PURE__ */ jsxs(Grid, {
        nested: true,
        className: "mt-3",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "col-span-full md:col-span-5",
          children: [/* @__PURE__ */ jsx(H3, {
            children: `Season not found`
          }), /* @__PURE__ */ jsx(Paragraph, {
            children: `Are you sure ${params.season ? `season ${params.season}` : "this season"} exists?`
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "md:col-span-start-6 col-span-full md:col-span-5",
          children: /* @__PURE__ */ jsx(MissingSomething, {
            className: "rounded-lg",
            aspectRatio: "3:4"
          })
        })]
      });
    }
    throw new Error(`Unhandled error: ${error.status}`);
  }
  console.error(error);
  return /* @__PURE__ */ jsx(ServerError, {});
});
export {
  ErrorBoundary,
  $season as default,
  handle,
  headers,
  loader
};
