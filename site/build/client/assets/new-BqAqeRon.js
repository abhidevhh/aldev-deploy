import { UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, Link } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { a as Button, L as LinkButton } from "./button-B-8RrXF2.js";
import { R as RecordingForm, C as CallRecorder } from "./recording-form-D8PrslRs.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { G as Grimmacing } from "./root-BtDGpB2R.js";
import { P as Paragraph, b as H4 } from "./typography-DDpAXXrz.js";
import { A as AbhiCallTextToSpeech, f as formatAbhiCallTextToSpeechNotes } from "./text-to-speech-CxNHafOB.js";
import "clsx";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./misc-DM3BUXHg.js";
import "date-fns";
import "@xstate/react";
import "gsap";
import "xstate";
import "./icons-Xl-Om4A1.js";
import "./tag-Bs3TtQGk.js";
import "react-error-boundary";
import "./abhi-call-HST9AF8V.js";
import "./character-countdown-D-g85829.js";
import "./form-elements-D3OfaKUp.js";
import "@tanstack/react-hotkeys";
import "framer-motion";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "@reach/dialog";
import "./arrow-button-DBVn13Kl.js";
import "error-stack-parser";
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
import "./external-links-BEDnFUME.js";
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
import "./cloudflare-ai-utils.server-D2ZFqcMo.js";
const handle = {
  getSitemapEntries: () => null
};
const _new = UNSAFE_withComponentProps(function RecordScreen({
  matches
}) {
  const routeTopRef = React.useRef(null);
  const [audio, setAudio] = React.useState(null);
  const [prefill, setPrefill] = React.useState(void 0);
  const [mode, setMode] = React.useState("record");
  const rootMatch = matches.find((m) => m?.id === "root");
  const rootData = rootMatch?.data;
  const {
    user,
    userInfo
  } = rootData ?? {};
  if (!user || !userInfo) throw new Error("user and userInfo required");
  function scrollToRouteTop() {
    requestAnimationFrame(() => {
      routeTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
  return /* @__PURE__ */ jsx("div", {
    ref: routeTopRef,
    children: audio ? /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-6",
      children: [/* @__PURE__ */ jsx("div", {
        className: "flex flex-wrap gap-3",
        children: /* @__PURE__ */ jsx(Button, {
          type: "button",
          variant: "secondary",
          size: "medium",
          onClick: () => {
            setAudio(null);
            setPrefill(void 0);
            setMode("record");
          },
          children: "Start over"
        })
      }), /* @__PURE__ */ jsx(RecordingForm, {
        audio,
        intent: "create-call",
        data: prefill
      })]
    }) : /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-8",
      children: [userInfo.avatar.hasGravatar ? null : /* @__PURE__ */ jsxs(Paragraph, {
        children: [`
                I noticed that your avatar is generic. If you want your episode art
                to be a photo of you, set your avatar on `, /* @__PURE__ */ jsx("a", {
          href: "https://gravatar.com",
          target: "_blank",
          rel: "noreferrer noopener",
          children: "Gravatar"
        }), "."]
      }), mode === "record" ? /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx(Paragraph, {
          className: "mb-4",
          children: `
                Choose which recording device you would like to use.
                Then click "Start Recording," introduce yourself
                ("Hi, Kent, my name is ${user.firstName}") and say whatever you'd like.
                Try to keep it 2 minutes or less. Thanks!
              `
        }), /* @__PURE__ */ jsx(CallRecorder, {
          onRecordingComplete: (recording) => setAudio(recording),
          team: user.team
        }), /* @__PURE__ */ jsxs(Paragraph, {
          className: "mt-6 text-sm text-gray-500 dark:text-slate-400",
          children: [`Prefer not to record? `, /* @__PURE__ */ jsx(LinkButton, {
            type: "button",
            underlined: true,
            onClick: () => setMode("text"),
            children: "Type your question instead"
          }), "."]
        })]
      }) : /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsxs(Paragraph, {
          className: "mb-6 text-sm text-gray-500 dark:text-slate-400",
          children: [`Prefer to record your own voice? `, /* @__PURE__ */ jsx(LinkButton, {
            type: "button",
            underlined: true,
            onClick: () => setMode("record"),
            children: "Record instead"
          }), "."]
        }), /* @__PURE__ */ jsx(AbhiCallTextToSpeech, {
          onAcceptAudio: ({
            audio: audio2,
            questionText
          }) => {
            setAudio(audio2);
            const formattedNotes = formatAbhiCallTextToSpeechNotes(questionText);
            setPrefill({
              fields: {
                title: "call AbhiDev question",
                notes: formattedNotes
              },
              errors: {}
            });
            scrollToRouteTop();
          }
        })]
      })]
    })
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  console.error(error);
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsxs(Grid, {
      nested: true,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-6",
        children: [/* @__PURE__ */ jsx(H4, {
          as: "p",
          children: `Yikes... Something went wrong. Sorry about that.`
        }), /* @__PURE__ */ jsxs(H4, {
          as: "p",
          variant: "secondary",
          className: "mt-3",
          children: [`Want to `, /* @__PURE__ */ jsx(Link, {
            to: ".",
            children: "try again?"
          })]
        })]
      }), /* @__PURE__ */ jsx(Grimmacing, {
        className: "col-span-5 col-start-7 rounded-lg",
        aspectRatio: "3:4"
      })]
    })
  });
});
export {
  ErrorBoundary,
  _new as default,
  handle
};
//# sourceMappingURL=new-BqAqeRon.js.map
