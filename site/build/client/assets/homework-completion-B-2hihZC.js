import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useFetcher, data } from "react-router";
import { z } from "zod";
import { clsx } from "clsx";
import { v as SpinnerIcon, w as CheckIcon, i as CheckCircledIcon } from "./icons-Xl-Om4A1.js";
import { a as getEpisodeHomeworkContentId, b as parseEpisodeHomeworkContentId } from "./favorites-BOCNblj8.js";
import { r as reuseUsefulLoaderHeaders } from "./misc-DM3BUXHg.js";
const homeworkCompletionResourceRoute = "/resources/homework-completion";
function isHomeworkCompletionResponse(data2) {
  return typeof data2 === "object" && data2 !== null && "completed" in data2 && typeof data2.completed === "boolean" && "authenticated" in data2 && typeof data2.authenticated === "boolean";
}
function HomeworkCompletionToggle({
  seasonNumber,
  episodeNumber,
  itemIndex,
  initialCompleted = false,
  children
}) {
  const fetcherKey = `homework:${seasonNumber}:${episodeNumber}:${itemIndex}`;
  const fetcher = useFetcher({
    key: fetcherKey
  });
  const contentId = getEpisodeHomeworkContentId({
    seasonNumber,
    episodeNumber,
    itemIndex
  });
  const optimisticCompleted = fetcher.formData?.get("completed") === "true" ? true : fetcher.formData?.get("completed") === "false" ? false : void 0;
  const fetchedCompleted = fetcher.state !== "idle" && isHomeworkCompletionResponse(fetcher.data) && !fetcher.data.error ? fetcher.data.completed : void 0;
  const isCompleted = optimisticCompleted ?? fetchedCompleted ?? initialCompleted ?? false;
  const isBusy = fetcher.state !== "idle";
  const buttonContents = /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("span", {
      "aria-hidden": "true",
      className: clsx("mt-1 mr-6 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border transition", isCompleted ? "border-emerald-600 bg-emerald-600 text-white shadow-[0_0_0_4px_rgba(16,185,129,0.12)] dark:border-emerald-400 dark:bg-emerald-500 dark:text-gray-950 dark:shadow-[0_0_0_4px_rgba(52,211,153,0.16)]" : "border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500"),
      children: isBusy ? /* @__PURE__ */ jsx(SpinnerIcon, {
        size: 18,
        className: "animate-spin"
      }) : isCompleted ? /* @__PURE__ */ jsx(CheckIcon, {}) : /* @__PURE__ */ jsx(CheckCircledIcon, {
        size: 20,
        className: "opacity-65"
      })
    }), /* @__PURE__ */ jsx("span", {
      className: clsx("min-w-0 transition", isCompleted ? "text-primary" : "text-primary/90 dark:text-white/90"),
      children
    })]
  });
  return /* @__PURE__ */ jsxs(fetcher.Form, {
    method: "POST",
    action: homeworkCompletionResourceRoute,
    children: [/* @__PURE__ */ jsx("input", {
      type: "hidden",
      name: "contentId",
      value: contentId
    }), /* @__PURE__ */ jsx("input", {
      type: "hidden",
      name: "completed",
      value: String(!isCompleted)
    }), /* @__PURE__ */ jsx("button", {
      type: "submit",
      disabled: isBusy,
      "aria-pressed": isCompleted,
      className: clsx("group focus-ring flex w-full items-start rounded-lg px-2 py-2 text-left transition focus:outline-none", isCompleted ? "bg-emerald-50/90 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/15" : "hover:bg-black/3 dark:hover:bg-white/4"),
      children: buttonContents
    })]
  });
}
async function getHomeworkCompletionServerServices() {
  const [{
    ensurePrimary
  }, {
    getUser
  }, {
    getClientSession
  }, {
    setEpisodeHomeworkCompletion,
    getEpisodeHomeworkCompletions
  }] = await Promise.all([import("./litefs-js.server-D3zvw7U1.js"), import("./session.server-BVOCbXUc.js"), import("./client.server-CTs0DPxN.js"), import("./prisma.server-MnXt9BdG.js")]);
  return {
    ensurePrimary,
    getUser,
    getClientSession,
    setEpisodeHomeworkCompletion,
    getEpisodeHomeworkCompletions
  };
}
const HomeworkCompletionFormSchema = z.object({
  contentId: z.string().min(1).max(200),
  completed: z.enum(["true", "false"]).transform((value) => value === "true")
});
async function action({
  request
}) {
  const {
    ensurePrimary,
    getUser,
    getClientSession,
    setEpisodeHomeworkCompletion
  } = await getHomeworkCompletionServerServices();
  const formData = await request.formData();
  const submission = HomeworkCompletionFormSchema.safeParse(Object.fromEntries(formData));
  if (!submission.success) {
    return data({
      completed: false,
      authenticated: false,
      error: "INVALID_FORM_DATA"
    }, {
      status: 400
    });
  }
  const parsedContentId = parseEpisodeHomeworkContentId(submission.data.contentId);
  if (!parsedContentId) {
    return data({
      completed: false,
      authenticated: false,
      error: "INVALID_CONTENT_ID"
    }, {
      status: 400
    });
  }
  await ensurePrimary();
  const user = await getUser(request);
  const clientSession = await getClientSession(request, user);
  const clientId = clientSession.getClientId();
  if (!user && !clientId) {
    return data({
      completed: false,
      authenticated: false,
      error: "MISSING_CLIENT_ID"
    }, {
      status: 400
    });
  }
  const completed = user ? await setEpisodeHomeworkCompletion({
    ...parsedContentId,
    completed: submission.data.completed,
    userId: user.id
  }) : await setEpisodeHomeworkCompletion({
    ...parsedContentId,
    completed: submission.data.completed,
    clientId
  });
  const headers2 = await clientSession.getHeaders();
  return data({
    completed,
    authenticated: Boolean(user)
  }, {
    headers: headers2
  });
}
const HomeworkCompletionQuerySchema = z.object({
  contentId: z.string().min(1).max(200)
});
async function loader({
  request
}) {
  const {
    getUser,
    getClientSession,
    getEpisodeHomeworkCompletions
  } = await getHomeworkCompletionServerServices();
  const headers2 = {
    "Cache-Control": "private, max-age=0, must-revalidate",
    Vary: "Cookie"
  };
  const url = new URL(request.url);
  const submission = HomeworkCompletionQuerySchema.safeParse({
    contentId: url.searchParams.get("contentId")
  });
  if (!submission.success) {
    return data({
      completed: false,
      authenticated: false,
      error: "INVALID_QUERY"
    }, {
      status: 400,
      headers: headers2
    });
  }
  const parsedContentId = parseEpisodeHomeworkContentId(submission.data.contentId);
  if (!parsedContentId) {
    return data({
      completed: false,
      authenticated: false,
      error: "INVALID_CONTENT_ID"
    }, {
      status: 400,
      headers: headers2
    });
  }
  const user = await getUser(request);
  const clientSession = await getClientSession(request, user);
  const clientId = clientSession.getClientId();
  const completionIds = await getEpisodeHomeworkCompletions({
    seasonNumber: parsedContentId.seasonNumber,
    episodeNumber: parsedContentId.episodeNumber,
    ...user ? {
      userId: user.id
    } : clientId ? {
      clientId
    } : {}
  });
  return data({
    completed: completionIds.has(submission.data.contentId),
    authenticated: Boolean(user)
  }, {
    headers: await clientSession.getHeaders(headers2)
  });
}
const headers = ({
  loaderHeaders,
  parentHeaders,
  actionHeaders,
  errorHeaders
}) => {
  const headers2 = new Headers(reuseUsefulLoaderHeaders({
    loaderHeaders,
    parentHeaders
  }));
  for (const sourceHeaders of [loaderHeaders, actionHeaders]) {
    for (const [headerName, headerValue] of sourceHeaders.entries()) {
      if (headerName.toLowerCase() === "set-cookie") {
        headers2.append("Set-Cookie", headerValue);
      }
    }
  }
  return headers2;
};
export {
  HomeworkCompletionToggle as H,
  action as a,
  headers as h,
  loader as l
};
//# sourceMappingURL=homework-completion-B-2hihZC.js.map
