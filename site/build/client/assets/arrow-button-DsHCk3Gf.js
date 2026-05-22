import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { useRef, useState, useCallback, useEffect } from "react";
import { b as ArrowIcon } from "./icons-DQAXl5Y1.js";
import { e as H6 } from "./typography-DBSbiCOF.js";
function useElementState() {
  const ref = useRef(null);
  const [state, setState] = useState({
    focus: false,
    hover: false,
    active: false
  });
  const setRef = useCallback((element) => {
    ref.current = element;
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pointerenter = () => setState((s) => ({ ...s, hover: true }));
    const pointerleave = () => setState((s) => ({ ...s, hover: false }));
    const focus = () => setState((s) => ({ ...s, focus: true }));
    const blur = () => setState((s) => ({ ...s, focus: false }));
    const pointerdown = () => {
      setState((s) => ({ ...s, active: true }));
      const pointerup = () => {
        setState((s) => ({ ...s, active: false }));
        window.removeEventListener("pointerup", pointerup);
        window.removeEventListener("pointercancel", pointerup);
      };
      window.addEventListener("pointerup", pointerup);
      window.addEventListener("pointercancel", pointerup);
    };
    const keydown = (event) => {
      if (event.key !== "Enter") {
        return;
      }
      setState((s) => ({ ...s, active: true }));
      const keyup = () => setState((s) => ({ ...s, active: false }));
      window.addEventListener("keyup", keyup, { once: true });
    };
    el.addEventListener("pointerenter", pointerenter);
    el.addEventListener("pointerleave", pointerleave);
    el.addEventListener("focus", focus);
    el.addEventListener("blur", blur);
    el.addEventListener("pointerdown", pointerdown);
    el.addEventListener("keydown", keydown);
    return () => {
      el.removeEventListener("pointerenter", pointerenter);
      el.removeEventListener("pointerleave", pointerleave);
      el.removeEventListener("focus", focus);
      el.removeEventListener("blur", blur);
      el.removeEventListener("pointerdown", pointerdown);
      el.removeEventListener("keydown", keydown);
    };
  }, []);
  const status = state.active ? "active" : state.focus ? "focus" : state.hover ? "hover" : "initial";
  return [setRef, status];
}
const arrowVariants = {
  down: {
    initial: { y: 0 },
    hover: { y: 4 },
    focus: {
      y: [0, 4, 0],
      transition: { repeat: Infinity }
    },
    active: { y: 12 }
  },
  up: {
    initial: { y: 0 },
    hover: { y: -4 },
    focus: {
      y: [0, -4, 0],
      transition: { repeat: Infinity }
    },
    active: { y: -12 }
  },
  left: {
    initial: { x: 0 },
    hover: { x: -4 },
    focus: {
      x: [0, -4, 0],
      transition: { repeat: Infinity }
    },
    active: { x: -12 }
  },
  right: {
    initial: { x: 0 },
    hover: { x: 4 },
    focus: {
      x: [0, 4, 0],
      transition: { repeat: Infinity }
    },
    active: { x: 12 }
  },
  "top-right": {
    initial: { x: 0, y: 0 },
    hover: { x: 4, y: -4 },
    focus: {
      x: [0, 4, 0],
      y: [0, -4, 0],
      transition: { repeat: Infinity }
    },
    active: { x: 12, y: -12 }
  }
};
function getBaseProps({ textSize, className }) {
  return {
    className: clsx(
      "text-primary inline-flex cursor-pointer items-center text-left font-medium transition focus:outline-none",
      {
        "text-xl": textSize === "medium",
        "text-lg": textSize === "small"
      },
      className
    )
  };
}
function ArrowButtonContent({
  children,
  direction = "right"
}) {
  const circumference = 28 * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const shouldReduceMotion = useReducedMotion();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    children && (direction === "right" || direction === "up" || direction === "top-right") ? /* @__PURE__ */ jsx("span", { className: "mr-8 text-xl font-medium", children }) : null,
    /* @__PURE__ */ jsxs("div", { className: "relative inline-flex h-14 w-14 flex-none items-center justify-center p-1", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute text-gray-200 dark:text-gray-600", children: /* @__PURE__ */ jsxs("svg", { width: "60", height: "60", children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            stroke: "currentColor",
            strokeWidth: "2",
            fill: "transparent",
            r: "28",
            cx: "30",
            cy: "30"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.circle,
          {
            className: "text-primary",
            stroke: "currentColor",
            strokeWidth: "2",
            fill: "transparent",
            r: "28",
            cx: "30",
            cy: "30",
            style: { strokeDasharray, rotate: -90 },
            variants: {
              initial: { strokeDashoffset: circumference },
              hover: { strokeDashoffset: 0 },
              focus: { strokeDashoffset: 0 },
              active: { strokeDashoffset: 0 }
            },
            transition: {
              damping: 0,
              ...shouldReduceMotion ? { duration: 0 } : null
            }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(
        motion.span,
        {
          transition: shouldReduceMotion ? { duration: 0 } : {},
          variants: shouldReduceMotion ? {} : arrowVariants[direction],
          children: /* @__PURE__ */ jsx(ArrowIcon, { direction })
        }
      )
    ] }),
    children && (direction === "left" || direction === "down") ? /* @__PURE__ */ jsx("span", { className: "ml-8 text-xl font-medium", children }) : null
  ] });
}
function ArrowButton({ onClick, type, ...props }) {
  const [ref, state] = useElementState();
  const shouldReduceMotion = useReducedMotion();
  return /* @__PURE__ */ jsx(
    motion.button,
    {
      onClick,
      type,
      ...getBaseProps(props),
      ref,
      animate: state,
      transition: shouldReduceMotion ? { duration: 0 } : {},
      children: /* @__PURE__ */ jsx(ArrowButtonContent, { ...props })
    }
  );
}
const MotionLink = motion(Link);
function ArrowLink({ to, href, ...props }) {
  const [ref, state] = useElementState();
  const shouldReduceMotion = useReducedMotion();
  if (href) {
    return /* @__PURE__ */ jsx(
      motion.a,
      {
        href,
        ...getBaseProps(props),
        ref,
        animate: state,
        transition: shouldReduceMotion ? { duration: 0 } : {},
        children: /* @__PURE__ */ jsx(ArrowButtonContent, { ...props })
      }
    );
  } else if (to) {
    return /* @__PURE__ */ jsx(
      MotionLink,
      {
        to,
        ...getBaseProps(props),
        ref,
        animate: state,
        transition: shouldReduceMotion ? { duration: 0 } : {},
        children: /* @__PURE__ */ jsx(ArrowButtonContent, { ...props })
      }
    );
  }
  throw new Error("Must provide either to or href to ArrowLink");
}
function BackLink({
  to,
  className,
  children
}) {
  const [ref, state] = useElementState();
  const shouldReduceMotion = useReducedMotion();
  return /* @__PURE__ */ jsxs(
    MotionLink,
    {
      to,
      className: clsx(
        "text-primary flex space-x-4 focus:outline-none",
        className
      ),
      ref,
      animate: state,
      transition: shouldReduceMotion ? { duration: 0 } : {},
      children: [
        /* @__PURE__ */ jsx(
          motion.span,
          {
            variants: shouldReduceMotion ? {} : arrowVariants.left,
            transition: shouldReduceMotion ? { duration: 0 } : {},
            children: /* @__PURE__ */ jsx(ArrowIcon, { direction: "left" })
          }
        ),
        /* @__PURE__ */ jsx(H6, { as: "span", children })
      ]
    }
  );
}
export {
  ArrowButton as A,
  BackLink as B,
  ArrowLink as a,
  useElementState as u
};
