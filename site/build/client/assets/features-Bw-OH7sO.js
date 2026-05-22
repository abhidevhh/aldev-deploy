import { UNSAFE_withComponentProps, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeroSection } from "./hero-section-BNEKo3U8.js";
import { a as H2, P as Paragraph } from "./typography-DBSbiCOF.js";
import { h as images, g as getGenericSocialImage } from "./images-Dyd95Mrb.js";
import { e as getDisplayUrl, p as getUrl } from "./misc-CQO4K9rH.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import "clsx";
import "framer-motion";
import "./arrow-button-DsHCk3Gf.js";
import "react";
import "./icons-DQAXl5Y1.js";
import "cloudinary-build-url";
import "emoji-regex";
import "date-fns";
const meta = ({
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  return getSocialMetas({
    title: `Features`,
    description: `Explore the features and capabilities of our platform`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.snowboard(),
      words: `Features`
    })
  });
};
async function loader({
  request
}) {
  const timings = {};
  return data({}, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const features = UNSAFE_withComponentProps(function FeaturesScreen() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Powerful Features",
      subtitle: "Discover what makes us stand out",
      imageBuilder: images.snowboard,
      arrowUrl: "#features",
      arrowLabel: "Learn more"
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsxs(Grid, {
        className: "mb-24",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "col-span-full",
          children: [/* @__PURE__ */ jsx(H2, {
            id: "features",
            className: "mb-8",
            children: "Key Features"
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-6 max-w-2xl",
            children: "We provide cutting-edge tools and features designed to help you succeed. From advanced analytics to seamless integration, everything you need is here."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full md:col-span-4",
          children: /* @__PURE__ */ jsxs("div", {
            className: "rounded-lg border border-gray-200 p-6 dark:border-gray-800",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold mb-3",
              children: "Feature One"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Description of your first feature goes here. Edit this text to customize it for your needs."
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full md:col-span-4",
          children: /* @__PURE__ */ jsxs("div", {
            className: "rounded-lg border border-gray-200 p-6 dark:border-gray-800",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold mb-3",
              children: "Feature Two"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Description of your second feature goes here. Edit this text to customize it for your needs."
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full md:col-span-4",
          children: /* @__PURE__ */ jsxs("div", {
            className: "rounded-lg border border-gray-200 p-6 dark:border-gray-800",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold mb-3",
              children: "Feature Three"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Description of your third feature goes here. Edit this text to customize it for your needs."
            })]
          })
        })]
      })
    })]
  });
});
export {
  features as default,
  loader,
  meta
};
