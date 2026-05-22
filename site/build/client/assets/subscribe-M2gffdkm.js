import { UNSAFE_withComponentProps, Link, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { a as ButtonLink } from "./button-C3vj8DF4.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { M as MailIcon } from "./icons-DQAXl5Y1.js";
import { x as useRootData, K as KitForm, B as BlogSection } from "./root-XTBE-Fp5.js";
import { H as HeroSection } from "./hero-section-BNEKo3U8.js";
import { a as H2, e as H6, P as Paragraph, b as H3 } from "./typography-DBSbiCOF.js";
import { h as images, d as getImgProps, g as getGenericSocialImage } from "./images-Dyd95Mrb.js";
import { c as getBlogRecommendations } from "./blog.server-dX-XfgiU.js";
import { e as getDisplayUrl, p as getUrl } from "./misc-CQO4K9rH.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import "clsx";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "@tanstack/react-hotkeys";
import "framer-motion";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "@reach/dialog";
import "./arrow-button-DsHCk3Gf.js";
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
import "./mdx.server-CWSqTQTg.js";
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
const meta = ({
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  return getSocialMetas({
    title: `Subscribe to the KCD Mailing List`,
    description: `Get weekly insights, ideas, and proven coding practices from the KCD Mailing List`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.snowboard(),
      words: `Subscribe to the KCD Mailing List`
    })
  });
};
async function loader({
  request
}) {
  const timings = {};
  const blogRecommendations = await getBlogRecommendations({
    request,
    timings
  });
  return data({
    blogRecommendations
  }, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const subscribe = UNSAFE_withComponentProps(function SubscribeScreen({
  loaderData: data2
}) {
  const {
    userInfo
  } = useRootData();
  const subscribedToNewsletter = userInfo?.kit?.tags.some(({
    name
  }) => name === "Subscribed: general newsletter");
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Increase your knowledge",
      subtitle: "With valuable insights emailed to you each week",
      imageBuilder: images.snowboard,
      arrowUrl: "#why",
      arrowLabel: "Why should I?",
      action: /* @__PURE__ */ jsxs(ButtonLink, {
        variant: "primary",
        href: "#subscribe-form",
        children: [/* @__PURE__ */ jsx(MailIcon, {}), " Subscribe"]
      })
    }), /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsxs(Grid, {
        className: "mb-24 lg:mb-64",
        children: [/* @__PURE__ */ jsx("div", {
          className: "col-span-full lg:col-span-6 lg:col-start-1",
          children: /* @__PURE__ */ jsx("div", {
            className: "mb-12 aspect-[4/3] lg:mb-0",
            children: /* @__PURE__ */ jsx("img", {
              ...getImgProps(images.abhiCodingWithSkates, {
                className: "rounded-lg object-cover",
                widths: [410, 650, 820, 1230, 1640, 2460],
                sizes: ["(max-width: 1023px) 80vw", "(min-width:1024px) and (max-width:1620px) 40vw", "630px"],
                transformations: {
                  resize: {
                    type: "fill",
                    aspectRatio: "3:4"
                  }
                }
              })
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "col-span-full lg:col-span-5 lg:col-start-8 lg:row-start-1",
          children: [/* @__PURE__ */ jsx(H2, {
            id: "why",
            className: "mb-10",
            children: `Here's what you get out of subscribing.`
          }), /* @__PURE__ */ jsxs(ButtonLink, {
            className: "mb-32",
            variant: "primary",
            href: "#subscribe-form",
            children: [/* @__PURE__ */ jsx(MailIcon, {}), " Subscribe"]
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `Stay sharp`
          }), /* @__PURE__ */ jsxs(Paragraph, {
            className: "mb-12",
            children: [`
                Keeping yourself up-to-date is critical in this ever-changing
                fast-paced industry. One of the things that has helped me to
                keep myself sharp the most is to
              `, /* @__PURE__ */ jsx("strong", {
              children: "systemize regular exposure to ideas."
            }), `
                When you give me your email, you're signing up to receive
                this kind of exposure every week. You'll read about the problems
                and solutions that I've experienced so you know what to reach
                for when you face similar problems in the future.
              `]
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `Stay updated`
          }), /* @__PURE__ */ jsxs(Paragraph, {
            className: "mb-12",
            children: [`
                When you sign up for the newsletter, you'll also receive
                valuable notifications for when I create new opportunities to
                improve yourself. When I launch a new season of
              `, /* @__PURE__ */ jsx(Link, {
              to: "/chats",
              children: "Engineering with AbhiDev"
            }), `,
                give a discount on my courses, or have any number of other
                exciting announcements, you'll be the first to know.
              `]
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `Reply`
          }), /* @__PURE__ */ jsxs(Paragraph, {
            className: "mb-12",
            children: [`
                Yes, I do get the emails you send me in return and I do try to
                read and reply to them all. In fact, the ideas and questions you
                have while reading the content you get delivered to your inbox
                may be well suited for
              `, /* @__PURE__ */ jsx(Link, {
              to: "/calls",
              children: "The call AbhiDev Podcast"
            }), ` or `, /* @__PURE__ */ jsx(Link, {
              to: "/office-hours",
              children: "Office Hours"
            }), ` so be sure to take advantage of those opportunities as well.`]
          })]
        }), subscribedToNewsletter ? /* @__PURE__ */ jsxs("div", {
          className: "col-span-full",
          id: "subscribe-form",
          children: [/* @__PURE__ */ jsx(H3, {
            children: `Hey, you're already subscribed`
          }), /* @__PURE__ */ jsx(Paragraph, {
            children: `Good job! There's nothing for you to do here`
          })]
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "col-span-full lg:col-span-5",
            children: [/* @__PURE__ */ jsx(H3, {
              children: `Sign up here`
            }), /* @__PURE__ */ jsx(Paragraph, {
              children: `And get your first email this week!`
            })]
          }), /* @__PURE__ */ jsx("div", {
            id: "subscribe-form",
            className: "col-span-full mt-8 lg:col-span-7",
            children: /* @__PURE__ */ jsx(KitForm, {
              formId: "newsletter",
              kitFormId: "827139"
            })
          })]
        })]
      }), /* @__PURE__ */ jsx(BlogSection, {
        articles: data2.blogRecommendations,
        title: "Want a taste of what to expect?",
        description: "Checkout these articles."
      })]
    })]
  });
});
export {
  subscribe as default,
  loader,
  meta
};
