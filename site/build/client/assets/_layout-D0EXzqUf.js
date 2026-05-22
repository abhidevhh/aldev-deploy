import { UNSAFE_withComponentProps, useNavigate, Link, Outlet, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { clsx } from "clsx";
import * as React from "react";
import { B as ButtonLink } from "./button-B-8RrXF2.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { C as ChevronUpIcon, a as ChevronDownIcon } from "./icons-Xl-Om4A1.js";
import { P as PodcastSubs } from "./podcast-subs-8WIttgcO.js";
import { C as CallsEpisodeUIStateProvider, B as BlogSection, d as useMatchLoaderData } from "./root-BtDGpB2R.js";
import { H as HeroSection } from "./hero-section-CoHGsAuJ.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { a as H6, b as H4, P as Paragraph } from "./typography-DDpAXXrz.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { i as images, g as getImgProps, a as getImageBuilder, b as getGenericSocialImage } from "./images-D8NqauwH.js";
import { g as getBlogRecommendations } from "./blog.server-C4fS0n4p.js";
import groupBy from "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import { r as reuseUsefulLoaderHeaders, b as getDisplayUrl, c as getOrigin, g as getUrl } from "./misc-DM3BUXHg.js";
import { g as getSocialMetas } from "./seo-B3cPpSFw.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { getEpisodes as getCachedEpisodes } from "./transistor.server-DFkoIrlM.js";
const handle = {
  id: "calls"
};
const getEpisodesBySeason = (episodes) => {
  const groupedEpisodeBySeasons = groupBy(episodes, "seasonNumber");
  const seasons = [];
  Object.entries(groupedEpisodeBySeasons).forEach(([key, value]) => {
    seasons.push({
      seasonNumber: +key,
      episodes: value
    });
  });
  return seasons;
};
async function loader({
  request
}) {
  const timings = {};
  const [blogRecommendations, episodes] = await Promise.all([getBlogRecommendations({
    request,
    timings
  }), getCachedEpisodes({
    request,
    timings
  })]);
  return data({
    blogRecommendations,
    episodes
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
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  return getSocialMetas({
    title: "call AbhiDev Podcast",
    description: `Leave Kent an audio message here, then your message and Kent's response are published in the podcast.`,
    keywords: "podcast, call AbhiDev, call AbhiDev, the call AbhiDev podcast",
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      words: "Listen to the call AbhiDev Podcast and make your own call.",
      featuredImage: images.microphone({
        // if we don't do this resize, the narrow microphone appears on the
        // far right of the social image
        resize: {
          type: "pad",
          width: 1200,
          height: 1200
        }
      }),
      url: getDisplayUrl({
        origin: getOrigin(requestInfo),
        path: "/calls"
      })
    })
  });
};
const _layout = UNSAFE_withComponentProps(function CallHomeScreen({
  loaderData: data2,
  matches
}) {
  const [sortOrder, setSortOrder] = React.useState("desc");
  const navigate = useNavigate();
  const groupedEpisodeBySeasons = groupBy(data2.episodes, "seasonNumber");
  const seasons = [];
  Object.entries(groupedEpisodeBySeasons).forEach(([key, value]) => {
    seasons.push({
      seasonNumber: +key,
      episodes: value
    });
  });
  seasons.reverse();
  const last = matches[matches.length - 1];
  const seasonNumber = last?.params.season ? Number(last.params.season) : (
    // we use the first one because the seasons are in reverse order
    // oh, and this should never happen anyway because we redirect
    // in the event there's no season param. But it's just to be safe.
    seasons[0]?.seasonNumber ?? 1
  );
  const currentSeason = seasons.find((s) => s.seasonNumber === seasonNumber);
  const tabIndex = currentSeason ? seasons.indexOf(currentSeason) : 0;
  function handleTabChange(index) {
    const chosenSeason = seasons[index];
    if (chosenSeason) {
      void navigate(String(chosenSeason.seasonNumber).padStart(2, "0"), {
        preventScrollReset: true
      });
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Calls with AbhiDev.",
      subtitle: "You call, I'll answer.",
      imageBuilder: images.microphone,
      arrowUrl: "#episodes",
      arrowLabel: "Take a listen",
      action: /* @__PURE__ */ jsx(ButtonLink, {
        variant: "primary",
        to: "./record",
        className: "mr-auto",
        children: "Record your call"
      })
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsx(H6, {
        as: "div",
        className: "col-span-full mb-6",
        children: "Listen to the podcasts here"
      }), /* @__PURE__ */ jsx(PodcastSubs, {
        apple: externalLinks.abhiCallApple,
        pocketCasts: externalLinks.abhiCallPocketCasts,
        spotify: externalLinks.abhiCallSpotify,
        rss: externalLinks.abhiCallRSS
      })]
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "base"
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx("img", {
          title: "Photo by Luke Southern",
          ...getImgProps(getImageBuilder("unsplash/photo-1571079570759-8b8800f7c412", "Phone sitting on a stool"), {
            className: "w-full rounded-lg object-cover",
            widths: [512, 650, 840, 1024, 1300, 1680, 2e3, 2520],
            sizes: ["(max-width: 1023px) 80vw", "(min-width: 1024px) and (max-width: 1620px) 40vw", "630px"],
            transformations: {
              resize: {
                type: "fill",
                aspectRatio: "4:3"
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
            children: [`The goal of the call AbhiDev Podcast is to `, /* @__PURE__ */ jsx("strong", {
              children: "get my answers to your questions."
            }), `
              You record your brief question (120 seconds or less) right from
              your browser. Then I listen to it later and give my response,
              and through the magic of technology (ffmpeg), our question
              and answer are stitched together and published to the podcast
              feed.
            `]
          }), /* @__PURE__ */ jsx(Paragraph, {
            children: `If recording isn't an option, you can also type your question and we'll generate the audio for you.`
          }), /* @__PURE__ */ jsx(Paragraph, {
            children: `I look forward to hearing from you!`
          }), /* @__PURE__ */ jsx(Spacer, {
            size: "2xs"
          }), /* @__PURE__ */ jsx(ButtonLink, {
            variant: "primary",
            to: "./record",
            children: "Record your call"
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
        children: seasons.map((season) => /* @__PURE__ */ jsx(Tab, {
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
          id: "episodes",
          as: "h2",
          className: "col-span-full mb-10 flex flex-col lg:mb-0 lg:flex-row",
          children: [/* @__PURE__ */ jsx("span", {
            children: "Calls with AbhiDev"
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
        children: seasons.map((season) => /* @__PURE__ */ jsx(TabPanel, {
          className: "border-t border-gray-200 focus:outline-none dark:border-gray-600",
          children: /* @__PURE__ */ jsx(CallsEpisodeUIStateProvider, {
            value: {
              sortOrder
            },
            children: /* @__PURE__ */ jsx(Outlet, {})
          })
        }, season.seasonNumber))
      })]
    }), seasons.length === 0 ? /* @__PURE__ */ jsx(Grid, {
      className: "mb-24",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full rounded-lg border border-gray-200 p-8 dark:border-gray-600",
        children: [/* @__PURE__ */ jsx(H4, {
          as: "h2",
          className: "mb-3",
          children: "No calls are available right now."
        }), /* @__PURE__ */ jsxs(Paragraph, {
          className: "mb-4",
          children: ["We are likely having trouble with our Transistor integration. Please try again soon, or listen directly on the", " ", /* @__PURE__ */ jsx("a", {
            href: externalLinks.abhiCallRSS,
            target: "_blank",
            rel: "noreferrer noopener",
            className: "text-primary underline",
            children: "Transistor feed"
          }), "."]
        }), /* @__PURE__ */ jsx(ButtonLink, {
          variant: "primary",
          to: "./record",
          children: "Record your call"
        })]
      })
    }) : null, /* @__PURE__ */ jsx(BlogSection, {
      articles: data2.blogRecommendations,
      title: "Looking for more content?",
      description: "Have a look at these articles."
    })]
  });
});
const useCallsData = () => useMatchLoaderData(handle.id);
export {
  _layout as _,
  headers as a,
  getEpisodesBySeason as g,
  handle as h,
  loader as l,
  meta as m,
  useCallsData as u
};
//# sourceMappingURL=_layout-D0EXzqUf.js.map
