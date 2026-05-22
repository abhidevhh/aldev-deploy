import { jsx } from "react/jsx-runtime";
import * as Sentry from "@sentry/react-router";
import __cjsInterop1__ from "md5-hash";
import * as React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { h as images } from "./images-Dyd95Mrb.js";
import { l as getOptionalTeam } from "./misc-CQO4K9rH.js";
const { default: md5 = __cjsInterop1__ } = __cjsInterop1__?.default?.__esModule ? __cjsInterop1__.default : __cjsInterop1__;
const defaultAvatarSize = 128;
function getAvatar(email, {
  size = defaultAvatarSize,
  fallback = images.abhiBuddyProfileGray({ resize: { width: size } }),
  origin
} = {}) {
  const hash = md5(email);
  const url = new URL(`https://www.gravatar.com/avatar/${hash}`);
  url.searchParams.set("size", String(size));
  if (fallback) {
    if (origin && fallback.startsWith("/")) {
      fallback = `${origin}${fallback}`;
    }
    url.searchParams.set("default", fallback);
  }
  return url.toString();
}
const avatarFallbacks = {
  BLUE: (width) => images.abhiBuddyProfileBlue({ resize: { width } }),
  RED: (width) => images.abhiBuddyProfileRed({ resize: { width } }),
  YELLOW: (width) => images.abhiBuddyProfileYellow({ resize: { width } }),
  UNKNOWN: (width) => images.abhiBuddyProfileGray({ resize: { width } })
};
function getAvatarForUser({ email, team, firstName }, { size = defaultAvatarSize, origin } = {}) {
  return {
    src: getAvatar(email, {
      fallback: avatarFallbacks[getOptionalTeam(team)](size),
      size,
      origin
    }),
    alt: firstName
  };
}
const AnchorOrLink = function AnchorOrLink2({
  ref,
  ...props
}) {
  const {
    to,
    href,
    download,
    reload = false,
    prefetch,
    children,
    ...rest
  } = props;
  let toUrl = "";
  let shouldUserRegularAnchor = reload || download;
  if (!shouldUserRegularAnchor && typeof href === "string") {
    shouldUserRegularAnchor = href.includes(":") || href.startsWith("#");
  }
  if (!shouldUserRegularAnchor && typeof to === "string") {
    toUrl = to;
    shouldUserRegularAnchor = to.includes(":");
  }
  if (!shouldUserRegularAnchor && typeof to === "object") {
    toUrl = `${to.pathname ?? ""}${to.hash ? `#${to.hash}` : ""}${to.search ? `?${to.search}` : ""}`;
    shouldUserRegularAnchor = to.pathname?.includes(":");
  }
  if (shouldUserRegularAnchor) {
    return /* @__PURE__ */ jsx("a", { ...rest, download, href: href ?? toUrl, ref, children });
  } else {
    return /* @__PURE__ */ jsx(Link, { prefetch, to: to ?? href ?? "", ...rest, ref, children });
  }
};
function useUpdateQueryStringValueWithoutNavigation(queryKey, queryValue) {
  React.useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const oldQuery = currentSearchParams.get(queryKey) ?? "";
    if (queryValue === oldQuery) return;
    if (queryValue) {
      currentSearchParams.set(queryKey, queryValue);
    } else {
      currentSearchParams.delete(queryKey);
    }
    const newUrl = [window.location.pathname, currentSearchParams.toString()].filter(Boolean).join("?");
    window.history.replaceState(null, "", newUrl);
  }, [queryKey, queryValue]);
}
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
function useDebounce(callback, delay) {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(
    () => debounce(
      (...args) => callbackRef.current(...args),
      delay
    ),
    [delay]
  );
}
function callAll(...fns) {
  return (...args) => fns.forEach((fn) => fn?.(...args));
}
function useDoubleCheck() {
  const [doubleCheck, setDoubleCheck] = React.useState(false);
  function getButtonProps(props) {
    const onBlur = () => setDoubleCheck(false);
    const onClick = doubleCheck ? void 0 : (e) => {
      e.preventDefault();
      setDoubleCheck(true);
    };
    return {
      ...props,
      onBlur: callAll(onBlur, props?.onBlur),
      onClick: callAll(onClick, props?.onClick)
    };
  }
  return { doubleCheck, getButtonProps };
}
function useCapturedRouteError() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status < 500) return error;
    Sentry.captureException(getRouteErrorResponseException(error), {
      extra: {
        route_error_response: {
          status: error.status,
          statusText: error.statusText,
          data: error.data
        }
      }
    });
    return error;
  }
  Sentry.captureException(error);
  return error;
}
function getRouteErrorResponseException(error) {
  const statusText = error.statusText || "Route Error";
  const routeErrorResponseError = new Error(`${error.status} ${statusText}`);
  routeErrorResponseError.name = "RouteErrorResponse";
  return routeErrorResponseError;
}
export {
  AnchorOrLink as A,
  getAvatarForUser as a,
  useDebounce as b,
  useDoubleCheck as c,
  useUpdateQueryStringValueWithoutNavigation as d,
  getAvatar as g,
  useCapturedRouteError as u
};
