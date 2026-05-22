import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { Link } from "react-router";
import { e as abhiBuddyProfiles } from "./images-D8NqauwH.js";
import { q as getOptionalTeam, m as formatNumber } from "./misc-DM3BUXHg.js";
import { g as useOptionalUser, i as useTeam, c as useRootData } from "./root-BtDGpB2R.js";
const barColors = {
  RED: "bg-team-red",
  YELLOW: "bg-team-yellow",
  BLUE: "bg-team-blue"
};
function Stat({
  totalReads,
  team,
  percent,
  ranking,
  direction,
  display,
  onClick
}) {
  const { userInfo } = useRootData();
  const [currentTeam] = useTeam();
  const avatar = userInfo ? userInfo.avatar : abhiBuddyProfiles[getOptionalTeam(team)];
  const isUsersTeam = team === currentTeam;
  const MotionEl = onClick ? motion.button : motion.div;
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? { duration: 0 } : {};
  return /* @__PURE__ */ jsxs(
    MotionEl,
    {
      tabIndex: 0,
      onClick,
      title: display === "ranking" ? `Rank of the ${team.toLowerCase()} team` : `Total reads by the ${team.toLowerCase()} team`,
      initial: "initial",
      whileHover: "hover",
      whileFocus: "hover",
      className: "relative flex origin-right items-center justify-center focus:outline-none",
      transition,
      variants: {
        initial: { width: 22 }
      },
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            transition,
            variants: {
              initial: {
                height: 12 + 24 * percent,
                width: 16,
                y: direction === "up" ? "-100%" : 0
              },
              hover: { height: 48, width: 24 }
            },
            className: clsx(
              "relative flex justify-center",
              {
                "rounded-t-md": direction === "up",
                "rounded-b-md": direction === "down"
              },
              barColors[team]
            ),
            children: /* @__PURE__ */ jsx(
              motion.span,
              {
                transition,
                variants: {
                  initial: { opacity: 0, scale: 1, y: 0, fontSize: 0 },
                  hover: {
                    opacity: 1,
                    scale: 1,
                    y: direction === "up" ? "-100%" : "100%",
                    fontSize: "18px"
                  }
                },
                className: clsx("text-primary absolute text-lg font-medium", {
                  "bottom-0": direction === "down",
                  "top-0": direction === "up"
                }),
                children: formatNumber(display === "ranking" ? ranking : totalReads)
              }
            )
          }
        ),
        isUsersTeam ? /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "border-team-current absolute top-0 left-1/2 rounded-md",
            transition,
            variants: {
              initial: {
                width: 22,
                height: 22,
                x: "-50%",
                y: direction === "up" ? 4 : -26,
                borderWidth: 2,
                borderRadius: 4
              },
              hover: {
                width: 36,
                height: 36,
                x: "-50%",
                y: direction === "up" ? 6 : -42,
                borderWidth: 3,
                borderRadius: 8
              }
            },
            children: /* @__PURE__ */ jsx(
              motion.img,
              {
                transition,
                variants: {
                  initial: { borderWidth: 2, borderRadius: 4 - 2 },
                  hover: { borderWidth: 4, borderRadius: 8 - 3 }
                },
                className: "h-full w-full border-white object-cover dark:border-gray-900",
                src: avatar.src,
                alt: avatar.alt
              }
            )
          }
        ) : null
      ]
    }
  );
}
function TeamStats({
  totalReads,
  rankings,
  direction,
  pull,
  onStatClick
}) {
  const optionalUser = useOptionalUser();
  const [altDown, setAltDown] = React.useState(false);
  const [team] = useTeam();
  React.useEffect(() => {
    const set = (e) => setAltDown(e.altKey);
    document.addEventListener("keydown", set);
    document.addEventListener("keyup", set);
    return () => {
      document.removeEventListener("keyup", set);
      document.removeEventListener("keydown", set);
    };
  }, []);
  const loginLink = optionalUser ? null : /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("text-center", {
        "mb-2": direction === "down",
        "mt-2": direction === "up"
      }),
      children: /* @__PURE__ */ jsx(Link, { to: "/login", className: "underlined", children: "Login" })
    }
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "group relative inline-flex h-8 flex-col justify-end",
        `set-color-team-current-${team.toLowerCase()}`,
        {
          "justify-end": direction === "down",
          "justify-start": direction === "up"
        }
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "absolute flex h-8 items-center gap-2 text-sm opacity-0 transition group-hover:opacity-100 focus-within:opacity-100",
              {
                "right-0": pull === "right",
                "left-0": pull === "left",
                "-top-9": direction === "down",
                "-bottom-20": !loginLink && direction === "up",
                "-bottom-9": loginLink && direction === "up"
              }
            ),
            children: [
              /* @__PURE__ */ jsxs("span", { title: "Total reads", className: "text-primary", children: [
                totalReads,
                " "
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  className: "text-secondary underlined hover:text-team-current focus:text-team-current",
                  to: "/teams#read-rankings",
                  children: `what's this?`
                }
              )
            ]
          }
        ),
        direction === "down" ? loginLink : null,
        /* @__PURE__ */ jsx(
          "ul",
          {
            className: clsx(
              "border-team-current relative flex h-0 overflow-visible px-4",
              {
                "border-t": direction === "down",
                "border-b": direction === "up"
              }
            ),
            children: rankings.map((ranking) => /* @__PURE__ */ jsx("li", { className: "h-0 overflow-visible", children: /* @__PURE__ */ jsx(
              Stat,
              {
                ...ranking,
                direction,
                display: altDown ? "reads" : "ranking",
                onClick: onStatClick ? () => onStatClick(ranking.team) : void 0
              },
              ranking.percent
            ) }, ranking.team))
          }
        ),
        direction === "up" ? loginLink : null
      ]
    }
  );
}
export {
  TeamStats as T
};
//# sourceMappingURL=team-stats-DuZEr364.js.map
