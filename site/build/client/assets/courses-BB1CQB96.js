import { UNSAFE_withComponentProps, Link, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { a as ArrowLink } from "./arrow-button-DsHCk3Gf.js";
import { C as CourseCard, S as SmallCourseCard } from "./course-card-g0gZgY38.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeroSection } from "./hero-section-BNEKo3U8.js";
import { T as TestimonialSection } from "./testimonial-section-DemH5LXi.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { e as H6, P as Paragraph, a as H2 } from "./typography-DBSbiCOF.js";
import { h as images, d as getImgProps, g as getGenericSocialImage } from "./images-Dyd95Mrb.js";
import { w as reuseUsefulLoaderHeaders, e as getDisplayUrl, p as getUrl } from "./misc-CQO4K9rH.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import { g as getTestimonials } from "./testimonials.server-DAGtgv6g.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import "clsx";
import "framer-motion";
import "react";
import "./icons-DQAXl5Y1.js";
import "./theme-Ct2STwdZ.js";
import "@conform-to/zod/v4";
import "cookie";
import "zod";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./testimonial-card-DnXWXfPy.js";
import "cloudinary-build-url";
import "emoji-regex";
import "date-fns";
import "@sindresorhus/slugify";
import "yaml";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "litefs-js";
import "litefs-js/remix";
import "./session.server-DZ6f3pgH.js";
import "./prisma.server-Cj9LRFmw.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:url";
import "@prisma/client/runtime/client";
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
async function loader({
  request
}) {
  const timings = {};
  const testimonials = await getTestimonials({
    timings,
    request,
    categories: ["courses", "teaching"]
  });
  return data({
    testimonials
  }, {
    headers: {
      "Cache-Control": "public, max-age=3600",
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
    title: "Portfolio by AbhiDev",
    description: "Explore the work and offerings from AbhiDev",
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.onewheel.id,
      words: `Level up your skills with self-paced work from AbhiDev`
    })
  });
};
function CoursesHome({
  loaderData: data2
}) {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Explore the AbhiDev portfolio.",
      subtitle: "Discover select work and offerings from AbhiDev.",
      imageBuilder: images.onewheel
    }), /* @__PURE__ */ jsxs(Grid, {
      as: "main",
      className: "mb-48",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full mb-12 hidden lg:col-span-4 lg:mb-0 lg:block",
        children: /* @__PURE__ */ jsx(H6, {
          as: "h2",
          children: `Reasons to invest in yourself`
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-8 lg:col-span-4 lg:mb-20",
        children: [/* @__PURE__ */ jsx(H6, {
          as: "h3",
          className: "mb-4",
          children: `Become a more confident developer`
        }), /* @__PURE__ */ jsxs(Paragraph, {
          className: "mb-20",
          children: [`
              All of us are familiar with the feeling of stumbling around
              between YouTube videos, blog posts, and documentation just
              copy/pasting code and hoping it'll work. It's frustrating and
              unproductive. With this portfolio, you'll have the confidence you
              need to skip all that stumbling and start shipping. Coding is
            `, /* @__PURE__ */ jsx("strong", {
            children: "more fun"
          }), ` this way, trust me 🥳`]
        }), /* @__PURE__ */ jsx(H6, {
          as: "h3",
          className: "mb-4",
          children: `Earn more money as a developer`
        }), /* @__PURE__ */ jsx(Paragraph, {
          children: `
              The more skilled you are, the more you can get done and the more
              value you can provide to your employer and clients. If you don't
              think that comes with a bump in pay, ask the thousands of other
              devs who have experienced exactly this as a result of what they
              learned from this portfolio. Get that money 🤑
            `
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-2 col-start-11 hidden items-start justify-end lg:flex",
        children: /* @__PURE__ */ jsx(ArrowLink, {
          to: "#courses",
          direction: "down"
        })
      })]
    }), /* @__PURE__ */ jsx("h2", {
      className: "sr-only",
      id: "courses",
      children: "Work/Client Links"
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "@container/grid !grid-cols-12 gap-6 md:gap-6 xl:gap-8",
      children: [/* @__PURE__ */ jsx("div", {
        className: "@container col-span-full @2xl:col-span-6",
        children: /* @__PURE__ */ jsx(CourseCard, {
          title: "Epic AI",
          description: "Learn to architect next-generation, AI-powered applications that are adaptive, context-aware, and deeply personalized using the Model Context Protocol (MCP).",
          label: "AI development course",
          lightImageBuilder: images.courseEpicAILight,
          darkImageBuilder: images.courseEpicAIDark,
          courseUrl: "https://www.epicai.pro",
          horizontal: true
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "@container col-span-full @2xl:col-span-6",
        children: /* @__PURE__ */ jsx(CourseCard, {
          title: "Epic Web",
          description: "The best way to learn how to build Epic, full stack web applications you'll love to work on and your users will love to use.",
          label: "Full stack course",
          lightImageBuilder: images.courseEpicWebLight,
          darkImageBuilder: images.courseEpicWebDark,
          courseUrl: "https://www.epicweb.dev",
          horizontal: true
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "@container col-span-full @2xl:col-span-6",
        children: /* @__PURE__ */ jsx(CourseCard, {
          title: "Epic React",
          description: "The most comprehensive guide for pros.",
          label: "React course",
          lightImageBuilder: images.courseEpicReact,
          darkImageBuilder: images.courseEpicReactDark,
          courseUrl: "https://abhidev.com"
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "@container col-span-full lg:mt-0 @2xl:col-span-6",
        children: /* @__PURE__ */ jsx(CourseCard, {
          title: "Testing JavaScript",
          description: "Learn smart, efficient testing methods.",
          label: "Testing course",
          lightImageBuilder: images.courseTestingJS,
          darkImageBuilder: images.courseTestingJSDark,
          courseUrl: "https://abhidev.com"
        })
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "Advanced Remix",
        description: "Remix is a terrific tool for building simple websites and even better for building complex web applications. Remix solves many problems in modern web development. You don't even think about server cache management or global CSS namespace clashes. It's not that Remix has APIs to avoid these problems; they simply don't exist when you're using Remix!",
        imageBuilder: images.courseFEMAdvancedRemix,
        courseUrl: "https://frontendmasters.com/courses/advanced-remix/"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "Remix Fundamentals",
        description: "Remix is a fullstack web framework that enables you to deliver a fast, slick, and resilient user experience. With Remix, you can build both static websites and dynamic web apps (requiring user data) while embracing the web platform's standard APIs along the way! Ready to build web apps faster?",
        imageBuilder: images.courseFEMRemixFundamentals,
        courseUrl: "https://frontendmasters.com/courses/remix/"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "Up and Running with Remix",
        description: "Jump in feet first and learn the most productive way to build a web application with the web framework that offers the best UX and DX the web has to offer.",
        imageBuilder: images.courseUpAndRunningWithRemix,
        courseUrl: "https://egghead.io/courses/up-and-running-with-remix-b82b6bb6?af=5236ad"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "The Beginner's Guide to React",
        description: "This course is for React newbies and anyone looking to build a solid foundation. It's designed to teach you everything you need to start building web applications in React right away.",
        imageBuilder: images.courseTheBeginnersGuideToReact,
        courseUrl: "https://egghead.io/courses/the-beginner-s-guide-to-react?af=5236ad"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "Use Suspense to Simplify Your Async UI",
        description: "In this course, I teach how Suspense works under the hood, preparing you for the future of asynchronous state management in React.",
        imageBuilder: images.courseUseSuspenseToSimplifyYourAsyncUI,
        courseUrl: "https://egghead.io/courses/use-suspense-to-simplify-your-async-ui?af=5236ad"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "Simplify React Apps with React Hooks",
        description: "In this course, I will take a modern React codebase that uses classes and refactor the entire thing to use function components as much as possible. We'll look at state, side effects, async code, caching, and more!",
        imageBuilder: images.courseSimplifyReactAppsWithReactHooks,
        courseUrl: "https://egghead.io/courses/simplify-react-apps-with-react-hooks?af=5236ad"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "Advanced React Component Patterns",
        description: "Once you've nailed the fundamentals of React, that's when things get really fun. This course teaches you advanced patterns in React that you can use to make components that are simple, flexible, and enjoyable to work with.",
        imageBuilder: images.courseAdvancedReactComponentPatterns,
        courseUrl: "https://egghead.io/courses/advanced-react-component-patterns?af=5236ad"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "JavaScript Testing Practices and Principles",
        description: "Learn the principles and best practices for writing maintainable test applications to catch errors before your product reaches the end user!",
        imageBuilder: images.courseTestingPrinciples,
        courseUrl: "https://frontendmasters.com/courses/testing-practices-principles/"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "Testing React Applications",
        description: "Fix errors before your app reaches the end user by writing maintainable unit test & integration tests for your React applications!",
        imageBuilder: images.courseTestingReact,
        courseUrl: "https://frontendmasters.com/courses/testing-react/"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "Code Transformation & Linting with ASTs",
        description: "Learn to use Abstract Syntax Trees (ASTs) to make stylistic code changes, reveal logical problems, and prevent bugs from entering your codebase.",
        imageBuilder: images.courseAsts,
        courseUrl: "https://frontendmasters.com/courses/linting-asts/"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "How to Write an Open Source JavaScript Library",
        description: "From Github and npm, to releasing beta versions, semantic versioning, code coverage, continuous integration, and providing your library with a solid set of unit tests, there are a ton of things to learn. This series will guide you through a set of steps to publish a JavaScript open source library.",
        imageBuilder: images.courseHowToWriteAnOpenSourceJavaScriptLibrary,
        courseUrl: "https://egghead.io/courses/how-to-write-an-open-source-javascript-library?af=5236ad"
      }), /* @__PURE__ */ jsx(SmallCourseCard, {
        title: "How to Contribute to an Open Source Project on GitHub",
        imageBuilder: images.courseHowToContributeToAnOpenSourceProjectOnGitHub,
        courseUrl: "https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github?af=5236ad",
        description: "“Feel free to submit a PR!” - words often found in GitHub issues, but met with confusion and fear by many. Getting started with contributing open source is not always straightforward and can be tricky. With this series, you'll be equipped with the the tools, knowledge, and understanding you need to be productive and contribute to the wonderful world of open source projects."
      })]
    }), data2.testimonials.length ? /* @__PURE__ */ jsx(Spacer, {
      size: "base"
    }) : null, /* @__PURE__ */ jsx(TestimonialSection, {
      testimonials: data2.testimonials
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "base"
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-5",
        children: /* @__PURE__ */ jsx("div", {
          className: "col-span-full mb-12 px-10 lg:col-span-5 lg:col-start-1 lg:mb-0",
          children: /* @__PURE__ */ jsx("img", {
            loading: "lazy",
            ...getImgProps(images.helmet, {
              className: "object-contain",
              widths: [420, 512, 840, 1260, 1024, 1680, 2520],
              sizes: ["(max-width: 1023px) 80vw", "(min-width: 1024px) and (max-width: 1620px) 40vw", "630px"]
            })
          })
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full mt-4 lg:col-span-6 lg:col-start-7 lg:mt-0",
        children: [/* @__PURE__ */ jsx(H2, {
          as: "p",
          className: "mb-8",
          children: `Do you want to work through one of these portfolio items with peers?`
        }), /* @__PURE__ */ jsxs(H2, {
          variant: "secondary",
          as: "p",
          className: "mb-16",
          children: [`Check out our discord where we have `, /* @__PURE__ */ jsx(Link, {
            className: "underline",
            to: "/clubs",
            children: "learning clubs"
          }), `.`]
        }), /* @__PURE__ */ jsx(ArrowLink, {
          to: "/discord",
          children: `Learn more about the discord`
        })]
      })]
    })]
  });
}
const courses = UNSAFE_withComponentProps(CoursesHome);
export {
  courses as default,
  headers,
  loader,
  meta
};
