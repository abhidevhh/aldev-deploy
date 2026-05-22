import { UNSAFE_withComponentProps } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { H as HeroSection, g as getHeroImageProps } from "./hero-section-BNEKo3U8.js";
import { a as H2 } from "./typography-DBSbiCOF.js";
import { h as images, a as abhiBuddyImages } from "./images-Dyd95Mrb.js";
import { s as optionalTeams } from "./misc-CQO4K9rH.js";
import { y as useTeam } from "./root-XTBE-Fp5.js";
import "clsx";
import "framer-motion";
import "./arrow-button-DsHCk3Gf.js";
import "./icons-DQAXl5Y1.js";
import "./grid-Bsvu4qfo.js";
import "cloudinary-build-url";
import "emoji-regex";
import "date-fns";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "@reach/dialog";
import "./button-C3vj8DF4.js";
import "error-stack-parser";
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
import "node:path";
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
const meta = () => [{
  title: "AbhiBuddy the Koala"
}, {
  name: "description",
  content: "Meet AbhiBuddy the Koala, the friendly mascot of the KCD Community! Learn about his story and download your favorite AbhiBuddy image."
}];
function AbhiBuddyChooser() {
  const [userTeam] = useTeam();
  const [team, setTeam] = React.useState(userTeam ?? "UNKNOWN");
  const [style, setStyle] = React.useState("normal");
  const normalImageOptions = [{
    label: "Profile",
    value: "profile"
  }, {
    label: "Snowboarding",
    value: "snowboarding"
  }, {
    label: "Skiing",
    value: "skiing"
  }, {
    label: "Onewheeling",
    value: "onewheeling"
  }, {
    label: "Playing Soccer",
    value: "playingSoccer"
  }, {
    label: "Back Flipping",
    value: "backFlipping"
  }];
  const flyingImageOptions = [{
    label: "Snowboarding",
    value: "flyingSnowboarding"
  }, {
    label: "Skiing",
    value: "flyingSkiing"
  }, {
    label: "Onewheeling",
    value: "flyingOnewheeling"
  }, {
    label: "Playing Soccer",
    value: "flyingPlayingSoccer"
  }, {
    label: "Back Flipping",
    value: "flyingBackFlipping"
  }];
  const imageOptions = style === "normal" ? normalImageOptions : flyingImageOptions;
  const [type, setType] = React.useState(imageOptions[0].value);
  const imageObj = abhiBuddyImages[type]?.[team ?? "UNKNOWN"];
  return /* @__PURE__ */ jsxs("div", {
    className: "mx-auto my-8 flex flex-col gap-4 text-center",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-wrap items-center justify-center gap-4",
      children: [/* @__PURE__ */ jsxs("label", {
        children: ["Team Color:", " ", /* @__PURE__ */ jsx("select", {
          value: team,
          onChange: (e) => setTeam(e.target.value),
          children: optionalTeams.map((t) => /* @__PURE__ */ jsx("option", {
            value: t,
            children: t.charAt(0) + t.slice(1).toLowerCase()
          }, t))
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: ["Style:", " ", /* @__PURE__ */ jsxs("select", {
          value: style,
          onChange: (e) => {
            const newStyle = e.target.value;
            setStyle(newStyle);
            if (newStyle === "flying" && type === "profile") {
              setType(flyingImageOptions[0].value);
            } else if (newStyle === "normal") {
              const withoutFlying = type.replace("flying", "");
              const newType = withoutFlying.charAt(0).toLowerCase() + withoutFlying.slice(1);
              setType(newType);
            } else if (newStyle === "flying") {
              setType(`flying${type.charAt(0).toUpperCase()}${type.slice(1)}`);
            }
          },
          children: [/* @__PURE__ */ jsx("option", {
            value: "normal",
            children: "Normal"
          }), /* @__PURE__ */ jsx("option", {
            value: "flying",
            children: "Flying"
          })]
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: ["AbhiBuddy Image:", " ", /* @__PURE__ */ jsx("select", {
          value: type,
          onChange: (e) => setType(e.target.value),
          children: imageOptions.map((t) => /* @__PURE__ */ jsx("option", {
            value: t.value,
            children: t.label
          }, t.value))
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col items-center",
      children: [/* @__PURE__ */ jsx("img", {
        src: imageObj({
          resize: {
            width: 800,
            height: 800,
            type: "pad"
          }
        }),
        alt: imageObj.alt,
        className: "h-96 w-96 rounded-lg object-contain"
      }, `${team}-${type}-${style}`), /* @__PURE__ */ jsx("div", {
        style: {
          marginTop: 12
        },
        children: /* @__PURE__ */ jsx("a", {
          href: imageObj(),
          download: `abhiBuddy-${team.toLowerCase()}-${type}.png`,
          className: "text-blue-600 underline",
          children: "Download this image"
        })
      })]
    })]
  });
}
const abhiBuddy = UNSAFE_withComponentProps(function AbhiBuddyPage() {
  const [userTeam] = useTeam();
  const profileImage = userTeam === "BLUE" ? images.abhiBuddyProfileBlue : userTeam === "RED" ? images.abhiBuddyProfileRed : userTeam === "YELLOW" ? images.abhiBuddyProfileYellow : images.abhiBuddyProfileGray;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Meet AbhiBuddy the Koala 🐨",
      subtitle: "The friendly mascot of the KCD Community.",
      image: /* @__PURE__ */ jsx("img", {
        ...getHeroImageProps(profileImage),
        alt: "AbhiBuddy the Koala",
        className: "rounded-lg"
      }),
      imageSize: "medium",
      arrowUrl: "#chooser",
      arrowLabel: "Choose your AbhiBuddy image"
    }), /* @__PURE__ */ jsxs("main", {
      className: "mx-auto flex flex-col items-center",
      children: [/* @__PURE__ */ jsxs("section", {
        className: "prose dark:prose-dark",
        children: [/* @__PURE__ */ jsx(H2, {
          children: "Who is AbhiBuddy?"
        }), /* @__PURE__ */ jsxs("p", {
          className: "mb-8 text-lg",
          children: ["AbhiBuddy the Koala is the beloved mascot of the KCD Community. If you've participated in Kent's workshops or courses, you've probably seen AbhiBuddy pop up as an emoji (🐨) whenever you're supposed to ", /* @__PURE__ */ jsx("em", {
            children: "do"
          }), " ", "something. AbhiBuddy helps make learning more fun and engaging!"]
        }), /* @__PURE__ */ jsx(H2, {
          children: "Where did AbhiBuddy come from?"
        }), /* @__PURE__ */ jsx("p", {
          className: "mb-4",
          children: "When Kent was creating self-paced workshops, he wanted a way to clearly show the difference between explanations and actionable steps. The solution? A friendly mascot! AbhiBuddy the Koala became the symbol for action, encouragement, and community spirit. (Fun fact: AbhiBuddy replaced Terry the Tiger 🐯 as the original mascot!)"
        }), /* @__PURE__ */ jsxs("ul", {
          className: "mb-4 list-inside list-disc",
          children: [/* @__PURE__ */ jsx("li", {
            children: "Friendly encouragement"
          }), /* @__PURE__ */ jsx("li", {
            children: "Community and teamwork"
          }), /* @__PURE__ */ jsx("li", {
            children: "Taking action and having fun while learning"
          })]
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "prose dark:prose-dark",
        id: "chooser",
        children: [/* @__PURE__ */ jsx(H2, {
          children: "Choose Your Favorite AbhiBuddy"
        }), /* @__PURE__ */ jsx("p", {
          className: "mb-4",
          children: "AbhiBuddy comes in many styles and team colors! Use the chooser below to pick your favorite AbhiBuddy image, then download it to use as an avatar, sticker, or just for fun."
        }), /* @__PURE__ */ jsx(ErrorBoundary, {
          fallback: /* @__PURE__ */ jsx("p", {
            children: "Error"
          }),
          children: /* @__PURE__ */ jsx(AbhiBuddyChooser, {})
        })]
      }), /* @__PURE__ */ jsx("section", {
        className: "mx-auto max-w-2xl border-t pt-8 text-center",
        children: /* @__PURE__ */ jsxs("p", {
          children: ["Want to see AbhiBuddy in action? Join the", " ", /* @__PURE__ */ jsx("a", {
            href: "/discord",
            className: "text-blue-600 underline",
            children: "KCD Community"
          }), " ", "and pick your team color to participate in fun activities, earn points, and connect with others!"]
        })
      })]
    })]
  });
});
export {
  abhiBuddy as default,
  meta
};
