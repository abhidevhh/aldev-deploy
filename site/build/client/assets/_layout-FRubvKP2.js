import { UNSAFE_withComponentProps, useMatches, Link, Outlet, UNSAFE_withErrorBoundaryProps, useParams, isRouteErrorResponse, data } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useReducedMotion, AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { u as useCallsEpisodeUIState, M as MissingSomething, S as ServerError } from "./root-BtDGpB2R.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { T as TriangleIcon } from "./icons-Xl-Om4A1.js";
import { H as H3, P as Paragraph } from "./typography-DDpAXXrz.js";
import { g as getEpisodeFromParams, a as getEpisodePath } from "./abhi-call-HST9AF8V.js";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import orderBy from "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import { u as useCapturedRouteError } from "./misc-react-D8yAGzlT.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { getEpisodes as getCachedEpisodes } from "./transistor.server-DFkoIrlM.js";
import { g as getEpisodesBySeason } from "./_layout-D0EXzqUf.js";
import { f as formatDate, a as formatDuration, r as reuseUsefulLoaderHeaders } from "./misc-DM3BUXHg.js";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "@reach/dialog";
import "./arrow-button-DBVn13Kl.js";
import "./button-B-8RrXF2.js";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "lru-cache";
import "mdx-bundler/client/index.js";
import "./theme-D6IyWRbl.js";
import "@conform-to/zod/v4";
import "cookie";
import "zod";
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
import "uuid";
import "./env.server-DPCBxZtL.js";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "./session.server-BVOCbXUc.js";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./seo-B3cPpSFw.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-BSZTMYmt.js";
import "./hero-section-CoHGsAuJ.js";
import "@sentry/react-router";
import "md5-hash";
import "@sindresorhus/slugify";
import "./markdown.server-C6vYtRmU.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "@reach/tabs";
import "./podcast-subs-8WIttgcO.js";
import "./blog.server-C4fS0n4p.js";
import "date-fns";
import "p-limit";
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
const handle = {
  getSitemapEntries: async (request) => {
    const episodes = await getCachedEpisodes({
      request
    });
    const seasons = getEpisodesBySeason(episodes);
    return seasons.map((season) => {
      return {
        route: `/calls/${season.seasonNumber.toString().padStart(2, "0")}`,
        priority: 0.4
      };
    });
  }
};
async function loader({
  params,
  request
}) {
  const timings = {};
  const episodes = await getCachedEpisodes({
    request,
    timings
  });
  const seasons = getEpisodesBySeason(episodes);
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
      "Cache-Control": "private, max-age=3600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const _layout = UNSAFE_withComponentProps(function CallsSeason({
  loaderData
}) {
  const {
    season
  } = loaderData;
  const matches = useMatches();
  const shouldReduceMotion = useReducedMotion();
  const {
    sortOrder
  } = useCallsEpisodeUIState();
  const episodes = orderBy(season.episodes, "episodeNumber", sortOrder);
  const callPlayerMatch = matches.find((match) => match.handle?.id === "call-player");
  let selectedEpisode;
  if (callPlayerMatch) {
    const callPlayerParams = callPlayerMatch.params;
    selectedEpisode = getEpisodeFromParams(episodes, callPlayerParams);
  }
  const initialSelectedEpisode = React.useRef(selectedEpisode);
  React.useEffect(() => {
    if (!initialSelectedEpisode.current) return;
    const href = getEpisodePath(initialSelectedEpisode.current);
    document.querySelector(`[href="${href}"]`)?.scrollIntoView();
  }, []);
  let numberLength = episodes.length.toString().length;
  if (numberLength < 2) numberLength = 2;
  return episodes.map((episode) => {
    const path = getEpisodePath(episode);
    return /* @__PURE__ */ jsxs("div", {
      className: "border-b border-gray-200 dark:border-gray-600",
      children: [/* @__PURE__ */ jsx(Link, {
        preventScrollReset: true,
        to: path,
        className: "group focus:outline-none",
        prefetch: "intent",
        children: /* @__PURE__ */ jsxs(Grid, {
          nested: true,
          className: "relative py-10 lg:py-5",
          children: [/* @__PURE__ */ jsx("div", {
            className: "bg-secondary absolute -inset-px -mx-6 hidden rounded-lg group-hover:block group-focus:block"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative col-span-1 flex-none",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 flex scale-0 transform items-center justify-center opacity-0 transition group-hover:scale-100 group-hover:opacity-100 group-focus:scale-100 group-focus:opacity-100",
              children: /* @__PURE__ */ jsx("div", {
                className: "flex-none rounded-full bg-white p-4 text-gray-800",
                children: /* @__PURE__ */ jsx(TriangleIcon, {
                  size: 12
                })
              })
            }), /* @__PURE__ */ jsx("img", {
              className: "h-16 w-full rounded-lg object-cover",
              src: episode.imageUrl,
              loading: "lazy",
              alt: ""
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-primary relative col-span-3 flex flex-col md:col-span-7 lg:col-span-11 lg:flex-row lg:items-center lg:justify-between",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "mb-3 text-xl font-medium lg:mb-0",
              children: [/* @__PURE__ */ jsx("span", {
                className: clsx("inline-block lg:text-lg", {
                  "w-10": numberLength <= 3,
                  "w-14": numberLength === 4,
                  "w-auto pr-4": numberLength > 4
                }),
                children: `${episode.episodeNumber.toString().padStart(2, "0")}.`
              }), episode.title]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col text-gray-400 lg:items-end",
              children: [/* @__PURE__ */ jsx("time", {
                className: "text-xs font-normal",
                dateTime: episode.publishedAt,
                children: formatDate(episode.publishedAt, "yyyy-MM-dd")
              }), /* @__PURE__ */ jsx("div", {
                className: "text-lg font-medium",
                children: formatDuration(episode.duration)
              })]
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(Grid, {
        nested: true,
        children: /* @__PURE__ */ jsx(AnimatePresence, {
          children: selectedEpisode === episode ? /* @__PURE__ */ jsx(motion.div, {
            variants: {
              collapsed: {
                height: 0,
                marginTop: 0,
                marginBottom: 0,
                opacity: 0
              },
              expanded: {
                height: "auto",
                marginTop: "1rem",
                marginBottom: "3rem",
                opacity: 1
              }
            },
            initial: "collapsed",
            animate: "expanded",
            exit: "collapsed",
            transition: shouldReduceMotion ? {
              duration: 0
            } : {
              duration: 0.15
            },
            className: "relative col-span-full",
            children: /* @__PURE__ */ jsx(Outlet, {})
          }) : null
        })
      })]
    }, path);
  });
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
  _layout as default,
  handle,
  headers,
  loader
};
//# sourceMappingURL=_layout-FRubvKP2.js.map
