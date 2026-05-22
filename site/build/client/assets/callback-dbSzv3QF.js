import { UNSAFE_withComponentProps, Await, Link, useAsyncError, redirect, data } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import React__default, { Suspense } from "react";
import { a as ArrowLink } from "./arrow-button-DsHCk3Gf.js";
import { E as ErrorPanel } from "./form-elements-DKDR40lU.js";
import { P as PartyIcon, R as RefreshIcon } from "./icons-DQAXl5Y1.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { c as connectDiscord, t as tagKCDSiteSubscriber, d as deleteDiscordCache } from "./user-info.server-D6axXZ8Q.js";
import "litefs-js";
import { ensurePrimary } from "litefs-js/remix";
import { g as getDiscordAuthorizeURL, i as getErrorMessage, h as getDomainUrl, q as isResponse } from "./misc-CQO4K9rH.js";
import { requireUser } from "./session.server-DZ6f3pgH.js";
import { x as useRootData } from "./root-XTBE-Fp5.js";
import "clsx";
import "framer-motion";
import "./typography-DBSbiCOF.js";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./timing.server-Ckj1L-xw.js";
import "./prisma.server-Cj9LRFmw.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "date-fns";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "@reach/dialog";
import "./button-C3vj8DF4.js";
import "error-stack-parser";
import "./grid-Bsvu4qfo.js";
import "./cloudinary-video-DeT-8neH.js";
import "mdx-bundler/client/index.js";
import "./theme-Ct2STwdZ.js";
import "@conform-to/zod/v4";
import "cookie";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "downshift";
import "./promotification-YMEmucWd.js";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./seo-nV2HC6Me.js";
import "./theme.server-D5mszc13.js";
import "./header-section-B2Ylwupf.js";
import "./hero-section-BNEKo3U8.js";
const handle = {
  getSitemapEntries: () => null
};
async function loader({
  request
}) {
  await ensurePrimary();
  const user = await requireUser(request);
  const domainUrl = getDomainUrl(request);
  const code = new URL(request.url).searchParams.get("code");
  const url = new URL(domainUrl);
  url.pathname = "/me";
  try {
    if (!code) {
      throw redirect("/discord", {
        headers: {
          "x-reason": "no-code"
        }
      });
    }
    const discordMemberPromise = connectDiscord({
      user,
      code,
      domainUrl
    }).then((discordMember) => {
      void tagKCDSiteSubscriber({
        email: user.email,
        firstName: user.firstName,
        fields: {
          kcd_site_id: user.id,
          kcd_team: user.team,
          discord_user_id: discordMember.user.id
        }
      });
      void deleteDiscordCache(discordMember.user.id);
      return discordMember;
    });
    return data({
      discordMember: discordMemberPromise
    });
  } catch (error) {
    if (isResponse(error)) throw error;
    console.error(error);
    return data({
      discordMember: Promise.reject(error)
    });
  }
}
const callback = UNSAFE_withComponentProps(function DiscordCallback({
  loaderData: data2
}) {
  React__default.useEffect(() => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.delete("code");
    window.history.replaceState(null, "", [window.location.pathname, newSearchParams.toString()].filter(Boolean).join("?"));
  });
  return /* @__PURE__ */ jsx(Suspense, {
    fallback: /* @__PURE__ */ jsxs("div", {
      className: "flex flex-wrap gap-2",
      children: [/* @__PURE__ */ jsx("span", {
        className: "animate-reverse-spin",
        children: /* @__PURE__ */ jsx(RefreshIcon, {})
      }), /* @__PURE__ */ jsx("p", {
        className: "animate-pulse",
        children: "Connecting your account to discord..."
      })]
    }),
    children: /* @__PURE__ */ jsx(Await, {
      resolve: data2.discordMember,
      errorElement: /* @__PURE__ */ jsx(DiscordConnectionError, {}),
      children: (discordMember) => /* @__PURE__ */ jsxs("div", {
        className: "flex flex-wrap gap-1",
        children: [/* @__PURE__ */ jsx("span", {
          className: "text-team-current",
          children: /* @__PURE__ */ jsx(PartyIcon, {})
        }), /* @__PURE__ */ jsx("span", {
          className: "text-team-current",
          children: discordMember.user.username
        }), ` has been connected to `, /* @__PURE__ */ jsxs("span", {
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/me",
            className: "text-team-current underline",
            children: "your account"
          }), "!"]
        }), /* @__PURE__ */ jsx("div", {
          className: "my-6",
          children: /* @__PURE__ */ jsx(ArrowLink, {
            href: "https://kcd.im/discord",
            children: "Start chatting..."
          })
        })]
      })
    })
  });
});
function DiscordConnectionError() {
  const error = useAsyncError();
  const {
    requestInfo,
    user
  } = useRootData();
  const authorizeURL = user ? getDiscordAuthorizeURL(requestInfo.origin) : externalLinks.discord;
  return /* @__PURE__ */ jsxs(ErrorPanel, {
    children: [/* @__PURE__ */ jsx("div", {
      children: "Whoops! Sorry, there was an error 😬"
    }), /* @__PURE__ */ jsx("hr", {
      className: "my-2"
    }), /* @__PURE__ */ jsx("pre", {
      className: "whitespace-pre-wrap",
      children: getErrorMessage(error)
    }), /* @__PURE__ */ jsx("hr", {
      className: "my-2"
    }), /* @__PURE__ */ jsx("a", {
      href: authorizeURL,
      className: "underline",
      children: "Try again?"
    })]
  });
}
export {
  callback as default,
  handle,
  loader
};
