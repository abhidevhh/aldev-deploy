import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import * as React from "react";
import { useFetcher, Link, data } from "react-router";
import { z } from "zod";
import { v as SpinnerIcon, J as StarIcon } from "./icons-Xl-Om4A1.js";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { f as favoriteIntents, c as favoriteContentTypes, p as parseEpisodeFavoriteContentId } from "./favorites-BOCNblj8.js";
import { r as reuseUsefulLoaderHeaders } from "./misc-DM3BUXHg.js";
import { g as useOptionalUser } from "./root-BtDGpB2R.js";
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(function TooltipContent2({ className, sideOffset = 6, ...props }, forwardedRef) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    TooltipPrimitive.Content,
    {
      ref: forwardedRef,
      sideOffset,
      className: clsx(
        "z-50 rounded-md bg-white px-3 py-2 text-sm whitespace-nowrap text-gray-700 shadow-lg ring-1 ring-black/5 dark:bg-gray-900 dark:text-slate-200 dark:ring-white/10",
        className
      ),
      ...props
    }
  ) });
});
const favoriteResourceRoute = "/resources/favorite";
function isFavoriteStatusResponse(data2) {
  return typeof data2 === "object" && data2 !== null && "isFavorite" in data2 && typeof data2.isFavorite === "boolean";
}
function FavoriteToggle({
  contentType,
  contentId,
  initialIsFavorite,
  mode = "button",
  label = "Favorite",
  className
}) {
  const user = useOptionalUser();
  const fetcherKey = `favorite:${contentType}:${contentId}`;
  const fetcher = useFetcher({
    key: fetcherKey
  });
  const optimisticIntent = fetcher.formData?.get("intent");
  const optimisticIsFavorite = optimisticIntent === "add" ? true : optimisticIntent === "remove" ? false : void 0;
  const fetchedIsFavorite = isFavoriteStatusResponse(fetcher.data) ? fetcher.data.isFavorite : void 0;
  const isFavorite = optimisticIsFavorite ?? fetchedIsFavorite ?? initialIsFavorite ?? false;
  const shouldLoadInitial = Boolean(user) && initialIsFavorite === void 0 && fetchedIsFavorite === void 0 && optimisticIsFavorite === void 0 && fetcher.state === "idle";
  React.useEffect(() => {
    if (!shouldLoadInitial) return;
    const searchParams = new URLSearchParams({
      contentType,
      contentId
    });
    void fetcher.load(`${favoriteResourceRoute}?${searchParams.toString()}`);
  }, [shouldLoadInitial, contentType, contentId, fetcher]);
  const nextIntent = isFavorite ? "remove" : "add";
  const isBusy = fetcher.state !== "idle";
  const iconSize = mode === "icon" ? 24 : 18;
  const icon = isBusy ? /* @__PURE__ */ jsx(SpinnerIcon, {
    size: iconSize,
    className: "animate-spin"
  }) : /* @__PURE__ */ jsx(StarIcon, {
    size: iconSize,
    filled: isFavorite
  });
  const text = isFavorite ? "Favorited" : label;
  const iconAriaLabel = isFavorite ? "Unfavorite" : label;
  if (!user) {
    const link = /* @__PURE__ */ jsxs(Link, {
      to: "/login",
      className: clsx(mode === "icon" ? "text-secondary hover:text-team-current focus:text-team-current inline-flex items-center justify-center transition focus:outline-none" : "focus-ring text-primary bg-secondary hover:text-team-current inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-medium transition focus:outline-none", className),
      "aria-label": "Login to favorite",
      title: mode === "icon" ? void 0 : "Login to favorite",
      children: [icon, mode === "button" ? /* @__PURE__ */ jsx("span", {
        children: "Login to favorite"
      }) : null]
    });
    return /* @__PURE__ */ jsx(TooltipProvider, {
      children: mode === "icon" ? /* @__PURE__ */ jsxs(Tooltip, {
        children: [/* @__PURE__ */ jsx(TooltipTrigger, {
          asChild: true,
          children: link
        }), /* @__PURE__ */ jsx(TooltipContent, {
          children: "Login to favorite"
        })]
      }) : link
    });
  }
  const button = /* @__PURE__ */ jsxs("button", {
    type: "submit",
    disabled: isBusy,
    "aria-pressed": isFavorite,
    "aria-label": mode === "icon" ? iconAriaLabel : void 0,
    className: clsx(mode === "icon" ? clsx("focus-ring inline-flex items-center justify-center rounded-md transition focus:outline-none", {
      "text-team-current": isFavorite,
      "text-secondary hover:text-team-current focus:text-team-current": !isFavorite
    }) : clsx("focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-medium transition focus:outline-none", {
      "bg-inverse text-inverse": isFavorite,
      "bg-secondary text-primary hover:text-team-current focus:text-team-current": !isFavorite
    })),
    children: [icon, mode === "button" ? /* @__PURE__ */ jsx("span", {
      children: text
    }) : null]
  });
  return /* @__PURE__ */ jsxs(fetcher.Form, {
    method: "POST",
    action: favoriteResourceRoute,
    className,
    children: [/* @__PURE__ */ jsx("input", {
      type: "hidden",
      name: "contentType",
      value: contentType
    }), /* @__PURE__ */ jsx("input", {
      type: "hidden",
      name: "contentId",
      value: contentId
    }), /* @__PURE__ */ jsx("input", {
      type: "hidden",
      name: "intent",
      value: nextIntent
    }), /* @__PURE__ */ jsx(TooltipProvider, {
      children: mode === "icon" ? /* @__PURE__ */ jsxs(Tooltip, {
        children: [/* @__PURE__ */ jsx(TooltipTrigger, {
          asChild: true,
          children: button
        }), /* @__PURE__ */ jsx(TooltipContent, {
          children: iconAriaLabel
        })]
      }) : button
    })]
  });
}
async function getFavoritesServerServices() {
  const [{
    prisma
  }, {
    ensurePrimary
  }, {
    getUser
  }] = await Promise.all([import("./prisma.server-MnXt9BdG.js"), import("./litefs-js.server-D3zvw7U1.js"), import("./session.server-BVOCbXUc.js")]);
  return {
    prisma,
    ensurePrimary,
    getUser
  };
}
const FavoriteFormSchema = z.object({
  contentType: z.enum(favoriteContentTypes),
  contentId: z.string().min(1).max(200),
  intent: z.enum(favoriteIntents)
});
async function action({
  request
}) {
  const {
    prisma,
    ensurePrimary,
    getUser
  } = await getFavoritesServerServices();
  const user = await getUser(request);
  if (!user) {
    return data({
      isFavorite: false,
      error: "LOGIN_REQUIRED"
    }, {
      status: 401
    });
  }
  const formData = await request.formData();
  const submission = FavoriteFormSchema.safeParse(Object.fromEntries(formData));
  if (!submission.success) {
    return data({
      isFavorite: false,
      error: "INVALID_FORM_DATA"
    }, {
      status: 400
    });
  }
  const {
    contentType,
    contentId,
    intent
  } = submission.data;
  if (contentType === "abhi-call-episode" || contentType === "chats-with-abhi-episode") {
    if (!parseEpisodeFavoriteContentId(contentId)) {
      return data({
        isFavorite: false,
        error: "INVALID_CONTENT_ID"
      }, {
        status: 400
      });
    }
  }
  await ensurePrimary();
  const where = {
    userId: user.id,
    contentType,
    contentId
  };
  if (intent === "add") {
    await prisma.favorite.upsert({
      where: {
        userId_contentType_contentId: where
      },
      create: where,
      update: {}
    });
    return data({
      isFavorite: true
    });
  }
  await prisma.favorite.deleteMany({
    where
  });
  return data({
    isFavorite: false
  });
}
const FavoriteStatusQuerySchema = z.object({
  contentType: z.enum(favoriteContentTypes),
  contentId: z.string().min(1).max(200)
});
const FavoriteListQuerySchema = z.object({
  contentType: z.enum(favoriteContentTypes)
});
async function loader({
  request
}) {
  const {
    prisma,
    getUser
  } = await getFavoritesServerServices();
  const headers2 = {
    "Cache-Control": "private, max-age=0, must-revalidate",
    Vary: "Cookie"
  };
  const url = new URL(request.url);
  const contentType = url.searchParams.get("contentType");
  const contentId = url.searchParams.get("contentId");
  if (contentId) {
    const submission = FavoriteStatusQuerySchema.safeParse({
      contentType,
      contentId
    });
    if (!submission.success) {
      return data({
        isFavorite: false,
        error: "INVALID_QUERY"
      }, {
        status: 400,
        headers: headers2
      });
    }
    const parsed = submission.data;
    if (parsed.contentType === "abhi-call-episode" || parsed.contentType === "chats-with-abhi-episode") {
      if (!parseEpisodeFavoriteContentId(parsed.contentId)) {
        return data({
          isFavorite: false,
          error: "INVALID_CONTENT_ID"
        }, {
          status: 400,
          headers: headers2
        });
      }
    }
    const user2 = await getUser(request);
    if (!user2) {
      return data({
        isFavorite: false,
        authenticated: false
      }, {
        headers: headers2
      });
    }
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_contentType_contentId: {
          userId: user2.id,
          contentType: parsed.contentType,
          contentId: parsed.contentId
        }
      },
      select: {
        id: true
      }
    });
    return data({
      isFavorite: Boolean(favorite),
      authenticated: true
    }, {
      headers: headers2
    });
  }
  const listSubmission = FavoriteListQuerySchema.safeParse({
    contentType
  });
  if (!listSubmission.success) {
    return data({
      contentIds: [],
      error: "INVALID_QUERY"
    }, {
      status: 400,
      headers: headers2
    });
  }
  const user = await getUser(request);
  if (!user) {
    return data({
      contentIds: []
    }, {
      headers: headers2
    });
  }
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
      contentType: listSubmission.data.contentType
    },
    select: {
      contentId: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return data({
    contentIds: favorites.map((f) => f.contentId)
  }, {
    headers: headers2
  });
}
const headers = reuseUsefulLoaderHeaders;
export {
  FavoriteToggle as F,
  action as a,
  favoriteResourceRoute as f,
  headers as h,
  loader as l
};
//# sourceMappingURL=favorite-Ct1jwKNM.js.map
