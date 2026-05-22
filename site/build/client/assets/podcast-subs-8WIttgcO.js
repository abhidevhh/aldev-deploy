import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppleIcon, P as PocketCastsIcon, S as SpotifyIcon, R as RssIcon } from "./icons-Xl-Om4A1.js";
function PodcastAppLink({
  icon,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      ...props,
      className: "focus-ring text-primary bg-secondary mr-4 mb-4 flex flex-none items-center space-x-4 rounded-full px-8 py-4",
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: icon }),
        /* @__PURE__ */ jsx("span", { children })
      ]
    }
  );
}
function PodcastSubs({
  apple,
  pocketCasts,
  spotify,
  rss
}) {
  return /* @__PURE__ */ jsxs("div", { className: "col-span-full -mr-4 -mb-4 flex flex-wrap items-start justify-start lg:col-span-10", children: [
    /* @__PURE__ */ jsx(PodcastAppLink, { icon: /* @__PURE__ */ jsx(AppleIcon, {}), href: apple, children: "Apple podcasts" }),
    /* @__PURE__ */ jsx(PodcastAppLink, { icon: /* @__PURE__ */ jsx(PocketCastsIcon, {}), href: pocketCasts, children: "Pocket Casts" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-no-wrap flex", children: [
      /* @__PURE__ */ jsx(PodcastAppLink, { icon: /* @__PURE__ */ jsx(SpotifyIcon, {}), href: spotify, children: "Spotify" }),
      /* @__PURE__ */ jsx(PodcastAppLink, { icon: /* @__PURE__ */ jsx(RssIcon, {}), href: rss, children: "RSS" })
    ] })
  ] });
}
export {
  PodcastSubs as P
};
//# sourceMappingURL=podcast-subs-8WIttgcO.js.map
