import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { invariantResponse } from "@epic-web/invariant";
import * as cookie from "cookie";
import * as React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useFetcher, data } from "react-router";
import { useSpinDelay } from "spin-delay";
import { L as LinkButton } from "./button-C3vj8DF4.js";
import { K as PlusIcon, T as SpinnerIcon, A as AlarmIcon } from "./icons-DQAXl5Y1.js";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
function NotificationMessage({
  queryStringKey,
  visibleMs = 8e3,
  visible: controlledVisible,
  autoClose,
  children,
  position = "bottom-right",
  onDismiss,
  /* how long to wait before the message is shown, after mount 0 to 1 */
  delay = typeof controlledVisible === "undefined" ? 1 : 0
}) {
  const [searchParams] = useSearchParams();
  const hasQueryStringValue = queryStringKey ? searchParams.has(queryStringKey) : false;
  const [isVisible, setIsVisible] = useState(
    !queryStringKey || hasQueryStringValue
  );
  const messageFromQuery = queryStringKey && searchParams.get(queryStringKey);
  const message = messageFromQuery || children;
  const latestMessageRef = React.useRef(message);
  React.useEffect(() => {
    if (!message) setIsVisible(false);
  }, [message]);
  React.useEffect(() => {
    if (hasQueryStringValue) setIsVisible(true);
  }, [hasQueryStringValue]);
  React.useEffect(() => {
    latestMessageRef.current = message;
  }, [message]);
  React.useEffect(() => {
    if (!latestMessageRef.current) return;
    if (autoClose === false) return;
    if (controlledVisible === false) return;
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, visibleMs + delay);
    return () => clearTimeout(timeout);
  }, [queryStringKey, delay, autoClose, controlledVisible, visibleMs]);
  React.useEffect(() => {
    if (!latestMessageRef.current) return;
    if (queryStringKey && searchParams.has(queryStringKey)) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete(queryStringKey);
      window.history.replaceState(
        null,
        "",
        [window.location.pathname, newSearchParams.toString()].filter(Boolean).join("?")
      );
    }
  }, [queryStringKey, searchParams]);
  const initialY = position.includes("bottom") ? 50 : -50;
  const show = message && typeof controlledVisible === "boolean" ? controlledVisible : isVisible;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: show ? /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { y: initialY, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { delay } },
      exit: { y: initialY, opacity: 0 },
      transition: { ease: "easeInOut", duration: 0.3 },
      className: clsx(
        "text-inverse px-5vw pointer-events-none fixed right-0 left-0 z-50",
        {
          "bottom-8": position === "bottom-right",
          "top-8": position === "top-center"
        }
      ),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx("mx-auto flex w-full max-w-[96rem]", {
            "justify-end": position === "bottom-right",
            "justify-center": position === "top-center"
          }),
          children: /* @__PURE__ */ jsxs("div", { className: "bg-inverse text-inverse pointer-events-auto relative max-w-xl rounded-lg p-8 pr-14 shadow-md", children: [
            typeof controlledVisible === "undefined" || onDismiss ? /* @__PURE__ */ jsx(
              "button",
              {
                "aria-label": "dismiss message",
                onClick: () => {
                  setIsVisible(false);
                  onDismiss?.();
                },
                className: "text-secondary hover:text-inverse focus:text-inverse absolute top-8 right-4 rotate-45 transform",
                children: /* @__PURE__ */ jsx(PlusIcon, {})
              }
            ) : null,
            message
          ] })
        }
      )
    }
  ) : null });
}
function getTimeLeftMs(endTimeMs) {
  return Math.max(0, endTimeMs - Date.now());
}
function useCountdown(endTimeMs, intervalMs = 1e3) {
  const [timeLeftMs, setTimeLeftMs] = React.useState(
    () => getTimeLeftMs(endTimeMs)
  );
  React.useEffect(() => {
    if (intervalMs <= 0) return;
    let timeoutId;
    let cancelled = false;
    function clearScheduledTick() {
      if (timeoutId !== void 0) {
        window.clearTimeout(timeoutId);
        timeoutId = void 0;
      }
    }
    function tick() {
      if (cancelled) return;
      setTimeLeftMs(getTimeLeftMs(endTimeMs));
    }
    function scheduleNextTick() {
      if (cancelled) return;
      const remaining = getTimeLeftMs(endTimeMs);
      if (remaining <= 0) return;
      const delay = remaining % intervalMs || intervalMs;
      timeoutId = window.setTimeout(() => {
        tick();
        scheduleNextTick();
      }, delay);
    }
    tick();
    scheduleNextTick();
    function resync() {
      if (cancelled) return;
      clearScheduledTick();
      tick();
      scheduleNextTick();
    }
    function handleVisibilityChange() {
      if (!document.hidden) resync();
    }
    window.addEventListener("focus", resync);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      cancelled = true;
      clearScheduledTick();
      window.removeEventListener("focus", resync);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [endTimeMs, intervalMs]);
  return timeLeftMs;
}
function Spinner({
  showSpinner,
  className,
  ...spinnerIconProps
}) {
  return /* @__PURE__ */ jsx(
    SpinnerIcon,
    {
      className: `animate-spin transition-opacity ${showSpinner ? "opacity-100" : "opacity-0"} ${className}`,
      ...spinnerIconProps
    }
  );
}
const PROMO_HIDDEN_COOKIE_VALUE = "hidden";
const DEFAULT_PROMO_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 * 2;
const MAX_PROMO_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 * 10;
function getPromoCookieValue({
  promoName,
  request
}) {
  const cookies = cookie.parseCookie(request.headers.get("Cookie") || "");
  return cookies[promoName];
}
function createPromoHiddenSetCookieHeader({
  promoName,
  maxAge = DEFAULT_PROMO_MAX_AGE_SECONDS
}) {
  return cookie.stringifySetCookie({
    name: promoName,
    value: PROMO_HIDDEN_COOKIE_VALUE,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge
  });
}
async function action({
  request
}) {
  const formData = await request.formData();
  const promoName = formData.get("promoName");
  invariantResponse(typeof promoName === "string", "promoName must be a string");
  if (!/^[a-zA-Z0-9._-]+$/.test(promoName)) {
    return data({
      success: false,
      error: "Invalid promoName"
    }, {
      status: 400
    });
  }
  const rawMaxAge = Number(formData.get("maxAge"));
  const maxAge = Number.isFinite(rawMaxAge) && rawMaxAge > 0 ? Math.min(Math.floor(rawMaxAge), MAX_PROMO_MAX_AGE_SECONDS) : DEFAULT_PROMO_MAX_AGE_SECONDS;
  const cookieHeader = createPromoHiddenSetCookieHeader({
    promoName,
    maxAge
  });
  return data({
    success: true
  }, {
    headers: {
      "Set-Cookie": cookieHeader
    }
  });
}
const ONE_TIME_PROMOTIFICATION_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 * 10;
function Promotification({
  children,
  promoName,
  dismissTimeSeconds = 60 * 60 * 24 * 4,
  cookieValue,
  promoEndTime,
  hidePermanentlyOnInteraction = false,
  ...props
}) {
  const promoEndTimeMs = promoEndTime?.getTime() ?? null;
  const [isPastEndTime, setIsPastEndTime] = useState(() => promoEndTimeMs ? promoEndTimeMs <= Date.now() : false);
  const [visible, setVisible] = useState(cookieValue !== "hidden");
  const fetcher = useFetcher();
  const showSpinner = useSpinDelay(fetcher.state !== "idle");
  const disableLink = fetcher.state !== "idle" || fetcher.data?.success;
  function submitDismiss(maxAge) {
    const formData = new FormData();
    formData.set("promoName", promoName);
    formData.set("maxAge", String(maxAge));
    fetcher.submit(formData, {
      action: "/resources/promotification",
      method: "POST"
    });
  }
  function handleInteraction(event) {
    if (!hidePermanentlyOnInteraction) return;
    if (fetcher.state !== "idle" || fetcher.data?.success) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const interactiveElement = target.closest('a, button, input, select, textarea, [role="button"], [role="link"]');
    if (!interactiveElement) return;
    if (interactiveElement.closest("[data-promotification-snooze]")) return;
    setVisible(false);
    submitDismiss(ONE_TIME_PROMOTIFICATION_MAX_AGE_SECONDS);
  }
  useEffect(() => {
    if (fetcher.data?.success) {
      setVisible(false);
    }
  }, [fetcher.data]);
  const dismissError = fetcher.state === "idle" && fetcher.data && fetcher.data.success === false ? fetcher.data.error : null;
  useEffect(() => {
    setIsPastEndTime(promoEndTimeMs ? promoEndTimeMs <= Date.now() : false);
  }, [promoEndTimeMs]);
  const timeLeft = useCountdown(promoEndTimeMs ?? 0, 1e3);
  const completed = timeLeft <= 0;
  const days = Math.floor(timeLeft / (1e3 * 60 * 60 * 24));
  const hours = Math.floor(timeLeft / (1e3 * 60 * 60) % 24);
  const minutes = Math.floor(timeLeft / 1e3 / 60 % 60);
  const seconds = Math.floor(timeLeft / 1e3 % 60);
  if (promoEndTime && isPastEndTime) return null;
  return /* @__PURE__ */ jsx(NotificationMessage, {
    ...props,
    autoClose: false,
    visible,
    onDismiss: () => {
      setVisible(false);
      if (hidePermanentlyOnInteraction) {
        submitDismiss(ONE_TIME_PROMOTIFICATION_MAX_AGE_SECONDS);
      }
    },
    children: /* @__PURE__ */ jsxs("div", {
      onClickCapture: handleInteraction,
      children: [children, promoEndTime ? /* @__PURE__ */ jsx("div", {
        className: "mt-4",
        children: completed ? /* @__PURE__ */ jsx("div", {
          children: `Time's up. The sale is over`
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-wrap gap-3 tabular-nums",
            children: [/* @__PURE__ */ jsxs("span", {
              children: [days, " day", days === 1 ? "" : "s"]
            }), /* @__PURE__ */ jsxs("span", {
              children: [hours, " hour", hours === 1 ? "" : "s"]
            }), /* @__PURE__ */ jsxs("span", {
              children: [minutes, " min", minutes === 1 ? "" : "s"]
            }), /* @__PURE__ */ jsxs("span", {
              children: [seconds, " sec", seconds === 1 ? "" : "s"]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-4 flex flex-wrap items-center justify-end gap-2",
            children: [dismissError ? /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              role: "alert",
              children: dismissError
            }) : null, /* @__PURE__ */ jsxs(LinkButton, {
              type: "button",
              className: `text-inverse flex items-center gap-1 transition-opacity ${showSpinner ? "opacity-50" : ""}`,
              "data-promotification-snooze": true,
              disabled: disableLink,
              onClick: () => submitDismiss(dismissTimeSeconds),
              children: [/* @__PURE__ */ jsx("span", {
                children: "Remind me later"
              }), /* @__PURE__ */ jsx(AlarmIcon, {})]
            }), /* @__PURE__ */ jsx(Spinner, {
              size: 16,
              showSpinner
            })]
          })]
        })
      }) : null]
    })
  });
}
export {
  NotificationMessage as N,
  PROMO_HIDDEN_COOKIE_VALUE as P,
  Spinner as S,
  Promotification as a,
  action as b,
  createPromoHiddenSetCookieHeader as c,
  getPromoCookieValue as g
};
