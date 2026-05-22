import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Dialog } from "@reach/dialog";
import * as React from "react";
import { J as PlayIcon, K as PlusIcon } from "./icons-DQAXl5Y1.js";
import "react-lite-youtube-embed";
function YouTubeEmbed({
  onCloseClick,
  ytLiteEmbed
}) {
  const embedContainer = React.useRef(null);
  React.useLayoutEffect(() => {
    if (!embedContainer.current) return;
    const ytLite = embedContainer.current.querySelector(".yt-lite");
    if (!(ytLite instanceof HTMLElement)) return;
    ytLite.click();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "px-5vw fixed inset-0 bg-black", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        "aria-label": "close video",
        onClick: onCloseClick,
        className: "absolute top-8 right-4 z-50 rotate-45 transform text-white hover:scale-150 focus:scale-150 focus:outline-none",
        children: /* @__PURE__ */ jsx(PlusIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex h-full w-full flex-col justify-center",
        ref: embedContainer,
        children: ytLiteEmbed
      }
    )
  ] });
}
function FullScreenYouTubeEmbed({
  img,
  autoplay = false,
  ytLiteEmbed
}) {
  const [showPlayer, setShowPlayer] = React.useState(autoplay);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Dialog,
      {
        isOpen: showPlayer,
        onDismiss: () => setShowPlayer(false),
        "aria-label": `Watch ${ytLiteEmbed.props?.title ?? "the video"}`,
        children: /* @__PURE__ */ jsx(
          YouTubeEmbed,
          {
            onCloseClick: () => setShowPlayer(false),
            ytLiteEmbed
          }
        )
      }
    ),
    showPlayer ? null : /* @__PURE__ */ jsxs(
      "button",
      {
        className: "group relative w-full",
        onClick: () => setShowPlayer(true),
        children: [
          img,
          /* @__PURE__ */ jsx("span", { className: "absolute top-0 left-0 h-full w-full", children: /* @__PURE__ */ jsx("span", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "transform opacity-70 transition-all group-hover:opacity-100 group-focus:opacity-100 motion-safe:group-hover:scale-110 motion-safe:group-focus:scale-110 motion-safe:group-active:scale-125", children: /* @__PURE__ */ jsx(PlayIcon, {}) }) }) })
        ]
      }
    )
  ] });
}
const links = () => {
  return [
    { rel: "preconnect", href: "https://www.youtube-nocookie.com" },
    { rel: "preconnect", href: "https://www.google.com" }
  ];
};
export {
  FullScreenYouTubeEmbed as F,
  links as l
};
