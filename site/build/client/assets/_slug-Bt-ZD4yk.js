import { UNSAFE_withComponentProps, useParams, UNSAFE_withErrorBoundaryProps, Link, redirect, data } from "react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { clsx } from "clsx";
import * as React from "react";
import { B as BackLink, A as ArrowLink } from "./arrow-button-DBVn13Kl.js";
import { c as useRootData, o as useMdxComponent, k as BlurrableImage, j as getBannerAltProp, p as getBannerTitleProp, B as BlogSection, F as FourOhFour, q as FourHundred, i as useTeam, x as teamEmoji, s as mdxPageMeta } from "./root-BtDGpB2R.js";
import { C as CourseCard } from "./course-card-Dtp7nTpE.js";
import { G as GeneralErrorBoundary, g as getNotFoundSuggestions } from "./not-found-suggestions.server-BCotgAUX.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { T as TeamStats } from "./team-stats-DuZEr364.js";
import { c as H2, a as H6, P as Paragraph, b as H4 } from "./typography-DDpAXXrz.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { g as getImgProps, a as getImageBuilder, i as images } from "./images-D8NqauwH.js";
import { F as FavoriteToggle } from "./favorite-Ct1jwKNM.js";
import { g as getBlogRecommendations, b as getBlogReadRankings, c as getTotalPostReads, a as getRankingLeader } from "./blog.server-C4fS0n4p.js";
import { g as getBlogMdxListItems, a as getMdxPage } from "./mdx.server-CumfvRLd.js";
import { r as reuseUsefulLoaderHeaders, w as requireValidSlug, m as formatNumber } from "./misc-DM3BUXHg.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import { getUser } from "./session.server-BVOCbXUc.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { m as markAsRead } from "./mark-as-read-btFwO9XV.js";
import "framer-motion";
import "./icons-Xl-Om4A1.js";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "@reach/dialog";
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
import "./seo-B3cPpSFw.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-BSZTMYmt.js";
import "./hero-section-CoHGsAuJ.js";
import "node:fs/promises";
import "match-sorter";
import "yaml";
import "cloudinary-build-url";
import "emoji-regex";
import "@radix-ui/react-tooltip";
import "./favorites-BOCNblj8.js";
import "date-fns";
import "p-limit";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
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
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "node:url";
import "@prisma/client/runtime/client";
const handleId = "blog-post";
const handle = {
  id: handleId,
  getSitemapEntries: async (request) => {
    const pages = await getBlogMdxListItems({
      request
    });
    return pages.filter((page) => !page.frontmatter.draft).map((page) => {
      return {
        route: `/blog/${page.slug}`,
        priority: 0.7
      };
    });
  }
};
async function loader({
  request,
  params
}) {
  requireValidSlug(params.slug);
  if (params.slug.endsWith(".mdx") || params.slug.endsWith(".md")) {
    const canonicalSlug = params.slug.replace(/\.(mdx|md)$/i, "");
    throw redirect(`/blog/${canonicalSlug}`, {
      status: 301
    });
  }
  const timings = {};
  const page = await getMdxPage({
    contentDir: "blog",
    slug: params.slug
  }, {
    request,
    timings
  });
  if (!page) {
    const pathname = new URL(request.url).pathname;
    const [recommendations2, suggestions] = await Promise.all([getBlogRecommendations({
      request,
      timings,
      limit: 3,
      keywords: [],
      exclude: [params.slug]
    }), getNotFoundSuggestions({
      request,
      pathname,
      limit: 8
    })]);
    const headers3 = {
      // Don't cache speculative 404 slugs for long.
      "Cache-Control": "private, max-age=60",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    };
    const catchData = {
      recommendations: recommendations2
    };
    if (suggestions) {
      catchData.possibleMatches = suggestions.matches;
      catchData.possibleMatchesQuery = suggestions.query;
    }
    throw data(catchData, {
      status: 404,
      headers: headers3
    });
  }
  const userPromise = getUser(request, {
    timings
  });
  const favoritePromise = userPromise.then((user) => user ? prisma.favorite.findUnique({
    where: {
      userId_contentType_contentId: {
        userId: user.id,
        contentType: "blog-post",
        contentId: params.slug
      }
    },
    select: {
      id: true
    }
  }) : null);
  const [recommendations, readRankings, totalReads, favorite] = await Promise.all([getBlogRecommendations({
    request,
    timings,
    limit: 3,
    keywords: [...page.frontmatter.categories ?? [], ...page.frontmatter.meta?.keywords ?? []],
    exclude: [params.slug]
  }), getBlogReadRankings({
    request,
    slug: params.slug,
    timings
  }), getTotalPostReads({
    request,
    slug: params.slug,
    timings
  }), favoritePromise]);
  const headers2 = {
    "Cache-Control": "private, max-age=3600",
    Vary: "Cookie",
    "Server-Timing": getServerTimeHeader(timings)
  };
  return data({
    page,
    isFavorite: Boolean(favorite),
    recommendations,
    readRankings,
    totalReads: formatNumber(totalReads),
    leadingTeam: getRankingLeader(readRankings)?.team ?? null
  }, {
    status: 200,
    headers: headers2
  });
}
const headers = reuseUsefulLoaderHeaders;
const meta = mdxPageMeta;
function useOnRead({
  parentElRef,
  time,
  onRead
}) {
  React.useEffect(() => {
    const parentEl = parentElRef.current;
    if (!parentEl || !time) return;
    let visibilityEl = document.createElement("div");
    function removeVisibilityEl() {
      if (!visibilityEl) return;
      visibilityEl.remove();
      visibilityEl = null;
    }
    let scrolledTheMain = false;
    const observer = new IntersectionObserver((entries) => {
      if (!visibilityEl) return;
      const currentVisibilityEl = visibilityEl;
      const isVisible = entries.some((entry) => {
        return entry.target === currentVisibilityEl && entry.isIntersecting;
      });
      if (isVisible) {
        scrolledTheMain = true;
        maybeMarkAsRead();
        observer.disconnect();
        removeVisibilityEl();
      }
    });
    let startTime = (/* @__PURE__ */ new Date()).getTime();
    let timeoutTime = time * 0.6;
    let timerId;
    let timerFinished = false;
    function startTimer() {
      timerId = setTimeout(() => {
        timerFinished = true;
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        maybeMarkAsRead();
      }, timeoutTime);
    }
    function handleVisibilityChange() {
      if (document.hidden) {
        clearTimeout(timerId);
        const timeElapsedSoFar = (/* @__PURE__ */ new Date()).getTime() - startTime;
        timeoutTime = timeoutTime - timeElapsedSoFar;
      } else {
        startTime = (/* @__PURE__ */ new Date()).getTime();
        startTimer();
      }
    }
    function maybeMarkAsRead() {
      if (timerFinished && scrolledTheMain) {
        cleanup();
        onRead();
      }
    }
    parentEl.appendChild(visibilityEl);
    observer.observe(visibilityEl);
    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    function cleanup() {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timerId);
      observer.disconnect();
      removeVisibilityEl();
    }
    return cleanup;
  }, [time, onRead, parentElRef]);
}
function ArticleFooter({
  editLink,
  permalink,
  title = "an awesome post",
  isDraft
}) {
  const [team] = useTeam();
  const tweetMessage = team === "UNKNOWN" ? `I just read "${title}" by @abhidev

` : `I just scored a point for the ${team.toLowerCase()} team ${teamEmoji[team]} by reading "${title}" by @abhidev

`;
  return /* @__PURE__ */ jsxs(Grid, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "col-span-full mb-12 flex flex-col flex-wrap justify-between gap-2 border-b border-gray-600 pb-12 text-lg font-medium text-slate-500 lg:col-span-8 lg:col-start-3 lg:flex-row lg:pb-6",
      children: [/* @__PURE__ */ jsx("div", {
        className: "flex space-x-5",
        children: /* @__PURE__ */ jsx("a", {
          className: clsx("underlined text-black hover:text-black focus:text-black focus:outline-none dark:text-white dark:hover:text-white dark:focus:text-white", {
            hidden: isDraft
          }),
          target: "_blank",
          rel: "noreferrer noopener",
          href: `https://x.com/intent/tweet?${new URLSearchParams({
            url: permalink,
            text: tweetMessage
          })}`,
          children: "Post this article"
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex",
        children: [/* @__PURE__ */ jsx("a", {
          className: clsx("underlined text-black hover:text-black focus:text-black focus:outline-none dark:text-white dark:hover:text-white dark:focus:text-white", {
            hidden: isDraft
          }),
          target: "_blank",
          rel: "noreferrer noopener",
          href: `https://x.com/search?${new URLSearchParams({
            q: permalink
          })}`,
          children: "Discuss on 𝕏"
        }), /* @__PURE__ */ jsx("span", {
          className: clsx("mx-3 self-center text-xs", {
            hidden: isDraft
          }),
          children: "•"
        }), /* @__PURE__ */ jsx("a", {
          className: "underlined text-black hover:text-black focus:text-black focus:outline-none dark:text-white dark:hover:text-white dark:focus:text-white",
          target: "_blank",
          rel: "noreferrer noopener",
          href: editLink,
          children: "Edit on GitHub"
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full lg:col-span-2 lg:col-start-3",
      children: /* @__PURE__ */ jsx("img", {
        loading: "lazy",
        ...getImgProps(images.abhiTransparentProfile, {
          className: "mb-8 w-32",
          widths: [128, 256, 512],
          sizes: ["8rem"]
        })
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "lg:col-start:5 col-span-full lg:col-span-6",
      children: [/* @__PURE__ */ jsx(H6, {
        as: "div",
        children: "Written by AbhiDev"
      }), /* @__PURE__ */ jsx(Paragraph, {
        className: "mt-3 mb-12",
        children: `
AbhiDev is a JavaScript software engineer and teacher. Kent's taught hundreds
of thousands of people how to make the world a better place with quality software
development tools and practices. He lives with his wife and four kids in Utah.
          `.trim()
      }), /* @__PURE__ */ jsx(ArrowLink, {
        to: "/about",
        children: "Learn more about me"
      })]
    })]
  });
}
function ArticleQuestionCard() {
  return /* @__PURE__ */ jsx(Grid, {
    children: /* @__PURE__ */ jsx("div", {
      className: "col-span-full lg:col-span-8 lg:col-start-3",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-secondary border-secondary flex flex-col gap-6 rounded-lg border px-8 py-10 md:flex-row md:items-center md:justify-between md:gap-10 md:px-12",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-3",
          children: [/* @__PURE__ */ jsx(H4, {
            children: "Have a question about this article?"
          }), /* @__PURE__ */ jsxs(Paragraph, {
            prose: false,
            className: "max-w-2xl",
            children: ["Bring it to the call AbhiDev podcast. Ask on", " ", /* @__PURE__ */ jsx(Link, {
              to: "/calls",
              className: "text-primary font-medium",
              children: "/calls"
            }), " ", "and I may answer it on the podcast."]
          })]
        }), /* @__PURE__ */ jsx(ArrowLink, {
          className: "flex-shrink-0",
          to: "/calls",
          direction: "right",
          prefetch: "intent",
          children: "Place a call"
        })]
      })
    })
  });
}
const $slug = UNSAFE_withComponentProps(function MdxScreen({
  loaderData: data2
}) {
  const {
    requestInfo
  } = useRootData();
  const {
    code,
    dateDisplay,
    frontmatter
  } = data2.page;
  const params = useParams();
  const {
    slug
  } = params;
  const Component = useMdxComponent(code);
  const permalink = `${requestInfo.origin}/blog/${slug}`;
  const readMarker = React.useRef(null);
  const isDraft = Boolean(data2.page.frontmatter.draft);
  const isArchived = Boolean(data2.page.frontmatter.archived);
  const categoriesAndKeywords = [...data2.page.frontmatter.categories ?? [], ...data2.page.frontmatter.meta?.keywords ?? []];
  useOnRead({
    parentElRef: readMarker,
    time: data2.page.readTime?.time,
    onRead: React.useCallback(() => {
      if (isDraft) return;
      if (slug) void markAsRead({
        slug
      });
    }, [isDraft, slug])
  });
  return /* @__PURE__ */ jsxs("div", {
    className: data2.leadingTeam ? `set-color-team-current-${data2.leadingTeam.toLowerCase()}` : "",
    children: [/* @__PURE__ */ jsx(Grid, {
      className: "mt-24 mb-10 lg:mb-24",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full flex justify-between lg:col-span-8 lg:col-start-3",
        children: [/* @__PURE__ */ jsx(BackLink, {
          to: "/blog",
          children: "Back to overview"
        }), /* @__PURE__ */ jsx(TeamStats, {
          totalReads: data2.totalReads,
          rankings: data2.readRankings,
          direction: "down",
          pull: "right"
        })]
      })
    }), /* @__PURE__ */ jsxs(Grid, {
      as: "header",
      className: "mb-12",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-full lg:col-span-8 lg:col-start-3",
        children: [isDraft ? /* @__PURE__ */ jsx("div", {
          className: "prose prose-light dark:prose-dark mb-6 max-w-full",
          children: React.createElement("callout-warning", {}, `This blog post is a draft. Please don't share it in its current state.`)
        }) : null, isArchived ? /* @__PURE__ */ jsx("div", {
          className: "prose prose-light dark:prose-dark mb-6 max-w-full",
          children: React.createElement("callout-warning", {}, `This blog post is archived. It's no longer maintained and may contain outdated information.`)
        }) : null, /* @__PURE__ */ jsx(H2, {
          children: frontmatter.title
        }), /* @__PURE__ */ jsx(H6, {
          as: "p",
          variant: "secondary",
          className: "mt-2",
          children: [dateDisplay, data2.page.readTime?.text ?? "quick read"].filter(Boolean).join(" — ")
        }), !isDraft && slug ? /* @__PURE__ */ jsx("div", {
          className: "mt-6 flex justify-end",
          children: /* @__PURE__ */ jsx(FavoriteToggle, {
            contentType: "blog-post",
            contentId: slug,
            initialIsFavorite: data2.isFavorite
          })
        }) : null]
      }), frontmatter.bannerCloudinaryId ? /* @__PURE__ */ jsx("div", {
        className: "col-span-full mt-10 lg:col-span-10 lg:col-start-2 lg:mt-16",
        children: /* @__PURE__ */ jsx(BlurrableImage, {
          blurDataUrl: frontmatter.bannerBlurDataUrl,
          className: "aspect-[3/4] md:aspect-[3/2]",
          img: /* @__PURE__ */ jsx("img", {
            title: getBannerTitleProp(frontmatter),
            ...getImgProps(getImageBuilder(frontmatter.bannerCloudinaryId, getBannerAltProp(frontmatter)), {
              className: "rounded-lg object-cover object-center",
              widths: [280, 560, 840, 1100, 1650, 2500, 2100, 3100],
              sizes: ["(max-width:1023px) 80vw", "(min-width:1024px) and (max-width:1620px) 67vw", "1100px"],
              transformations: {
                background: "rgb:e6e9ee"
              }
            })
          }, frontmatter.bannerCloudinaryId)
        }, frontmatter.bannerCloudinaryId)
      }) : null]
    }), /* @__PURE__ */ jsxs("main", {
      ref: readMarker,
      children: [/* @__PURE__ */ jsx(Grid, {
        className: "mb-24",
        children: /* @__PURE__ */ jsx("div", {
          className: "col-span-full lg:col-start-3 lg:col-end-11",
          children: /* @__PURE__ */ jsx("div", {
            className: "flex flex-wrap",
            children: frontmatter.translations?.length ? /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx("ul", {
                className: "col-span-full -mr-4 -mb-4 flex flex-wrap lg:col-span-10 lg:col-start-3",
                children: frontmatter.translations.map(({
                  language,
                  link
                }) => /* @__PURE__ */ jsx("li", {
                  children: /* @__PURE__ */ jsx("a", {
                    href: link,
                    className: "focus-ring bg-secondary text-primary relative mr-4 mb-4 block h-auto w-auto rounded-full px-6 py-3 whitespace-nowrap",
                    children: language
                  })
                }, `${language}:${link}`))
              }), /* @__PURE__ */ jsx("a", {
                href: externalLinks.translationContributions,
                className: "text-secondary underlined hover:text-team-current focus:text-team-current my-3 mb-6 ml-5 block text-lg font-medium focus:outline-none",
                target: "_blank",
                rel: "noreferrer noopener",
                children: "Add translation"
              })]
            }) : /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-secondary text-lg italic",
                children: "No translations available."
              }), /* @__PURE__ */ jsx("a", {
                href: externalLinks.translationContributions,
                className: "text-secondary underlined hover:text-team-current focus:text-team-current ml-5 block text-lg font-medium focus:outline-none",
                target: "_blank",
                rel: "noreferrer noopener",
                children: "Add translation"
              })]
            })
          })
        })
      }), /* @__PURE__ */ jsx(Grid, {
        className: "prose prose-light dark:prose-dark mb-24 break-words",
        children: /* @__PURE__ */ jsx(Component, {})
      })]
    }), categoriesAndKeywords.includes("react") || categoriesAndKeywords.includes("testing") || categoriesAndKeywords.includes("remix") || categoriesAndKeywords.includes("ai") ? /* @__PURE__ */ jsxs("div", {
      className: "px-10vw mx-auto mb-24 flex max-w-lg flex-col items-center justify-center gap-8 md:max-w-none md:flex-row",
      children: [categoriesAndKeywords.includes("react") ? /* @__PURE__ */ jsx("div", {
        className: "@container w-full max-w-lg",
        children: /* @__PURE__ */ jsx(CourseCard, {
          title: "Epic React",
          description: "Get Really Good at React",
          label: "React course",
          lightImageBuilder: images.courseEpicReact,
          darkImageBuilder: images.courseEpicReactDark,
          courseUrl: "https://abhidev.com"
        })
      }) : null, categoriesAndKeywords.includes("testing") ? /* @__PURE__ */ jsx("div", {
        className: "@container w-full max-w-lg",
        children: /* @__PURE__ */ jsx(CourseCard, {
          title: "Testing JavaScript",
          description: "Ship Apps with Confidence",
          label: "Testing course",
          lightImageBuilder: images.courseTestingJS,
          darkImageBuilder: images.courseTestingJSDark,
          courseUrl: "https://abhidev.com"
        })
      }) : null, categoriesAndKeywords.includes("remix") ? /* @__PURE__ */ jsx("div", {
        className: "@container w-full max-w-lg",
        children: /* @__PURE__ */ jsx(CourseCard, {
          title: "Epic Web",
          description: "Become a full stack web dev.",
          label: "Full stack course",
          lightImageBuilder: images.courseEpicWebLight,
          darkImageBuilder: images.courseEpicWebDark,
          courseUrl: "https://www.epicweb.dev"
        })
      }) : null, categoriesAndKeywords.includes("ai") || categoriesAndKeywords.includes("mcp") ? /* @__PURE__ */ jsx("div", {
        className: "@container w-full max-w-lg",
        children: /* @__PURE__ */ jsx(CourseCard, {
          title: "Epic AI",
          description: "Learn to build AI-powered applications.",
          label: "AI development course",
          lightImageBuilder: images.courseEpicAILight,
          darkImageBuilder: images.courseEpicAIDark,
          courseUrl: "https://www.epicai.pro"
        })
      }) : null]
    }) : null, /* @__PURE__ */ jsx(Grid, {
      className: "mb-24",
      children: /* @__PURE__ */ jsx("div", {
        className: "col-span-full flex justify-end lg:col-span-8 lg:col-start-3",
        children: /* @__PURE__ */ jsx(TeamStats, {
          totalReads: data2.totalReads,
          rankings: data2.readRankings,
          direction: "up",
          pull: "right"
        })
      })
    }), !isDraft && slug ? /* @__PURE__ */ jsx(Grid, {
      className: "mb-12",
      children: /* @__PURE__ */ jsx("div", {
        className: "col-span-full flex justify-end lg:col-span-8 lg:col-start-3",
        children: /* @__PURE__ */ jsx(FavoriteToggle, {
          contentType: "blog-post",
          contentId: slug,
          initialIsFavorite: data2.isFavorite
        })
      })
    }) : null, /* @__PURE__ */ jsx(ArticleFooter, {
      editLink: data2.page.editLink,
      permalink,
      title: data2.page.frontmatter.title,
      isDraft
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "sm"
    }), /* @__PURE__ */ jsx(ArticleQuestionCard, {}), /* @__PURE__ */ jsx(Spacer, {
      size: "sm"
    }), /* @__PURE__ */ jsx(BlogSection, {
      articles: data2.recommendations,
      title: "If you found this article helpful.",
      description: "You will love these ones as well.",
      showArrowButton: false
    })]
  }, slug);
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  return /* @__PURE__ */ jsx(GeneralErrorBoundary, {
    statusHandlers: {
      400: ({
        error
      }) => /* @__PURE__ */ jsx(FourHundred, {
        error: error.statusText
      }),
      404: ({
        error
      }) => /* @__PURE__ */ jsx(FourOhFour, {
        articles: error.data.recommendations,
        possibleMatches: error.data.possibleMatches,
        possibleMatchesQuery: error.data.possibleMatchesQuery
      })
    }
  });
});
export {
  ErrorBoundary,
  $slug as default,
  handle,
  headers,
  loader,
  meta
};
//# sourceMappingURL=_slug-Bt-ZD4yk.js.map
