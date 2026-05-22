import { UNSAFE_withComponentProps, Link, data } from "react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { Q as RssIcon } from "./icons-DQAXl5Y1.js";
import { H as HeroSection } from "./hero-section-BNEKo3U8.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { b as H3 } from "./typography-DBSbiCOF.js";
import { h as images } from "./images-Dyd95Mrb.js";
import { b as markdownToHtmlUnwrapped } from "./markdown.server-rwSwVnMd.js";
import { g as getBlogMdxListItems } from "./mdx.server-CWSqTQTg.js";
import "clsx";
import "framer-motion";
import "./arrow-button-DsHCk3Gf.js";
import "react";
import "cloudinary-build-url";
import "emoji-regex";
import "./misc-CQO4K9rH.js";
import "date-fns";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
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
import "@epic-web/cachified";
import "metascraper";
import "metascraper-description";
import "metascraper-image";
import "metascraper-title";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "zod";
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
import "./timing.server-Ckj1L-xw.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./github.server-u_4PqFTT.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
async function loader({
  request
}) {
  const posts = await getBlogMdxListItems({
    request
  }).then((allPosts) => Promise.all(allPosts.filter((p) => !p.frontmatter.draft).map(async (p) => ({
    title: p.frontmatter.title ?? "Untitled",
    descriptionHTML: await markdownToHtmlUnwrapped(p.frontmatter.description ?? "No description"),
    slug: p.slug
  }))));
  return data({
    posts
  }, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      Vary: "Cookie"
    }
  });
}
const list = UNSAFE_withComponentProps(function BlogList({
  loaderData: data2
}) {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Blog post list",
      subtitle: /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("span", {
          children: `For folks wanting something a bit more scrollable.`
        }), /* @__PURE__ */ jsx(Link, {
          reloadDocument: true,
          to: "/blog/rss.xml",
          className: "text-secondary underlined hover:text-team-current focus:text-team-current ml-2 inline-block",
          children: /* @__PURE__ */ jsx(RssIcon, {
            title: "Get my blog as RSS"
          })
        })]
      }),
      arrowUrl: "#posts",
      arrowLabel: `${data2.posts.length} Total Posts`,
      imageBuilder: images.skis
    }), /* @__PURE__ */ jsx(Grid, {
      as: "main",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full",
        id: "posts",
        children: [/* @__PURE__ */ jsx(H3, {
          children: "Posts"
        }), /* @__PURE__ */ jsx(Spacer, {
          size: "2xs"
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("ul", {
            className: "list-inside list-disc",
            children: data2.posts.map((post) => /* @__PURE__ */ jsxs("li", {
              className: "leading-loose",
              children: [/* @__PURE__ */ jsx(Link, {
                to: `/blog/${post.slug}`,
                className: "text-xl",
                children: post.title
              }), " ", /* @__PURE__ */ jsx("span", {
                className: "text-secondary",
                dangerouslySetInnerHTML: {
                  __html: post.descriptionHTML
                }
              })]
            }, post.slug))
          }), /* @__PURE__ */ jsx(Spacer, {
            size: "3xs"
          })]
        })]
      })
    })]
  });
});
export {
  list as default,
  loader
};
