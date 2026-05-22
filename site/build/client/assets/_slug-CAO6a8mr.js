import { UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import * as React from "react";
import { B as BackLink } from "./arrow-button-DsHCk3Gf.js";
import { v as useMdxComponent, a as BlurrableImage, g as getBannerAltProp, h as getBannerTitleProp, f as FourOhFour, e as FourHundred, m as mdxPageMeta } from "./root-XTBE-Fp5.js";
import { G as GeneralErrorBoundary, g as getNotFoundSuggestions } from "./not-found-suggestions.server-DDVRmmfH.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { a as H2, e as H6 } from "./typography-DBSbiCOF.js";
import { d as getImgProps, c as getImageBuilder } from "./images-Dyd95Mrb.js";
import { c as getBlogRecommendations } from "./blog.server-dX-XfgiU.js";
import { c as getMdxPagesInDirectory, b as getMdxPage } from "./mdx.server-CWSqTQTg.js";
import { w as reuseUsefulLoaderHeaders, v as requireValidSlug } from "./misc-CQO4K9rH.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import "clsx";
import "framer-motion";
import "./icons-DQAXl5Y1.js";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "@reach/dialog";
import "./button-C3vj8DF4.js";
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
import "./spacer-CSktuGpg.js";
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
import "./seo-nV2HC6Me.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-D6axXZ8Q.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-B2Ylwupf.js";
import "./hero-section-BNEKo3U8.js";
import "node:fs/promises";
import "match-sorter";
import "yaml";
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
const getPathedRoutes = async () => {
  const {
    pathedRoutes
  } = await import("./other-routes.server-CenzztW8.js");
  return pathedRoutes;
};
const handle = {
  getSitemapEntries: async (request) => {
    const pages = await getMdxPagesInDirectory("pages", {
      request
    });
    return pages.filter((page) => !page.frontmatter.draft).map((page) => {
      return {
        route: `/${page.slug}`,
        priority: 0.6
      };
    });
  }
};
async function loader({
  params,
  request
}) {
  requireValidSlug(params.slug);
  const pathedRoutes = await getPathedRoutes();
  if (pathedRoutes[new URL(request.url).pathname]) {
    throw new Response("Use other route", {
      status: 404
    });
  }
  const timings = {};
  const pathname = new URL(request.url).pathname;
  const page = await getMdxPage({
    contentDir: "pages",
    slug: params.slug
  }, {
    request,
    timings
  });
  if (!page) {
    const [recommendations, suggestions] = await Promise.all([getBlogRecommendations({
      request,
      timings
    }), getNotFoundSuggestions({
      request,
      pathname,
      limit: 8
    })]);
    const data$1 = {
      recommendations
    };
    if (suggestions) {
      data$1.possibleMatches = suggestions.matches;
      data$1.possibleMatchesQuery = suggestions.query;
    }
    throw data(data$1, {
      status: 404,
      headers: {
        // Don't cache speculative 404 slugs for long.
        "Cache-Control": "private, max-age=60",
        Vary: "Cookie",
        "Server-Timing": getServerTimeHeader(timings)
      }
    });
  }
  return data({
    page
  }, {
    status: 200,
    headers: {
      "Cache-Control": "private, max-age=3600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const meta = mdxPageMeta;
const $slug = UNSAFE_withComponentProps(function MdxScreen({
  loaderData: data2
}) {
  const {
    code,
    frontmatter
  } = data2.page;
  const isDraft = Boolean(frontmatter.draft);
  const isArchived = Boolean(frontmatter.archived);
  const Component = useMdxComponent(code);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Grid, {
      className: "mt-24 mb-10 lg:mb-24",
      children: /* @__PURE__ */ jsx("div", {
        className: "col-span-full flex justify-between lg:col-span-8 lg:col-start-3",
        children: /* @__PURE__ */ jsx(BackLink, {
          to: "/",
          children: "Back to home"
        })
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
        }), frontmatter.description ? /* @__PURE__ */ jsx(H6, {
          as: "p",
          variant: "secondary",
          className: "mt-2",
          children: frontmatter.description
        }) : null]
      }), frontmatter.bannerCloudinaryId ? /* @__PURE__ */ jsx("div", {
        className: "col-span-full mt-10 lg:col-span-10 lg:col-start-2 lg:mt-16",
        children: /* @__PURE__ */ jsx(BlurrableImage, {
          blurDataUrl: frontmatter.bannerBlurDataUrl,
          className: "md:aspect-1 aspect-[3/4] md:aspect-[3/2]",
          img: /* @__PURE__ */ jsx("img", {
            title: getBannerTitleProp(frontmatter),
            ...getImgProps(getImageBuilder(frontmatter.bannerCloudinaryId, getBannerAltProp(frontmatter)), {
              className: "rounded-lg object-cover object-center w-full",
              widths: [280, 560, 840, 1100, 1650, 2500, 2100, 3100],
              sizes: ["(max-width:1023px) 80vw", "(min-width:1024px) and (max-width:1620px) 67vw", "1100px"],
              transformations: {
                background: "rgb:e6e9ee"
              }
            })
          })
        }, frontmatter.bannerCloudinaryId)
      }) : null]
    }), /* @__PURE__ */ jsx(Grid, {
      as: "main",
      className: "prose prose-light dark:prose-dark",
      children: /* @__PURE__ */ jsx(Component, {})
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  return /* @__PURE__ */ jsx(GeneralErrorBoundary, {
    statusHandlers: {
      400: ({
        error
      }) => /* @__PURE__ */ jsx(FourHundred, {
        error: error.data
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
