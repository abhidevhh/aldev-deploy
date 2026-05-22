import { UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, useSearchParams, Link, data } from "react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { MixedCheckbox } from "@reach/checkbox";
import { clsx } from "clsx";
import * as React from "react";
import { a as ArrowLink } from "./arrow-button-DsHCk3Gf.js";
import { S as ServerError, x as useRootData, y as useTeam, g as getBannerAltProp, A as ArticleCard } from "./root-XTBE-Fp5.js";
import { a as ButtonLink, B as Button } from "./button-C3vj8DF4.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { S as SearchIcon, Q as RssIcon, h as ChevronDownIcon, K as PlusIcon } from "./icons-DQAXl5Y1.js";
import { F as FeaturedSection } from "./featured-section-Ientq53N.js";
import { H as HeroSection } from "./hero-section-BNEKo3U8.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { T as Tag } from "./tag-Bs3TtQGk.js";
import { T as TeamStats } from "./team-stats-D_8wHRbo.js";
import { P as Paragraph, e as H6, c as H4, b as H3, a as H2 } from "./typography-DBSbiCOF.js";
import { h as images, c as getImageBuilder, d as getImgProps, f as getSocialImageWithPreTitle } from "./images-Dyd95Mrb.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { e as getRankingLeader, f as filterPosts, c as getBlogRecommendations, b as getBlogReadRankings, j as getTotalPostReads, h as getReaderCount, g as getAllBlogPostReadRankings, a as getBlogPostReadCounts, i as getSlugReadsByUser } from "./blog.server-dX-XfgiU.js";
import { g as getBlogMdxListItems } from "./mdx.server-CWSqTQTg.js";
import { u as useCapturedRouteError, d as useUpdateQueryStringValueWithoutNavigation } from "./misc-react-BeZfIuw-.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { r as isTeam, w as reuseUsefulLoaderHeaders, f as formatAbbreviatedNumber, e as getDisplayUrl, p as getUrl, d as formatNumber } from "./misc-CQO4K9rH.js";
import "framer-motion";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "@reach/dialog";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
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
import "downshift";
import "./promotification-YMEmucWd.js";
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
import "./theme.server-D5mszc13.js";
import "./user-info.server-D6axXZ8Q.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-B2Ylwupf.js";
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
import "./github.server-u_4PqFTT.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "@sentry/react-router";
import "md5-hash";
const handleId = "blog";
const handle = {
  id: handleId,
  getSitemapEntries: () => [{
    route: `/blog`,
    priority: 0.7
  }]
};
const links = () => {
  return [{
    rel: "alternate",
    type: "application/rss+xml",
    title: "AbhiDev AI Blog",
    href: "/blog/rss.xml"
  }];
};
async function loader({
  request
}) {
  const timings = {};
  const [posts, [recommended], readRankings, totalReads, totalBlogReaders, allPostReadRankings, postReadCounts, userReads] = await Promise.all([getBlogMdxListItems({
    request
  }).then((allPosts) => allPosts.filter((p) => !p.frontmatter.draft)), getBlogRecommendations({
    request,
    limit: 1,
    timings
  }), getBlogReadRankings({
    request,
    timings
  }), getTotalPostReads({
    request,
    timings
  }), getReaderCount({
    request,
    timings
  }), getAllBlogPostReadRankings({
    request,
    timings
  }), getBlogPostReadCounts({
    request,
    timings
  }), getSlugReadsByUser({
    request,
    timings
  })]);
  const tags = /* @__PURE__ */ new Set();
  for (const post of posts) {
    for (const category of post.frontmatter.categories ?? []) {
      tags.add(category);
    }
  }
  const data$1 = {
    posts,
    recommended,
    readRankings,
    allPostReadRankings,
    postReadCounts,
    totalReads: formatAbbreviatedNumber(totalReads),
    totalBlogReaders: formatAbbreviatedNumber(totalBlogReaders),
    userReads,
    tags: Array.from(tags),
    overallLeadingTeam: getRankingLeader(readRankings)?.team ?? null
  };
  return data(data$1, {
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
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  const {
    totalBlogReaders,
    posts
  } = data2;
  return getSocialMetas({
    title: "The AbhiDev AI Blog",
    description: `Join ${totalBlogReaders} people who have read Kent's ${formatNumber(posts.length)} articles on AI, machine learning, full stack engineering, system design, research, and developer growth.`,
    keywords: "JavaScript, TypeScript, React, Testing, Career, Software Development, AbhiDev AI Blog",
    url: getUrl(requestInfo),
    image: getSocialImageWithPreTitle({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.skis.id,
      preTitle: "Engineering Insights and AI Research",
      title: `Practical insights from AI systems, full stack engineering, and research projects`
    }),
    ogType: "website"
  });
};
const PAGE_SIZE = 12;
const initialIndexToShow = PAGE_SIZE;
const specialQueryRegex = /(?<not>!)?leader:(?<team>\w+)(\s|$)?/g;
function getSortStateFromParam(value) {
  switch (value) {
    case "newest":
    case "oldest":
    case "popular":
      return value;
    default:
      return "auto";
  }
}
function BlogHome({
  loaderData: data2
}) {
  const {
    requestInfo
  } = useRootData();
  const [searchParams] = useSearchParams();
  const [userReadsState, setUserReadsState] = React.useState("unset");
  const searchInputRef = React.useRef(null);
  const [userTeam] = useTeam();
  const resultsRef = React.useRef(null);
  const ignoreInputKeyUp = React.useRef(false);
  const [queryValue, setQuery] = React.useState(() => {
    return searchParams.get("q") ?? "";
  });
  const [sortState, setSortState] = React.useState(() => {
    return getSortStateFromParam(searchParams.get("sort"));
  });
  const query = queryValue.trim();
  const regularQuery = query.replace(specialQueryRegex, "").trim();
  useUpdateQueryStringValueWithoutNavigation("q", query);
  useUpdateQueryStringValueWithoutNavigation("sort", sortState === "auto" || sortState === "newest" && regularQuery === "" ? "" : sortState);
  const {
    posts: allPosts,
    userReads,
    postReadCounts
  } = data2;
  const getLeadingTeamForSlug = React.useCallback((slug) => {
    return getRankingLeader(data2.allPostReadRankings[slug])?.team;
  }, [data2.allPostReadRankings]);
  const effectiveSort = sortState === "auto" ? regularQuery ? "relevance" : "newest" : sortState;
  const matchingPosts = React.useMemo(() => {
    const r = new RegExp(specialQueryRegex);
    let match = r.exec(query);
    const leaders = [];
    const nonLeaders = [];
    while (match) {
      const {
        team,
        not
      } = match.groups ?? {};
      const upperTeam = team?.toUpperCase();
      if (isTeam(upperTeam)) {
        if (not) {
          nonLeaders.push(upperTeam);
        } else {
          leaders.push(upperTeam);
        }
      }
      match = r.exec(query);
    }
    let filteredPosts = allPosts;
    filteredPosts = userReadsState === "unset" ? filteredPosts : filteredPosts.filter((post) => {
      const isRead = userReads.includes(post.slug);
      if (userReadsState === "read" && !isRead) return false;
      if (userReadsState === "unread" && isRead) return false;
      return true;
    });
    filteredPosts = leaders.length || nonLeaders.length ? filteredPosts.filter((post) => {
      const leader = getLeadingTeamForSlug(post.slug);
      if (leaders.length && leader && leaders.includes(leader)) {
        return true;
      }
      if (nonLeaders.length && (!leader || !nonLeaders.includes(leader))) {
        return true;
      }
      return false;
    }) : filteredPosts;
    const searchedPosts = filterPosts(filteredPosts, regularQuery);
    if (effectiveSort === "relevance") return searchedPosts;
    const dateTimeCache = /* @__PURE__ */ new Map();
    const getPostDateTime = (post) => {
      const cached = dateTimeCache.get(post.slug);
      if (cached !== void 0) return cached;
      const time = new Date(post.frontmatter.date ?? "").getTime();
      const value = Number.isFinite(time) ? time : null;
      dateTimeCache.set(post.slug, value);
      return value;
    };
    const compareByDate = (a, b, direction) => {
      const aTime = getPostDateTime(a);
      const bTime = getPostDateTime(b);
      if (aTime === null && bTime === null) return a.slug.localeCompare(b.slug);
      if (aTime === null) return 1;
      if (bTime === null) return -1;
      if (aTime === bTime) return a.slug.localeCompare(b.slug);
      return direction === "desc" ? bTime - aTime : aTime - bTime;
    };
    const compareByNewest = (a, b) => compareByDate(a, b, "desc");
    const compareByOldest = (a, b) => compareByDate(a, b, "asc");
    const compareByPopular = (a, b) => {
      const aReads = postReadCounts[a.slug] ?? 0;
      const bReads = postReadCounts[b.slug] ?? 0;
      if (aReads !== bReads) return bReads - aReads;
      return compareByNewest(a, b);
    };
    const postsToSort = [...searchedPosts];
    switch (effectiveSort) {
      case "newest":
        return postsToSort.sort(compareByNewest);
      case "oldest":
        return postsToSort.sort(compareByOldest);
      case "popular":
        return postsToSort.sort(compareByPopular);
      default: {
        return searchedPosts;
      }
    }
  }, [allPosts, query, regularQuery, effectiveSort, getLeadingTeamForSlug, userReadsState, userReads, postReadCounts]);
  const [indexToShow, setIndexToShow] = React.useState(initialIndexToShow);
  React.useEffect(() => {
    setIndexToShow(initialIndexToShow);
  }, [query, effectiveSort, userReadsState]);
  function toggleTag(tag) {
    setQuery((q) => {
      const expression = new RegExp(tag, "ig");
      const newQuery = expression.test(q) ? q.replace(expression, "") : `${q} ${tag}`;
      return newQuery.replace(/\s+/g, " ").trim();
    });
  }
  function toggleTeam(team) {
    team = team.toLowerCase();
    let newSpecialQuery = "";
    if (query.includes(`!leader:${team}`)) {
      newSpecialQuery = "";
    } else if (query.includes(`leader:${team}`)) {
      newSpecialQuery = `!leader:${team}`;
    } else {
      newSpecialQuery = `leader:${team}`;
    }
    setQuery(`${newSpecialQuery} ${regularQuery}`.trim());
  }
  const isSearching = query.length > 0 || userReadsState !== "unset";
  const showFeatured = !isSearching && Boolean(data2.recommended) && effectiveSort === "newest";
  const nonSearchingPosts = showFeatured ? matchingPosts.filter((p) => p.slug !== data2.recommended?.slug) : matchingPosts;
  const posts = isSearching ? matchingPosts.slice(0, indexToShow) : nonSearchingPosts.slice(0, indexToShow);
  const hasMorePosts = isSearching ? indexToShow < matchingPosts.length : indexToShow < nonSearchingPosts.length;
  const visibleTags = isSearching ? new Set(matchingPosts.flatMap((post) => post.frontmatter.categories).filter(Boolean)) : new Set(data2.tags);
  const recommendedPermalink = data2.recommended ? `${requestInfo.origin}/blog/${data2.recommended.slug}` : void 0;
  const checkboxLabel = userReadsState === "read" ? "Showing only posts you have not read" : userReadsState === "unread" ? `Showing only posts you have read` : `Showing all posts`;
  const searchInputPlaceholder = userReadsState === "read" ? "Search posts you have read" : userReadsState === "unread" ? "Search posts you have not read" : "Search posts";
  return /* @__PURE__ */ jsxs("div", {
    className: data2.overallLeadingTeam ? `set-color-team-current-${data2.overallLeadingTeam.toLowerCase()}` : "",
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Learn AI engineering, full stack systems, and real-world projects.",
      subtitle: /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("span", {
          children: `Explore technical write-ups, project breakdowns, ML research, and engineering learnings.`
        }), /* @__PURE__ */ jsx(Link, {
          reloadDocument: true,
          to: "rss.xml",
          className: "text-secondary underlined hover:text-team-current focus:text-team-current ml-2 inline-block",
          children: /* @__PURE__ */ jsx(RssIcon, {
            title: "Get my blog as RSS"
          })
        })]
      }),
      imageBuilder: images.skis,
      action: /* @__PURE__ */ jsx("div", {
        className: "w-full",
        children: /* @__PURE__ */ jsxs("form", {
          action: "/blog",
          method: "GET",
          onSubmit: (e) => e.preventDefault(),
          children: [/* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [/* @__PURE__ */ jsx("button", {
              title: query === "" ? "Search" : "Clear search",
              type: "button",
              onClick: () => {
                setQuery("");
                ignoreInputKeyUp.current = true;
                searchInputRef.current?.focus();
              },
              onKeyDown: () => {
                ignoreInputKeyUp.current = true;
              },
              onKeyUp: () => {
                ignoreInputKeyUp.current = false;
              },
              className: clsx("absolute top-0 left-6 flex h-full items-center justify-center border-none bg-transparent p-0 text-slate-500", {
                "cursor-pointer": query !== "",
                "cursor-default": query === ""
              }),
              children: /* @__PURE__ */ jsx(SearchIcon, {})
            }), /* @__PURE__ */ jsx("input", {
              ref: searchInputRef,
              type: "search",
              value: queryValue,
              onChange: (event) => setQuery(event.currentTarget.value.toLowerCase()),
              onKeyUp: (e) => {
                if (!ignoreInputKeyUp.current && e.key === "Enter") {
                  resultsRef.current?.querySelector("a")?.focus({
                    preventScroll: true
                  });
                  resultsRef.current?.scrollIntoView({
                    behavior: "smooth"
                  });
                }
                ignoreInputKeyUp.current = false;
              },
              name: "q",
              placeholder: searchInputPlaceholder,
              className: "text-primary bg-primary border-secondary focus:bg-secondary hover:border-team-current focus:border-team-current w-full appearance-none rounded-full border py-6 pr-6 pl-14 text-lg font-medium focus:outline-none md:pr-24"
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute top-0 right-6 hidden h-full w-14 items-center justify-between text-lg font-medium text-slate-500 md:flex",
              children: [/* @__PURE__ */ jsx(MixedCheckbox, {
                title: checkboxLabel,
                "aria-label": checkboxLabel,
                onChange: () => {
                  setUserReadsState((s) => {
                    if (s === "unset") return "unread";
                    if (s === "unread") return "read";
                    return "unset";
                  });
                },
                checked: userReadsState === "unset" ? "mixed" : userReadsState === "read"
              }), /* @__PURE__ */ jsx("div", {
                className: "flex-1"
              }), matchingPosts.length]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-2 pr-6 pl-14 text-sm text-slate-500",
            children: /* @__PURE__ */ jsx(Link, {
              to: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
              prefetch: "intent",
              className: "underlined hover:text-team-current focus:text-team-current inline-block",
              children: "Search all blogs, projects, and research notes"
            })
          })]
        })
      })
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mb-14",
      children: [/* @__PURE__ */ jsx("div", {
        className: "relative col-span-full h-20",
        children: /* @__PURE__ */ jsx("div", {
          className: "absolute",
          children: /* @__PURE__ */ jsx(TeamStats, {
            totalReads: data2.totalReads,
            rankings: data2.readRankings,
            pull: "left",
            direction: "down",
            onStatClick: toggleTeam
          })
        })
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "2xs",
        className: "col-span-full"
      }), /* @__PURE__ */ jsx(Paragraph, {
        className: "col-span-full",
        prose: false,
        children: data2.overallLeadingTeam ? /* @__PURE__ */ jsxs(Fragment, {
          children: [`The `, /* @__PURE__ */ jsx("strong", {
            className: `text-team-current set-color-team-current-${data2.overallLeadingTeam.toLowerCase()}`,
            children: data2.overallLeadingTeam.toLowerCase()
          }), ` team is in the lead. `, userTeam === "UNKNOWN" ? /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(Link, {
              to: "/login",
              className: "underlined",
              children: "Login or sign up"
            }), ` to choose your team!`]
          }) : userTeam === data2.overallLeadingTeam ? `That's your team! Keep your lead!` : /* @__PURE__ */ jsxs(Fragment, {
            children: [`Keep reading to get the `, /* @__PURE__ */ jsx("strong", {
              className: `text-team-current set-color-team-current-${userTeam.toLowerCase()}`,
              children: userTeam.toLowerCase()
            }), " ", ` team on top!`]
          })]
        }) : `No team is in the lead! Read read read!`
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "xs",
        className: "col-span-full"
      }), data2.tags.length > 0 ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(H6, {
          as: "div",
          className: "col-span-full mb-6",
          children: "Explore by topics"
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full -mr-4 -mb-4 flex flex-wrap lg:col-span-10",
          children: data2.tags.map((tag) => {
            const selected = regularQuery.includes(tag);
            return /* @__PURE__ */ jsx(Tag, {
              tag,
              selected,
              onClick: () => toggleTag(tag),
              disabled: !visibleTags.has(tag) ? !selected : false
            }, tag);
          })
        })]
      }) : null]
    }), /* @__PURE__ */ jsxs("div", {
      ref: resultsRef,
      children: [/* @__PURE__ */ jsx(Grid, {
        className: showFeatured ? "mb-6" : "mb-10",
        children: /* @__PURE__ */ jsxs("div", {
          className: "col-span-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
          children: [/* @__PURE__ */ jsx(H6, {
            as: "div",
            className: "m-0",
            children: "Engineering Articles"
          }), /* @__PURE__ */ jsxs("label", {
            className: "flex items-center gap-3 text-sm font-medium text-slate-500",
            children: [/* @__PURE__ */ jsx("span", {
              children: "Sort by"
            }), /* @__PURE__ */ jsxs("span", {
              className: "relative",
              children: [/* @__PURE__ */ jsxs("select", {
                value: regularQuery === "" && sortState === "newest" ? "auto" : sortState,
                onChange: (e) => setSortState(getSortStateFromParam(e.currentTarget.value)),
                className: "peer text-primary bg-primary border-secondary focus:bg-secondary hover:border-team-current focus:border-team-current appearance-none rounded-full border py-2 pr-11 pl-5 focus:outline-none",
                children: [/* @__PURE__ */ jsx("option", {
                  value: "auto",
                  children: regularQuery ? "Relevance" : "Newest"
                }), regularQuery ? /* @__PURE__ */ jsx("option", {
                  value: "newest",
                  children: "Newest"
                }) : null, /* @__PURE__ */ jsx("option", {
                  value: "popular",
                  children: "Most popular"
                }), /* @__PURE__ */ jsx("option", {
                  value: "oldest",
                  children: "Oldest"
                })]
              }), /* @__PURE__ */ jsx(ChevronDownIcon, {
                "aria-hidden": "true",
                className: "peer-hover:text-team-current peer-focus:text-team-current pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-500"
              })]
            })]
          })]
        })
      }), showFeatured && data2.recommended ? /* @__PURE__ */ jsx("div", {
        className: "mb-10",
        children: /* @__PURE__ */ jsx(FeaturedSection, {
          subTitle: data2.recommended.readTime?.text ?? "quick read",
          title: data2.recommended.frontmatter.title,
          blurDataUrl: data2.recommended.frontmatter.bannerBlurDataUrl,
          imageBuilder: data2.recommended.frontmatter.bannerCloudinaryId ? getImageBuilder(data2.recommended.frontmatter.bannerCloudinaryId, getBannerAltProp(data2.recommended.frontmatter)) : void 0,
          caption: "Featured engineering write-up",
          cta: "Read case study",
          slug: data2.recommended.slug,
          permalink: recommendedPermalink,
          leadingTeam: getLeadingTeamForSlug(data2.recommended.slug)
        })
      }) : null, /* @__PURE__ */ jsx(Grid, {
        className: "mb-64",
        children: posts.length === 0 ? data2.posts.length === 0 ? /* @__PURE__ */ jsxs("div", {
          className: "col-span-full rounded-lg border border-gray-200 p-8 dark:border-gray-600",
          children: [/* @__PURE__ */ jsx(H4, {
            as: "h2",
            className: "mb-3",
            children: "No articles are available right now."
          }), /* @__PURE__ */ jsxs(Paragraph, {
            className: "mb-4",
            children: ["We are likely having trouble with our GitHub integration. Please try again soon, or browse the content directly on", " ", /* @__PURE__ */ jsx("a", {
              href: externalLinks.githubRepo,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "text-primary underline",
              children: "GitHub"
            }), "."]
          }), /* @__PURE__ */ jsx(ButtonLink, {
            variant: "primary",
            to: externalLinks.githubRepo,
            children: "Open GitHub repo"
          })]
        }) : /* @__PURE__ */ jsxs("div", {
          className: "col-span-full flex flex-col items-center",
          children: [/* @__PURE__ */ jsx("img", {
            ...getImgProps(images.bustedOnewheel, {
              className: "mt-24 h-auto w-full max-w-lg",
              widths: [350, 512, 1024, 1536],
              sizes: ["(max-width: 639px) 80vw", "512px"]
            })
          }), /* @__PURE__ */ jsx(H3, {
            as: "p",
            variant: "secondary",
            className: "mt-24 max-w-lg",
            children: `Couldn't find anything to match your criteria. Sorry.`
          })]
        }) : posts.map((article) => /* @__PURE__ */ jsx("div", {
          className: "col-span-4 mb-10",
          children: /* @__PURE__ */ jsx(ArticleCard, {
            article,
            leadingTeam: getLeadingTeamForSlug(article.slug)
          })
        }, article.slug))
      }), hasMorePosts ? /* @__PURE__ */ jsx("div", {
        className: "mb-64 flex w-full justify-center",
        children: /* @__PURE__ */ jsxs(Button, {
          variant: "secondary",
          onClick: () => setIndexToShow((i) => i + PAGE_SIZE),
          children: [/* @__PURE__ */ jsx("span", {
            children: "Load more engineering posts"
          }), " ", /* @__PURE__ */ jsx(PlusIcon, {})]
        })
      }) : null]
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-5",
        children: /* @__PURE__ */ jsx("img", {
          ...getImgProps(images.kayak, {
            widths: [350, 512, 1024, 1536],
            sizes: ["80vw", "(min-width: 1024px) 30vw", "(min-width:1620px) 530px"]
          })
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full mt-4 lg:col-span-6 lg:col-start-7 lg:mt-0",
        children: [/* @__PURE__ */ jsx(H2, {
          className: "mb-8",
          children: `Prefer deep technical insights?`
        }), /* @__PURE__ */ jsx(H2, {
          className: "mb-16",
          variant: "secondary",
          as: "p",
          children: `
              Check out my podcast Engineering with AbhiDev and learn about software
              development, career, life, and more.
            `
        }), /* @__PURE__ */ jsx(ArrowLink, {
          to: "/chats",
          children: `View portfolio and research`
        })]
      })]
    })]
  });
}
const blog = UNSAFE_withComponentProps(BlogHome);
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useCapturedRouteError();
  console.error(error);
  return /* @__PURE__ */ jsx(ServerError, {});
});
export {
  ErrorBoundary,
  blog as default,
  handle,
  headers,
  links,
  loader,
  meta
};
