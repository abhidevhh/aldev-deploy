import { UNSAFE_withComponentProps, useLocation, Link, Outlet, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { B as BackLink } from "./arrow-button-DBVn13Kl.js";
import { B as ButtonLink } from "./button-B-8RrXF2.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { c as H2, P as Paragraph } from "./typography-DDpAXXrz.js";
import { r as reuseUsefulLoaderHeaders } from "./misc-DM3BUXHg.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import { getUser } from "./session.server-BVOCbXUc.js";
import { c as useRootData } from "./root-BtDGpB2R.js";
import "clsx";
import "react";
import "./icons-Xl-Om4A1.js";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "date-fns";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-BOCNblj8.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "@reach/dialog";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "lru-cache";
import "mdx-bundler/client/index.js";
import "./theme-D6IyWRbl.js";
import "@conform-to/zod/v4";
import "cookie";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./form-elements-D3OfaKUp.js";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-omJeRY6i.js";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:sqlite";
import "@epic-web/cachified";
import "./seo-B3cPpSFw.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-BSZTMYmt.js";
import "./hero-section-CoHGsAuJ.js";
async function loader({
  request
}) {
  const user = await getUser(request);
  const calls = user ? await prisma.call.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      title: true
    }
  }) : [];
  return data({
    calls
  }, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      Vary: "Cookie"
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
function MaybeOutlet({
  open
}) {
  return /* @__PURE__ */ jsx(AnimatePresence, {
    children: open ? /* @__PURE__ */ jsx(motion.div, {
      variants: {
        collapsed: {
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          opacity: 0
        },
        expanded: {
          height: "auto",
          marginTop: "1rem",
          marginBottom: "3rem",
          opacity: 1
        }
      },
      initial: "collapsed",
      animate: "expanded",
      exit: "collapsed",
      transition: {
        duration: 0.15
      },
      className: "relative col-span-full",
      children: /* @__PURE__ */ jsx(Outlet, {})
    }) : null
  });
}
function Record({
  active,
  title,
  slug
}) {
  return /* @__PURE__ */ jsxs(Grid, {
    nested: true,
    className: "border-b border-gray-200 dark:border-gray-600",
    children: [/* @__PURE__ */ jsxs(Link, {
      to: active ? "./" : slug,
      className: "text-primary group relative col-span-full flex flex-col py-5 text-xl font-medium focus:outline-none",
      children: [/* @__PURE__ */ jsx("div", {
        className: "bg-secondary absolute -inset-px -mx-6 hidden rounded-lg group-hover:block group-focus:block"
      }), /* @__PURE__ */ jsx("span", {
        className: "relative",
        children: title
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full",
      children: /* @__PURE__ */ jsx(MaybeOutlet, {
        open: active
      })
    })]
  });
}
const _layout = UNSAFE_withComponentProps(function RecordScreen({
  loaderData: data2
}) {
  const {
    pathname
  } = useLocation();
  const {
    user
  } = useRootData();
  const [activeSlug] = pathname.split("/").slice(-1);
  const calls = data2.calls;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Grid, {
      className: "mt-24 mb-10 lg:mb-24",
      children: /* @__PURE__ */ jsx(BackLink, {
        to: "/calls",
        className: "col-span-full lg:col-span-8 lg:col-start-3",
        children: `Back to overview`
      })
    }), /* @__PURE__ */ jsx(Grid, {
      as: "header",
      className: "mb-12",
      children: /* @__PURE__ */ jsx(H2, {
        className: "col-span-full lg:col-span-8 lg:col-start-3",
        children: `Record your call, and I'll answer.`
      })
    }), user ? null : /* @__PURE__ */ jsx(Grid, {
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full lg:col-span-8 lg:col-start-3",
        children: [/* @__PURE__ */ jsx(Paragraph, {
          className: "mb-4",
          children: `Please login to have your questions answered.`
        }), /* @__PURE__ */ jsx(ButtonLink, {
          to: "/login",
          children: "Login (or sign up)"
        })]
      })
    }), user ? /* @__PURE__ */ jsxs(Grid, {
      as: "main",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-8 lg:col-start-3",
        children: /* @__PURE__ */ jsx(Record, {
          slug: "./new",
          active: activeSlug === "new",
          title: "Make a new recording"
        })
      }), calls.length > 0 ? /* @__PURE__ */ jsx("ul", {
        className: "col-span-full lg:col-span-8 lg:col-start-3",
        children: calls.map((call) => /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Record, {
            slug: `./${call.id}`,
            active: activeSlug === call.id,
            title: call.title
          })
        }, call.id))
      }) : null]
    }) : null]
  });
});
export {
  _layout as default,
  headers,
  loader
};
//# sourceMappingURL=_layout-CI2srAr0.js.map
