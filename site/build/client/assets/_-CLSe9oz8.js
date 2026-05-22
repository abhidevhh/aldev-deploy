import { UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, data } from "react-router";
import { jsx } from "react/jsx-runtime";
import { a as ArrowLink } from "./arrow-button-DsHCk3Gf.js";
import { G as GeneralErrorBoundary, g as getNotFoundSuggestions } from "./not-found-suggestions.server-DDVRmmfH.js";
import { f as FourOhFour, d as ErrorPage, F as Facepalm } from "./root-XTBE-Fp5.js";
import "clsx";
import "framer-motion";
import "react";
import "./icons-DQAXl5Y1.js";
import "./typography-DBSbiCOF.js";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./misc-CQO4K9rH.js";
import "date-fns";
import "node:fs/promises";
import "node:path";
import "match-sorter";
import "yaml";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "@reach/dialog";
import "./button-C3vj8DF4.js";
import "error-stack-parser";
import "./grid-Bsvu4qfo.js";
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
import "./timing.server-Ckj1L-xw.js";
import "./seo-nV2HC6Me.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-D6axXZ8Q.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-B2Ylwupf.js";
import "./hero-section-BNEKo3U8.js";
async function loader({
  request
}) {
  const accept = request.headers.get("accept") ?? "";
  const wantsHtml = accept.includes("text/html") || accept.includes("application/xhtml+xml");
  if (!wantsHtml || request.method.toUpperCase() !== "GET") {
    throw new Response("Not found", {
      status: 404
    });
  }
  const pathname = new URL(request.url).pathname;
  const suggestions = await getNotFoundSuggestions({
    request,
    pathname,
    limit: 8
  });
  const data$1 = {};
  if (suggestions) {
    data$1.possibleMatches = suggestions.matches;
    data$1.possibleMatchesQuery = suggestions.query;
  }
  throw data(data$1, {
    status: 404,
    headers: {
      "Cache-Control": "private, max-age=60"
    }
  });
}
const $ = UNSAFE_withComponentProps(function NotFound() {
  return /* @__PURE__ */ jsx(ErrorBoundary, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  return /* @__PURE__ */ jsx(GeneralErrorBoundary, {
    statusHandlers: {
      400: () => /* @__PURE__ */ jsx(ErrorPage, {
        heroProps: {
          title: "400 - Oh no, you did something wrong.",
          subtitle: `If you think I did something wrong, let me know...`,
          image: /* @__PURE__ */ jsx(Facepalm, {
            className: "rounded-lg",
            aspectRatio: "3:4"
          }),
          action: /* @__PURE__ */ jsx(ArrowLink, {
            href: "/",
            children: "Go home"
          })
        }
      }),
      404: ({
        error
      }) => /* @__PURE__ */ jsx(FourOhFour, {
        possibleMatches: error.data.possibleMatches,
        possibleMatchesQuery: error.data.possibleMatchesQuery
      })
    }
  });
});
export {
  ErrorBoundary,
  $ as default,
  loader
};
