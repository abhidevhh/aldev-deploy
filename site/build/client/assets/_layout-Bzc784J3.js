import { UNSAFE_withComponentProps, useParams, Link, Outlet, data } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { a as H2, e as H6, P as Paragraph } from "./typography-DBSbiCOF.js";
import { a as getAvatarForUser } from "./misc-react-BeZfIuw-.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { requireAdminUser } from "./session.server-DZ6f3pgH.js";
import { x as useRootData } from "./root-XTBE-Fp5.js";
import { b as formatDate } from "./misc-CQO4K9rH.js";
import "react";
import "@sentry/react-router";
import "md5-hash";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "emoji-regex";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-Bsg0upig.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "@tanstack/react-hotkeys";
import "framer-motion";
import "spin-delay";
import "@reach/dialog";
import "./icons-DQAXl5Y1.js";
import "./arrow-button-DsHCk3Gf.js";
import "./button-C3vj8DF4.js";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "lru-cache";
import "mdx-bundler/client/index.js";
import "./theme-Ct2STwdZ.js";
import "@conform-to/zod/v4";
import "cookie";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./form-elements-DKDR40lU.js";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-YMEmucWd.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:sqlite";
import "@epic-web/cachified";
import "./seo-nV2HC6Me.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-D6axXZ8Q.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-B2Ylwupf.js";
import "./hero-section-BNEKo3U8.js";
import "date-fns";
const handle = {
  getSitemapEntries: () => null
};
async function loader({
  request
}) {
  await requireAdminUser(request);
  const calls = await prisma.call.findMany({
    select: {
      id: true,
      title: true,
      notes: true,
      updatedAt: true,
      isAnonymous: true,
      user: {
        select: {
          firstName: true,
          team: true,
          email: true
        }
      },
      episodeDraft: {
        select: {
          status: true,
          step: true
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  });
  return data({
    calls
  });
}
const _layout = UNSAFE_withComponentProps(function CallListScreen({
  loaderData: data2
}) {
  const {
    requestInfo
  } = useRootData();
  const params = useParams();
  const selectedCallId = params.callId;
  return /* @__PURE__ */ jsx("main", {
    className: "mt-12 mb-24 lg:mt-24 lg:mb-48",
    children: /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-8 lg:mb-12",
        children: [/* @__PURE__ */ jsx(H2, {
          children: "Calls Admin"
        }), /* @__PURE__ */ jsxs(H2, {
          variant: "secondary",
          as: "p",
          children: [data2.calls.length, " pending", " ", data2.calls.length === 1 ? "call" : "calls"]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full lg:col-span-3",
        children: [/* @__PURE__ */ jsx(H6, {
          as: "h3",
          className: "mb-4",
          children: "Pending Calls"
        }), data2.calls.length ? /* @__PURE__ */ jsx("nav", {
          "aria-label": "Call list",
          children: /* @__PURE__ */ jsx("ul", {
            className: "flex flex-col gap-4",
            children: data2.calls.map((call) => {
              const avatar = getAvatarForUser(call.user, {
                origin: requestInfo.origin
              });
              const isSelected = selectedCallId === call.id;
              const draftStatus = call.episodeDraft?.status ?? null;
              return /* @__PURE__ */ jsx("li", {
                className: `set-color-team-current-${call.user.team.toLowerCase()}`,
                children: /* @__PURE__ */ jsx(Link, {
                  to: call.id,
                  className: clsx("group relative block rounded-lg p-4 transition focus:outline-none", isSelected ? "ring-team-current bg-gray-100 ring-2 dark:bg-gray-800" : "hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800"),
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "flex items-start gap-4",
                    children: [/* @__PURE__ */ jsx("img", {
                      alt: avatar.alt,
                      src: avatar.src,
                      className: "ring-team-current h-12 w-12 flex-none rounded-full object-cover ring-2"
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "min-w-0 flex-1",
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "text-primary truncate font-medium",
                        children: call.title
                      }), /* @__PURE__ */ jsxs("p", {
                        className: "mt-1 truncate text-sm text-gray-500 dark:text-slate-500",
                        children: [call.user.firstName, " • ", call.user.email, call.isAnonymous ? " • anonymous" : null, draftStatus ? ` • ${draftStatus.toLowerCase()}` : null]
                      }), /* @__PURE__ */ jsx("p", {
                        className: "mt-2 line-clamp-2 text-sm text-gray-500 dark:text-slate-400",
                        children: call.notes ?? ""
                      }), /* @__PURE__ */ jsx("p", {
                        className: "mt-2 text-xs text-gray-400 dark:text-slate-600",
                        children: formatDate(call.updatedAt)
                      })]
                    })]
                  })
                })
              }, call.id);
            })
          })
        }) : /* @__PURE__ */ jsx("div", {
          className: "rounded-lg bg-gray-100 p-8 text-center dark:bg-gray-800",
          children: /* @__PURE__ */ jsx(Paragraph, {
            className: "text-gray-500 dark:text-slate-500",
            children: "No pending calls 🎉"
          })
        })]
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "xs",
        className: "col-span-full block lg:hidden"
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-8 lg:col-start-5",
        children: /* @__PURE__ */ jsx(Outlet, {})
      })]
    })
  });
});
export {
  _layout as default,
  handle,
  loader
};
