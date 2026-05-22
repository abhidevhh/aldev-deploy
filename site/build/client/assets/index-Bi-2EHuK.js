import { UNSAFE_withComponentProps } from "react-router";
import { jsx } from "react/jsx-runtime";
import { B as ButtonLink } from "./button-B-8RrXF2.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { d as getDiscordAuthorizeURL } from "./misc-DM3BUXHg.js";
import { c as useRootData } from "./root-BtDGpB2R.js";
import "clsx";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "date-fns";
import "@tanstack/react-hotkeys";
import "framer-motion";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "@reach/dialog";
import "./icons-Xl-Om4A1.js";
import "./typography-DDpAXXrz.js";
import "./arrow-button-DBVn13Kl.js";
import "error-stack-parser";
import "./grid-Bsvu4qfo.js";
import "./cloudinary-video-DeT-8neH.js";
import "lru-cache";
import "mdx-bundler/client/index.js";
import "./theme-D6IyWRbl.js";
import "@conform-to/zod/v4";
import "cookie";
import "zod";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./form-elements-D3OfaKUp.js";
import "downshift";
import "./promotification-omJeRY6i.js";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./env.server-DPCBxZtL.js";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "./session.server-BVOCbXUc.js";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./seo-B3cPpSFw.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-BSZTMYmt.js";
import "./hero-section-CoHGsAuJ.js";
const index = UNSAFE_withComponentProps(function DiscordIndex() {
  const {
    requestInfo,
    user
  } = useRootData();
  const authorizeURL = user ? getDiscordAuthorizeURL(requestInfo.origin) : externalLinks.discord;
  return /* @__PURE__ */ jsx(ButtonLink, {
    variant: "primary",
    href: authorizeURL,
    className: "mr-auto",
    children: "Join Discord"
  });
});
export {
  index as default
};
//# sourceMappingURL=index-Bi-2EHuK.js.map
