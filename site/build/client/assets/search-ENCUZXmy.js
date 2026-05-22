import { UNSAFE_withComponentProps, useFetcher, Await, useAsyncError, Link, data } from "react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default, { Suspense } from "react";
import { a as Button } from "./button-B-8RrXF2.js";
import { a as Input, i as inputClassName, E as ErrorPanel } from "./form-elements-D3OfaKUp.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeroSection } from "./hero-section-CoHGsAuJ.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { H as H3, b as H4, P as Paragraph } from "./typography-DDpAXXrz.js";
import { i as images } from "./images-D8NqauwH.js";
import { a as useUpdateQueryStringValueWithoutNavigation, b as useDebounce } from "./misc-react-D8yAGzlT.js";
import { S as SEARCH_MAX_QUERY_CHARS, s as searchKCD } from "./search.server-CEHFJkNx.js";
import { e as getErrorMessage } from "./misc-DM3BUXHg.js";
import "clsx";
import "framer-motion";
import "./arrow-button-DBVn13Kl.js";
import "./icons-Xl-Om4A1.js";
import "cloudinary-build-url";
import "emoji-regex";
import "@sentry/react-router";
import "md5-hash";
import "node:crypto";
import "zod";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "litefs-js";
import "litefs-js/remix";
import "./session.server-BVOCbXUc.js";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "node:fs/promises";
import "@sindresorhus/slugify";
import "yaml";
import "date-fns";
async function loader({
  request
}) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim();
  const headers = {
    "Cache-Control": "no-store"
  };
  const emptyPayload = Promise.resolve({
    results: [],
    lowRankingResults: [],
    noCloseMatches: false
  });
  if (!q) {
    return data({
      q: "",
      configured: true,
      searchPayload: emptyPayload,
      error: void 0
    }, {
      headers
    });
  }
  const normalizedQ = q.trim().replace(/\s+/g, " ");
  if (normalizedQ.length > SEARCH_MAX_QUERY_CHARS) {
    return data({
      q,
      configured: true,
      searchPayload: emptyPayload,
      error: `Query too long (${normalizedQ.length} chars). Max is ${SEARCH_MAX_QUERY_CHARS}.`
    }, {
      headers
    });
  }
  const searchPayload = searchKCD({
    query: normalizedQ,
    topK: 8,
    request
  }).catch((e) => {
    console.error(e);
    throw e;
  });
  return data({
    q,
    configured: true,
    searchPayload,
    error: void 0
  }, {
    headers
  });
}
const search = UNSAFE_withComponentProps(function SearchPage({
  loaderData
}) {
  const fetcher = useFetcher({
    key: "search-page-results"
  });
  const {
    load
  } = fetcher;
  const inputRef = React__default.useRef(null);
  const [query, setQuery] = React__default.useState(loaderData.q);
  const trimmedQuery = query.trim();
  useUpdateQueryStringValueWithoutNavigation("q", trimmedQuery);
  const [requestedQuery, setRequestedQuery] = React__default.useState(trimmedQuery);
  const [resolved, setResolved] = React__default.useState(null);
  React__default.useEffect(() => {
    setQuery(loaderData.q);
    setRequestedQuery(loaderData.q);
    setResolved(null);
  }, [loaderData.q]);
  React__default.useEffect(() => {
    if (!trimmedQuery) {
      setResolved(null);
      setRequestedQuery("");
    }
  }, [trimmedQuery]);
  const debouncedRequestSearch = useDebounce((nextQuery) => {
    if (nextQuery === requestedQuery) return;
    setRequestedQuery(nextQuery);
    if (!nextQuery) return;
    if (nextQuery === loaderData.q) return;
    void load(`/search?q=${encodeURIComponent(nextQuery)}`);
  }, 250);
  React__default.useEffect(() => {
    debouncedRequestSearch(trimmedQuery);
  }, [debouncedRequestSearch, trimmedQuery]);
  const isQueryPending = trimmedQuery !== requestedQuery;
  const activeData = requestedQuery && loaderData.q === requestedQuery ? loaderData : fetcher.data?.q === requestedQuery ? fetcher.data : null;
  const error = activeData?.error;
  const showResultsSection = trimmedQuery && !error;
  const isPending = Boolean(showResultsSection) && (isQueryPending || (resolved ? resolved.q !== requestedQuery : false));
  const resultsContainerClassName = isPending ? "transition-opacity opacity-60" : "transition-opacity";
  const shouldAwaitResults = Boolean(showResultsSection) && Boolean(activeData) && resolved?.q !== requestedQuery;
  const searchPayloadPromise = activeData && "searchPayload" in activeData ? activeData.searchPayload : null;
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Search",
      subtitle: "Search across posts, pages, podcasts, talks, YouTube videos, resume, credits, and testimonials.",
      imageBuilder: images.abhiBuddyProfileGray,
      action: /* @__PURE__ */ jsx(fetcher.Form, {
        method: "get",
        action: "/search",
        role: "search",
        className: "w-full",
        onSubmit: (event) => {
          event.preventDefault();
          if (!trimmedQuery) return;
          if (trimmedQuery === requestedQuery) return;
          setRequestedQuery(trimmedQuery);
          if (trimmedQuery === loaderData.q) return;
          void load(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        },
        children: /* @__PURE__ */ jsx("div", {
          className: "relative",
          children: /* @__PURE__ */ jsx(Input, {
            ref: inputRef,
            type: "search",
            name: "q",
            value: query,
            placeholder: "Search...",
            className: inputClassName,
            onChange: (event) => setQuery(event.currentTarget.value)
          })
        })
      })
    }), /* @__PURE__ */ jsxs(Grid, {
      as: "main",
      children: [/* @__PURE__ */ jsx(Spacer, {
        size: "2xs",
        className: "col-span-full"
      }), error ? /* @__PURE__ */ jsx("div", {
        className: "col-span-full",
        children: /* @__PURE__ */ jsx(ErrorPanel, {
          children: error
        })
      }) : null, trimmedQuery ? /* @__PURE__ */ jsxs("div", {
        className: "col-span-full",
        children: [/* @__PURE__ */ jsx(H3, {
          children: "Results"
        }), /* @__PURE__ */ jsx(H4, {
          as: "p",
          variant: "secondary",
          children: `For: "${trimmedQuery}"`
        })]
      }) : /* @__PURE__ */ jsx("div", {
        className: "col-span-full",
        children: /* @__PURE__ */ jsx(Paragraph, {
          textColorClassName: "text-secondary",
          children: `Try a query like "react testing library", "call AbhiDev authentication", or "youtube closure".`
        })
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "3xs",
        className: "col-span-full"
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full",
        children: showResultsSection ? /* @__PURE__ */ jsxs(Fragment, {
          children: [resolved ? /* @__PURE__ */ jsx("div", {
            className: resultsContainerClassName,
            children: /* @__PURE__ */ jsx(SearchResults, {
              q: resolved.q,
              results: resolved.results,
              lowRankingResults: resolved.lowRankingResults,
              noCloseMatches: resolved.noCloseMatches
            })
          }) : null, activeData && shouldAwaitResults && searchPayloadPromise ? /* @__PURE__ */ jsx(Suspense, {
            fallback: resolved ? null : /* @__PURE__ */ jsx(SearchResultsFallback, {}),
            children: /* @__PURE__ */ jsx(Await, {
              resolve: searchPayloadPromise,
              errorElement: /* @__PURE__ */ jsx(SearchResultsError, {}),
              children: (payload) => /* @__PURE__ */ jsx(ResolveResults, {
                q: requestedQuery,
                results: payload.results,
                lowRankingResults: payload.lowRankingResults,
                noCloseMatches: payload.noCloseMatches,
                setResolved,
                renderResults: !resolved,
                resultsContainerClassName
              })
            })
          }) : !resolved ? /* @__PURE__ */ jsx(SearchResultsFallback, {}) : null]
        }) : null
      })]
    })]
  });
});
function ResolveResults({
  q,
  results,
  lowRankingResults,
  noCloseMatches,
  setResolved,
  renderResults,
  resultsContainerClassName
}) {
  React__default.useEffect(() => {
    setResolved({
      q,
      results,
      lowRankingResults,
      noCloseMatches
    });
  }, [q, results, lowRankingResults, noCloseMatches, setResolved]);
  if (!renderResults) return null;
  return /* @__PURE__ */ jsx("div", {
    className: resultsContainerClassName,
    children: /* @__PURE__ */ jsx(SearchResults, {
      q,
      results,
      lowRankingResults,
      noCloseMatches
    })
  });
}
function SearchResultsFallback() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-4",
    children: [/* @__PURE__ */ jsx(Paragraph, {
      textColorClassName: "text-secondary",
      children: `Searching...`
    }), /* @__PURE__ */ jsx("ul", {
      className: "space-y-6",
      children: Array.from({
        length: 3
      }).map((_, i) => /* @__PURE__ */ jsxs("li", {
        className: "rounded-lg bg-gray-100 p-6 dark:bg-gray-800",
        children: [/* @__PURE__ */ jsx("div", {
          className: "h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-3 h-3 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
        })]
      }, i))
    })]
  });
}
function SearchHitRow({
  r
}) {
  const href = r.url ?? (r.id ? `/` : "#");
  const linkTo = r.type === "youtube" && typeof href === "string" && href.startsWith("/youtube") ? (() => {
    try {
      const u = new URL(href, "https://abhidev.com");
      if (r.title) u.searchParams.set("title", r.title);
      const desc = r.summary ?? r.snippet;
      if (desc) {
        u.searchParams.set("desc", desc.length > 400 ? `${desc.slice(0, 397)}...` : desc);
      }
      return `${u.pathname}?${u.searchParams.toString()}`;
    } catch {
      return href;
    }
  })() : href;
  const semanticSearchState = r.type === "youtube" ? {
    semanticSearch: {
      title: r.title ?? null,
      description: r.summary ?? r.snippet ?? null
    }
  } : void 0;
  const title = href ? /* @__PURE__ */ jsx(Link, {
    to: linkTo,
    state: semanticSearchState,
    children: r.title ?? r.url ?? r.id
  }) : r.id;
  const showScore = typeof r.score === "number" && Number.isFinite(r.score);
  return /* @__PURE__ */ jsxs("li", {
    className: "relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 rounded-lg bg-gray-100 p-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:p-6 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-y-1 dark:bg-gray-800",
    children: [showScore ? /* @__PURE__ */ jsx("span", {
      className: "absolute top-3 right-3 font-mono text-[0.65rem] leading-none text-slate-400 tabular-nums sm:top-4 sm:right-4 dark:text-slate-500",
      title: "Fused search relevance score",
      children: r.score.toFixed(4)
    }) : null, /* @__PURE__ */ jsx(H4, {
      className: `col-span-2 min-w-0 leading-snug text-balance wrap-anywhere md:col-span-1 md:col-start-2 md:row-start-1 md:line-clamp-3 md:leading-tight ${showScore ? "pr-14 sm:pr-16" : ""}`,
      children: title
    }), /* @__PURE__ */ jsx("div", {
      className: "row-start-2 self-start md:row-span-3 md:row-start-1 md:self-start",
      children: r.imageUrl ? /* @__PURE__ */ jsx("img", {
        src: r.imageUrl,
        alt: r.imageAlt ?? "",
        className: "h-14 w-14 rounded-lg object-cover sm:h-16 sm:w-16",
        loading: "lazy"
      }) : /* @__PURE__ */ jsx("div", {
        className: "h-14 w-14 rounded-lg bg-gray-200 sm:h-16 sm:w-16 dark:bg-gray-700"
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "col-start-2 row-start-2 flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-slate-500 md:row-start-2",
      children: [r.type ? /* @__PURE__ */ jsx("span", {
        children: r.type
      }) : null, r.url ? /* @__PURE__ */ jsx("span", {
        className: "max-w-full break-all text-slate-500",
        children: r.url
      }) : null]
    }), r.summary || r.snippet ? /* @__PURE__ */ jsx("p", {
      className: "col-span-2 mt-1 line-clamp-3 text-base text-slate-600 md:col-span-1 md:col-start-2 md:row-start-3 md:mt-0 dark:text-slate-400",
      children: r.summary ?? r.snippet
    }) : null]
  });
}
function SearchResults({
  q,
  results,
  lowRankingResults,
  noCloseMatches
}) {
  const [showLowRanking, setShowLowRanking] = React__default.useState(false);
  React__default.useEffect(() => {
    setShowLowRanking(false);
  }, [q]);
  const hasLowRanking = lowRankingResults.length > 0;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-4",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-wrap items-baseline justify-between gap-2",
      children: [/* @__PURE__ */ jsx(Paragraph, {
        textColorClassName: "text-secondary",
        children: results.length === 1 ? "1 result" : `${results.length} results`
      }), /* @__PURE__ */ jsx(Paragraph, {
        textColorClassName: "text-secondary",
        children: `Query: "${q}"`
      })]
    }), results.length ? /* @__PURE__ */ jsx("ul", {
      className: "space-y-6",
      children: results.map((r) => /* @__PURE__ */ jsx(SearchHitRow, {
        r
      }, r.id))
    }) : noCloseMatches ? /* @__PURE__ */ jsxs("div", {
      className: "space-y-2",
      children: [/* @__PURE__ */ jsx(Paragraph, {
        textColorClassName: "text-secondary",
        children: `No close matches for this query. The index had related candidates, but none met the confidence threshold.`
      }), /* @__PURE__ */ jsx(Paragraph, {
        textColorClassName: "text-secondary",
        children: `Try different keywords, a shorter phrase, or check spelling.`
      })]
    }) : /* @__PURE__ */ jsx(Paragraph, {
      textColorClassName: "text-secondary",
      children: `No matches found.`
    }), hasLowRanking ? /* @__PURE__ */ jsxs("div", {
      className: "border-secondary border-t border-dashed pt-4",
      children: [/* @__PURE__ */ jsx(Button, {
        type: "button",
        variant: "secondary",
        size: "small",
        onClick: () => setShowLowRanking((v) => !v),
        "aria-expanded": showLowRanking,
        children: showLowRanking ? "Hide low ranking results" : `Show low ranking results (${lowRankingResults.length})`
      }), showLowRanking ? /* @__PURE__ */ jsxs("div", {
        className: "mt-4 space-y-3",
        children: [/* @__PURE__ */ jsx(H4, {
          as: "p",
          variant: "secondary",
          children: "Lower-confidence matches"
        }), /* @__PURE__ */ jsx(Paragraph, {
          textColorClassName: "text-secondary",
          className: "text-sm",
          children: "These pages scored below the main results threshold or beyond the top slice. They may still be useful."
        }), /* @__PURE__ */ jsx("ul", {
          className: "space-y-6",
          children: lowRankingResults.map((r) => /* @__PURE__ */ jsx(SearchHitRow, {
            r
          }, `low-${r.id}`))
        })]
      }) : null]
    }) : null]
  });
}
function SearchResultsError() {
  const error = useAsyncError();
  return /* @__PURE__ */ jsxs(ErrorPanel, {
    children: [/* @__PURE__ */ jsx("div", {
      children: "Whoops! Sorry, there was an error 😬"
    }), /* @__PURE__ */ jsx("hr", {
      className: "my-2"
    }), /* @__PURE__ */ jsx("pre", {
      className: "whitespace-pre-wrap",
      children: getErrorMessage(error)
    })]
  });
}
export {
  search as default,
  loader
};
//# sourceMappingURL=search-ENCUZXmy.js.map
