import { UNSAFE_withComponentProps, useParams, redirect, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { c as useRootData, I as IconLink } from "./root-BtDGpB2R.js";
import { X as XIcon } from "./icons-Xl-Om4A1.js";
import { a as H6, P as Paragraph } from "./typography-DDpAXXrz.js";
import { F as FavoriteToggle } from "./favorite-Ct1jwKNM.js";
import { g as getEpisodeFromParams, a as getEpisodePath } from "./abhi-call-HST9AF8V.js";
import { g as getEpisodeFavoriteContentId } from "./favorites-BOCNblj8.js";
import { r as reuseUsefulLoaderHeaders, g as getUrl } from "./misc-DM3BUXHg.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import { g as getSocialMetas } from "./seo-B3cPpSFw.js";
import { getUser } from "./session.server-BVOCbXUc.js";
import { T as Themed } from "./theme-D6IyWRbl.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { getEpisodes as getCachedEpisodes } from "./transistor.server-DFkoIrlM.js";
import { u as useCallsData } from "./_layout-D0EXzqUf.js";
import "@tanstack/react-hotkeys";
import "clsx";
import "framer-motion";
import "react";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "@reach/dialog";
import "./arrow-button-DBVn13Kl.js";
import "./button-B-8RrXF2.js";
import "error-stack-parser";
import "./grid-Bsvu4qfo.js";
import "./cloudinary-video-DeT-8neH.js";
import "lru-cache";
import "mdx-bundler/client/index.js";
import "./form-elements-D3OfaKUp.js";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-omJeRY6i.js";
import "@epic-web/invariant";
import "cookie";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "./theme.server-D5mszc13.js";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-BSZTMYmt.js";
import "./hero-section-CoHGsAuJ.js";
import "@radix-ui/react-tooltip";
import "date-fns";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "node:url";
import "@prisma/client/runtime/client";
import "@conform-to/zod/v4";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
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
const handle = {
  id: "call-player",
  getSitemapEntries: async (request) => {
    const episodes = await getCachedEpisodes({
      request
    });
    return episodes.map((episode) => {
      return {
        route: getEpisodePath(episode),
        changefreq: "weekly",
        lastmod: new Date(episode.updatedAt).toISOString(),
        priority: 0.3
      };
    });
  }
};
const meta = ({
  matches,
  params
}) => {
  const rootData = matches.find((m) => m.id === "root")?.data;
  if (!rootData) {
    return [{
      title: "Call not found"
    }];
  }
  const {
    requestInfo
  } = rootData;
  const callsData = matches.find((m) => m.id === "routes/calls/_layout")?.data;
  if (!callsData) {
    console.error(`A call was unable to retrieve the parent's data by routes/calls/_layout`);
    return [{
      title: "Call not found"
    }];
  }
  const episode = getEpisodeFromParams(callsData.episodes, params);
  if (!episode) {
    console.error(`A call was unable to retrieve the parent's data by routes/calls/_layout`);
    return [{
      title: "Call not found"
    }];
  }
  const title = `${episode.title} | call AbhiDev Podcast | ${episode.episodeNumber}`;
  const playerUrl = episode.embedHtml.match(/src="(?<src>.+)"/)?.groups?.src;
  return [...getSocialMetas({
    title,
    description: episode.description,
    keywords: `call AbhiDev, AbhiDev, ${episode.keywords}`,
    url: getUrl(requestInfo),
    image: episode.imageUrl
  }), {
    "twitter:card": "player"
  }, {
    "twitter:player": playerUrl ?? ""
  }, {
    "twitter:player:width": "500"
  }, {
    "twitter:player:height": "180"
  }, {
    "twitter:player:stream": episode.mediaUrl
  }, {
    "twitter:player:stream:content_type": "audio/mpeg"
  }];
};
async function loader({
  params,
  request
}) {
  const timings = {};
  const {
    season,
    episode: episodeParam,
    slug
  } = params;
  if (!season || !episodeParam || !slug) {
    throw new Error("params.season or params.episode or params.slug is not defined");
  }
  const [user, episodes] = await Promise.all([getUser(request, {
    timings
  }), getCachedEpisodes({
    request,
    timings
  })]);
  const episode = getEpisodeFromParams(episodes, {
    season,
    episode: episodeParam
  });
  if (!episode) {
    return redirect("/calls");
  }
  if (episode.slug !== params.slug) {
    return redirect(getEpisodePath(episode));
  }
  const contentId = getEpisodeFavoriteContentId({
    seasonNumber: episode.seasonNumber,
    episodeNumber: episode.episodeNumber
  });
  const favorite = user ? await prisma.favorite.findUnique({
    where: {
      userId_contentType_contentId: {
        userId: user.id,
        contentType: "abhi-call-episode",
        contentId
      }
    },
    select: {
      id: true
    }
  }) : null;
  return data({
    isFavorite: Boolean(favorite)
  }, {
    headers: {
      // `isFavorite` is user-specific when logged in, so ensure it isn't
      // cached in shared/CDN caches. For anonymous users it's always false,
      // so allow public caching.
      "Cache-Control": user ? "private, max-age=600" : "public, max-age=600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const $slug = UNSAFE_withComponentProps(function Screen({
  loaderData
}) {
  const params = useParams();
  const {
    episodes
  } = useCallsData();
  const {
    requestInfo
  } = useRootData();
  const episode = getEpisodeFromParams(episodes, params);
  if (!episode) {
    return /* @__PURE__ */ jsxs("div", {
      children: ["Oh no... No episode found with this slug: ", params.slug]
    });
  }
  const path = getEpisodePath(episode);
  const keywords = Array.from(
    new Set(
      episode.keywords.split(/[,;\s]/g).map((x) => x.trim()).filter(Boolean)
      // remove empties
    )
    // omit duplicates
  ).slice(0, 3);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx(H6, {
          as: "div",
          className: "flex-auto",
          children: "Keywords"
        }), /* @__PURE__ */ jsx(Paragraph, {
          className: "mb-8 flex",
          children: keywords.join(", ")
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-start gap-4",
        children: [/* @__PURE__ */ jsx(FavoriteToggle, {
          mode: "icon",
          contentType: "abhi-call-episode",
          contentId: getEpisodeFavoriteContentId({
            seasonNumber: episode.seasonNumber,
            episodeNumber: episode.episodeNumber
          }),
          initialIsFavorite: loaderData.isFavorite
        }), /* @__PURE__ */ jsx(IconLink, {
          target: "_blank",
          rel: "noreferrer noopener",
          href: `https://x.com/intent/tweet?${new URLSearchParams({
            url: `${requestInfo.origin}${path}`,
            text: `I just listened to "${episode.title}" on the Engineering with AbhiDev Podcast 🎙 by @abhidev`
          })}`,
          children: /* @__PURE__ */ jsx(XIcon, {
            title: "Post this"
          })
        })]
      })]
    }), /* @__PURE__ */ jsx(H6, {
      as: "div",
      children: "Description"
    }), /* @__PURE__ */ jsx(Paragraph, {
      as: "div",
      className: "mb-8",
      dangerouslySetInnerHTML: {
        __html: episode.descriptionHTML
      }
    }), /* @__PURE__ */ jsx(Themed, {
      initialOnly: true,
      dark: /* @__PURE__ */ jsx("div", {
        dangerouslySetInnerHTML: {
          __html: episode.embedHtmlDark
        }
      }),
      light: /* @__PURE__ */ jsx("div", {
        dangerouslySetInnerHTML: {
          __html: episode.embedHtml
        }
      })
    })]
  });
});
export {
  $slug as default,
  handle,
  headers,
  loader,
  meta
};
//# sourceMappingURL=_slug-AkSbFQgQ.js.map
