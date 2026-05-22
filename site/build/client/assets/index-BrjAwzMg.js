import { useSearchParams, Link, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, data } from "react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as ButtonLink } from "./button-C3vj8DF4.js";
import { B as BlogSection, S as ServerError } from "./root-XTBE-Fp5.js";
import { d as getImgProps, h as images, e as getRandomFlyingAbhiBuddy } from "./images-Dyd95Mrb.js";
import { a as ArrowLink } from "./arrow-button-DsHCk3Gf.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { a as H2, P as Paragraph, b as H3 } from "./typography-DBSbiCOF.js";
import { C as CourseSection } from "./course-section-C1mfg3lC.js";
import { D as DiscordLogo, b as ArrowIcon } from "./icons-DQAXl5Y1.js";
import { H as HeroSection } from "./hero-section-BNEKo3U8.js";
import { F as FullScreenYouTubeEmbed } from "./fullscreen-yt-embed-Dl5Qf3wu.js";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { Tabs, TabList, TabPanels, Tab as Tab$1, TabPanel } from "@reach/tabs";
import { differenceInYears } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { y as teamTextColorClasses, w as reuseUsefulLoaderHeaders, l as getOptionalTeam, z as teams, d as formatNumber } from "./misc-CQO4K9rH.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { j as getTotalPostReads, b as getBlogReadRankings, h as getReaderCount, c as getBlogRecommendations, e as getRankingLeader } from "./blog.server-dX-XfgiU.js";
import { g as getBlogMdxListItems } from "./mdx.server-CWSqTQTg.js";
import { u as useCapturedRouteError } from "./misc-react-BeZfIuw-.js";
import { getUser } from "./session.server-DZ6f3pgH.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import "clsx";
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
import "./external-links-BEDnFUME.js";
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
import "./seo-nV2HC6Me.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-D6axXZ8Q.js";
import "./prisma.server-Cj9LRFmw.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-B2Ylwupf.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./course-card-g0gZgY38.js";
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
function AboutSection() {
  return /* @__PURE__ */ jsxs(Grid, { children: [
    /* @__PURE__ */ jsx("div", { className: "col-span-full table lg:col-span-6", children: /* @__PURE__ */ jsx("div", { className: "table-cell text-center align-middle", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "img",
      {
        loading: "lazy",
        ...getImgProps(images.abhiSnowSports, {
          className: "rounded-lg object-cover w-full h-full",
          widths: [300, 650, 1300, 1800, 2600],
          sizes: [
            "(max-width: 1023px) 80vw",
            "(min-width:1024px) and (max-width:1620px) 40vw",
            "630px"
          ],
          transformations: {
            resize: {
              type: "fill",
              aspectRatio: "3:4"
            }
          }
        })
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-full flex flex-col justify-center lg:col-span-4 lg:col-start-8 lg:mt-0", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          ...getImgProps(images.snowboard, {
            className: "mt-20 w-full h-full object-contain self-start lg:mt-0",
            widths: [300, 600, 850, 1600, 2550],
            sizes: ["(min-width:1024px) and (max-width:1620px) 25vw", "410px"]
          })
        }
      ),
      /* @__PURE__ */ jsx(H2, { className: "mt-12", children: `Big extreme sports enthusiast.` }),
      /* @__PURE__ */ jsx(H2, { className: "mt-2", variant: "secondary", as: "p", children: `With a big heart for helping people.` }),
      /* @__PURE__ */ jsx(Paragraph, { className: "mt-8", children: `
            I'm a JavaScript engineer and teacher and I'm active in the open
            source community. And I'm also a husband, father, and an extreme
            sports and sustainability enthusiast.
          ` }),
      /* @__PURE__ */ jsx(
        ArrowLink,
        {
          to: "/about",
          direction: "right",
          className: "mt-14",
          prefetch: "intent",
          children: "Learn more about me"
        }
      )
    ] })
  ] });
}
function DiscordSection() {
  return /* @__PURE__ */ jsxs(Grid, { children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-full mt-12 flex flex-col justify-center lg:col-span-5 lg:mt-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-black dark:text-white", children: /* @__PURE__ */ jsx(DiscordLogo, {}) }),
      /* @__PURE__ */ jsx(H2, { className: "mt-12", children: "Meet like minded people who face similar challenges." }),
      /* @__PURE__ */ jsx(H2, { variant: "secondary", className: "mt-8", as: "p", children: "Join the discord and get better at building software together." }),
      /* @__PURE__ */ jsx(
        ArrowLink,
        {
          to: "/discord",
          direction: "right",
          className: "mt-20",
          prefetch: "intent",
          children: "Learn more about the Epic Web Community on Discord"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative hidden lg:col-span-6 lg:col-start-7 lg:block", children: [
      /* @__PURE__ */ jsx("div", { className: "h-full w-full", children: /* @__PURE__ */ jsx(
        "img",
        {
          ...getImgProps(images.abhiCodingWithAbhiBuddy, {
            className: "h-full w-full rounded-lg object-cover",
            // this image is hidden at max-width of 1023px
            // so we set that to 0px and have a width for 1px
            // to save data on the request
            widths: [1, 650, 1300, 2600],
            sizes: [
              "(max-width: 1023px) 0px",
              "(min-width:1024px) and (max-width:1620px) 40vw",
              "630px"
            ],
            transformations: {
              resize: {
                type: "fill",
                aspectRatio: "3:4"
              }
            }
          })
        }
      ) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute -top-6 -left-12 flex flex-col space-y-1",
          style: { color: "#006ece" },
          children: [
            /* @__PURE__ */ jsx("div", { className: "self-start rounded-full bg-blue-100 px-12 py-6 text-lg", children: `Want to learn react together?` }),
            /* @__PURE__ */ jsxs("div", { className: "self-start rounded-full bg-blue-100 px-12 py-6 text-lg", children: [
              `Let me know `,
              "✌️"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute -right-12 -bottom-6 flex flex-col space-y-1 text-right",
          style: { color: "#008300" },
          children: [
            /* @__PURE__ */ jsx("div", { className: "self-end rounded-full bg-green-100 px-12 py-6 text-lg", children: `For sure! Let's do it!` }),
            /* @__PURE__ */ jsxs("div", { className: "self-end rounded-full bg-green-100 px-12 py-6 text-lg", children: [
              `Let me show you what I'm working on...`,
              "🧑‍💻"
            ] })
          ]
        }
      )
    ] })
  ] });
}
function IntroductionSection() {
  const [searchParams] = useSearchParams();
  return /* @__PURE__ */ jsxs(Grid, { children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-full lg:col-span-4", children: [
      /* @__PURE__ */ jsx(
        FullScreenYouTubeEmbed,
        {
          autoplay: searchParams.has("autoplay"),
          img: /* @__PURE__ */ jsx(
            "img",
            {
              ...getImgProps(images.getToKnowAbhiDevVideoThumbnail, {
                className: "rounded-lg object-cover w-full",
                widths: [256, 550, 700, 900, 1300, 1800],
                sizes: [
                  "(max-width: 320px) 256px",
                  "(min-width: 321px) and (max-width: 1023px) 80vw",
                  "(min-width: 1024px) 410px",
                  "850px"
                ]
              })
            }
          ),
          ytLiteEmbed: /* @__PURE__ */ jsx(
            LiteYouTubeEmbed,
            {
              id: "a7VxBwLGcDE",
              announce: "Watch",
              title: "Get to know AbhiDev",
              poster: "default",
              params: new URLSearchParams({
                color: "white",
                playsinline: "0",
                rel: "0"
              }).toString()
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-secondary text-xl", children: `Introduction video (2:13)` }),
      /* @__PURE__ */ jsx(
        Link,
        {
          prefetch: "intent",
          className: "underlined",
          to: "/about?autoplay",
          children: `or, watch the full video here (8:05)`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-full mt-12 lg:col-span-6 lg:col-start-6 lg:mt-0", children: [
      /* @__PURE__ */ jsx(H2, { id: "intro", children: `Hi, I'm AbhiDev. I help people make the world better through quality software.` }),
      /* @__PURE__ */ jsx(H3, { variant: "secondary", as: "p", className: "mt-12", children: `
            I'm also a big extreme sports enthusiast. When I'm not hanging out
            with my family or at the computer you can find me cruising around on
            my onewheel or hitting the slopes on my snowboard when it's cold.
          ` }),
      /* @__PURE__ */ jsx(
        ArrowLink,
        {
          to: "/about",
          direction: "right",
          className: "mt-20",
          prefetch: "intent",
          children: "Learn more about me"
        }
      )
    ] })
  ] });
}
function Tab({ children }) {
  return /* @__PURE__ */ jsxs(Tab$1, { className: "group hover:text-primary data-selected:text-primary inline-flex w-full items-center border-none p-0 text-left text-gray-600 opacity-60 transition hover:opacity-90 focus:bg-transparent data-selected:opacity-100 dark:text-slate-500", children: [
    /* @__PURE__ */ jsx("span", { children }),
    /* @__PURE__ */ jsx("span", { className: "ml-6 hidden -translate-x-5 items-center self-center leading-none opacity-0 transition group-data-selected:translate-x-0 group-data-selected:opacity-100 lg:inline-flex", children: /* @__PURE__ */ jsx(ArrowIcon, { size: 76, direction: "right", className: "block" }) })
  ] });
}
function ContentPanel({
  children,
  active,
  imageBuilder
}) {
  return /* @__PURE__ */ jsx(TabPanel, { className: "col-start-1 row-start-1 block", children: /* @__PURE__ */ jsx(AnimatePresence, { children: active ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.img,
      {
        initial: { x: -40, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 40, opacity: 0 },
        transition: { damping: 0, duration: 0.25 },
        ...getImgProps(imageBuilder, {
          className: "mb-6 h-44 lg:mb-14",
          widths: [180, 360, 540],
          sizes: ["11rem"]
        })
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25 },
        children
      }
    )
  ] }) : null }) });
}
function ProblemSolutionSection({
  blogPostCount,
  totalBlogReaders,
  totalBlogReads,
  currentBlogLeaderTeam
}) {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  return /* @__PURE__ */ jsxs(Tabs, { as: Grid, featured: true, onChange: (index2) => setActiveTabIndex(index2), children: [
    /* @__PURE__ */ jsx("div", { className: "col-span-full lg:col-span-5", children: /* @__PURE__ */ jsx(H2, { className: "mb-4 lg:mb-0", children: "Having a hard time keeping up with JavaScript?" }) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-full lg:col-span-5 lg:col-start-7", children: /* @__PURE__ */ jsx(H2, { variant: "secondary", as: "p", children: `
            Well, you're in the right place. My website is your one stop shop
            for everything you need to build JavaScript apps.
          ` }) }),
    /* @__PURE__ */ jsx("hr", { className: "col-span-full mt-16 mb-10 border-gray-200 lg:mt-24 lg:mb-20 dark:border-gray-600" }),
    /* @__PURE__ */ jsx("div", { className: "order-1 col-span-full col-start-1 lg:order-3 lg:col-span-5 lg:mt-52 lg:pt-2", children: /* @__PURE__ */ jsxs(TabList, { className: "text-primary inline-flex flex-row space-x-8 bg-transparent text-xl leading-snug lg:flex-col lg:space-x-0 lg:text-7xl", children: [
      /* @__PURE__ */ jsx(Tab, { children: "blog" }),
      /* @__PURE__ */ jsx(Tab, { children: "portfolio" }),
      /* @__PURE__ */ jsx(Tab, { children: "podcasts" })
    ] }) }),
    /* @__PURE__ */ jsxs(TabPanels, { className: "order-4 col-span-full mt-16 grid lg:col-span-5 lg:col-start-7 lg:mt-0", children: [
      /* @__PURE__ */ jsxs(ContentPanel, { active: activeTabIndex === 0, imageBuilder: images.skis, children: [
        /* @__PURE__ */ jsx(H3, { children: "Educational blog" }),
        /* @__PURE__ */ jsxs(Paragraph, { className: "mt-8", children: [
          `My `,
          /* @__PURE__ */ jsx("strong", { children: blogPostCount }),
          ` blog posts (and counting) have been `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/teams#read-rankings", children: "read" }),
          ` ${totalBlogReads} times by ${totalBlogReaders} people. There you'll find blogs about `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/blog?q=javascript", children: "JavaScript" }),
          `, `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/blog?q=typescript", children: "TypeScript" }),
          `, `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/blog?q=react", children: "React" }),
          `, `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/blog?q=testing", children: "Testing" }),
          `, `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/blog?q=career", children: "your career" }),
          `, `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/blog", children: "and more" }),
          "."
        ] }),
        currentBlogLeaderTeam ? /* @__PURE__ */ jsxs(
          Paragraph,
          {
            prose: false,
            textColorClassName: teamTextColorClasses[currentBlogLeaderTeam],
            children: [
              `The `,
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/teams",
                  className: `${teamTextColorClasses[currentBlogLeaderTeam]} underlined`,
                  children: /* @__PURE__ */ jsx("strong", { children: currentBlogLeaderTeam.toLowerCase() })
                }
              ),
              ` team is winning.`
            ]
          }
        ) : null,
        /* @__PURE__ */ jsx(ArrowLink, { to: "/blog", className: "mt-14", children: "Start reading the blog" })
      ] }),
      /* @__PURE__ */ jsxs(
        ContentPanel,
        {
          active: activeTabIndex === 1,
          imageBuilder: images.onewheel,
          children: [
            /* @__PURE__ */ jsx(H3, { children: "Portfolio" }),
            /* @__PURE__ */ jsxs(Paragraph, { className: "mt-8", children: [
              `
              I've been teaching people just like you how to build better
              software for over ${differenceInYears(
                Date.now(),
                new Date(2014, 0, 0)
              )}
              years. Tens of thousands of people have increased their confidence
              in shipping software with
            `,
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://abhidev.com",
                  className: "!text-yellow-500",
                  children: "TestingJavaScript.com"
                }
              ),
              `
              and even more have improved the performance and maintainability
              of their React applications from what they've learned from
            `,
              /* @__PURE__ */ jsx("a", { href: "https://abhidev.com", className: "!text-blue-500", children: "EpicReact.dev" }),
              `. My latest efforts are pushing things to the whole stack with `,
              /* @__PURE__ */ jsx("a", { href: "https://www.epicstack.dev", className: "!text-red-500", children: "EpicWeb.dev" }),
              "."
            ] }),
            /* @__PURE__ */ jsx(ArrowLink, { to: "/courses", className: "mt-14", children: "Explore the portfolio" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(ContentPanel, { active: activeTabIndex === 2, imageBuilder: images.kayak, children: [
        /* @__PURE__ */ jsx(H3, { children: "Podcast" }),
        /* @__PURE__ */ jsxs(Paragraph, { className: "mt-8", children: [
          `
              I really enjoy chatting with people about AI engineering and full stack systems and
              life as a software developer. So I have several podcasts for you
              to enjoy like
            `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/chats", children: "Engineering with AbhiDev" }),
          `, `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/calls", children: "call AbhiDev" }),
          `, and `,
          /* @__PURE__ */ jsx("a", { href: "https://abhidev.com/podcast", children: "the EpicReact.dev podcast" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs(Paragraph, { children: [
          `
              I've also had the pleasure to be a guest on many other podcasts
              where I've been able to share my thoughts on webdev. You can find
              those on my
            `,
          /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: "/appearances", children: "appearances" }),
          ` page.`
        ] }),
        /* @__PURE__ */ jsx(ArrowLink, { to: "/chats", className: "mt-14", children: "Start listening to my engineering talks" })
      ] })
    ] })
  ] });
}
async function loader({
  request
}) {
  const timings = {};
  const [user, posts, totalBlogReads, blogRankings, totalBlogReaders, blogRecommendations] = await Promise.all([getUser(request), getBlogMdxListItems({
    request,
    timings
  }), getTotalPostReads({
    request,
    timings
  }), getBlogReadRankings({
    request,
    timings
  }), getReaderCount({
    request,
    timings
  }), getBlogRecommendations({
    request,
    timings
  })]);
  return data({
    blogRecommendations,
    blogPostCount: formatNumber(posts.length),
    totalBlogReaders: totalBlogReaders < 1e4 ? "hundreds of thousands of" : formatNumber(totalBlogReaders),
    totalBlogReads: totalBlogReads < 1e5 ? "hundreds of thousands of" : formatNumber(totalBlogReads),
    currentBlogLeaderTeam: getRankingLeader(blogRankings)?.team,
    abhiBuddyTeam: getOptionalTeam(user?.team ?? teams[Math.floor(Math.random() * teams.length)]),
    randomImageNo: Math.random()
  }, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const index = UNSAFE_withComponentProps(function IndexRoute({
  loaderData: data2
}) {
  const abhiBuddyFlying = getRandomFlyingAbhiBuddy(data2.abhiBuddyTeam, data2.randomImageNo);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Helping people make the world a better place through quality software.",
      imageBuilder: abhiBuddyFlying,
      imageSize: "giant",
      arrowUrl: "#intro",
      arrowLabel: "Learn more about AbhiDev",
      action: /* @__PURE__ */ jsxs("div", {
        className: "mr-auto flex flex-col gap-4",
        children: [/* @__PURE__ */ jsx(ButtonLink, {
          to: "/blog",
          variant: "primary",
          prefetch: "intent",
          children: "Read the blog"
        }), /* @__PURE__ */ jsx(ButtonLink, {
          to: "/courses",
          variant: "secondary",
          prefetch: "intent",
          children: "View portfolio"
        })]
      })
    }), /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsx(IntroductionSection, {}), /* @__PURE__ */ jsx(Spacer, {
        size: "lg"
      }), /* @__PURE__ */ jsx(ProblemSolutionSection, {
        blogPostCount: data2.blogPostCount,
        totalBlogReads: data2.totalBlogReads,
        currentBlogLeaderTeam: data2.currentBlogLeaderTeam,
        totalBlogReaders: data2.totalBlogReaders
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "base"
      }), /* @__PURE__ */ jsx(BlogSection, {
        articles: data2.blogRecommendations,
        title: "Blog recommendations",
        description: "Prepared especially for you."
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "lg"
      }), /* @__PURE__ */ jsx(CourseSection, {}), /* @__PURE__ */ jsx(Spacer, {
        size: "lg"
      }), /* @__PURE__ */ jsx(DiscordSection, {}), /* @__PURE__ */ jsx(Spacer, {
        size: "lg"
      }), /* @__PURE__ */ jsx(AboutSection, {})]
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useCapturedRouteError();
  console.error(error);
  return /* @__PURE__ */ jsx(ServerError, {});
});
export {
  ErrorBoundary,
  index as default,
  headers,
  loader
};
