import { UNSAFE_withComponentProps, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeroSection } from "./hero-section-CoHGsAuJ.js";
import { c as H2, P as Paragraph } from "./typography-DDpAXXrz.js";
import { i as images, b as getGenericSocialImage } from "./images-D8NqauwH.js";
import { b as getDisplayUrl, g as getUrl } from "./misc-DM3BUXHg.js";
import { g as getSocialMetas } from "./seo-B3cPpSFw.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import "clsx";
import "framer-motion";
import "./arrow-button-DBVn13Kl.js";
import "react";
import "./icons-Xl-Om4A1.js";
import "cloudinary-build-url";
import "emoji-regex";
import "date-fns";
const meta = ({
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  return getSocialMetas({
    title: `Services`,
    description: `Explore our comprehensive range of services`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.snowboard(),
      words: `Services`
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
const services = UNSAFE_withComponentProps(function ServicesScreen() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Our Services",
      subtitle: "Professional solutions tailored to your needs",
      imageBuilder: images.snowboard,
      arrowUrl: "#services",
      arrowLabel: "See our services"
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsxs(Grid, {
        className: "mb-24",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "col-span-full",
          children: [/* @__PURE__ */ jsx(H2, {
            id: "services",
            className: "mb-8",
            children: "What We Offer"
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-6 max-w-2xl",
            children: "Our team provides expert services to help you achieve your goals. Whether you need consulting, development, or support, we have the expertise to help."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full md:col-span-6",
          children: /* @__PURE__ */ jsxs("div", {
            className: "rounded-lg border border-gray-200 p-6 dark:border-gray-800",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold mb-3",
              children: "Service One"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Add your service description here. This is a great place to explain what your first service includes and how it benefits your clients."
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full md:col-span-6",
          children: /* @__PURE__ */ jsxs("div", {
            className: "rounded-lg border border-gray-200 p-6 dark:border-gray-800",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold mb-3",
              children: "Service Two"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Add your service description here. This is a great place to explain what your second service includes and how it benefits your clients."
            })]
          })
        })]
      })
    })]
  });
});
export {
  services as default,
  loader,
  meta
};
//# sourceMappingURL=services-Bu5FFraJ.js.map
