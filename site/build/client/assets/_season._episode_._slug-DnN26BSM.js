import { Link, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, useLocation, redirect, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import React__default, { useState } from "react";
import { B as BackLink, A as ArrowLink } from "./arrow-button-DBVn13Kl.js";
import { c as useRootData, I as IconLink, F as FourOhFour } from "./root-BtDGpB2R.js";
import { l as links$1 } from "./fullscreen-yt-embed-DavdkHz9.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { X as XIcon, x as ChevronRightIcon, y as ChevronLeftIcon, z as ClipboardIcon, q as ArrowIcon, G as GithubIcon, h as PlusIcon } from "./icons-Xl-Om4A1.js";
import { F as FeaturedSection } from "./featured-section-D9ynoIA2.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { c as H2, a as H6, H as H3, P as Paragraph } from "./typography-DDpAXXrz.js";
import { c as getSocialImageWithPreTitle } from "./images-D8NqauwH.js";
import { F as FavoriteToggle } from "./favorite-Ct1jwKNM.js";
import { H as HomeworkCompletionToggle } from "./homework-completion-B-2hihZC.js";
import { a as getAbhiEpisodePath, g as getFeaturedEpisode } from "./chats-with-abhi-BpGMpCiR.js";
import { g as getEpisodeFavoriteContentId, a as getEpisodeHomeworkContentId } from "./favorites-BOCNblj8.js";
import { u as useCapturedRouteError } from "./misc-react-D8yAGzlT.js";
import { getClientSession } from "./client.server-CTs0DPxN.js";
import { prisma, getEpisodeHomeworkCompletions } from "./prisma.server-MnXt9BdG.js";
import { g as getSocialMetas } from "./seo-B3cPpSFw.js";
import { getUser } from "./session.server-BVOCbXUc.js";
import { getSeasons as getCachedSeasons } from "./simplecast.server-Cliy-rrj.js";
import { T as Themed } from "./theme-D6IyWRbl.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { f as formatDate, s as typedBoolean, a as formatDuration, r as reuseUsefulLoaderHeaders, b as getDisplayUrl, c as getOrigin, g as getUrl } from "./misc-DM3BUXHg.js";
import { l as listify } from "./listify-DooNzvOm.js";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "@reach/dialog";
import "./button-B-8RrXF2.js";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "lru-cache";
import "mdx-bundler/client/index.js";
import "./form-elements-D3OfaKUp.js";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-omJeRY6i.js";
import "@epic-web/invariant";
import "cookie";
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
import "cloudinary-build-url";
import "emoji-regex";
import "@radix-ui/react-tooltip";
import "date-fns";
import "@sentry/react-router";
import "md5-hash";
import "uuid";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "node:url";
import "@prisma/client/runtime/client";
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
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import "./markdown.server-C6vYtRmU.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "@conform-to/zod/v4";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
const handle = {
  getSitemapEntries: async (request) => {
    const seasons = await getCachedSeasons({
      request
    });
    return seasons.flatMap((season) => {
      return season.episodes.map((episode) => {
        const s = String(season.seasonNumber).padStart(2, "0");
        const e = String(episode.episodeNumber).padStart(2, "0");
        return {
          route: `/chats/${s}/${e}/${episode.slug}`,
          changefreq: "weekly",
          lastmod: new Date(episode.updatedAt).toISOString(),
          priority: 0.4
        };
      });
    });
  }
};
const meta = ({
  data: data2,
  matches
}) => {
  const episode = data2?.episode;
  const rootMatch = matches.find((match) => match?.id === "root");
  const requestInfo = rootMatch?.data?.requestInfo;
  if (!episode) {
    return [{
      title: "Engineering with AbhiDev Episode not found"
    }];
  }
  const {
    description,
    image,
    mediaUrl,
    simpleCastId,
    episodeNumber,
    seasonNumber
  } = episode;
  const title = `${episode.title} | Engineering with AbhiDev Podcast | ${episodeNumber}`;
  const playerUrl = `https://player.simplecast.com/${simpleCastId}`;
  return [...getSocialMetas({
    title,
    description,
    keywords: `my engineering talks, AbhiDev, ${episode.meta?.keywords ?? ""}`,
    url: getUrl(requestInfo),
    image: getSocialImageWithPreTitle({
      title: episode.title,
      preTitle: "Check out this Podcast",
      featuredImage: image,
      url: getDisplayUrl({
        origin: getOrigin(requestInfo),
        path: getAbhiEpisodePath({
          seasonNumber,
          episodeNumber
        })
      })
    })
  }), {
    "twitter:card": "player"
  }, {
    "twitter:player": playerUrl
  }, {
    "twitter:player:width": "436"
  }, {
    "twitter:player:height": "196"
  }, {
    "twitter:player:stream": mediaUrl
  }, {
    "twitter:player:stream:content_type": "audio/mpeg"
  }];
};
async function loader({
  request,
  params
}) {
  const timings = {};
  const seasonNumber = Number(params.season);
  const episodeParam = "episode" in params ? params.episode : params.episode_;
  if (!episodeParam) {
    throw new Response(`Episode param missing`, {
      status: 404
    });
  }
  const episodeNumber = Number(episodeParam);
  const [user, seasons] = await Promise.all([getUser(request, {
    timings
  }), getCachedSeasons({
    request,
    timings
  })]);
  const clientSession = await getClientSession(request, user);
  const clientId = clientSession.getClientId();
  const season = seasons.find((s) => s.seasonNumber === seasonNumber);
  if (!season) {
    throw new Response(`Season ${seasonNumber} not found`, {
      status: 404
    });
  }
  const episode = season.episodes.find((e) => e.episodeNumber === episodeNumber);
  if (!episode) {
    throw new Response(`Episode ${episodeNumber} not found`, {
      status: 404
    });
  }
  if (episode.slug !== params.slug) {
    return redirect(`/chats/${params.season}/${episodeParam}/${episode.slug}`);
  }
  const favoriteContentType = "chats-with-abhi-episode";
  const favoriteContentId = getEpisodeFavoriteContentId({
    seasonNumber: episode.seasonNumber,
    episodeNumber: episode.episodeNumber
  });
  const favorite = user ? await prisma.favorite.findUnique({
    where: {
      userId_contentType_contentId: {
        userId: user.id,
        contentType: favoriteContentType,
        contentId: favoriteContentId
      }
    },
    select: {
      id: true
    }
  }) : null;
  const completedHomeworkIds = await getEpisodeHomeworkCompletions({
    seasonNumber: episode.seasonNumber,
    episodeNumber: episode.episodeNumber,
    ...user ? {
      userId: user.id
    } : clientId ? {
      clientId
    } : {}
  });
  const homeworkItems = episode.homeworkHTMLs.map((homeworkHTML, itemIndex) => {
    const id = getEpisodeHomeworkContentId({
      seasonNumber: episode.seasonNumber,
      episodeNumber: episode.episodeNumber,
      itemIndex
    });
    return {
      id,
      itemIndex,
      homeworkHTML,
      isCompleted: completedHomeworkIds.has(id)
    };
  });
  return data({
    prevEpisode: season.episodes.find((e) => e.episodeNumber === episodeNumber - 1) ?? null,
    nextEpisode: season.episodes.find((e) => e.episodeNumber === episodeNumber + 1) ?? null,
    featured: getFeaturedEpisode(season.episodes.filter((e) => episode !== e)),
    episode,
    homeworkItems,
    favoriteContentType,
    favoriteContentId,
    isFavorite: Boolean(favorite)
  }, {
    headers: {
      "Cache-Control": "private, max-age=600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const links = () => {
  return links$1();
};
function Homework({
  homeworkItems,
  seasonNumber,
  episodeNumber
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-secondary w-full rounded-lg p-10 pb-16",
    children: [/* @__PURE__ */ jsxs(H6, {
      as: "h4",
      className: "mb-8 inline-flex items-center space-x-4",
      children: [/* @__PURE__ */ jsx(ClipboardIcon, {}), /* @__PURE__ */ jsx("span", {
        children: "Homework"
      })]
    }), /* @__PURE__ */ jsx("ul", {
      className: "text-primary html -mb-10 text-lg font-medium",
      children: homeworkItems.map((homeworkItem) => /* @__PURE__ */ jsx("li", {
        className: "border-secondary border-t pt-8 pb-10",
        children: /* @__PURE__ */ jsx(HomeworkToggle, {
          seasonNumber,
          episodeNumber,
          homeworkItem
        })
      }, homeworkItem.id))
    })]
  });
}
function HomeworkToggle({
  seasonNumber,
  episodeNumber,
  homeworkItem
}) {
  return /* @__PURE__ */ jsx(HomeworkCompletionToggle, {
    seasonNumber,
    episodeNumber,
    itemIndex: homeworkItem.itemIndex,
    initialCompleted: homeworkItem.isCompleted,
    children: /* @__PURE__ */ jsx("div", {
      dangerouslySetInnerHTML: {
        __html: homeworkItem.homeworkHTML
      }
    })
  });
}
function Resources({
  resources = []
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-secondary rounded-lg p-10 pb-16",
    children: [/* @__PURE__ */ jsx("h4", {
      className: "text-primary mb-8 inline-flex items-center text-xl font-medium",
      children: "Resources"
    }), /* @__PURE__ */ jsx("ul", {
      className: "text-secondary space-y-8 text-lg font-medium lg:space-y-2",
      children: resources.map((resource) => /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsxs("a", {
          href: resource.url,
          className: "hover:text-team-current focus:text-team-current transition focus:outline-none",
          children: [/* @__PURE__ */ jsx("span", {
            children: resource.name
          }), /* @__PURE__ */ jsx("span", {
            className: "mt-1 ml-4 inline-block align-top",
            children: /* @__PURE__ */ jsx(ArrowIcon, {
              size: 26,
              direction: "top-right"
            })
          })]
        })
      }, resource.url))
    })]
  });
}
function Guests({
  episode
}) {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h4", {
      className: "sr-only",
      children: "Guests"
    }), episode.guests.map((guest) => /* @__PURE__ */ jsxs("div", {
      className: "text-secondary bg-secondary flex flex-col rounded-lg p-10 pb-16 md:flex-row md:items-center md:pb-12",
      children: [/* @__PURE__ */ jsx("img", {
        src: episode.image,
        alt: guest.name,
        className: "mr-8 mb-6 h-20 w-20 flex-none rounded-lg object-cover md:mb-0"
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-6 w-full md:mb-0 md:flex-auto",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-primary mb-2 text-xl leading-none font-medium",
          children: guest.name
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl leading-none",
          children: guest.company
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-none space-x-4",
        children: [guest.x ? /* @__PURE__ */ jsx("a", {
          target: "_blank",
          rel: "noreferrer noopener",
          href: `https://x.com/${guest.x}`,
          "aria-label": "𝕏 profile",
          children: /* @__PURE__ */ jsx(XIcon, {
            size: 32
          })
        }) : null, guest.github ? /* @__PURE__ */ jsx("a", {
          target: "_blank",
          rel: "noreferrer noopener",
          href: `https://github.com/${guest.github}`,
          "aria-label": "github profile",
          children: /* @__PURE__ */ jsx(GithubIcon, {
            size: 32
          })
        }) : null]
      })]
    }, guest.name))]
  });
}
function Transcript({
  transcriptHTML
}) {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  React__default.useEffect(() => {
    setCollapsed(true);
  }, [location.key]);
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-secondary col-span-full rounded-lg p-10 pb-16",
    children: [/* @__PURE__ */ jsx("h4", {
      className: "text-primary mb-8 inline-flex items-center text-xl font-medium",
      children: "Transcript"
    }), /* @__PURE__ */ jsxs("div", {
      className: clsx("prose prose-light dark:prose-dark relative overflow-hidden", {
        "max-h-96": collapsed
      }),
      children: [/* @__PURE__ */ jsx("div", {
        dangerouslySetInnerHTML: {
          __html: transcriptHTML
        }
      }), collapsed ? /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-0 h-48 w-full bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-800"
      }) : null]
    }), collapsed ? /* @__PURE__ */ jsxs("button", {
      onClick: () => setCollapsed(false),
      className: "text-primary group mt-16 inline-flex items-center text-xl transition focus:outline-none",
      children: [/* @__PURE__ */ jsx("span", {
        children: "Read the full transcript"
      }), /* @__PURE__ */ jsx("span", {
        className: "group-hover:border-primary group-focus:border-primary ml-8 inline-flex h-14 w-14 flex-none items-center justify-center rounded-full border-2 border-gray-200 p-1 dark:border-gray-600",
        children: /* @__PURE__ */ jsx(PlusIcon, {})
      })]
    }) : null]
  });
}
function EpisodeVideo({
  youtubeVideoId,
  title
}) {
  return /* @__PURE__ */ jsx("div", {
    className: "col-span-full lg:col-span-8 lg:col-start-3",
    children: /* @__PURE__ */ jsx("div", {
      className: "overflow-hidden rounded-lg bg-black",
      children: /* @__PURE__ */ jsx(LiteYouTubeEmbed, {
        id: youtubeVideoId,
        title: `${title} video`,
        announce: "Play video",
        alwaysLoadIframe: true,
        params: new URLSearchParams({
          rel: "0",
          modestbranding: "1"
        }).toString()
      })
    })
  });
}
const imageVariants = {
  initial: {
    opacity: 1
  },
  hover: {
    opacity: 0.2
  }
};
const arrowVariants = {
  initial: {
    opacity: 0
  },
  hover: {
    scale: 2,
    opacity: 1
  },
  tapLeft: {
    x: -5,
    opacity: 0
  },
  tapRight: {
    x: 5,
    opacity: 1
  }
};
const MotionLink = motion(Link);
function PrevNextButton({
  episodeListItem,
  direction
}) {
  if (!episodeListItem) {
    return /* @__PURE__ */ jsx("div", {});
  }
  return /* @__PURE__ */ jsxs(MotionLink, {
    initial: "initial",
    whileHover: "hover",
    whileFocus: "hover",
    whileTap: direction === "next" ? "tapRight" : "tapLeft",
    animate: "initial",
    preventScrollReset: true,
    to: getAbhiEpisodePath(episodeListItem),
    className: clsx("flex items-start focus:outline-none", {
      "flex-row-reverse": direction === "next"
    }),
    children: [/* @__PURE__ */ jsxs("div", {
      className: "relative mt-1 h-12 w-12 flex-none overflow-hidden rounded-lg",
      children: [/* @__PURE__ */ jsx(motion.img, {
        variants: imageVariants,
        transition: {
          duration: 0.2
        },
        className: "h-full w-full object-cover",
        src: episodeListItem.image,
        alt: episodeListItem.title
      }), /* @__PURE__ */ jsx(motion.div, {
        variants: arrowVariants,
        className: "text-primary absolute inset-0 flex origin-center items-center justify-center",
        children: direction === "next" ? /* @__PURE__ */ jsx(ChevronRightIcon, {}) : /* @__PURE__ */ jsx(ChevronLeftIcon, {})
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: clsx("flex flex-col", {
        "ml-4 items-start": direction === "prev",
        "mr-4 items-end text-right": direction === "next"
      }),
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-primary text-lg font-medium",
        children: episodeListItem.guests[0]?.name
      }), /* @__PURE__ */ jsx("h6", {
        className: "text-secondary text-lg font-medium",
        children: `Episode ${episodeListItem.episodeNumber}`
      })]
    })]
  });
}
const $season_$episode__$slug = UNSAFE_withComponentProps(function PodcastDetail({
  loaderData
}) {
  const {
    requestInfo
  } = useRootData();
  const {
    episode,
    homeworkItems,
    featured,
    nextEpisode,
    prevEpisode,
    favoriteContentType,
    favoriteContentId,
    isFavorite
  } = loaderData;
  const permalink = `${requestInfo.origin}${getAbhiEpisodePath(episode)}`;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Grid, {
      className: "mt-24 mb-10 lg:mb-24",
      children: /* @__PURE__ */ jsx(BackLink, {
        to: "/chats",
        className: "col-span-full lg:col-span-8 lg:col-start-3",
        children: "Back to overview"
      })
    }), /* @__PURE__ */ jsx(Grid, {
      as: "header",
      className: "mb-12",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full lg:col-span-8 lg:col-start-3",
        children: [/* @__PURE__ */ jsx(H2, {
          children: episode.title
        }), /* @__PURE__ */ jsxs(H6, {
          variant: "secondary",
          as: "div",
          className: "mt-3",
          children: ["Published", " ", /* @__PURE__ */ jsx("time", {
            dateTime: episode.publishedAt,
            children: formatDate(episode.publishedAt)
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(Grid, {
      as: "main",
      className: "mb-24 lg:mb-64",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-16 lg:col-span-8 lg:col-start-3",
        children: [/* @__PURE__ */ jsx(Themed, {
          initialOnly: true,
          dark: /* @__PURE__ */ jsx("iframe", {
            className: "mb-4",
            title: "player",
            height: "200px",
            width: "100%",
            frameBorder: "no",
            scrolling: "no",
            seamless: true,
            src: `https://player.simplecast.com/${episode.simpleCastId}?dark=true`
          }),
          light: /* @__PURE__ */ jsx("iframe", {
            className: "mb-4",
            title: "player",
            height: "200px",
            width: "100%",
            frameBorder: "no",
            scrolling: "no",
            seamless: true,
            src: `https://player.simplecast.com/${episode.simpleCastId}?dark=false`
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex justify-between",
          children: [/* @__PURE__ */ jsx(PrevNextButton, {
            episodeListItem: prevEpisode,
            direction: "prev"
          }), /* @__PURE__ */ jsx(PrevNextButton, {
            episodeListItem: nextEpisode,
            direction: "next"
          })]
        })]
      }), episode.youtubeVideoId ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(EpisodeVideo, {
          youtubeVideoId: episode.youtubeVideoId,
          title: episode.title
        }), /* @__PURE__ */ jsx(Spacer, {
          size: "3xs",
          className: "col-span-full"
        })]
      }) : null, episode.descriptionHTML ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(H3, {
          className: "col-span-full lg:col-span-8 lg:col-start-3",
          dangerouslySetInnerHTML: {
            __html: episode.descriptionHTML
          }
        }), /* @__PURE__ */ jsx(Spacer, {
          size: "3xs",
          className: "col-span-full"
        })]
      }) : null, /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-8 lg:col-start-3",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
          children: [/* @__PURE__ */ jsx(FavoriteToggle, {
            contentType: favoriteContentType,
            contentId: favoriteContentId,
            initialIsFavorite: isFavorite,
            label: "Favorite episode"
          }), /* @__PURE__ */ jsxs(IconLink, {
            className: "flex gap-2",
            target: "_blank",
            rel: "noreferrer noopener",
            href: `https://x.com/intent/post?${new URLSearchParams({
              url: permalink,
              text: `I just listened to "${episode.title}" with ${listify(episode.guests.map((g) => g.x ? `@${g.x}` : null).filter(typedBoolean))} on the call AbhiDev Podcast 🎙 by @abhidev`
            })}`,
            children: [/* @__PURE__ */ jsx(XIcon, {
              title: "Post this"
            }), /* @__PURE__ */ jsx("span", {
              children: "Post this episode"
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "2xs",
        className: "col-span-full"
      }), /* @__PURE__ */ jsx(Paragraph, {
        as: "div",
        className: "col-span-full space-y-6 lg:col-span-8 lg:col-start-3",
        dangerouslySetInnerHTML: {
          __html: episode.summaryHTML
        }
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "3xs",
        className: "col-span-full"
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full space-y-4 lg:col-span-8 lg:col-start-3",
        children: [homeworkItems.length > 0 ? /* @__PURE__ */ jsx(Homework, {
          homeworkItems,
          seasonNumber: episode.seasonNumber,
          episodeNumber: episode.episodeNumber
        }) : null, episode.resources.length > 0 ? /* @__PURE__ */ jsx(Resources, {
          resources: episode.resources
        }) : null, /* @__PURE__ */ jsx(Guests, {
          episode
        }), episode.transcriptHTML ? /* @__PURE__ */ jsx(Transcript, {
          transcriptHTML: episode.transcriptHTML
        }) : null]
      })]
    }), /* @__PURE__ */ jsx(Grid, {
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-20 flex flex-col space-y-10 lg:flex-row lg:items-center lg:justify-between lg:space-y-0",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "space-y-2 lg:space-y-0",
          children: [/* @__PURE__ */ jsx(H2, {
            children: "Sweet episode right?"
          }), /* @__PURE__ */ jsxs(H2, {
            variant: "secondary",
            as: "p",
            children: ["You will love this one too.", " "]
          })]
        }), /* @__PURE__ */ jsx(ArrowLink, {
          to: "/chats",
          direction: "right",
          children: "See all episodes"
        })]
      })
    }), featured ? /* @__PURE__ */ jsx(FeaturedSection, {
      cta: "Listen to this episode",
      caption: "Featured episode",
      subTitle: `Season ${featured.seasonNumber} Episode ${featured.episodeNumber} — ${formatDate(featured.publishedAt)} — ${formatDuration(featured.duration)}`,
      title: featured.title,
      href: getAbhiEpisodePath(featured),
      imageUrl: featured.image,
      imageAlt: listify(featured.guests.map((g) => g.name))
    }) : null]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useCapturedRouteError();
  if (isRouteErrorResponse(error)) {
    console.error("CatchBoundary", error);
    if (error.status === 404) {
      return /* @__PURE__ */ jsx(FourOhFour, {});
    }
    throw new Error(`Unhandled error: ${error.status}`);
  }
});
export {
  ErrorBoundary,
  $season_$episode__$slug as default,
  handle,
  headers,
  links,
  loader,
  meta
};
//# sourceMappingURL=_season._episode_._slug-DnN26BSM.js.map
