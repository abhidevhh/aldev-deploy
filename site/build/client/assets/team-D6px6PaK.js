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
    title: `Our Team`,
    description: `Meet the talented team behind the scenes`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.snowboard(),
      words: `Our Team`
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
const team = UNSAFE_withComponentProps(function TeamScreen() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Meet Our Team",
      subtitle: "Talented professionals dedicated to excellence",
      imageBuilder: images.snowboard,
      arrowUrl: "#team",
      arrowLabel: "Meet the team"
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsxs(Grid, {
        className: "mb-24",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "col-span-full",
          children: [/* @__PURE__ */ jsx(H2, {
            id: "team",
            className: "mb-8",
            children: "Team Members"
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-6 max-w-2xl",
            children: "Our diverse team brings together expertise from various fields. Together, we create innovative solutions and deliver exceptional results."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full md:col-span-4",
          children: /* @__PURE__ */ jsxs("div", {
            className: "rounded-lg border border-gray-200 p-6 dark:border-gray-800",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold mb-2",
              children: "Team Member One"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 dark:text-gray-400 mb-3",
              children: "Role / Position"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Add information about this team member's background, expertise, and contributions."
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full md:col-span-4",
          children: /* @__PURE__ */ jsxs("div", {
            className: "rounded-lg border border-gray-200 p-6 dark:border-gray-800",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold mb-2",
              children: "Team Member Two"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 dark:text-gray-400 mb-3",
              children: "Role / Position"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Add information about this team member's background, expertise, and contributions."
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full md:col-span-4",
          children: /* @__PURE__ */ jsxs("div", {
            className: "rounded-lg border border-gray-200 p-6 dark:border-gray-800",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold mb-2",
              children: "Team Member Three"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 dark:text-gray-400 mb-3",
              children: "Role / Position"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Add information about this team member's background, expertise, and contributions."
            })]
          })
        })]
      })
    })]
  });
});
export {
  team as default,
  loader,
  meta
};
//# sourceMappingURL=team-D6px6PaK.js.map
