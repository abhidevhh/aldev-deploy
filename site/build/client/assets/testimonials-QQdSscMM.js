import { UNSAFE_withComponentProps, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { a as ArrowLink } from "./arrow-button-DsHCk3Gf.js";
import { a as ButtonLink } from "./button-C3vj8DF4.js";
import { c as H4, P as Paragraph, a as H2 } from "./typography-DBSbiCOF.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeroSection, g as getHeroImageProps } from "./hero-section-BNEKo3U8.js";
import { T as TestimonialCard } from "./testimonial-card-DnXWXfPy.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { h as images, d as getImgProps, g as getGenericSocialImage } from "./images-Dyd95Mrb.js";
import { w as reuseUsefulLoaderHeaders, e as getDisplayUrl, p as getUrl } from "./misc-CQO4K9rH.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import { g as getTestimonials } from "./testimonials.server-DAGtgv6g.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import "clsx";
import "framer-motion";
import "react";
import "./icons-DQAXl5Y1.js";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
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
  data: data2,
  matches
}) => {
  const testimonials2 = data2?.testimonials;
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  const testimonialCount = testimonials2 ? `${testimonials2.length} ` : "";
  const title = `${testimonialCount}testimonials about AbhiDev`;
  return getSocialMetas({
    title,
    description: `Check out ${testimonialCount}testimonials about AbhiDev and how the things he's done has helped people in their goals.`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.abhiHoldingOutCody.id,
      words: title
    })
  });
};
const headers = reuseUsefulLoaderHeaders;
async function loader({
  request
}) {
  const timings = {};
  return data({
    testimonials: await getTestimonials({
      request,
      timings
    })
  }, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      "Server-Timings": getServerTimeHeader(timings)
    }
  });
}
const testimonials = UNSAFE_withComponentProps(function Testimonials({
  loaderData: data2
}) {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Curious to read what people are saying?",
      subtitle: "Checkout KCD testimonials below.",
      image: /* @__PURE__ */ jsx("img", {
        ...getHeroImageProps(images.abhiHoldingOutCody, {
          className: "rounded-lg",
          transformations: {
            resize: {
              aspectRatio: "3:4",
              type: "crop"
            },
            gravity: "face"
          }
        })
      }),
      arrowUrl: "#list",
      arrowLabel: "Start reading...",
      action: /* @__PURE__ */ jsx(ButtonLink, {
        variant: "primary",
        to: "https://kcd.im/testimonial",
        className: "mr-auto",
        children: "Submit your own"
      })
    }), data2.testimonials.length === 0 ? /* @__PURE__ */ jsx("div", {
      className: "mx-10vw mb-14",
      children: /* @__PURE__ */ jsxs("div", {
        className: "rounded-lg border border-gray-200 p-8 dark:border-gray-600",
        children: [/* @__PURE__ */ jsx(H4, {
          as: "h2",
          className: "mb-3",
          children: "No testimonials are available right now."
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
      })
    }) : /* @__PURE__ */ jsx("div", {
      className: "mx-10vw mb-14 grid grid-cols-4 gap-6 lg:grid-cols-8 xl:grid-cols-12",
      id: "list",
      children: data2.testimonials.map((testimonial) => /* @__PURE__ */ jsx(TestimonialCard, {
        testimonial
      }, testimonial.testimonial))
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "base"
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-1 md:col-span-2 lg:col-span-3",
        children: /* @__PURE__ */ jsx("img", {
          ...getImgProps(images.microphone, {
            widths: [350, 512, 1024, 1536],
            sizes: ["20vw", "(min-width: 1024px) 30vw", "(min-width:1620px) 530px"]
          })
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-7 col-start-3 md:col-span-6 md:col-start-4 lg:col-span-8 lg:col-start-5",
        children: [/* @__PURE__ */ jsx(H2, {
          className: "mb-8",
          children: `More of a listener?`
        }), /* @__PURE__ */ jsx(H2, {
          className: "mb-16",
          variant: "secondary",
          as: "p",
          children: `
              Check out my call AbhiDev podcast and join in the conversation with your own call.
            `
        }), /* @__PURE__ */ jsx(ArrowLink, {
          to: "/calls",
          children: `Check out the podcast`
        })]
      })]
    })]
  });
});
export {
  testimonials as default,
  headers,
  loader,
  meta
};
