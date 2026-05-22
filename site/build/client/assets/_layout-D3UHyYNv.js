import { UNSAFE_withComponentProps, useNavigate, useMatches, Link, Outlet, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { clsx } from "clsx";
import * as React from "react";
import { B as ButtonLink } from "./button-B-8RrXF2.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { C as ChevronUpIcon, a as ChevronDownIcon } from "./icons-Xl-Om4A1.js";
import { P as PodcastSubs } from "./podcast-subs-8WIttgcO.js";
import { e as ChatsEpisodeUIStateProvider, B as BlogSection } from "./root-BtDGpB2R.js";
import { F as FeaturedSection } from "./featured-section-D9ynoIA2.js";
import { H as HeroSection } from "./hero-section-CoHGsAuJ.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { a as H6, b as H4, P as Paragraph } from "./typography-DDpAXXrz.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { i as images, g as getImgProps, a as getImageBuilder, b as getGenericSocialImage } from "./images-D8NqauwH.js";
import { g as getBlogRecommendations } from "./blog.server-C4fS0n4p.js";
import { g as getFeaturedEpisode, a as getAbhiEpisodePath } from "./chats-with-abhi-BpGMpCiR.js";
import { f as formatDate, a as formatDuration, r as reuseUsefulLoaderHeaders, b as getDisplayUrl, c as getOrigin, g as getUrl } from "./misc-DM3BUXHg.js";
import { g as getSocialMetas } from "./seo-B3cPpSFw.js";
import { getSeasonListItems } from "./simplecast.server-Cliy-rrj.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { l as listify } from "./listify-DooNzvOm.js";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "@tanstack/react-hotkeys";
import "framer-motion";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "@reach/dialog";
import "./arrow-button-DBVn13Kl.js";
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
import "downshift";
import "./promotification-omJeRY6i.js";
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
import "./theme.server-D5mszc13.js";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-BSZTMYmt.js";
import "cloudinary-build-url";
import "emoji-regex";
import "date-fns";
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
import "./markdown.server-C6vYtRmU.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "hast-util-to-html";
import "mdast-util-to-hast";
import "rehype-remark";
async function loader({
  request
}) {
  const timings = {};
  const blogRecommendations = await getBlogRecommendations({
    request,
    timings
  });
  return data({
    // we show the seasons in reverse order
    seasons: (await getSeasonListItems({
      request
    })).reverse(),
    blogRecommendations
  }, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const meta = ({
  data: data2,
  matches
}) => {
  const {
    seasons
  } = data2 ?? {};
  if (!seasons) {
    return [{
      title: "Engineering with AbhiDev Seasons not found"
    }];
  }
  const episodeCount = seasons.reduce((acc, season) => acc + season.episodes.length, 0);
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  return getSocialMetas({
    title: "Chats with AbhiDev Podcast",
    description: `Become a better person with ${episodeCount} interesting and actionable conversations with interesting people.`,
    keywords: `my engineering talks, AbhiDev`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      words: "Listen to the Engineering with AbhiDev Podcast",
      featuredImage: images.kayak.id,
      url: getDisplayUrl({
        origin: getOrigin(requestInfo),
        path: "/chats"
      })
    })
  });
};
function PodcastHome({
  loaderData: data2
}) {
  const [sortOrder, setSortOrder] = React.useState("asc");
  const navigate = useNavigate();
  const matches = useMatches();
  const last = matches[matches.length - 1];
  const seasonNumber = last?.params.season ? Number(last.params.season) : (
    // we use the first one because the seasons are in reverse order
    // oh, and this should never happen anyway because we redirect
    // in the event there's no season param. But it's just to be safe.
    data2.seasons[0]?.seasonNumber ?? 1
  );
  const currentSeason = data2.seasons.find((s) => s.seasonNumber === seasonNumber);
  const tabIndex = currentSeason ? data2.seasons.indexOf(currentSeason) : 0;
  function handleTabChange(index) {
    const chosenSeason = data2.seasons[index];
    if (chosenSeason) {
      void navigate(String(chosenSeason.seasonNumber).padStart(2, "0"), {
        preventScrollReset: true
      });
    }
  }
  const allEpisodes = data2.seasons.flatMap((s) => s.episodes);
  const featured = getFeaturedEpisode(allEpisodes);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Listen to chats with AbhiDev here.",
      subtitle: "Find all episodes of my podcast below.",
      imageBuilder: images.kayak,
      imageSize: "large"
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsx(H6, {
        as: "div",
        className: "col-span-full mb-6",
        children: "Listen to the podcasts here"
      }), /* @__PURE__ */ jsx(PodcastSubs, {
        apple: externalLinks.applePodcast,
        pocketCasts: externalLinks.pocketCasts,
        spotify: externalLinks.spotify,
        rss: externalLinks.simpleCast
      })]
    }), featured ? /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(Spacer, {
        size: "xs"
      }), /* @__PURE__ */ jsx(FeaturedSection, {
        cta: "Listen to this episode",
        caption: "Featured episode",
        subTitle: `Season ${featured.seasonNumber} Episode ${featured.episodeNumber} — ${formatDate(featured.publishedAt)} — ${formatDuration(featured.duration)}`,
        title: featured.title,
        href: getAbhiEpisodePath(featured),
        imageUrl: featured.image,
        imageAlt: listify(featured.guests.map((g) => g.name))
      })]
    }) : null, /* @__PURE__ */ jsx(Spacer, {
      size: "base"
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx("img", {
          title: "Photo by Jukka Aalho / Kertojan ääni: https://kertojanaani.fi",
          ...getImgProps(getImageBuilder("unsplash/photo-1590602847861-f357a9332bbc", "A SM7B Microphone"), {
            className: "rounded-lg object-cover",
            widths: [512, 650, 840, 1024, 1300, 1680, 2e3, 2520],
            sizes: ["(max-width: 1023px) 80vw", "(min-width: 1024px) and (max-width: 1620px) 40vw", "630px"],
            transformations: {
              resize: {
                type: "fill",
                aspectRatio: "3:4"
              }
            }
          })
        })
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "xs",
        className: "col-span-full block lg:hidden"
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full lg:col-span-5 lg:col-start-8",
        children: [/* @__PURE__ */ jsx(H4, {
          as: "p",
          children: `What's this all about?`
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-3",
          children: [/* @__PURE__ */ jsxs(Paragraph, {
            children: [`The goal of the Engineering with AbhiDev Podcast is to `, /* @__PURE__ */ jsx("strong", {
              children: "help you become a better person."
            }), `
                With each episode, there's a key takeaway and a specific action
                item to help you on your path to becoming the best person you
                can be.
              `]
          }), /* @__PURE__ */ jsx(Paragraph, {
            children: `
                Before each show, I ask the guest to share with me the change
                they would like to see in the world. Any change at all. Whether
                it's related to AI engineering and full stack systems or not. And then we
                brainstorm a specific thing we can invite you to do at the end
                of the show to help push that change in the world along.
                Something small, but meaningful.
              `
          }), /* @__PURE__ */ jsx(Paragraph, {
            children: `
                Once we know what we want to commit you to, I kick things off
                and try to steer the conversation in a direction that will
                prepare you to accept that invitation and hopefully help you
                make that change in your life. I hope you take advantage of this
                opportunity.
              `
          }), /* @__PURE__ */ jsx(Paragraph, {
            children: `Enjoy the show.`
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "base"
    }), /* @__PURE__ */ jsxs(Tabs, {
      as: Grid,
      className: "mb-24 lg:mb-64",
      index: tabIndex,
      onChange: handleTabChange,
      children: [/* @__PURE__ */ jsx(TabList, {
        className: "col-span-full mb-20 flex flex-col items-start bg-transparent lg:flex-row lg:flex-nowrap lg:gap-x-12 lg:overflow-x-auto lg:overscroll-x-contain lg:pb-1",
        children: data2.seasons.map((season) => /* @__PURE__ */ jsx(Tab, {
          tabIndex: -1,
          className: "border-none p-0 text-left text-4xl leading-tight focus:bg-transparent focus:outline-none lg:shrink-0",
          children: /* @__PURE__ */ jsx(Link, {
            preventScrollReset: true,
            className: clsx("whitespace-nowrap hover:text-primary focus:text-primary focus:outline-none", {
              "text-primary": season.seasonNumber === seasonNumber,
              "text-slate-500": season.seasonNumber !== seasonNumber
            }),
            to: String(season.seasonNumber).padStart(2, "0"),
            onClick: (e) => {
              if (e.metaKey) {
                e.stopPropagation();
              } else {
                e.preventDefault();
              }
            },
            children: `Season ${season.seasonNumber}`
          })
        }, season.seasonNumber))
      }), currentSeason ? /* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-6 flex flex-col lg:mb-12 lg:flex-row lg:justify-between",
        children: [/* @__PURE__ */ jsxs(H6, {
          as: "h2",
          className: "col-span-full mb-10 flex flex-col lg:mb-0 lg:flex-row",
          children: [/* @__PURE__ */ jsx("span", {
            children: "Chats with AbhiDev"
          }), " ", /* @__PURE__ */ jsx("span", {
            children: `Season ${currentSeason.seasonNumber} — ${currentSeason.episodes.length} episodes`
          })]
        }), /* @__PURE__ */ jsxs("button", {
          className: "text-primary group relative text-lg font-medium focus:outline-none",
          onClick: () => setSortOrder((o) => o === "asc" ? "desc" : "asc"),
          children: [/* @__PURE__ */ jsx("div", {
            className: "bg-secondary absolute -top-2 -right-4 -bottom-2 -left-4 rounded-lg opacity-0 transition group-hover:opacity-100 group-focus:opacity-100"
          }), /* @__PURE__ */ jsx("span", {
            className: "relative inline-flex items-center",
            children: sortOrder === "asc" ? /* @__PURE__ */ jsxs(Fragment, {
              children: ["Showing oldest first", /* @__PURE__ */ jsx(ChevronUpIcon, {
                className: "ml-2 text-gray-400"
              })]
            }) : /* @__PURE__ */ jsxs(Fragment, {
              children: ["Showing newest first", /* @__PURE__ */ jsx(ChevronDownIcon, {
                className: "ml-2 text-gray-400"
              })]
            })
          })]
        })]
      }) : null, /* @__PURE__ */ jsx(TabPanels, {
        className: "col-span-full",
        children: data2.seasons.map((season) => /* @__PURE__ */ jsx(TabPanel, {
          className: "border-t border-gray-200 focus:outline-none dark:border-gray-600",
          children: /* @__PURE__ */ jsx(ChatsEpisodeUIStateProvider, {
            value: {
              sortOrder
            },
            children: /* @__PURE__ */ jsx(Outlet, {})
          })
        }, season.seasonNumber))
      })]
    }), data2.seasons.length === 0 ? /* @__PURE__ */ jsx(Grid, {
      className: "mb-24",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full rounded-lg border border-gray-200 p-8 dark:border-gray-600",
        children: [/* @__PURE__ */ jsx(H4, {
          as: "h2",
          className: "mb-3",
          children: "No chats are available right now."
        }), /* @__PURE__ */ jsxs(Paragraph, {
          className: "mb-4",
          children: ["We are likely having trouble with our Simplecast integration. Please try again soon, or listen directly on the", " ", /* @__PURE__ */ jsx("a", {
            href: externalLinks.simpleCast,
            target: "_blank",
            rel: "noreferrer noopener",
            className: "text-primary underline",
            children: "Simplecast feed"
          }), "."]
        }), /* @__PURE__ */ jsx(ButtonLink, {
          variant: "primary",
          to: externalLinks.simpleCast,
          children: "Open Simplecast feed"
        })]
      })
    }) : null, /* @__PURE__ */ jsx(BlogSection, {
      articles: data2.blogRecommendations,
      title: "Looking for more content?",
      description: "Have a look at these articles."
    })]
  });
}
const _layout = UNSAFE_withComponentProps(PodcastHome);
export {
  _layout as default,
  headers,
  loader,
  meta
};
//# sourceMappingURL=_layout-D3UHyYNv.js.map
