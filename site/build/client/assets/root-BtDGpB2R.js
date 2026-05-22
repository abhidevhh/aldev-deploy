import { useNavigate, useLocation, useMatches, useFetcher, Link, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Links, Scripts, Meta, Outlet, ScrollRestoration, useNavigation, data } from "react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { formatForDisplay, useHotkey, getSequenceManager, HotkeysProvider } from "@tanstack/react-hotkeys";
import { clsx } from "clsx";
import { useReducedMotion, motion, useAnimation, AnimatePresence } from "framer-motion";
import * as React from "react";
import { useSpinDelay } from "spin-delay";
import { getInstanceInfo } from "litefs-js";
import "litefs-js/remix";
import { A as AnchorOrLink, b as useDebounce, u as useCapturedRouteError } from "./misc-react-D8yAGzlT.js";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { _ as CloseIcon, w as CheckIcon, $ as CopyIcon, G as GithubIcon, Y as YoutubeIcon, X as XIcon, R as RssIcon, q as ArrowIcon, j as SearchIcon, v as SpinnerIcon, a0 as MoonIcon, a1 as SunIcon, u as MicrophoneIcon } from "./icons-Xl-Om4A1.js";
import { H as H3, P as Paragraph, b as H4, a as H6 } from "./typography-DDpAXXrz.js";
import { a as ArrowButton, A as ArrowLink, u as useElementState } from "./arrow-button-DBVn13Kl.js";
import { B as ButtonLink } from "./button-B-8RrXF2.js";
import "error-stack-parser";
import { g as getUrl, b as getDisplayUrl, s as typedBoolean, e as getErrorMessage, k as isTeam, y as removeTrailingSlash, h as getDomainUrl } from "./misc-DM3BUXHg.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { C as CloudinaryVideo } from "./cloudinary-video-DeT-8neH.js";
import { g as getImgProps, a as getImageBuilder, c as getSocialImageWithPreTitle, e as abhiBuddyProfiles, i as images, b as getGenericSocialImage, h as illustrationImages } from "./images-D8NqauwH.js";
import { LRUCache } from "lru-cache";
import * as mdxBundler from "mdx-bundler/client/index.js";
import { T as Themed, b as THEME_FETCHER_KEY, c as useOptimisticThemeMode, u as useTheme, C as ClientHintCheck, g as getHints } from "./theme-D6IyWRbl.js";
import { F as Field } from "./form-elements-D3OfaKUp.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { useCombobox } from "downshift";
import { P as Promotification, N as NotificationMessage, b as PROMO_HIDDEN_COOKIE_VALUE, g as getPromoCookieValue, c as createPromoHiddenSetCookieHeader } from "./promotification-omJeRY6i.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { getClientSession } from "./client.server-CTs0DPxN.js";
import { a as getPublicEnv } from "./env.server-DPCBxZtL.js";
import { g as getLoginInfoSession } from "./login.server-Bn92r_Ja.js";
import { z } from "zod";
import { t as throwIfAborted, i as isAbortError } from "./abort-utils.server-Bx3f6jnJ.js";
import { c as cachified, b as cache } from "./cache.server-BWnHcoUK.js";
import { g as getSocialMetas } from "./seo-B3cPpSFw.js";
import { getSession } from "./session.server-BVOCbXUc.js";
import { g as getTheme } from "./theme.server-D5mszc13.js";
import { t as time, w as withTimeout, g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { b as getUserInfo } from "./user-info.server-DQEJabU4.js";
import { H as HeaderSection } from "./header-section-BSZTMYmt.js";
import { H as HeroSection } from "./hero-section-CoHGsAuJ.js";
const HOTKEY_TOGGLE_HOTKEYS_DIALOG = {
  key: "?",
  shift: true
};
const HOTKEY_OPEN_SEARCH = {
  slash: "/",
  modK: "Mod+K"
};
const HOTKEY_GOTO_HOME = ["G", "H"];
const HOTKEY_GOTO_BLOG = ["G", "B"];
const HOTKEY_GOTO_CHATS = ["G", "C"];
const HOTKEY_GOTO_CALLS = ["G", "P"];
const HOTKEY_GOTO_COURSES = ["G", "U"];
const HOTKEY_GOTO_DISCORD = ["G", "D"];
const HOTKEY_GOTO_ABOUT = ["G", "A"];
const HOTKEY_GOTO_TALKS = ["G", "T"];
const HOTKEY_GOTO_TESTIMONY = [
  "G",
  "F"
];
const HOTKEY_GOTO_TRANSPARENCY = [
  "G",
  "M"
];
const HOTKEY_GOTO_RESUME = ["G", "R"];
const HOTKEY_GOTO_ABHIBUDDY = ["G", "K"];
const HOTKEY_GOTO_SEARCH = ["G", "S"];
function getSequenceDisplayKeys(sequence) {
  return sequence.map((key) => key.toLowerCase());
}
const HOTKEYS_HELP_GROUPS = [
  {
    title: "General",
    items: [
      {
        description: "Show keyboard shortcuts",
        combos: [{ kind: "hotkey", hotkey: "?" }]
      },
      {
        description: "Close dialog",
        combos: [{ kind: "hotkey", hotkey: "Escape" }]
      }
    ]
  },
  {
    title: "Search",
    items: [
      {
        description: "Focus search",
        combos: [
          { kind: "hotkey", hotkey: HOTKEY_OPEN_SEARCH.slash },
          { kind: "hotkey", hotkey: HOTKEY_OPEN_SEARCH.modK }
        ]
      }
    ]
  },
  {
    title: "Navigation",
    items: [
      {
        description: "Go to home",
        combos: [
          { kind: "sequence", keys: getSequenceDisplayKeys(HOTKEY_GOTO_HOME) }
        ]
      },
      {
        description: "Go to blog",
        combos: [
          { kind: "sequence", keys: getSequenceDisplayKeys(HOTKEY_GOTO_BLOG) }
        ]
      },
      {
        description: "Go to Chats with Kent podcast",
        combos: [
          { kind: "sequence", keys: getSequenceDisplayKeys(HOTKEY_GOTO_CHATS) }
        ]
      },
      {
        description: "Go to Call Kent podcast",
        combos: [
          { kind: "sequence", keys: getSequenceDisplayKeys(HOTKEY_GOTO_CALLS) }
        ]
      },
      {
        description: "Go to courses",
        combos: [
          {
            kind: "sequence",
            keys: getSequenceDisplayKeys(HOTKEY_GOTO_COURSES)
          }
        ]
      },
      {
        description: "Go to Discord",
        combos: [
          {
            kind: "sequence",
            keys: getSequenceDisplayKeys(HOTKEY_GOTO_DISCORD)
          }
        ]
      },
      {
        description: "Go to about",
        combos: [
          { kind: "sequence", keys: getSequenceDisplayKeys(HOTKEY_GOTO_ABOUT) }
        ]
      },
      {
        description: "Go to talks",
        combos: [
          { kind: "sequence", keys: getSequenceDisplayKeys(HOTKEY_GOTO_TALKS) }
        ]
      },
      {
        description: "Go to testimony",
        combos: [
          {
            kind: "sequence",
            keys: getSequenceDisplayKeys(HOTKEY_GOTO_TESTIMONY)
          }
        ]
      },
      {
        description: "Go to transparency",
        combos: [
          {
            kind: "sequence",
            keys: getSequenceDisplayKeys(HOTKEY_GOTO_TRANSPARENCY)
          }
        ]
      },
      {
        description: "Go to resume",
        combos: [
          {
            kind: "sequence",
            keys: getSequenceDisplayKeys(HOTKEY_GOTO_RESUME)
          }
        ]
      },
      {
        description: "Go to AbhiBuddy",
        combos: [
          { kind: "sequence", keys: getSequenceDisplayKeys(HOTKEY_GOTO_ABHIBUDDY) }
        ]
      },
      {
        description: "Go to search page",
        combos: [
          {
            kind: "sequence",
            keys: getSequenceDisplayKeys(HOTKEY_GOTO_SEARCH)
          }
        ]
      }
    ]
  }
];
const HOTKEYS_HELP_DIALOG_ANIMATION_DURATION_MS = 200;
function Kbd({ children }) {
  return /* @__PURE__ */ jsx("kbd", { className: "bg-secondary border-secondary text-primary inline-flex items-center rounded-md border px-2 py-1 font-mono text-xs font-semibold sm:text-sm", children });
}
function renderCombo(combo) {
  if (combo.kind === "sequence") {
    return /* @__PURE__ */ jsx("span", { className: "inline-flex flex-wrap items-center gap-1", children: combo.keys.map((k, i) => /* @__PURE__ */ jsx(Kbd, { children: k }, `${k}-${i}`)) });
  }
  return /* @__PURE__ */ jsx(Kbd, { children: formatForDisplay(combo.hotkey) });
}
function HotkeysHelpDialog({
  isOpen,
  onDismiss,
  groups
}) {
  const [isMounted, setIsMounted] = React.useState(isOpen);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const dialogContentRef = React.useRef(null);
  const closeTimeoutRef = React.useRef(
    null
  );
  const animationDurationMs = prefersReducedMotion ? 0 : HOTKEYS_HELP_DIALOG_ANIMATION_DURATION_MS;
  const animationDurationStyle = React.useMemo(
    () => ({
      "--hotkeys-help-dialog-animation-duration": `${animationDurationMs}ms`
    }),
    [animationDurationMs]
  );
  const clearCloseTimeout = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    updateReducedMotionPreference();
    mediaQuery.addEventListener("change", updateReducedMotionPreference);
    return () => {
      mediaQuery.removeEventListener("change", updateReducedMotionPreference);
    };
  }, []);
  React.useEffect(() => {
    if (isOpen) {
      clearCloseTimeout();
      setIsMounted(true);
      return clearCloseTimeout;
    }
    if (!isMounted) return clearCloseTimeout;
    if (animationDurationMs === 0) {
      setIsMounted(false);
      return clearCloseTimeout;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsMounted(false);
      closeTimeoutRef.current = null;
    }, animationDurationMs);
    return clearCloseTimeout;
  }, [animationDurationMs, clearCloseTimeout, isMounted, isOpen]);
  if (!isMounted) return null;
  const animationState = isOpen ? "open" : "closed";
  return /* @__PURE__ */ jsx(
    DialogOverlay,
    {
      isOpen: isMounted,
      onDismiss,
      initialFocusRef: dialogContentRef,
      className: "hotkeys-help-dialog-overlay",
      "data-animation-state": animationState,
      style: animationDurationStyle,
      children: /* @__PURE__ */ jsxs(
        DialogContent,
        {
          ref: dialogContentRef,
          "aria-label": "Keyboard shortcuts",
          tabIndex: -1,
          "data-animation-state": animationState,
          className: "hotkeys-help-dialog-content bg-primary text-primary !my-[10svh] !flex !h-[80svh] !w-11/12 !max-w-3xl !flex-col overflow-hidden rounded-xl border-2 border-black px-6 py-6 shadow-xl sm:px-8 sm:py-8 dark:border-white dark:!bg-gray-900",
          style: animationDurationStyle,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx(H3, { className: "pr-6", children: "Keyboard shortcuts" }),
                /* @__PURE__ */ jsxs(Paragraph, { prose: false, className: "mt-2 text-base", children: [
                  "Press ",
                  /* @__PURE__ */ jsx(Kbd, { children: "?" }),
                  " again to close."
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: onDismiss,
                  "aria-label": "Close keyboard shortcuts dialog",
                  className: "text-secondary hover:text-primary inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md p-1 transition focus:outline-none focus-visible:bg-blue-100 focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:bg-blue-600 dark:focus-visible:ring-offset-gray-900",
                  children: /* @__PURE__ */ jsx(CloseIcon, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                tabIndex: 0,
                role: "region",
                "aria-label": "Keyboard shortcuts list",
                className: "focus-ring mt-8 min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-md pr-1 focus:outline-none",
                children: /* @__PURE__ */ jsx("div", { className: "space-y-8", children: groups.map((group) => /* @__PURE__ */ jsxs("section", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-secondary mb-3 text-xs font-semibold tracking-widest uppercase", children: group.title }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: group.items.map((item) => /* @__PURE__ */ jsxs(
                    "li",
                    {
                      className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2", children: item.combos.map((combo, index) => {
                          const comboKey = combo.kind === "hotkey" ? `hotkey:${combo.hotkey}` : `sequence:${combo.keys.join("-")}`;
                          return /* @__PURE__ */ jsxs(React.Fragment, { children: [
                            index === 0 ? null : /* @__PURE__ */ jsx("span", { className: "text-secondary px-1 text-sm", children: "or" }),
                            renderCombo(combo)
                          ] }, comboKey);
                        }) }),
                        /* @__PURE__ */ jsx("div", { className: "text-secondary text-sm sm:text-base", children: item.description })
                      ]
                    },
                    `${group.title}-${item.description}`
                  )) })
                ] }, group.title)) })
              }
            )
          ]
        }
      )
    }
  );
}
function isInputLikeElement(element) {
  if (!element) return false;
  if (element instanceof HTMLInputElement) {
    const type = element.type.toLowerCase();
    if (type === "button" || type === "submit" || type === "reset") return false;
    return true;
  }
  if (element instanceof HTMLTextAreaElement) return true;
  if (element instanceof HTMLSelectElement) return true;
  if (element instanceof HTMLElement && element.isContentEditable) return true;
  return false;
}
const navSequenceOptions = {
  ignoreInputs: true,
  preventDefault: true,
  stopPropagation: true,
  timeout: 800
};
const NAVIGATION_HOTKEY_ROUTES = [
  { sequence: HOTKEY_GOTO_HOME, path: "/" },
  { sequence: HOTKEY_GOTO_BLOG, path: "/blog" },
  { sequence: HOTKEY_GOTO_CHATS, path: "/chats" },
  { sequence: HOTKEY_GOTO_CALLS, path: "/calls" },
  { sequence: HOTKEY_GOTO_COURSES, path: "/courses" },
  { sequence: HOTKEY_GOTO_DISCORD, path: "/discord" },
  { sequence: HOTKEY_GOTO_ABOUT, path: "/about" },
  { sequence: HOTKEY_GOTO_TALKS, path: "/talks" },
  { sequence: HOTKEY_GOTO_TESTIMONY, path: "/testimony" },
  { sequence: HOTKEY_GOTO_TRANSPARENCY, path: "/transparency" },
  { sequence: HOTKEY_GOTO_RESUME, path: "/resume" },
  { sequence: HOTKEY_GOTO_ABHIBUDDY, path: "/abhiBuddy" },
  { sequence: HOTKEY_GOTO_SEARCH, path: "/search" }
];
function AppHotkeys() {
  const navigate = useNavigate();
  const location2 = useLocation();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const navigateToPath = React.useCallback(
    (path) => {
      setDialogOpen(false);
      void navigate(path);
    },
    [navigate]
  );
  React.useEffect(() => {
    setDialogOpen(false);
  }, [location2.pathname]);
  useHotkey(HOTKEY_TOGGLE_HOTKEYS_DIALOG, () => setDialogOpen((o) => !o), {
    ignoreInputs: true,
    preventDefault: true,
    requireReset: true,
    stopPropagation: true
  });
  React.useEffect(() => {
    const sequenceManager = getSequenceManager();
    const resetSequencesIfTyping = (event) => {
      if (isInputLikeElement(event.target)) {
        sequenceManager.resetAll();
      }
    };
    document.addEventListener("keydown", resetSequencesIfTyping, true);
    document.addEventListener("focusout", resetSequencesIfTyping, true);
    const unregisterCallbacks = NAVIGATION_HOTKEY_ROUTES.map(
      ({ sequence, path }) => sequenceManager.register(
        [...sequence],
        () => navigateToPath(path),
        navSequenceOptions
      )
    );
    return () => {
      document.removeEventListener("keydown", resetSequencesIfTyping, true);
      document.removeEventListener("focusout", resetSequencesIfTyping, true);
      for (const registration of unregisterCallbacks) registration.unregister();
    };
  }, [navigateToPath]);
  return /* @__PURE__ */ jsx(
    HotkeysHelpDialog,
    {
      isOpen: dialogOpen,
      onDismiss: () => setDialogOpen(false),
      groups: HOTKEYS_HELP_GROUPS
    }
  );
}
function normalizeType(type) {
  if (type === "jsx-page") return "page";
  return type;
}
function getTypePriority(type, priorities) {
  const normalized = normalizeType(type);
  const idx = priorities.indexOf(normalized);
  return idx === -1 ? Number.POSITIVE_INFINITY : idx;
}
function sortNotFoundMatches(matches, {
  priorities = ["blog", "page"]
} = {}) {
  return matches.map((m, index) => ({
    m: { ...m, type: normalizeType(m.type) },
    index,
    priority: getTypePriority(m.type, priorities)
  })).sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.index - b.index;
  }).map((x) => x.m);
}
function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
function notFoundQueryFromPathname(pathname) {
  const cleaned = (pathname ?? "").split(/[?#]/)[0] ?? "";
  const segments = cleaned.split("/").filter(Boolean);
  if (segments.length === 0) return "";
  const words = segments.map((segment) => {
    let text = safeDecodeURIComponent(segment);
    text = text.replace(/[-_.]+/g, " ");
    text = text.replace(/([a-z])([A-Z])/g, "$1 $2");
    return text;
  }).join(" ").replace(/\s+/g, " ").trim();
  return words.length > 120 ? words.slice(0, 120).trim() : words;
}
function MissingSomething(props) {
  return /* @__PURE__ */ jsx(CloudinaryVideo, { cloudinaryId: "abhidev.com/misc/where_am_i", ...props });
}
function Grimmacing(props) {
  return /* @__PURE__ */ jsx(CloudinaryVideo, { cloudinaryId: "abhidev.com/misc/grimmace", ...props });
}
function Facepalm(props) {
  return /* @__PURE__ */ jsx(CloudinaryVideo, { cloudinaryId: "abhidev.com/misc/facepalm", ...props });
}
function MermaidDiagram({
  code,
  lightSvg,
  darkSvg
}) {
  return /* @__PURE__ */ jsx("div", { className: "mermaid not-prose", "data-mermaid-diagram": true, children: /* @__PURE__ */ jsx(
    Themed,
    {
      light: /* @__PURE__ */ jsx(MermaidSvg, { code, svg: lightSvg, theme: "light" }),
      dark: /* @__PURE__ */ jsx(MermaidSvg, { code, svg: darkSvg, theme: "dark" })
    }
  ) });
}
function MermaidSvg({
  code,
  svg,
  theme
}) {
  if (!svg) {
    return /* @__PURE__ */ jsx("pre", { className: "mermaid-fallback", "data-theme": theme, children: /* @__PURE__ */ jsx("code", { children: code }) });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "mermaid-svg",
      "data-theme": theme,
      dangerouslySetInnerHTML: { __html: svg }
    }
  );
}
function createSimpleContext(name) {
  const defaultValue = /* @__PURE__ */ Symbol(`Default ${name} context value`);
  const Context = React.createContext(
    defaultValue
  );
  Context.displayName = name;
  function useValue() {
    const value = React.useContext(Context);
    if (value === defaultValue) {
      throw new Error(`use${name} must be used within ${name}Provider`);
    }
    if (!value) {
      throw new Error(
        `No value in ${name}Provider context. If the value is optional in this situation, try useOptional${name} instead of use${name}`
      );
    }
    return value;
  }
  function useOptionalValue() {
    const value = React.useContext(Context);
    if (value === defaultValue) {
      throw new Error(`useOptional${name} must be used within ${name}Provider`);
    }
    return value;
  }
  return { Provider: Context.Provider, useValue, useOptionalValue };
}
const {
  Provider: ChatsEpisodeUIStateProvider,
  useValue: useChatsEpisodeUIState
} = createSimpleContext("ChatsEpisodeUIState");
const {
  Provider: CallsEpisodeUIStateProvider,
  useValue: useCallsEpisodeUIState
} = createSimpleContext("CallsEpisodeUIState");
function useMatchLoaderData(handleId) {
  const matches = useMatches();
  const match = matches.find(
    ({ handle: handle2 }) => handle2?.id === handleId
  );
  if (!match) {
    throw new Error(`No active route has a handle ID of ${handleId}`);
  }
  return match.data;
}
const useRootData = () => useMatchLoaderData(handle.id);
function useUser() {
  const { user } = useRootData();
  if (!user) throw new Error("User is required when using useUser");
  return user;
}
function useOptionalUser() {
  const { user } = useRootData();
  return user;
}
function KitForm({
  formId,
  kitTagId,
  kitFormId
}) {
  const websiteId = React.useId();
  const kit = useFetcher();
  const formRef = React.useRef(null);
  const isDone = kit.state === "idle" && kit.data != null;
  const kitData = isDone ? kit.data : null;
  React.useEffect(() => {
    if (formRef.current && kitData?.status === "success") {
      formRef.current.reset();
    }
  }, [kitData]);
  const { user, userInfo } = useRootData();
  const alreadySubscribed = userInfo?.kit?.tags.some(
    ({ id }) => id === kitTagId
  );
  if (alreadySubscribed) {
    return /* @__PURE__ */ jsx("div", { children: `Actually, it looks like you're already signed up to be notified.` });
  }
  const success = isDone && kitData?.status === "success";
  return /* @__PURE__ */ jsxs(kit.Form, { ref: formRef, action: "/action/kit", method: "POST", noValidate: true, children: [
    /* @__PURE__ */ jsxs("div", { style: { position: "absolute", left: "-9999px" }, children: [
      /* @__PURE__ */ jsx("label", { htmlFor: `website-url-${websiteId}`, children: "Your website" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: `website-url-${websiteId}`,
          name: "url",
          tabIndex: -1,
          autoComplete: "nope"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "formId", value: formId }),
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "kitTagId", value: kitTagId }),
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "kitFormId", value: kitFormId }),
    /* @__PURE__ */ jsx(
      Field,
      {
        name: "firstName",
        label: "First name",
        error: kitData?.status === "error" ? kitData.errors.firstName : null,
        autoComplete: "given-name",
        defaultValue: user?.firstName,
        required: true,
        disabled: kit.state !== "idle" || success
      }
    ),
    /* @__PURE__ */ jsx(
      Field,
      {
        name: "email",
        label: "Email",
        autoComplete: "email",
        error: kitData?.status === "error" ? kitData.errors.email : null,
        defaultValue: user?.email,
        disabled: kit.state !== "idle" || success
      }
    ),
    success ? /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx(CheckIcon, {}),
      /* @__PURE__ */ jsx("p", { className: "text-secondary", children: userInfo?.kit ? `Sweet, you're all set` : `Sweet, check your email for confirmation.` })
    ] }) : /* @__PURE__ */ jsx(ArrowButton, { className: "pt-4", type: "submit", direction: "right", children: "Sign me up" })
  ] });
}
function getBannerAltProp(frontmatter) {
  return frontmatter.bannerAlt ?? frontmatter.bannerTitle ?? frontmatter.bannerCredit ?? frontmatter.title ?? "Post banner";
}
function getBannerTitleProp(frontmatter) {
  return frontmatter.bannerTitle ?? frontmatter.bannerAlt ?? frontmatter.bannerCredit;
}
const mdxPageMeta = ({
  data: data2,
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  if (data2 && "page" in data2) {
    const { keywords: _keywords, ...extraMetaInfo } = data2.page.frontmatter.meta ?? {};
    const extraMeta = Object.entries(extraMetaInfo).reduce(
      (acc, [key, val]) => [...acc, { [key]: String(val) }],
      []
    );
    let title = data2.page.frontmatter.title;
    const isDraft = data2.page.frontmatter.draft;
    const isUnlisted = data2.page.frontmatter.unlisted;
    if (isDraft) title = `(DRAFT) ${title ?? ""}`;
    return [
      isDraft || isUnlisted ? { robots: "noindex" } : null,
      ...getSocialMetas({
        title,
        description: data2.page.frontmatter.description,
        url: getUrl(requestInfo),
        image: getSocialImageWithPreTitle({
          url: getDisplayUrl(requestInfo),
          featuredImage: data2.page.frontmatter.bannerCloudinaryId ?? "abhidev.com/illustrations/abhiBuddy/abhiBuddy_profile_gray",
          title: data2.page.frontmatter.socialImageTitle ?? data2.page.frontmatter.title ?? "Untitled",
          preTitle: data2.page.frontmatter.socialImagePreTitle ?? `Check out this article`
        }),
        ogType: getUrl(requestInfo).includes("/blog/") ? "article" : "website"
      }),
      ...extraMeta
    ].filter(typedBoolean);
  } else {
    return [
      { title: "Not found" },
      {
        description: "You landed on a page that AbhiBuddy the Coding Koala could not find 🐨😢"
      }
    ];
  }
};
function OptionalUser({
  children
}) {
  const user = useOptionalUser();
  return children(user);
}
function MdxTable(props) {
  return /* @__PURE__ */ jsx("div", { className: "mdx-table-wrapper", children: /* @__PURE__ */ jsx("table", { ...props }) });
}
const mdxComponents = {
  a: AnchorOrLink,
  table: MdxTable,
  Themed,
  CloudinaryVideo,
  MermaidDiagram,
  ThemedBlogImage,
  BlogImage,
  SubscribeForm,
  OptionalUser
};
function getMdxComponent(code) {
  const Component = mdxBundler.getMDXComponent(code);
  function KCDMdxComponent({
    components,
    ...rest
  }) {
    return /* @__PURE__ */ jsx(Component, { components: { ...mdxComponents, ...components }, ...rest });
  }
  return KCDMdxComponent;
}
function BlogImage({
  cloudinaryId,
  imgProps,
  transparentBackground
}) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      className: "w-full rounded-lg object-cover py-8",
      ...getImgProps(getImageBuilder(cloudinaryId, imgProps.alt), {
        widths: [350, 550, 700, 845, 1250, 1700, 2550],
        sizes: [
          "(max-width:1023px) 80vw",
          "(min-width:1024px) and (max-width:1620px) 50vw",
          "850px"
        ],
        transformations: {
          background: transparentBackground ? void 0 : "rgb:e6e9ee"
        }
      }),
      ...imgProps
    }
  );
}
function ThemedBlogImage({
  darkCloudinaryId,
  lightCloudinaryId,
  imgProps,
  transparentBackground
}) {
  return /* @__PURE__ */ jsx(
    Themed,
    {
      light: /* @__PURE__ */ jsx(
        BlogImage,
        {
          cloudinaryId: lightCloudinaryId,
          imgProps,
          transparentBackground
        }
      ),
      dark: /* @__PURE__ */ jsx(
        BlogImage,
        {
          cloudinaryId: darkCloudinaryId,
          imgProps,
          transparentBackground
        }
      )
    }
  );
}
function SubscribeForm(props) {
  const { formId, kitTagId, kitFormId } = props;
  if (typeof formId !== "string" || typeof kitFormId !== "string" || typeof kitTagId !== "string") {
    console.error(
      `SubscribeForm improperly used. Must have a formId, kitFormId, and kitTagId`,
      props
    );
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "border-team-current mb-12 border-t-2 border-b-2 p-5", children: /* @__PURE__ */ jsx(KitForm, { formId, kitFormId, kitTagId }) });
}
const mdxComponentCache = new LRUCache({
  max: 1e3
});
function useMdxComponent(code) {
  return React.useMemo(() => {
    if (mdxComponentCache.has(code)) {
      return mdxComponentCache.get(code);
    }
    const component = getMdxComponent(code);
    mdxComponentCache.set(code, component);
    return component;
  }, [code]);
}
const isServer = typeof document === "undefined";
function BlurrableImage({
  img,
  blurDataUrl,
  ...rest
}) {
  const id = React.useId();
  const [visible, setVisible] = React.useState(() => {
    if (isServer) return false;
    const el = document.getElementById(id);
    if (!(el instanceof HTMLImageElement)) return false;
    return !el.classList.contains("opacity-0");
  });
  const jsImgElRef = React.useRef(null);
  React.useEffect(() => {
    if (!jsImgElRef.current) return;
    if (jsImgElRef.current.complete) {
      setVisible(true);
      return;
    }
    let current = true;
    jsImgElRef.current.addEventListener("load", () => {
      if (!jsImgElRef.current || !current) return;
      setTimeout(() => {
        setVisible(true);
      }, 0);
    });
    return () => {
      current = false;
    };
  }, []);
  const jsImgEl = React.cloneElement(img, {
    ref: jsImgElRef,
    id,
    // React doesn't like the extra onload prop the server's going to send,
    // but it also doesn't like an onload prop and recommends onLoad instead.
    // but we want to use the onload prop because it's a bit more performant
    // and as a result it's possible the user will never see the blurred image
    // at all which would be great. So we suppress the warning here and we use
    // this funny data-evt-prefixed attribute which our server renderer will
    // remove for us (check entry.server).
    suppressHydrationWarning: true,
    // @ts-expect-error this is a funny thing we do...
    "data-evt-onload": isServer ? "this.classList.remove('opacity-0')" : void 0,
    className: clsx(
      "absolute h-full w-full",
      img.props.className,
      "transition-opacity",
      {
        "opacity-0": !visible
      }
    )
  });
  return /* @__PURE__ */ jsxs("div", { ...rest, className: clsx("relative", rest.className), children: [
    blurDataUrl ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: blurDataUrl,
          className: clsx("absolute h-full w-full", img.props.className),
          alt: img.props.alt
        },
        blurDataUrl
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "absolute h-full w-full",
            img.props.className,
            "backdrop-blur-xl"
          )
        }
      )
    ] }) : null,
    jsImgEl,
    /* @__PURE__ */ jsx("noscript", { className: "absolute z-10 h-full w-full", children: img })
  ] });
}
async function copyToClipboard(value) {
  try {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(value);
      return true;
    }
    const element = document.createElement("textarea");
    element.value = value;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    element.remove();
    return true;
  } catch {
    return false;
  }
}
function ClipboardCopyButton({
  value,
  className
}) {
  const [state, setState] = React.useState(
    "idle"
    /* Idle */
  );
  React.useEffect(() => {
    async function transition() {
      switch (state) {
        case "copy": {
          const res = await copyToClipboard(value);
          console.info("copied", res);
          setState(
            "copied"
            /* Copied */
          );
          break;
        }
        case "copied": {
          setTimeout(() => {
            setState(
              "idle"
              /* Idle */
            );
          }, 2e3);
          break;
        }
      }
    }
    void transition();
  }, [state, value]);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => setState(
        "copy"
        /* Copy */
      ),
      className: clsx(
        "ring-team-current rounded-lg bg-white p-3 text-lg font-medium whitespace-nowrap text-black shadow transition group-hover:opacity-100 peer-hover:opacity-100 peer-focus:opacity-100 hover:opacity-100 hover:shadow-md hover:ring-4 focus:opacity-100 focus:ring-4 focus:outline-none lg:px-8 lg:py-4 lg:opacity-0",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only lg:not-sr-only lg:inline", children: state === "copied" ? "Copied to clipboard" : "Click to copy url" }),
        /* @__PURE__ */ jsx("span", { className: "inline lg:sr-only", children: state === "copied" ? /* @__PURE__ */ jsx(CheckIcon, {}) : /* @__PURE__ */ jsx(CopyIcon, {}) })
      ]
    }
  );
}
function ArticleCard({
  leadingTeam,
  article: {
    readTime,
    dateDisplay,
    slug,
    frontmatter,
    frontmatter: {
      title = "Untitled Post",
      bannerCloudinaryId,
      bannerBlurDataUrl
    }
  }
}) {
  const { requestInfo } = useRootData();
  const permalink = `${requestInfo.origin}/blog/${slug}`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "relative w-full",
        leadingTeam ? `set-color-team-current-${leadingTeam.toLowerCase()}` : null
      ),
      children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            prefetch: "intent",
            className: "group peer relative block w-full focus:outline-none",
            to: `/blog/${slug}`,
            children: [
              bannerCloudinaryId ? /* @__PURE__ */ jsx(
                BlurrableImage,
                {
                  blurDataUrl: bannerBlurDataUrl,
                  className: "aspect-[3/4] rounded-lg",
                  img: /* @__PURE__ */ jsx(
                    "img",
                    {
                      title: frontmatter.title ?? getBannerTitleProp(frontmatter),
                      ...getImgProps(
                        getImageBuilder(
                          bannerCloudinaryId,
                          getBannerAltProp(frontmatter)
                        ),
                        {
                          widths: [280, 560, 840, 1100, 1300, 1650],
                          sizes: [
                            "(max-width:639px) 80vw",
                            "(min-width:640px) and (max-width:1023px) 40vw",
                            "(min-width:1024px) and (max-width:1620px) 25vw",
                            "420px"
                          ],
                          transformations: {
                            background: "rgb:e6e9ee",
                            resize: {
                              type: "fill",
                              aspectRatio: "3:4"
                            }
                          }
                        }
                      ),
                      className: "focus-ring w-full rounded-lg object-cover object-center transition",
                      loading: "lazy"
                    }
                  )
                },
                bannerCloudinaryId
              ) : /* @__PURE__ */ jsx("div", { className: "aspect-[3/4]", children: /* @__PURE__ */ jsx("div", { className: "focus-ring w-full rounded-lg transition", children: /* @__PURE__ */ jsx(MissingSomething, { aspectRatio: "3:4" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "text-secondary mt-8 text-xl font-medium", children: [dateDisplay, readTime?.text ?? "quick read"].filter(Boolean).join(" — ") }),
              /* @__PURE__ */ jsx(H3, { as: "div", className: "mt-4", children: title })
            ]
          }
        ),
        leadingTeam ? /* @__PURE__ */ jsx("div", { className: "bg-team-current absolute top-6 right-6 z-10 h-4 w-4 rounded-full p-1 lg:left-6" }) : null,
        /* @__PURE__ */ jsx(
          ClipboardCopyButton,
          {
            value: permalink,
            className: "absolute top-6 left-6 z-10"
          }
        )
      ]
    }
  );
}
function BlogSection({
  articles,
  title,
  description,
  showArrowButton = true
}) {
  if (!articles.length) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      HeaderSection,
      {
        title,
        subTitle: description,
        cta: showArrowButton ? "See the full blog" : void 0,
        ctaUrl: "/blog"
      }
    ),
    /* @__PURE__ */ jsx(Spacer, { size: "2xs" }),
    /* @__PURE__ */ jsx(Grid, { className: "gap-y-16", children: articles.slice(0, 3).map((article, idx) => /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx("col-span-4", {
          "hidden lg:block": idx >= 2
        }),
        children: /* @__PURE__ */ jsx(ArticleCard, { article })
      },
      article.slug
    )) })
  ] });
}
function ErrorPage({
  error,
  articles,
  possibleMatches,
  possibleMatchesQuery,
  heroProps
}) {
  const resolvedHeroProps = heroProps.action ? heroProps : possibleMatches?.length ? {
    ...heroProps,
    arrowUrl: "#possible-matches",
    arrowLabel: "Possible matches"
  } : articles?.length ? {
    ...heroProps,
    arrowUrl: "#articles",
    arrowLabel: "But wait, there is more!"
  } : heroProps;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          backgroundColor: "black",
          color: "white",
          padding: 30
        },
        children: [
          /* @__PURE__ */ jsx("h1", { style: { fontSize: "2em" }, children: heroProps.title }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.5em" }, children: heroProps.subtitle }),
          /* @__PURE__ */ jsx("small", { children: "Also, this site works much better with JavaScript enabled..." })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("main", { className: "relative", children: [
      null,
      /* @__PURE__ */ jsx(HeroSection, { ...resolvedHeroProps }),
      possibleMatches?.length ? /* @__PURE__ */ jsx(
        PossibleMatchesSection,
        {
          matches: possibleMatches,
          query: possibleMatchesQuery
        }
      ) : null,
      possibleMatches?.length === 0 ? /* @__PURE__ */ jsx(Spacer, { size: "lg" }) : null,
      articles?.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { id: "articles" }),
        /* @__PURE__ */ jsx(
          BlogSection,
          {
            articles,
            title: "Looking for something to read?",
            description: "Have a look at these articles."
          }
        )
      ] }) : null
    ] })
  ] });
}
function PossibleMatchesSection({
  matches,
  query
}) {
  const q = typeof query === "string" ? query.trim() : "";
  const sorted = sortNotFoundMatches(matches);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { id: "possible-matches" }),
    /* @__PURE__ */ jsx(
      HeaderSection,
      {
        title: "Possible matches",
        subTitle: q ? `Closest matches for "${q}"` : "Closest matches."
      }
    ),
    /* @__PURE__ */ jsx(Spacer, { size: "2xs" }),
    /* @__PURE__ */ jsx(Grid, { children: /* @__PURE__ */ jsx("div", { className: "col-span-full lg:col-span-8 lg:col-start-3", children: /* @__PURE__ */ jsx("ul", { className: "space-y-6", children: sorted.slice(0, 8).map((m) => /* @__PURE__ */ jsx(
      "li",
      {
        className: "rounded-lg bg-gray-100 p-4 sm:p-6 dark:bg-gray-800",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0", children: m.imageUrl ? /* @__PURE__ */ jsx(
            "img",
            {
              src: m.imageUrl,
              alt: m.imageAlt ?? "",
              className: "h-12 w-12 rounded-lg object-cover sm:h-16 sm:w-16",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-lg bg-gray-200 sm:h-16 sm:w-16 dark:bg-gray-700" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx(H4, { className: "truncate", children: /* @__PURE__ */ jsx("a", { href: m.url, className: "hover:underline", children: m.title }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-slate-500", children: [
              /* @__PURE__ */ jsx("span", { children: m.type }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: m.url })
            ] }),
            m.summary ? /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-3 text-base text-slate-600 sm:mt-3 dark:text-slate-400", children: m.summary }) : null
          ] })
        ] })
      },
      `${m.type}:${m.url}`
    )) }) }) })
  ] });
}
function FourOhFour({
  articles,
  possibleMatches: possibleMatchesProp,
  possibleMatchesQuery,
  pathname: pathnameProp
}) {
  const routeMatches = useMatches();
  const last = routeMatches[routeMatches.length - 1];
  const pathname = typeof pathnameProp === "string" ? pathnameProp : last?.pathname;
  const derivedQuery = notFoundQueryFromPathname(pathname ?? "/");
  const effectiveQuery = typeof possibleMatchesQuery === "string" && possibleMatchesQuery.trim() ? possibleMatchesQuery.trim() : derivedQuery;
  const q = effectiveQuery ? effectiveQuery.trim() : "";
  const searchUrl = q ? `/search?q=${encodeURIComponent(q)}` : "/search";
  const hasPossibleMatches = Array.isArray(possibleMatchesProp) && possibleMatchesProp.length > 0;
  const heroAction = hasPossibleMatches ? /* @__PURE__ */ jsx(ArrowLink, { to: "#possible-matches", className: "whitespace-nowrap", children: "Possible matches" }) : /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(ArrowLink, { to: searchUrl, className: "whitespace-nowrap", children: "Search the site" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Uses semantic search to find related content." })
  ] });
  const notFoundGutterStyle = {
    ["--spacing-10vw"]: "clamp(0.75rem, 3vw, 3rem)"
  };
  return /* @__PURE__ */ jsx("div", { style: notFoundGutterStyle, children: /* @__PURE__ */ jsx(
    ErrorPage,
    {
      articles,
      possibleMatches: possibleMatchesProp,
      possibleMatchesQuery: effectiveQuery,
      heroProps: {
        title: "404 - Oh no, you found a page that's missing stuff.",
        subtitle: `"${pathname}" is not a page on abhidev.com. So sorry.`,
        image: /* @__PURE__ */ jsx(MissingSomething, { className: "rounded-lg", aspectRatio: "3:4" }),
        action: heroAction
      }
    }
  ) });
}
function FourHundred({ error }) {
  return /* @__PURE__ */ jsx(
    ErrorPage,
    {
      heroProps: {
        title: "400 - Oh no, you did something wrong.",
        subtitle: getErrorMessage(
          error,
          `If you think I made a mistake, let me know...`
        ),
        image: /* @__PURE__ */ jsx(Facepalm, { className: "rounded-lg", aspectRatio: "3:4" }),
        action: /* @__PURE__ */ jsx(ArrowLink, { href: "/", children: "Go home" })
      }
    }
  );
}
function ServerError({
  error,
  articles
}) {
  const matches = useMatches();
  const last = matches[matches.length - 1];
  const pathname = last?.pathname;
  return /* @__PURE__ */ jsx(
    ErrorPage,
    {
      error,
      articles,
      heroProps: {
        title: "500 - Oh no, something did not go well.",
        subtitle: `"${pathname}" is currently not working. So sorry.`,
        image: /* @__PURE__ */ jsx(Grimmacing, { className: "rounded-lg", aspectRatio: "3:4" }),
        action: /* @__PURE__ */ jsx(ArrowLink, { href: "/", children: "Go home" })
      }
    }
  );
}
function IconLink(props) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      ...props,
      className: `${props.className ?? ""} text-primary hover:text-team-current focus:text-team-current focus:outline-none`,
      children: props.children
    }
  );
}
function Signature({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "208",
      height: "110",
      viewBox: "0 0 208 110",
      className,
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx("path", { d: "m10.7 8.7c-0.4 4.3-2.7 19-5.2 32.7s-4.5 25.7-4.5 26.5c0 2.6 1.6 4.2 3.3 3.5 2.1-0.8 2.2-2.4 0.2-2.4-1.2 0-1.5-0.7-1-3.3 0.3-1.7 1.2-6.8 1.9-11.2 1.1-7 1.5-8 3.2-7.7 10.1 1.7 21.1 1.2 43.4-2.2 28.3-4.2 50-6.9 50.7-6.3 0.2 0.3-0.1 3.3-0.7 6.7s-0.9 6.4-0.6 6.7c1.2 1.3 2.4-1.1 2.9-6.3 0.3-3.1 1-6.1 1.5-6.6 0.6-0.6 9.9-1.8 20.9-2.8 33-3.1 38.7-3.4 38-2.3-0.4 0.6-1.9 1.4-3.4 1.8-1.6 0.3-8 2.6-14.3 5-6.3 2.5-23.2 8.7-37.5 13.9s-33.2 12.2-42 15.6c-28.5 10.9-50.4 19-51.5 19-0.5 0-1 0.4-1 1 0 0.5 0.2 1 0.4 1 1.2 0 28-9.7 60.6-22 20.6-7.8 42.5-15.9 48.5-18 6.1-2.1 13.6-4.8 16.8-6s6-2 6.3-1.8c0.2 0.3-0.5 1.7-1.6 3.1-1.2 1.4-2.7 4.3-3.4 6.4-1.1 3.2-1.7 3.8-4.5 3.9-3.9 0.2-7.1 2.9-7.1 6 0 2.3 2.5 4.4 4.5 3.9 0.6-0.2 2.2-0.6 3.8-0.9 4.2-1 3.2-2.5-1.3-1.9-3.6 0.5-4 0.3-4-1.5 0-2.9 4.4-4 6.9-1.8 1.7 1.5 1.8 1.3 3-3.7 0.6-2.9 2.3-7 3.6-9 1.4-2 2.5-4.2 2.5-5s1.9-1.9 4.3-2.7c2.3-0.6 7.1-2.5 10.7-4.2 5-2.2 6.1-3.1 5-3.8-2.5-1.6-12-1.2-46.6 2-37.5 3.5-49.3 4.9-71.9 8.5-28.1 4.4-43.5 4.3-43.5-0.3 0-2.9 13.9-15.2 26.9-24 10.2-6.9 12.5-8.1 13.8-7 1.2 1 1.8 0.8 3.4-1.2 2.3-3.1 2.4-4 0.1-4-4 0-27.1 15.3-37.3 24.7-3.5 3.3-5.9 4.9-5.9 4 0-0.8 0.9-5.9 2-11.2 2-9.9 2.7-22.5 1.1-22.5-0.4 0-1.1 3.5-1.4 7.7z" }),
        /* @__PURE__ */ jsx("path", { d: "m165.1 40.7c-0.7 1.6-1.6 5.4-1.9 8.6-0.5 5.6-0.6 5.8-2.9 5.2-3.2-0.8-8.6 2.6-11.4 7.1-2.6 4.2-1.5 6.1 2.8 4.9 1.5-0.5 3.3-0.7 3.8-0.6 0.6 0.2 8.2 1.8 17 3.6 26.5 5.5 31.5 6.8 31.5 8 0 1.6-15.1 4-41 6.5-33.2 3.2-75.6 9.8-115.5 18-8.2 1.7-19.2 3.4-24.2 3.7-2.2066 0.132-5.0134 0.952-8.2618-0.36-1.2736-0.678-2.2382-1.25-0.5001-3.327 0.1923-0.577-0.7381-2.1132-2.0381-1.013-2 1.7-1.9 3.3 0.3 5.3 3 2.7 13.2 2.1 35.4-2.2 51.6-10 83.4-14.9 118.3-18.1 12.7-1.2 26.1-2.8 29.9-3.6 6.7-1.3 11.6-3.6 11.6-5.3 0-2.1-17.4-6.7-40.3-10.7-5.3-1-9.6-2.2-9.4-2.8 0.4-1.3 18.2-7.2 27.4-9.1 3.9-0.8 8.6-1.2 10.4-0.8 2.5 0.5 3.1 0.3 2.7-0.8-1-2.9-20.9 0-32 4.6-1.5 0.6-1.8 0.1-1.8-3.2 0-2.1 0.7-6.5 1.5-9.6 1.8-6.8 1.7-6.7 0.7-6.7-0.5 0-1.4 1.2-2.1 2.7zm-3.1 17.3c0 0.5-2 1.9-4.5 3.1s-4.8 2.5-5.1 3c-0.7 1.3-2.4 1.1-2.4-0.2 0-2.2 6.2-6.9 9.1-6.9 1.6 0 2.9 0.4 2.9 1z" }),
        /* @__PURE__ */ jsx("path", { d: "m84.2 49.6c-2.4 1.6-3 5.4-0.9 5.4 2.4 0 10.7-3.2 10.7-4.1 0-1.2-0.1-1.2-4.3 0.6-4.3 1.8-4.7 1.8-4.7 0.5 0-0.6 1.1-1.5 2.5-2s2.5-1.2 2.5-1.5c0-1.1-3.7-0.4-5.8 1.1z" }),
        /* @__PURE__ */ jsx("path", { d: "m27.6 54.4c-2.9 2.5-6.6 4.6-8 4.8-1.5 0.2-2.5 0.7-2.4 1.3 0.5 1.7 7.9 0.5 13.7-2.1 6.5-2.9 7.3-3 8.9-0.4 1.2 2 4.6 2.7 5.6 1.1 0.3-0.5-0.5-1.2-1.8-1.5s-2.6-1.5-2.9-2.7c-0.4-1.6-1.1-1.9-2.6-1.4-1.7 0.5-2.1 0.2-2.1-1.4 0-3.2-2.4-2.5-8.4 2.3zm5.1 0.3c-0.9 0.9-1.9 1.4-2.3 1.1-1-1 0.6-2.8 2.4-2.8 1.5 0 1.5 0.1-0.1 1.7z" }),
        /* @__PURE__ */ jsx("path", { d: "m59.2 52.3c-2.5 2.7-3 7.7-0.8 7.7 0.9 0 1.6-1.2 1.8-2.7 0.2-1.9 1.2-3.2 3.1-4.1 1.5-0.7 2.5-1.7 2.2-2.3-1.1-1.6-4.1-1-6.3 1.4z" }),
        /* @__PURE__ */ jsx("path", { d: "m116.1 57.6c-4.4 3.7-4.1 5.8 0.5 5.1 4.3-0.7 11.7-5.3 10.9-6.7-1.3-2.1-8.3-1.1-11.4 1.6zm6.9 0.2c0 0.9-4.4 3.2-6 3.2-2.3 0-0.7-2 2.3-2.9 1.7-0.5 3.3-1 3.5-1 0.1-0.1 0.2 0.3 0.2 0.7z" })
      ]
    }
  );
}
function NewsletterSection() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(H6, { as: "div", children: "Stay up to date" }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 max-w-md", children: /* @__PURE__ */ jsxs(Paragraph, { prose: false, children: [
      `
            Subscribe to the newsletter to stay up to date with articles,
            courses and much more!
          `,
      /* @__PURE__ */ jsxs(
        Link,
        {
          prefetch: "intent",
          to: "/subscribe",
          className: "text-secondary underlined hover:text-team-current focus:text-team-current",
          children: [
            `Learn more about the newsletter`,
            " ",
            /* @__PURE__ */ jsx(ArrowIcon, { className: "inline-block", direction: "top-right" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(KitForm, { formId: "newsletter", kitFormId: "827139" }) })
  ] });
}
function ContactSection() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(H6, { as: "div", children: "Contact" }),
    /* @__PURE__ */ jsxs("ul", { className: "mt-4", children: [
      /* @__PURE__ */ jsx(FooterLink, { name: "Email Kent", href: "/contact" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "call AbhiDev", href: "/calls" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Office hours", href: "/office-hours" })
    ] })
  ] });
}
function GeneralSection() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(H6, { as: "div", children: "General" }),
    /* @__PURE__ */ jsxs("ul", { className: "mt-4", children: [
      /* @__PURE__ */ jsx(FooterLink, { name: "My Mission", href: "/transparency" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Privacy policy", href: "/transparency#privacy" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Terms of use", href: "/transparency#terms" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Code of conduct", href: "/conduct" })
    ] })
  ] });
}
function SitemapSection() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(H6, { as: "div", children: "Sitemap" }),
    /* @__PURE__ */ jsxs("ul", { className: "mt-4", children: [
      /* @__PURE__ */ jsx(FooterLink, { name: "Home", href: "/" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Blog", href: "/blog" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Portfolio", href: "/courses" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Discord", href: "/discord" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Chats Podcast", href: "/chats" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Talks", href: "/talks" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Testimony", href: "/testimony" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Testimonials", href: "/testimonials" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "About", href: "/about" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Resume", href: "/resume" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Credits", href: "/credits" }),
      /* @__PURE__ */ jsx(FooterLink, { name: "Sitemap.xml", reload: true, href: "/sitemap.xml" })
    ] })
  ] });
}
function AboutSection() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(H4, { as: "div", children: "AbhiDev" }),
    /* @__PURE__ */ jsx("p", { className: "text-secondary mt-6 max-w-md text-2xl", children: "Full time educator making our world better" }),
    /* @__PURE__ */ jsxs("div", { className: "text-secondary mt-6 flex items-center justify-between gap-4 xl:flex-col xl:items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(IconLink, { href: externalLinks.github, children: /* @__PURE__ */ jsx(GithubIcon, { size: 32 }) }),
        /* @__PURE__ */ jsx(IconLink, { href: externalLinks.youtube, children: /* @__PURE__ */ jsx(YoutubeIcon, { size: 32 }) }),
        /* @__PURE__ */ jsx(IconLink, { href: externalLinks.twitter, children: /* @__PURE__ */ jsx(XIcon, { size: 32 }) }),
        /* @__PURE__ */ jsx(IconLink, { href: externalLinks.rss, children: /* @__PURE__ */ jsx(RssIcon, { size: 32 }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-secondary relative flex w-24 items-center xl:mt-20 xl:w-32", children: /* @__PURE__ */ jsx(Signature, { className: "absolute block w-full" }) })
    ] })
  ] });
}
function FooterLink({
  name,
  href,
  reload
}) {
  return /* @__PURE__ */ jsx("li", { className: "py-1", children: /* @__PURE__ */ jsx(
    AnchorOrLink,
    {
      prefetch: href.startsWith("http") ? void 0 : "intent",
      href,
      className: "text-secondary underlined hover:text-team-current focus:text-team-current inline-block text-lg whitespace-nowrap focus:outline-none",
      reload,
      children: name
    }
  ) });
}
function Footer({ image }) {
  const { userInfo } = useRootData();
  const subscribedToNewsletter = Boolean(userInfo) || userInfo?.kit?.tags.some(
    ({ name }) => name === "Subscribed: general newsletter"
  );
  const featuredImg = /* @__PURE__ */ jsx("div", { className: "aspect-[4/3]", children: /* @__PURE__ */ jsx(
    "img",
    {
      loading: "lazy",
      ...getImgProps(image, {
        className: "w-full rounded-sm object-contain max-w-[400px] max-h-[400px]",
        widths: [300, 800],
        sizes: ["(max-width: 639px) 80vw", "400px"],
        transformations: {
          resize: {
            aspectRatio: "4:3",
            type: "fit"
          }
        }
      })
    }
  ) });
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-gray-200 pt-48 pb-16 dark:border-gray-600", children: /* @__PURE__ */ jsx("div", { className: "mx-10vw relative", children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid max-w-7xl grid-cols-4 grid-rows-[max-content] gap-x-4 md:grid-cols-8 xl:grid-cols-12 xl:gap-x-6", children: [
    /* @__PURE__ */ jsx("div", { className: "col-span-full md:col-span-3 xl:row-span-2", children: /* @__PURE__ */ jsx(AboutSection, {}) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-full mt-20 md:col-span-5 md:col-start-1 xl:hidden", children: subscribedToNewsletter ? featuredImg : /* @__PURE__ */ jsx(NewsletterSection, {}) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-2 mt-20 md:col-start-5 md:row-start-1 md:mt-0", children: /* @__PURE__ */ jsx(ContactSection, {}) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-2 mt-20 md:col-start-7 md:row-start-1 md:mt-0 xl:col-start-5 xl:row-start-2 xl:mt-16", children: /* @__PURE__ */ jsx(GeneralSection, {}) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-full mt-20 md:col-span-2 md:col-start-7 xl:col-start-5 xl:row-span-2 xl:row-start-1 xl:mt-0 xl:ml-56", children: /* @__PURE__ */ jsx(SitemapSection, {}) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-4 col-start-9 row-span-2 row-start-1 mt-0 hidden xl:block", children: subscribedToNewsletter ? featuredImg : /* @__PURE__ */ jsx(NewsletterSection, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-full mt-24 text-lg text-gray-500 md:mt-44 dark:text-slate-500", children: [
      /* @__PURE__ */ jsx("span", { children: "All rights reserved" }),
      " ",
      /* @__PURE__ */ jsx("span", { className: "block md:inline", children: `© AbhiDev ${(/* @__PURE__ */ new Date()).getFullYear()}` })
    ] })
  ] }) }) });
}
const { Provider: TeamProviderBase, useValue: useTeam } = createSimpleContext("Team");
function TeamProvider({
  children
}) {
  const { user } = useRootData();
  const [team, setTeam] = React.useState("UNKNOWN");
  React.useEffect(() => {
    if (!user) setTeam("UNKNOWN");
  }, [user]);
  return /* @__PURE__ */ jsx(
    TeamProviderBase,
    {
      value: [user && isTeam(user.team) ? user.team : team, setTeam],
      children
    }
  );
}
const teamEmoji = {
  RED: "🔴",
  BLUE: "🔵",
  YELLOW: "🟡",
  UNKNOWN: "⚪"
};
function polarToCartesian(x, y, r, degrees) {
  const radians = degrees * Math.PI / 180;
  return [x + r * Math.cos(radians), y + r * Math.sin(radians)];
}
function getSegmentPath({
  size,
  margin = 0.1,
  segments,
  radius = size / 2,
  width = 1
}, segment, span = 1) {
  const center = size / 2;
  const degrees = 360 / segments;
  const shift = margin === 0 ? -90 : -90 + degrees * margin / 2;
  const start = shift + degrees * segment;
  const end = shift + degrees * (segment + span - margin) + (margin == 0 ? 1 : 0);
  const innerRadius = radius - width;
  const arc = Math.abs(start - end) > 180 ? 1 : 0;
  const point = (rad, deg) => polarToCartesian(center, center, rad, deg).map((n) => n.toPrecision(5)).join(",");
  return [
    `M${point(radius, start)}`,
    `A${radius},${radius},0,${arc},1,${point(radius, end)}`,
    `L${point(radius - width, end)}`,
    `A${innerRadius},${innerRadius},0,${arc},0,${point(innerRadius, start)}`,
    "Z"
  ].join("");
}
const colors = {
  YELLOW: "text-team-yellow",
  BLUE: "text-team-blue",
  RED: "text-team-red",
  UNKNOWN: "text-team-unknown"
};
function TeamCircle({
  size,
  width = 2,
  team
}) {
  let options = { size, width, margin: 0.05, segments: 3 };
  if (team === "UNKNOWN") {
    return /* @__PURE__ */ jsxs("svg", { height: size, width: size, viewBox: `0 0 ${size} ${size}`, children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: getSegmentPath(options, 0),
          className: "text-team-yellow",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: getSegmentPath(options, 1),
          className: "text-team-blue",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: getSegmentPath(options, 2),
          className: "text-team-red",
          fill: "currentColor"
        }
      )
    ] });
  }
  const [teamOne, teamTwo] = Object.keys(colors).filter((x) => x !== team);
  const teamSpan = 3;
  options = { ...options, segments: 2 + 2 * teamSpan };
  return /* @__PURE__ */ jsxs("svg", { height: size, width: size, viewBox: `0 0 ${size} ${size}`, children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: getSegmentPath(options, 0, teamSpan),
        className: colors[team],
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: getSegmentPath(options, teamSpan),
        className: colors[teamOne],
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: getSegmentPath(options, teamSpan + 1, teamSpan),
        className: colors[team],
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: getSegmentPath(options, options.segments - 1),
        className: colors[teamTwo],
        fill: "currentColor"
      }
    )
  ] });
}
function useNavbarLinks() {
  const { latestPodcastSeasonLinks } = useRootData();
  const chatsTo = latestPodcastSeasonLinks?.chats.latestSeasonPath ?? "/chats";
  const callsTo = latestPodcastSeasonLinks?.calls.latestSeasonPath ?? "/calls";
  const links2 = React.useMemo(
    () => [
      { id: "home", name: "Home", to: "/" },
      { id: "music", name: "Music", to: "/#hero" },
      { id: "blog", name: "Blog", to: "/blog" },
      { id: "talks", name: "Talks", to: "/talks" },
      { id: "courses", name: "Portfolio", to: "/courses" },
      { id: "discord", name: "Discord", to: "/discord" },
      { id: "chats", name: "Chats", to: chatsTo, activeTo: "/chats" },
      { id: "calls", name: "Calls", to: callsTo, activeTo: "/calls" },
      { id: "about", name: "About", to: "/about" }
    ],
    [chatsTo, callsTo]
  );
  const mobileLinks = React.useMemo(
    () => [
      { name: "Home", to: "/" },
      ...links2.map((l) => ({ name: l.name, to: l.to }))
    ],
    [links2]
  );
  return { links: links2, mobileLinks };
}
const searchHotkeyOptions = {
  ignoreInputs: true,
  preventDefault: true,
  requireReset: true,
  stopPropagation: true
};
const searchHotkeyModifierOptions = {
  preventDefault: true,
  requireReset: true,
  stopPropagation: true
};
function NavLink({
  to,
  activeTo,
  navItem,
  ...rest
}) {
  const location2 = useLocation();
  const matchTo = activeTo ?? to;
  const isSelected = matchTo === location2.pathname || matchTo !== "/" && location2.pathname.startsWith(`${matchTo}/`);
  return /* @__PURE__ */ jsx("li", { className: "px-5 py-2", "data-nav-item": navItem, children: /* @__PURE__ */ jsx(
    Link,
    {
      prefetch: "intent",
      className: clsx(
        "underlined hover:text-team-current focus:text-team-current block text-lg font-medium whitespace-nowrap focus:outline-none",
        {
          "active text-team-current": isSelected,
          "text-secondary": !isSelected
        }
      ),
      to,
      ...rest
    }
  ) });
}
const iconTransformOrigin = { transformOrigin: "50% 100px" };
function DarkModeToggle({
  variant = "icon"
}) {
  const fetcher = useFetcher({ key: THEME_FETCHER_KEY });
  const optimisticMode = useOptimisticThemeMode();
  const theme = useTheme();
  const mode = optimisticMode ?? theme;
  const nextMode = mode === "dark" ? "day" : mode === "day" ? "light" : mode === "light" ? "brand" : mode === "brand" ? "redblue" : "dark";
  const iconSpanClassName = "absolute inset-0 transform transition-transform duration-700 motion-reduce:duration-[0s]";
  const nextModeLabel = nextMode === "light" ? "light" : nextMode === "dark" ? "dark" : nextMode === "day" ? "day" : nextMode === "brand" ? "brand" : "red + blue";
  return /* @__PURE__ */ jsxs(fetcher.Form, { method: "POST", action: "/action/set-theme", children: [
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "theme", value: nextMode }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "submit",
        className: clsx(
          "focus-ring border-secondary hover:border-primary focus:border-primary inline-flex h-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 p-1 transition",
          {
            "w-14": variant === "icon",
            "px-8": variant === "labelled"
          }
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-8 w-8", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: clsx(
                  iconSpanClassName,
                  mode === "dark" ? "rotate-0" : "rotate-90"
                ),
                style: iconTransformOrigin,
                children: /* @__PURE__ */ jsx(MoonIcon, {})
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: clsx(
                  iconSpanClassName,
                  mode === "light" || mode === "day" ? "rotate-0" : "-rotate-90"
                ),
                style: iconTransformOrigin,
                children: /* @__PURE__ */ jsx(SunIcon, {})
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: clsx(
                  iconSpanClassName,
                  mode === "redblue" ? "translate-y-0" : "translate-y-10"
                ),
                style: iconTransformOrigin,
                children: /* @__PURE__ */ jsx(MicrophoneIcon, { size: 32 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("span", { className: clsx("ml-4", { "sr-only": variant === "icon" }), children: `Switch to ${nextModeLabel} mode` })
        ]
      }
    )
  ] });
}
function isPlainLeftClick(event) {
  return event.button === 0 && !event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey;
}
function NavSearch({
  isOpen,
  onOpenChange,
  onCloseWithFocusIntent,
  searchIconRef,
  alwaysExpanded,
  searchInputRef
}) {
  const navigate = useNavigate();
  const fetcher = useFetcher({
    key: "navbar-search"
  });
  const [suggestions, setSuggestions] = React.useState(
    []
  );
  const [fetchError, setFetchError] = React.useState(null);
  const buttonRef = React.useRef(null);
  const internalInputRef = React.useRef(null);
  const inputRef = searchInputRef ?? internalInputRef;
  const overlayRef = React.useRef(null);
  const isClosingRef = React.useRef(false);
  const shouldFocusIconRef = React.useRef(true);
  const shouldReduceMotion = useReducedMotion();
  const debouncedLoadSuggestions = useDebounce((nextQuery) => {
    void fetcher.load(
      `/resources/search?query=${encodeURIComponent(nextQuery.trim())}`
    );
  }, 250);
  React.useEffect(() => {
    if (Array.isArray(fetcher.data)) {
      setFetchError(null);
      setSuggestions(fetcher.data);
      return;
    }
    if (fetcher.data && "results" in fetcher.data && Array.isArray(fetcher.data.results)) {
      setFetchError(null);
      setSuggestions(fetcher.data.results);
      return;
    }
    if (fetcher.data && "error" in fetcher.data) {
      setSuggestions([]);
      setFetchError(fetcher.data.error);
      return;
    }
  }, [fetcher.data]);
  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen, inputRef]);
  const [isClosing, setIsClosing] = React.useState(false);
  function navigateToSearch(nextQuery) {
    const q = nextQuery.trim();
    if (!q) return;
    void navigate(`/search?q=${encodeURIComponent(q)}`);
    close({ focusIcon: false });
  }
  function navigateToSuggestion(url) {
    try {
      const u = new URL(url, window.location.origin);
      const isSameOrigin = u.origin === window.location.origin;
      if (isSameOrigin) {
        void navigate(`${u.pathname}${u.search}${u.hash}`);
      } else {
        window.location.assign(url);
      }
    } catch {
      window.location.assign(url);
    } finally {
      close({ focusIcon: false });
    }
  }
  const {
    isOpen: isMenuOpen,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    inputValue,
    reset,
    setInputValue
  } = useCombobox({
    items: suggestions,
    itemToString: (item) => item ? item.title : "",
    onInputValueChange: ({ inputValue: nextValue }) => {
      setFetchError(null);
      if (!nextValue || nextValue.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      debouncedLoadSuggestions(nextValue);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setInputValue("");
        navigateToSuggestion(selectedItem.url);
      }
    },
    stateReducer: (state, { type, changes }) => {
      if (type === useCombobox.stateChangeTypes.InputKeyDownEnter && state.highlightedIndex === -1) {
        return { ...changes, isOpen: false };
      }
      return changes;
    }
  });
  const finishClose = React.useCallback(() => {
    onOpenChange(false);
    if (shouldFocusIconRef.current) onCloseWithFocusIntent?.();
    isClosingRef.current = false;
  }, [onOpenChange, onCloseWithFocusIntent]);
  const close = React.useCallback(
    (options) => {
      if (isClosingRef.current) return;
      shouldFocusIconRef.current = options?.focusIcon ?? true;
      setFetchError(null);
      reset();
      setSuggestions([]);
      if (alwaysExpanded || shouldReduceMotion) {
        finishClose();
        return;
      }
      isClosingRef.current = true;
      setIsClosing(true);
    },
    [alwaysExpanded, finishClose, reset, shouldReduceMotion]
  );
  const handleBlurReset = React.useCallback(
    (event) => {
      const relatedTarget = event.relatedTarget;
      if (relatedTarget && overlayRef.current?.contains(relatedTarget)) {
        return;
      }
      close({ focusIcon: !relatedTarget });
    },
    [close]
  );
  const showForm = isOpen || alwaysExpanded;
  const labelProps = getLabelProps();
  const searchInputProps = getInputProps(
    {
      ref: inputRef,
      type: "text",
      name: "q",
      "data-nav-search-input": "true",
      autoComplete: "off",
      placeholder: "Search projects, blogs, AI work...",
      className: "text-primary bg-transparent h-14 w-full py-0 pr-14 pl-3 text-lg font-medium focus:outline-none placeholder:text-secondary",
      onBlur: alwaysExpanded ? void 0 : handleBlurReset,
      onKeyDown: (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          if (alwaysExpanded) onOpenChange(false);
          else close();
        }
      }
    },
    {
      // The input is absent in compact icon-only mode, but Downshift still expects
      // getInputProps to be called each render.
      suppressRefError: !showForm
    }
  );
  const shouldShowSuggestions = inputValue.trim().length >= 2;
  const menuProps = getMenuProps(
    {
      "aria-label": "Search suggestions",
      className: clsx(
        "rounded-2xl",
        shouldShowSuggestions && suggestions.length ? "bg-primary border-secondary max-h-96 overflow-x-hidden overflow-y-auto border shadow-lg" : "overflow-hidden border-0"
      )
    },
    {
      // When the compact icon-only state is rendered there is no menu element.
      // We still call getMenuProps to satisfy Downshift without requiring a ref.
      suppressRefError: !showForm
    }
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: overlayRef,
      className: clsx(
        "relative flex min-w-0 flex-1 items-center",
        showForm && !alwaysExpanded && "pointer-events-none"
      ),
      children: showForm ? /* @__PURE__ */ jsxs(
        "form",
        {
          method: "get",
          action: "/search",
          className: "relative flex min-w-0 flex-1 flex-col",
          onSubmit: (event) => {
            event.preventDefault();
            if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
              setInputValue("");
              navigateToSuggestion(suggestions[highlightedIndex].url);
              return;
            }
            navigateToSearch(inputValue);
          },
          children: [
            alwaysExpanded ? /* @__PURE__ */ jsxs("div", { className: "bg-primary pointer-events-auto flex min-h-14 w-full overflow-hidden rounded-full shadow-[inset_0_0_0_2px_var(--border-secondary)] transition-shadow focus-within:shadow-[inset_0_0_0_2px_var(--color-team-current)] hover:shadow-[inset_0_0_0_2px_var(--color-team-current)]", children: [
              /* @__PURE__ */ jsx("label", { ...labelProps, className: "sr-only", children: "Search" }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  ref: buttonRef,
                  prefetch: "intent",
                  to: "/search",
                  "aria-label": "Search",
                  "aria-disabled": !!alwaysExpanded,
                  tabIndex: alwaysExpanded ? -1 : isOpen ? -1 : void 0,
                  className: clsx(
                    "focus-ring text-primary z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center border-2 border-transparent p-1 focus:outline-none",
                    (isOpen || alwaysExpanded) && "pointer-events-none"
                  ),
                  onClick: (event) => {
                    if (alwaysExpanded || isOpen || !isPlainLeftClick(event))
                      return;
                    event.preventDefault();
                    onOpenChange(!isOpen);
                  },
                  children: /* @__PURE__ */ jsx(SearchIcon, {})
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative flex min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("input", { ...searchInputProps }),
                /* @__PURE__ */ jsx("div", { className: "pointer-events-auto absolute top-1/2 right-4 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center", children: fetcher.state !== "idle" ? /* @__PURE__ */ jsx(SpinnerIcon, { size: 18, className: "animate-spin" }) : inputValue ? /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Clear search",
                    className: "focus-ring text-secondary hover:text-primary rounded p-1 transition focus:outline-none",
                    onClick: () => {
                      inputRef.current?.focus();
                      setInputValue("");
                    },
                    onBlur: alwaysExpanded ? void 0 : handleBlurReset,
                    onKeyDown: (event) => {
                      if (event.key === "Escape") {
                        event.preventDefault();
                        if (alwaysExpanded) onOpenChange(false);
                        else close();
                      }
                    },
                    children: /* @__PURE__ */ jsx(CloseIcon, { size: 18 })
                  }
                ) : null })
              ] })
            ] }) : /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "bg-primary pointer-events-auto flex min-h-14 overflow-hidden rounded-full shadow-[inset_0_0_0_2px_var(--border-secondary)] transition-shadow focus-within:shadow-[inset_0_0_0_2px_var(--color-team-current)] hover:shadow-[inset_0_0_0_2px_var(--color-team-current)]",
                initial: shouldReduceMotion ? false : { width: 56 },
                animate: { width: isClosing ? 56 : "100%" },
                transition: {
                  duration: shouldReduceMotion ? 0 : 0.25,
                  ease: [0.32, 0.72, 0, 1]
                },
                onAnimationComplete: () => {
                  if (isClosingRef.current) {
                    finishClose();
                    setIsClosing(false);
                  }
                },
                children: [
                  /* @__PURE__ */ jsx("label", { ...labelProps, className: "sr-only", children: "Search" }),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      ref: buttonRef,
                      prefetch: "intent",
                      to: "/search",
                      "aria-label": "Search",
                      "aria-disabled": isOpen,
                      tabIndex: isOpen ? -1 : void 0,
                      className: clsx(
                        "focus-ring text-primary z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center border-2 border-transparent p-1 focus:outline-none",
                        isOpen && "pointer-events-none"
                      ),
                      onClick: (event) => {
                        if (isOpen || !isPlainLeftClick(event)) return;
                        event.preventDefault();
                        onOpenChange(!isOpen);
                      },
                      children: /* @__PURE__ */ jsx(SearchIcon, {})
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "relative flex min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsx("input", { ...searchInputProps }),
                    /* @__PURE__ */ jsx("div", { className: "pointer-events-auto absolute top-1/2 right-4 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center", children: fetcher.state !== "idle" ? /* @__PURE__ */ jsx(SpinnerIcon, { size: 18, className: "animate-spin" }) : inputValue ? /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        "aria-label": "Clear search",
                        className: "focus-ring text-secondary hover:text-primary rounded p-1 transition focus:outline-none",
                        onClick: () => {
                          inputRef.current?.focus();
                          setInputValue("");
                        },
                        onBlur: handleBlurReset,
                        onKeyDown: (event) => {
                          if (event.key === "Escape") {
                            event.preventDefault();
                            close();
                          }
                        },
                        children: /* @__PURE__ */ jsx(CloseIcon, { size: 18 })
                      }
                    ) : null })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "pointer-events-auto absolute top-full right-0 left-0 z-50 mt-2", children: [
              fetchError ? /* @__PURE__ */ jsx("div", { className: "px-6 py-3 text-sm text-slate-500", children: fetchError }) : null,
              /* @__PURE__ */ jsx("ul", { ...menuProps, children: shouldShowSuggestions ? /* @__PURE__ */ jsx(Fragment, { children: isMenuOpen && suggestions.map((s, index) => /* @__PURE__ */ jsx(
                "li",
                {
                  ...getItemProps({
                    item: s,
                    index
                  }),
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: clsx(
                        "w-full cursor-pointer px-6 py-4 text-left focus:outline-none",
                        index === highlightedIndex ? "bg-secondary" : "hover:bg-secondary"
                      ),
                      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                        /* @__PURE__ */ jsx("div", { className: "shrink-0", children: s.imageUrl ? /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: s.imageUrl,
                            alt: s.imageAlt ?? "",
                            className: "h-10 w-10 rounded-md object-cover",
                            loading: "lazy"
                          }
                        ) : /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700" }) }),
                        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsx("div", { className: "text-primary truncate text-base font-medium", children: s.title }),
                          /* @__PURE__ */ jsxs("div", { className: "text-secondary mt-1 flex min-w-0 items-baseline gap-3 text-sm", children: [
                            /* @__PURE__ */ jsx("span", { className: "min-w-0 truncate", children: s.segment }),
                            /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-right", children: (() => {
                              try {
                                return new URL(s.url).pathname;
                              } catch {
                                return s.url;
                              }
                            })() })
                          ] }),
                          s.summary ? /* @__PURE__ */ jsx("div", { className: "text-secondary mt-2 line-clamp-2 text-sm", children: s.summary }) : null
                        ] })
                      ] })
                    }
                  )
                },
                `${s.url}-${index}`
              )) }) : null })
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          ref: searchIconRef ?? buttonRef,
          prefetch: "intent",
          to: "/search",
          "aria-label": "Search",
          className: "focus-ring border-secondary hover:border-primary focus:border-primary text-primary inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 p-1 transition",
          onClick: (event) => {
            if (!isPlainLeftClick(event)) return;
            event.preventDefault();
            onOpenChange(true);
          },
          children: /* @__PURE__ */ jsx(SearchIcon, {})
        }
      )
    }
  );
}
function MobileMenu({ links: links2 }) {
  const menuButtonRef = React.useRef(null);
  const popoverRef = React.useRef(null);
  const location2 = useLocation();
  React.useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;
    const openState = matchesPopoverOpen(popover);
    if (openState === "matches") {
      popover.hidePopover();
    } else if (openState === "old-browser") {
      window.location.reload();
    }
  }, [location2.pathname]);
  React.useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;
    const handleToggle = (event) => {
      const target = event.target;
      const popoverOpen = matchesPopoverOpen(target);
      if (popoverOpen === "matches") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };
    popover.addEventListener("toggle", handleToggle);
    return () => {
      popover.removeEventListener("toggle", handleToggle);
      document.body.style.overflow = "";
    };
  }, []);
  const closeMenu = React.useCallback(() => {
    if (popoverRef.current) {
      popoverRef.current.hidePopover?.();
      document.body.style.overflow = "";
    }
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onBlur: (event) => {
        if (!popoverRef.current || !menuButtonRef.current) return;
        const openState = matchesPopoverOpen(popoverRef.current);
        if (openState === "matches" && !event.currentTarget.contains(event.relatedTarget)) {
          const isRelatedTargetBeforeMenu = event.relatedTarget instanceof Node && event.currentTarget.compareDocumentPosition(event.relatedTarget) === Node.DOCUMENT_POSITION_PRECEDING;
          const focusableElements = Array.from(
            event.currentTarget.querySelectorAll("button,a")
          );
          const elToFocus = isRelatedTargetBeforeMenu ? focusableElements.at(-1) : focusableElements.at(0);
          if (elToFocus instanceof HTMLElement) {
            elToFocus.focus();
          } else {
            menuButtonRef.current.focus();
          }
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            ref: menuButtonRef,
            className: "focus:border-primary hover:border-primary border-secondary text-primary inline-flex h-14 w-14 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none",
            popoverTarget: "mobile-menu",
            children: /* @__PURE__ */ jsxs(
              "svg",
              {
                width: "32",
                height: "32",
                viewBox: "0 0 32 32",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ jsx("rect", { x: "6", y: "9", width: "20", height: "2", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ jsx("rect", { x: "6", y: "15", width: "20", height: "2", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ jsx("rect", { x: "6", y: "21", width: "20", height: "2", rx: "1", fill: "currentColor" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            id: "mobile-menu",
            ref: popoverRef,
            popover: "",
            className: "fixed top-[128px] right-0 bottom-0 left-0 m-0 h-[calc(100svh-128px)] w-full",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-primary flex h-full flex-col overflow-y-scroll border-t border-gray-200 pb-12 dark:border-gray-600", children: [
              /* @__PURE__ */ jsx("div", { className: "px-5vw border-b border-gray-200 py-4 dark:border-gray-600", children: /* @__PURE__ */ jsx(
                NavSearch,
                {
                  isOpen: true,
                  alwaysExpanded: true,
                  onOpenChange: (open) => {
                    if (!open) closeMenu();
                  }
                }
              ) }),
              links2.map((link) => /* @__PURE__ */ jsx(
                Link,
                {
                  className: "hover:bg-secondary focus:bg-secondary text-primary px-5vw hover:text-team-current border-b border-gray-200 py-9 dark:border-gray-600",
                  to: link.to,
                  onClick: closeMenu,
                  children: link.name
                },
                link.to
              )),
              /* @__PURE__ */ jsx("div", { className: "py-9 text-center", children: /* @__PURE__ */ jsx(DarkModeToggle, { variant: "labelled" }) })
            ] })
          }
        )
      ]
    }
  );
}
const durations = {
  initial: 40,
  hover: 3,
  focus: 3,
  active: 0.25
};
function ProfileButton({
  imageUrl,
  imageAlt,
  team,
  signupEmail
}) {
  const user = useOptionalUser();
  const controls = useAnimation();
  const [ref, state] = useElementState();
  const shouldReduceMotion = useReducedMotion();
  React.useEffect(() => {
    void controls.start((_, { rotate = 0 }) => {
      const target = typeof rotate === "number" ? state === "initial" ? rotate - 360 : rotate + 360 : 360;
      return shouldReduceMotion ? {} : {
        rotate: [rotate, target],
        transition: {
          duration: durations[state],
          repeat: Infinity,
          ease: "linear"
        }
      };
    });
  }, [state, controls, shouldReduceMotion]);
  return /* @__PURE__ */ jsxs(
    Link,
    {
      prefetch: "intent",
      to: user ? "/me" : signupEmail ? "/signup" : "/login",
      "aria-label": user ? "My Account" : signupEmail ? "Finish signing up" : "Login",
      className: clsx(
        "ml-4 inline-flex h-14 w-14 items-center justify-center rounded-full focus:outline-none"
      ),
      ref,
      children: [
        /* @__PURE__ */ jsx(motion.div, { className: "absolute", animate: controls, children: /* @__PURE__ */ jsx(TeamCircle, { size: 56, team }) }),
        /* @__PURE__ */ jsx(
          "img",
          {
            className: clsx("inline h-10 w-10 rounded-full select-none"),
            src: imageUrl,
            alt: imageAlt,
            crossOrigin: "anonymous"
          }
        )
      ]
    }
  );
}
function Navbar() {
  const navigate = useNavigate();
  const [team] = useTeam();
  const { requestInfo, userInfo } = useRootData();
  const { links: links2, mobileLinks } = useNavbarLinks();
  const avatar = userInfo ? userInfo.avatar : abhiBuddyProfiles[team];
  const navLinksRef = React.useRef(null);
  const searchIconRef = React.useRef(null);
  const searchInputRef = React.useRef(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const focusSearchIcon = React.useCallback(() => {
    requestAnimationFrame(() => searchIconRef.current?.focus());
  }, []);
  const openSearch = React.useCallback(() => {
    const canUseNavbarSearch = window.matchMedia("(min-width: 1024px)").matches;
    if (!canUseNavbarSearch) {
      void navigate("/search");
      return;
    }
    setIsSearchOpen(true);
  }, [navigate]);
  useHotkey(HOTKEY_OPEN_SEARCH.slash, openSearch, searchHotkeyOptions);
  useHotkey(HOTKEY_OPEN_SEARCH.modK, openSearch, searchHotkeyModifierOptions);
  return /* @__PURE__ */ jsx("div", { className: "px-5vw relative overflow-visible py-9 lg:py-12", children: /* @__PURE__ */ jsxs("nav", { className: "navbar-container text-primary relative mx-auto flex max-w-384 items-center gap-4 overflow-visible", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 shrink-0 items-center gap-4", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          prefetch: "intent",
          to: "/",
          className: "text-primary underlined block shrink-0 text-2xl font-medium whitespace-nowrap transition focus:outline-none",
          children: /* @__PURE__ */ jsx("h1", { children: "Aldev" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "shrink-0 max-lg:hidden", children: isSearchOpen ? /* @__PURE__ */ jsx("div", { className: "h-14 w-14 shrink-0", "aria-hidden": true }) : /* @__PURE__ */ jsx(
        NavSearch,
        {
          isOpen: isSearchOpen,
          onOpenChange: setIsSearchOpen,
          searchIconRef
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-14 min-w-0 flex-1 items-center justify-center", children: [
      isSearchOpen && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 left-[calc(-1*(3.5rem+1rem))] z-10 flex min-w-0 flex-1 items-center justify-start max-lg:hidden", children: /* @__PURE__ */ jsx(
        NavSearch,
        {
          isOpen: isSearchOpen,
          onOpenChange: setIsSearchOpen,
          onCloseWithFocusIntent: focusSearchIcon,
          searchInputRef
        }
      ) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: navLinksRef,
          className: "navbar-links flex-none justify-center overflow-visible max-lg:hidden lg:flex",
          children: /* @__PURE__ */ jsx("ul", { className: "flex", children: links2.map((link) => /* @__PURE__ */ jsx(
            NavLink,
            {
              to: link.to,
              activeTo: link.activeTo,
              navItem: link.id,
              children: link.name
            },
            link.id
          )) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 shrink-0 items-center justify-end", children: [
      /* @__PURE__ */ jsx("div", { className: "block lg:hidden", children: /* @__PURE__ */ jsx(MobileMenu, { links: mobileLinks }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-4 flex items-center gap-4 lg:ml-0", children: /* @__PURE__ */ jsx("div", { className: "noscript-hidden hidden lg:block", children: /* @__PURE__ */ jsx(DarkModeToggle, {}) }) }),
      /* @__PURE__ */ jsx(
        ProfileButton,
        {
          signupEmail: requestInfo.session.signupEmail,
          imageUrl: avatar.src,
          imageAlt: avatar.alt,
          team
        }
      )
    ] })
  ] }) });
}
function matchesPopoverOpen(element) {
  try {
    return element.matches(":popover-open") ? "matches" : "no-matches";
  } catch {
    return "old-browser";
  }
}
const appStyles = "/assets/app-viV_O_PA.css";
const noScriptStyles = "/assets/no-script-MBRsV9LZ.css";
const proseStyles = "/assets/prose-Co_yTA1P.css";
const tailwindStyles = "/assets/tailwind-BctPV9bX.css";
const vendorStyles = "/assets/vendors-6xrzUfLb.css";
const NonceContext = React.createContext("");
NonceContext.Provider;
const useNonce = () => React.useContext(NonceContext);
const latestPodcastSeasonLinksSchema = z.object({
  chats: z.object({
    latestSeasonNumber: z.number().nullable(),
    latestSeasonPath: z.string().min(1)
  }),
  calls: z.object({
    latestSeasonNumber: z.number().nullable(),
    latestSeasonPath: z.string().min(1)
  })
});
function formatSeasonParam(seasonNumber) {
  return String(seasonNumber).padStart(2, "0");
}
async function getLatestChatsSeasonNumber({
  request,
  timings,
  signal
}) {
  try {
    throwIfAborted(signal);
    const { getSeasonListItems } = await import("./simplecast.server-Cliy-rrj.js");
    const seasons = await getSeasonListItems({ request, timings, signal });
    const latestSeasonNumber = seasons.reduce(
      (max, s) => Math.max(max, s.seasonNumber ?? 0),
      0
    );
    return latestSeasonNumber || null;
  } catch (error) {
    if (isAbortError(error)) return null;
    console.error("podcast-latest-season: failed to load chats seasons", error);
    return null;
  }
}
async function getLatestCallsSeasonNumber({
  request,
  timings,
  signal
}) {
  try {
    throwIfAborted(signal);
    const { getEpisodes } = await import("./transistor.server-DFkoIrlM.js");
    const episodes = await getEpisodes({ request, timings, signal });
    const latestSeasonNumber = episodes.reduce(
      (max, e) => Math.max(max, e.seasonNumber ?? 0),
      0
    );
    return latestSeasonNumber || null;
  } catch (error) {
    if (isAbortError(error)) return null;
    console.error("podcast-latest-season: failed to load calls episodes", error);
    return null;
  }
}
async function getLatestPodcastSeasonLinks({
  request,
  timings,
  signal
}) {
  return cachified({
    cache,
    request,
    timings,
    key: "podcasts:latest-season-links",
    // Keep this fairly fresh; it's used on every page load for nav links.
    ttl: 1e3 * 60 * 5,
    staleWhileRevalidate: 1e3 * 60 * 60 * 24,
    checkValue: latestPodcastSeasonLinksSchema,
    getFreshValue: async () => {
      throwIfAborted(signal);
      const [latestChatsSeasonNumber, latestCallsSeasonNumber] = await Promise.all([
        getLatestChatsSeasonNumber({ request, timings, signal }),
        getLatestCallsSeasonNumber({ request, timings, signal })
      ]);
      return {
        chats: {
          latestSeasonNumber: latestChatsSeasonNumber,
          latestSeasonPath: latestChatsSeasonNumber ? `/chats/${formatSeasonParam(latestChatsSeasonNumber)}` : "/chats"
        },
        calls: {
          latestSeasonNumber: latestCallsSeasonNumber,
          latestSeasonPath: latestCallsSeasonNumber ? `/calls/${formatSeasonParam(latestCallsSeasonNumber)}` : "/calls"
        }
      };
    }
  });
}
const SEASON_7_PROMOTIFICATION_NAME = "chats-with-kent-season-7";
function isSeason7ChatsPath(pathname) {
  return /^\/chats\/(?:0?7)(?:\/|$)/.test(pathname);
}
const handle = {
  id: "root"
};
const meta = ({
  data: data2
}) => {
  const requestInfo = data2?.requestInfo;
  const title = "Aldev";
  const description = "Come check out how Aldev can help you level up your career as a software engineer.";
  return [{
    viewport: "width=device-width,initial-scale=1,viewport-fit=cover"
  }, {
    "theme-color": requestInfo?.userPrefs.theme === "dark" ? "#1F2028" : requestInfo?.userPrefs.theme === "brand" ? "#eef7ff" : "#FFF"
  }, ...getSocialMetas({
    keywords: "Learn React, Testing JavaScript Training, React Training, Learn JavaScript, Learn TypeScript",
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      words: "Helping people make the world a better place through quality software.",
      featuredImage: "abhidev.com/illustrations/abhiBuddy-flying_blue"
    }),
    title,
    description
  })];
};
const links = () => {
  return [{
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicons/apple-touch-icon.png"
  }, {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicons/favicon-32x32.png"
  }, {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicons/favicon-16x16.png"
  }, {
    rel: "manifest",
    href: "/site.webmanifest"
  }, {
    rel: "icon",
    href: "/favicon.ico"
  }, {
    rel: "stylesheet",
    href: vendorStyles
  }, {
    rel: "stylesheet",
    href: tailwindStyles
  }, {
    rel: "stylesheet",
    href: proseStyles
  }, {
    rel: "stylesheet",
    href: appStyles
  }];
};
const PODCAST_LINKS_FALLBACK = {
  chats: {
    latestSeasonNumber: null,
    latestSeasonPath: "/chats"
  },
  calls: {
    latestSeasonNumber: null,
    latestSeasonPath: "/calls"
  }
};
async function loader({
  request
}) {
  const timings = {};
  const loaderStart = performance.now();
  const podcastLinksAbortController = new AbortController();
  const requestPath = new URL(request.url).pathname;
  const session = await getSession(request);
  const [user, clientSession, loginInfoSession, primaryInstance, latestPodcastSeasonLinks] = await Promise.all([session.getUser({
    timings
  }), getClientSession(request, session.getUser({
    timings
  })), getLoginInfoSession(request), getInstanceInfo().then((i) => i.primaryInstance), time(withTimeout(getLatestPodcastSeasonLinks({
    request,
    timings,
    signal: podcastLinksAbortController.signal
  }), {
    timeoutMs: 2e3,
    fallback: PODCAST_LINKS_FALLBACK,
    label: "root:podcast-season-links",
    onTimeout: () => podcastLinksAbortController.abort()
  }), {
    timings,
    type: "root:podcast-season-links",
    desc: "podcast nav links (Simplecast + Transistor)"
  })]);
  const randomFooterImageKeys = Object.keys(illustrationImages);
  const randomFooterImageKey = randomFooterImageKeys[Math.floor(Math.random() * randomFooterImageKeys.length)];
  const data$1 = {
    user,
    userInfo: user ? await getUserInfo(user, {
      request,
      timings
    }) : null,
    latestPodcastSeasonLinks,
    season7PromotificationCookieValue: isSeason7ChatsPath(requestPath) ? PROMO_HIDDEN_COOKIE_VALUE : getPromoCookieValue({
      promoName: SEASON_7_PROMOTIFICATION_NAME,
      request
    }),
    ENV: getPublicEnv(),
    randomFooterImageKey,
    requestInfo: {
      hints: getHints(request),
      origin: getDomainUrl(request),
      path: requestPath,
      flyPrimaryInstance: primaryInstance,
      userPrefs: {
        theme: getTheme(request)
      },
      session: {
        email: loginInfoSession.getEmail(),
        signupEmail: loginInfoSession.getSignupEmail()
      }
    }
  };
  const headers2 = new Headers();
  await session.getHeaders(headers2);
  await clientSession.getHeaders(headers2);
  await loginInfoSession.getHeaders(headers2);
  if (isSeason7ChatsPath(requestPath) && getPromoCookieValue({
    promoName: SEASON_7_PROMOTIFICATION_NAME,
    request
  }) !== PROMO_HIDDEN_COOKIE_VALUE) {
    headers2.append("Set-Cookie", createPromoHiddenSetCookieHeader({
      promoName: SEASON_7_PROMOTIFICATION_NAME
    }));
  }
  const rootLoaderTotal = performance.now() - loaderStart;
  const rootTimings = {
    ...timings,
    "root:loader": [{
      type: "root:loader",
      desc: "root loader total",
      time: rootLoaderTotal
    }]
  };
  headers2.append("Server-Timing", getServerTimeHeader(rootTimings));
  return data(data$1, {
    headers: headers2
  });
}
const headers = ({
  loaderHeaders
}) => {
  return {
    "Server-Timing": loaderHeaders.get("Server-Timing") ?? ""
  };
};
const LOADER_WORDS = ["loading", "checking cdn", "checking cache", "fetching from db", "compiling mdx", "updating cache", "transfer"];
const ACTION_WORDS = ["packaging", "zapping", "validating", "processing", "calculating", "computing", "computering"];
let firstRender = true;
function PageLoadingMessage() {
  const navigation = useNavigation();
  const [words, setWords] = React.useState([]);
  const [pendingPath, setPendingPath] = React.useState("");
  const showLoader = useSpinDelay(Boolean(navigation.state !== "idle"), {
    delay: 400,
    minDuration: 1e3
  });
  React.useEffect(() => {
    if (firstRender) return;
    if (navigation.state === "idle") return;
    if (navigation.state === "loading") setWords(LOADER_WORDS);
    if (navigation.state === "submitting") setWords(ACTION_WORDS);
    const interval = setInterval(() => {
      setWords(([first, ...rest]) => [...rest, first]);
    }, 2e3);
    return () => clearInterval(interval);
  }, [pendingPath, navigation.state]);
  React.useEffect(() => {
    if (firstRender) return;
    if (navigation.state === "idle") return;
    setPendingPath(navigation.location.pathname);
  }, [navigation]);
  React.useEffect(() => {
    firstRender = false;
  }, []);
  const action = words[0];
  return /* @__PURE__ */ jsx(NotificationMessage, {
    position: "bottom-right",
    visible: showLoader,
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex w-64 items-center",
      children: [/* @__PURE__ */ jsx(motion.div, {
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        },
        animate: {
          rotate: 360
        },
        children: /* @__PURE__ */ jsx(TeamCircle, {
          size: 48,
          team: "UNKNOWN"
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "ml-4 inline-grid",
        children: [/* @__PURE__ */ jsx(AnimatePresence, {
          children: /* @__PURE__ */ jsx("div", {
            className: "col-start-1 row-start-1 flex overflow-hidden",
            children: /* @__PURE__ */ jsx(motion.span, {
              initial: {
                y: 15,
                opacity: 0
              },
              animate: {
                y: 0,
                opacity: 1
              },
              exit: {
                y: -15,
                opacity: 0
              },
              transition: {
                duration: 0.25
              },
              className: "flex-none",
              children: action
            }, action)
          })
        }), /* @__PURE__ */ jsxs("span", {
          className: "text-secondary truncate",
          children: ["path: ", pendingPath]
        })]
      })]
    })
  });
}
function CanonicalLink({
  origin,
  fathomQueue
}) {
  const {
    pathname
  } = useLocation();
  const canonicalUrl = removeTrailingSlash(`${origin}${pathname}`);
  React.useEffect(() => {
    if (window.fathom) {
      window.fathom.trackPageview();
    } else {
      fathomQueue.current.push({
        command: "trackPageview"
      });
    }
  }, [canonicalUrl]);
  return /* @__PURE__ */ jsx("link", {
    rel: "canonical",
    href: canonicalUrl
  });
}
function App({
  loaderData: data2
}) {
  const nonce = useNonce();
  const [team] = useTeam();
  const theme = useTheme();
  const fathomQueue = React.useRef([]);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: clsx(theme, `set-color-team-current-${team.toLowerCase()}`),
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("script", {
        nonce,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: `window.ENV = ${JSON.stringify(data2.ENV)};`
        }
      }), /* @__PURE__ */ jsx(ClientHintCheck, {
        nonce
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1,viewport-fit=cover"
      }), /* @__PURE__ */ jsx(CanonicalLink, {
        origin: data2.requestInfo.origin,
        fathomQueue
      }), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("noscript", {
        children: /* @__PURE__ */ jsx("link", {
          rel: "stylesheet",
          href: noScriptStyles
        })
      })]
    }), /* @__PURE__ */ jsxs("body", {
      className: "bg-white transition duration-500 dark:bg-gray-900",
      children: [/* @__PURE__ */ jsx(PageLoadingMessage, {}), /* @__PURE__ */ jsx(Promotification, {
        position: "top-center",
        promoName: SEASON_7_PROMOTIFICATION_NAME,
        cookieValue: data2.season7PromotificationCookieValue,
        hidePermanentlyOnInteraction: true,
        children: /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("p", {
            className: "font-semibold",
            children: `Season 7 of Chats with Kent is out: Become a Product Engineer.`
          }), /* @__PURE__ */ jsx("div", {
            className: "flex flex-wrap items-center justify-end gap-3",
            children: /* @__PURE__ */ jsx(ButtonLink, {
              to: "/chats/07",
              variant: "secondary",
              size: "medium",
              children: `Listen to season 7`
            })
          })]
        })
      }), /* @__PURE__ */ jsx(NotificationMessage, {
        queryStringKey: "message",
        delay: 0.3
      }), /* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(AppHotkeys, {}), /* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Spacer, {
        size: "base"
      }), /* @__PURE__ */ jsx(Footer, {
        image: images[data2.randomFooterImageKey]
      }), /* @__PURE__ */ jsx(ScrollRestoration, {
        nonce
      }), ENV.MODE === "development" ? null : /* @__PURE__ */ jsx("script", {
        nonce,
        src: "https://cdn.usefathom.com/script.js",
        "data-site": "HJUUDKMT",
        "data-spa": "history",
        "data-auto": "false",
        "data-excluded-domains": "localhost",
        defer: true,
        onLoad: () => {
          fathomQueue.current.forEach(({
            command
          }) => {
            if (window.fathom) {
              window.fathom[command]();
            }
          });
          fathomQueue.current = [];
        }
      }), /* @__PURE__ */ jsx(Scripts, {
        nonce
      }), ENV.MODE === "development" ? /* @__PURE__ */ jsx("script", {
        nonce,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: getWebsocketJS()
        }
      }) : null]
    })]
  });
}
function AppWithProviders({
  loaderData
}) {
  return /* @__PURE__ */ jsx(TeamProvider, {
    children: /* @__PURE__ */ jsx(HotkeysProvider, {
      children: /* @__PURE__ */ jsx(App, {
        loaderData
      })
    })
  });
}
const root = UNSAFE_withComponentProps(AppWithProviders);
function ErrorDoc({
  children
}) {
  const nonce = useNonce();
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "dark",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("title", {
        children: "Oh no..."
      }), /* @__PURE__ */ jsx("script", {
        nonce,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: `window.ENV = {}`
        }
      }), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "bg-white transition duration-500 dark:bg-gray-900",
      children: [children, /* @__PURE__ */ jsx(Scripts, {
        nonce
      })]
    })]
  });
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useCapturedRouteError();
  const location2 = useLocation();
  if (isRouteErrorResponse(error)) {
    console.error("CatchBoundary", error);
    if (error.status === 404) {
      return /* @__PURE__ */ jsx(ErrorDoc, {
        children: /* @__PURE__ */ jsx(FourOhFour, {
          pathname: location2.pathname
        })
      });
    }
    if (error.status === 400) {
      return /* @__PURE__ */ jsx(ErrorDoc, {
        children: /* @__PURE__ */ jsx(FourHundred, {
          error: error.data
        })
      });
    }
    if (error.status === 409) {
      return /* @__PURE__ */ jsx(ErrorDoc, {
        children: /* @__PURE__ */ jsx(ErrorPage, {
          heroProps: {
            title: "409 - Oh no, you should never see this.",
            subtitle: `"${location2.pathname}" tried telling fly to replay your request and missed this one.`,
            image: /* @__PURE__ */ jsx(Grimmacing, {
              className: "rounded-lg",
              aspectRatio: "3:4"
            }),
            action: /* @__PURE__ */ jsx(ArrowLink, {
              href: "/",
              children: "Go home"
            })
          }
        })
      });
    }
    if (error.status !== 500) {
      return /* @__PURE__ */ jsx(ErrorDoc, {
        children: /* @__PURE__ */ jsx(ErrorPage, {
          heroProps: {
            title: `${error.status} - Oh no, something did not go well.`,
            subtitle: `"${location2.pathname}" is currently not working. So sorry.`,
            image: /* @__PURE__ */ jsx(Grimmacing, {
              className: "rounded-lg",
              aspectRatio: "3:4"
            }),
            action: /* @__PURE__ */ jsx(ArrowLink, {
              href: "/",
              children: "Go home"
            })
          }
        })
      });
    }
    throw new Error(`Unhandled error: ${error.status}`);
  }
  console.error(error);
  return /* @__PURE__ */ jsx(ErrorDoc, {
    children: /* @__PURE__ */ jsx(ErrorPage, {
      heroProps: {
        title: "500 - Oh no, something did not go well.",
        subtitle: `"${location2.pathname}" is currently not working. So sorry.`,
        image: /* @__PURE__ */ jsx(Grimmacing, {
          className: "rounded-lg",
          aspectRatio: "3:4"
        }),
        action: /* @__PURE__ */ jsx(ArrowLink, {
          href: "/",
          children: "Go home"
        })
      }
    })
  });
});
function kcdLiveReloadConnect(config) {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const host = location.hostname;
  const port = location.port;
  const socketPath = `${protocol}//${host}:${port}/__ws`;
  const ws = new WebSocket(socketPath);
  ws.onmessage = (message) => {
    const event = JSON.parse(message.data);
    if (event.type === "abhidev.com:file-change" && event.data.relativePath === location.pathname) {
      window.location.reload();
    }
  };
  ws.onopen = () => {
    if (config && typeof config.onOpen === "function") {
      config.onOpen();
    }
  };
  ws.onclose = (event) => {
    if (event.code === 1006) {
      console.log("abhidev.com dev server web socket closed. Reconnecting...");
      setTimeout(() => kcdLiveReloadConnect({
        onOpen: () => window.location.reload()
      }), 1e3);
    }
  };
  ws.onerror = (error) => {
    console.log("abhidev.com dev server web socket error:");
    console.error(error);
  };
}
function getWebsocketJS() {
  const js = (
    /* javascript */
    `
  ${kcdLiveReloadConnect.toString()}
  kcdLiveReloadConnect();
  `
  );
  return js;
}
export {
  ArticleCard as A,
  BlogSection as B,
  CallsEpisodeUIStateProvider as C,
  ErrorBoundary as E,
  FourOhFour as F,
  Grimmacing as G,
  IconLink as I,
  KitForm as K,
  MissingSomething as M,
  ServerError as S,
  headers as a,
  loader as b,
  useRootData as c,
  useMatchLoaderData as d,
  ChatsEpisodeUIStateProvider as e,
  useChatsEpisodeUIState as f,
  useOptionalUser as g,
  handle as h,
  useTeam as i,
  getBannerAltProp as j,
  BlurrableImage as k,
  links as l,
  meta as m,
  ClipboardCopyButton as n,
  useMdxComponent as o,
  getBannerTitleProp as p,
  FourHundred as q,
  root as r,
  mdxPageMeta as s,
  ErrorPage as t,
  useCallsEpisodeUIState as u,
  Facepalm as v,
  useUser as w,
  teamEmoji as x,
  notFoundQueryFromPathname as y,
  sortNotFoundMatches as z
};
//# sourceMappingURL=root-BtDGpB2R.js.map
