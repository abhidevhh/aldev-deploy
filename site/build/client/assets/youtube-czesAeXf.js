import { UNSAFE_withComponentProps, useSearchParams, useLocation, data } from "react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { l as links$1 } from "./fullscreen-yt-embed-DavdkHz9.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { c as useRootData, I as IconLink } from "./root-BtDGpB2R.js";
import { X as XIcon } from "./icons-Xl-Om4A1.js";
import { H as H3, P as Paragraph } from "./typography-DDpAXXrz.js";
import { F as FavoriteToggle } from "./favorite-Ct1jwKNM.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "@reach/dialog";
import "react";
import "clsx";
import "@tanstack/react-hotkeys";
import "framer-motion";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./misc-DM3BUXHg.js";
import "date-fns";
import "./arrow-button-DBVn13Kl.js";
import "./button-B-8RrXF2.js";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
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
import "./timing.server-Ckj1L-xw.js";
import "./seo-B3cPpSFw.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-BSZTMYmt.js";
import "./hero-section-CoHGsAuJ.js";
import "@radix-ui/react-tooltip";
function parseVideoId(value) {
  if (!value) return null;
  return /^[A-Za-z0-9_-]{11}$/.test(value) ? value : null;
}
function asNonEmptyString(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
function parseDisplayText(value, maxLen) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length <= maxLen) return trimmed;
  return `${trimmed.slice(0, Math.max(0, maxLen - 3))}...`;
}
function parseTimestampSeconds(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!/^\d+$/.test(trimmed)) return null;
  let n = Number(trimmed);
  if (!Number.isFinite(n)) return null;
  const msHeuristicThresholdSeconds = 60 * 60 * 24;
  if (n > msHeuristicThresholdSeconds) {
    n = Math.floor(n / 1e3);
  }
  return Math.max(0, Math.min(n, msHeuristicThresholdSeconds));
}
function formatTimestamp(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}
function parsePlaylistId(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^[A-Za-z0-9_-]{10,}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const list = url.searchParams.get("list");
    return list && /^[A-Za-z0-9_-]{10,}$/.test(list) ? list : null;
  } catch {
    return null;
  }
}
async function loader() {
  const env = getEnv();
  const configuredPlaylistId = parsePlaylistId(env.YOUTUBE_PLAYLIST_ID);
  if (!configuredPlaylistId) {
    throw new Error(`Invalid YOUTUBE_PLAYLIST_ID: "${env.YOUTUBE_PLAYLIST_ID}". Expected a playlist ID or URL.`);
  }
  return data({
    playlistId: configuredPlaylistId
  });
}
const meta = () => {
  return [{
    title: "YouTube Videos | AbhiDev"
  }, {
    name: "description",
    content: "Watch AbhiDev YouTube videos here. Search results can deep-link to each video."
  }];
};
const links = () => {
  return links$1();
};
const youtube = UNSAFE_withComponentProps(function YouTubePage({
  loaderData: {
    playlistId
  }
}) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const {
    requestInfo
  } = useRootData();
  const selectedVideoId = parseVideoId(searchParams.get("video"));
  const startSeconds = parseTimestampSeconds(searchParams.get("t"));
  const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}`;
  const playlistEmbedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistId)}`;
  const semanticSearchState = location.state?.semanticSearch;
  const semanticTitle = asNonEmptyString(semanticSearchState?.title);
  const semanticDescription = asNonEmptyString(semanticSearchState?.description);
  const queryTitle = parseDisplayText(searchParams.get("title"), 220);
  const queryDescription = parseDisplayText(searchParams.get("desc"), 1e3);
  const videoTitle = (selectedVideoId ? queryTitle ?? semanticTitle : null) ?? (selectedVideoId ? `YouTube video ${selectedVideoId}` : null);
  const videoDescription = selectedVideoId ? queryDescription ?? semanticDescription : null;
  const shareUrl = selectedVideoId ? `${requestInfo.origin}/youtube?${new URLSearchParams({
    video: selectedVideoId,
    ...startSeconds ? {
      t: String(startSeconds)
    } : {}
  }).toString()}` : `${requestInfo.origin}/youtube`;
  const shareText = selectedVideoId ? startSeconds ? `Check out "${videoTitle ?? `YouTube video ${selectedVideoId}`}" at ${formatTimestamp(startSeconds)}` : `Check out "${videoTitle ?? `YouTube video ${selectedVideoId}`}"` : `Check out AbhiDev on YouTube`;
  return /* @__PURE__ */ jsx(Grid, {
    as: "main",
    className: "mb-24 lg:mb-48",
    children: /* @__PURE__ */ jsxs("div", {
      className: "col-span-full space-y-4",
      children: [selectedVideoId ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("div", {
          className: "overflow-hidden rounded-lg bg-black",
          children: /* @__PURE__ */ jsx(LiteYouTubeEmbed, {
            id: selectedVideoId,
            title: videoTitle ?? `YouTube video ${selectedVideoId}`,
            announce: "Play video",
            alwaysLoadIframe: true,
            params: new URLSearchParams({
              rel: "0",
              modestbranding: "1",
              // Do not include the configured playlist when deep-linking to a
              // specific video. If the video is not in the playlist, YouTube will
              // fall back to playing the first playlist entry instead.
              ...startSeconds ? {
                start: String(startSeconds)
              } : {}
            }).toString()
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-3",
          children: [/* @__PURE__ */ jsx(H3, {
            className: "break-words",
            children: /* @__PURE__ */ jsx("a", {
              href: `https://www.youtube.com/watch?${new URLSearchParams({
                v: selectedVideoId,
                ...startSeconds ? {
                  t: String(startSeconds)
                } : {}
              }).toString()}`,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "hover:text-team-current focus:text-team-current transition focus:outline-none",
              children: videoTitle ?? `YouTube video ${selectedVideoId}`
            })
          }), videoDescription ? /* @__PURE__ */ jsx(Paragraph, {
            prose: false,
            className: "line-clamp-4",
            children: videoDescription
          }) : null, startSeconds ? /* @__PURE__ */ jsx(Paragraph, {
            prose: false,
            textColorClassName: "text-secondary",
            children: `Starting at ${formatTimestamp(startSeconds)}.`
          }) : null, /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
            children: [/* @__PURE__ */ jsx(FavoriteToggle, {
              contentType: "youtube-video",
              contentId: selectedVideoId,
              label: "Favorite video"
            }), /* @__PURE__ */ jsxs(IconLink, {
              className: "flex items-center gap-2",
              target: "_blank",
              rel: "noreferrer noopener",
              href: `https://x.com/intent/post?${new URLSearchParams({
                url: shareUrl,
                text: shareText
              }).toString()}`,
              children: [/* @__PURE__ */ jsx(XIcon, {
                title: "Share on 𝕏"
              }), /* @__PURE__ */ jsx("span", {
                children: "Share on 𝕏"
              })]
            })]
          })]
        })]
      }) : /* @__PURE__ */ jsx("div", {
        className: "aspect-video overflow-hidden rounded-lg bg-black",
        children: /* @__PURE__ */ jsx("iframe", {
          title: "YouTube playlist",
          src: playlistEmbedUrl,
          className: "h-full w-full",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          referrerPolicy: "strict-origin-when-cross-origin",
          allowFullScreen: true
        })
      }), /* @__PURE__ */ jsx(Paragraph, {
        children: selectedVideoId ? "Showing the selected video from semantic search results." : "Showing the configured playlist."
      }), /* @__PURE__ */ jsx(Paragraph, {
        children: /* @__PURE__ */ jsx("a", {
          href: playlistUrl,
          className: "underlined",
          target: "_blank",
          rel: "noreferrer noopener",
          children: "Open this playlist on YouTube"
        })
      })]
    })
  });
});
export {
  youtube as default,
  links,
  loader,
  meta
};
//# sourceMappingURL=youtube-czesAeXf.js.map
