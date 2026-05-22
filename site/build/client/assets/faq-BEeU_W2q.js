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
    title: `FAQ - Frequently Asked Questions`,
    description: `Find answers to commonly asked questions`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.snowboard(),
      words: `FAQ`
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
const faq = UNSAFE_withComponentProps(function FAQScreen() {
  const faqs = [{
    question: "Question One",
    answer: "Add your answer here. This is a great place to address common customer questions and concerns."
  }, {
    question: "Question Two",
    answer: "Add your answer here. This is a great place to address common customer questions and concerns."
  }, {
    question: "Question Three",
    answer: "Add your answer here. This is a great place to address common customer questions and concerns."
  }];
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to your questions",
      imageBuilder: images.snowboard,
      arrowUrl: "#faq",
      arrowLabel: "View FAQs"
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsxs(Grid, {
        className: "mb-24",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "col-span-full",
          children: [/* @__PURE__ */ jsx(H2, {
            id: "faq",
            className: "mb-8",
            children: "Common Questions"
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-12 max-w-2xl",
            children: "Here are answers to some of our most frequently asked questions. If you don't find what you're looking for, feel free to contact us."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full max-w-2xl",
          children: /* @__PURE__ */ jsx("div", {
            className: "space-y-6",
            children: faqs.map((faq2, index) => /* @__PURE__ */ jsxs("div", {
              className: "rounded-lg border border-gray-200 p-6 dark:border-gray-800",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold mb-3",
                children: faq2.question
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400",
                children: faq2.answer
              })]
            }, index))
          })
        })]
      })
    })]
  });
});
export {
  faq as default,
  loader,
  meta
};
