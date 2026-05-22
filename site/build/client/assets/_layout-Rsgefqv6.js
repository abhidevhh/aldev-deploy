import { UNSAFE_withComponentProps, useLocation, useFetcher, useSearchParams, Link, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import * as React from "react";
import { B as ButtonLink } from "./button-B-8RrXF2.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { Y as YoutubeIcon } from "./icons-Xl-Om4A1.js";
import { C as CourseSection } from "./course-section-BuQDUHKJ.js";
import { H as HeroSection } from "./hero-section-CoHGsAuJ.js";
import { T as Tag } from "./tag-Bs3TtQGk.js";
import { a as H6, b as H4, P as Paragraph, H as H3 } from "./typography-DDpAXXrz.js";
import { i as images, b as getGenericSocialImage } from "./images-D8NqauwH.js";
import { f as favoriteResourceRoute, F as FavoriteToggle } from "./favorite-Ct1jwKNM.js";
import { a as useUpdateQueryStringValueWithoutNavigation } from "./misc-react-D8yAGzlT.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { g as getSocialMetas } from "./seo-B3cPpSFw.js";
import { g as getTalksAndTags } from "./talks.server-B60mwIsu.js";
import { g as useOptionalUser } from "./root-BtDGpB2R.js";
import { p as parseDate, f as formatDate, r as reuseUsefulLoaderHeaders, b as getDisplayUrl, g as getUrl } from "./misc-DM3BUXHg.js";
import { l as listify } from "./listify-DooNzvOm.js";
import "./course-card-Dtp7nTpE.js";
import "framer-motion";
import "./theme-D6IyWRbl.js";
import "@conform-to/zod/v4";
import "cookie";
import "zod";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./header-section-BSZTMYmt.js";
import "./arrow-button-DBVn13Kl.js";
import "cloudinary-build-url";
import "emoji-regex";
import "@radix-ui/react-tooltip";
import "./favorites-BOCNblj8.js";
import "@sentry/react-router";
import "md5-hash";
import "@sindresorhus/slugify";
import "yaml";
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
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./github.server-CeJRQaMc.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
import "./markdown.server-C6vYtRmU.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "@reach/dialog";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "mdx-bundler/client/index.js";
import "./form-elements-D3OfaKUp.js";
import "downshift";
import "./promotification-omJeRY6i.js";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "date-fns";
const meta = ({
  data: data2,
  matches
}) => {
  const {
    talks = [],
    tags = []
  } = data2 ?? {};
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  const talkCount = talks.length;
  const deliveryCount = talks.flatMap((t) => t.deliveries).length;
  const title = `${talkCount} talks by Kent all about AI engineering and full stack systems`;
  const topicsList = listify(tags.slice(0, 6));
  return getSocialMetas({
    title,
    description: `Check out Kent's ${talkCount} talks he's delivered ${deliveryCount} times. Topics include: ${topicsList}`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.teslaY.id,
      words: title
    })
  });
};
async function loader({
  request
}) {
  const talksAndTags = await getTalksAndTags({
    request
  });
  return data(talksAndTags, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      Vary: "Cookie"
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
function Card({
  tag,
  tags,
  title,
  slug,
  deliveries,
  descriptionHTML,
  resourceHTMLs,
  active,
  isFavorite
}) {
  const latestDelivery = deliveries.filter((x) => x.date).sort((l, r) => parseDate(r.date).getTime() - parseDate(l.date).getTime())[0];
  const isInFuture = latestDelivery?.date ? parseDate(latestDelivery.date).getTime() > Date.now() : true;
  return /* @__PURE__ */ jsxs("div", {
    className: clsx("relative flex h-full w-full flex-col rounded-lg bg-gray-100 p-6 md:p-16 dark:bg-gray-800", {
      "focus-ring ring-2": active
    }),
    children: [/* @__PURE__ */ jsx("div", {
      "data-talk": slug,
      className: "absolute -top-8"
    }), /* @__PURE__ */ jsxs("div", {
      className: "mb-8 flex flex-none flex-col items-center justify-between md:flex-row",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "inline-flex items-baseline",
        children: [isInFuture ? /* @__PURE__ */ jsx("div", {
          className: "block h-3 w-3 flex-none rounded-full bg-green-600"
        }) : /* @__PURE__ */ jsx("div", {
          className: "block h-3 w-3 flex-none rounded-full bg-gray-400 dark:bg-gray-600"
        }), latestDelivery ? /* @__PURE__ */ jsx(H6, {
          as: "p",
          className: "pl-4",
          children: latestDelivery.dateDisplay
        }) : null]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2 md:mt-0",
        children: [tag ? /* @__PURE__ */ jsx("div", {
          className: "inline-block self-start rounded-full bg-white px-8 py-4 text-lg whitespace-nowrap text-black dark:bg-gray-600 dark:text-white",
          children: tag
        }) : null, /* @__PURE__ */ jsx(FavoriteToggle, {
          mode: "icon",
          contentType: "talk",
          contentId: slug,
          initialIsFavorite: isFavorite
        })]
      })]
    }), /* @__PURE__ */ jsx(Link, {
      to: `./${slug}`,
      className: "mb-4 flex h-48 flex-none items-end",
      children: /* @__PURE__ */ jsx(H3, {
        as: "div",
        children: title
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "mb-10 flex-auto",
      children: [/* @__PURE__ */ jsx(Paragraph, {
        as: "div",
        className: "html mb-20",
        dangerouslySetInnerHTML: {
          __html: descriptionHTML || "&nbsp;"
        }
      }), tags.length ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(H6, {
          as: "div",
          className: "mt-10 mb-2",
          children: "Keywords"
        }), /* @__PURE__ */ jsx(Paragraph, {
          className: "flex",
          children: tags.join(", ")
        })]
      }) : null, deliveries.length ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(H6, {
          as: "div",
          className: "mt-10 mb-2",
          children: "Presentations"
        }), /* @__PURE__ */ jsx("ul", {
          className: "space-y-1",
          children: deliveries.map((delivery, index) => /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex w-full items-center gap-2",
              children: [delivery.date && parseDate(delivery.date).getTime() > Date.now() ? /* @__PURE__ */ jsx("div", {
                className: "block h-2 w-2 flex-none animate-pulse rounded-full bg-green-600"
              }) : null, /* @__PURE__ */ jsx(Paragraph, {
                as: "div",
                className: "html",
                prose: true,
                dangerouslySetInnerHTML: {
                  __html: delivery.eventHTML ?? ""
                }
              }), delivery.recording ? /* @__PURE__ */ jsx("a", {
                className: "text-secondary hover:text-team-current ml-2 flex-none",
                href: delivery.recording,
                children: /* @__PURE__ */ jsx(YoutubeIcon, {
                  size: 32
                })
              }) : null, /* @__PURE__ */ jsx("div", {
                className: "flex-auto"
              }), /* @__PURE__ */ jsx(Paragraph, {
                className: "ml-2 flex-none tabular-nums",
                as: "span",
                children: delivery.date ? formatDate(delivery.date, "yyyy-MM-dd") : null
              })]
            })
          }, index))
        })]
      }) : null, resourceHTMLs.length ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(H6, {
          className: "mt-10 mb-2",
          as: "div",
          children: "Resources"
        }), /* @__PURE__ */ jsx("ul", {
          className: "space-y-1",
          children: resourceHTMLs.map((resource) => /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Paragraph, {
              as: "div",
              className: "html",
              prose: false,
              dangerouslySetInnerHTML: {
                __html: resource
              }
            })
          }, resource))
        })]
      }) : null]
    })]
  });
}
const _layout = UNSAFE_withComponentProps(function TalksScreen({
  loaderData: data2
}) {
  const {
    pathname
  } = useLocation();
  const [activeSlug] = pathname.split("/").slice(-1);
  const user = useOptionalUser();
  const talkFavoritesFetcher = useFetcher({
    key: "favorites:talk"
  });
  React.useEffect(() => {
    if (!user) return;
    if (talkFavoritesFetcher.data) return;
    if (talkFavoritesFetcher.state !== "idle") return;
    void talkFavoritesFetcher.load(`${favoriteResourceRoute}?contentType=talk`);
  }, [user, talkFavoritesFetcher]);
  const favoriteTalkIds = new Set(talkFavoritesFetcher.data?.contentIds ?? []);
  React.useEffect(() => {
    document.querySelector(`[data-talk="${activeSlug}"]`)?.scrollIntoView();
  }, [activeSlug]);
  const [searchParams] = useSearchParams();
  const [queryValue, setQuery] = React.useState(() => {
    return searchParams.get("q") ?? "";
  });
  const talks = queryValue ? data2.talks.filter((talk) => queryValue.split(",").every((tag) => talk.tags.includes(tag))) : data2.talks;
  const visibleTags = new Set(talks.flatMap((x) => x.tags));
  function toggleTag(tag) {
    setQuery((q) => {
      const existing = q.split(",").map((x) => x.trim()).filter(Boolean);
      const newQuery = existing.includes(tag) ? existing.filter((t) => t !== tag) : [...existing, tag];
      return newQuery.join(",");
    });
  }
  useUpdateQueryStringValueWithoutNavigation("q", queryValue);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Check out these talks.",
      subtitle: /* @__PURE__ */ jsxs(Fragment, {
        children: ["Mostly on", " ", /* @__PURE__ */ jsx("a", {
          href: "https://kcd.im/map",
          className: "underline",
          children: "location"
        }), ", sometimes remote."]
      }),
      imageBuilder: images.teslaY,
      imageSize: "large"
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mb-14",
      children: [/* @__PURE__ */ jsx(H6, {
        as: "div",
        className: "col-span-full mb-6",
        children: "Search talks by topics"
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full -mr-4 -mb-4 flex flex-wrap lg:col-span-10",
        children: data2.tags.map((tag) => /* @__PURE__ */ jsx(Tag, {
          tag,
          selected: queryValue.includes(tag),
          onClick: () => toggleTag(tag),
          disabled: Boolean(!visibleTags.has(tag) && !queryValue.includes(tag))
        }, tag))
      })]
    }), /* @__PURE__ */ jsx(Grid, {
      className: "mb-64",
      children: data2.talks.length === 0 ? /* @__PURE__ */ jsxs("div", {
        className: "col-span-full rounded-lg border border-gray-200 p-8 dark:border-gray-600",
        children: [/* @__PURE__ */ jsx(H4, {
          as: "h2",
          className: "mb-3",
          children: "No talks are available right now."
        }), /* @__PURE__ */ jsxs(Paragraph, {
          className: "mb-4",
          children: ["We are likely having trouble with our GitHub integration. Please try again soon, or browse the content directly on", " ", /* @__PURE__ */ jsx("a", {
            href: externalLinks.githubRepo,
            target: "_blank",
            rel: "noreferrer noopener",
            className: "text-primary underline",
            children: "GitHub"
          }), "."]
        }), /* @__PURE__ */ jsx(ButtonLink, {
          variant: "primary",
          to: externalLinks.githubRepo,
          children: "Open GitHub repo"
        })]
      }) : /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(H6, {
          as: "h2",
          className: "col-span-full mb-6",
          children: queryValue ? talks.length === 1 ? `1 talk found` : `${talks.length} talks found` : "Showing all talks"
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full",
          children: /* @__PURE__ */ jsx(Grid, {
            nested: true,
            rowGap: true,
            children: talks.map((talk) => {
              return /* @__PURE__ */ jsx("div", {
                className: "col-span-full lg:col-span-6",
                children: /* @__PURE__ */ jsx(Card, {
                  active: activeSlug === talk.slug,
                  isFavorite: favoriteTalkIds.has(talk.slug),
                  ...talk
                })
              }, talk.slug);
            })
          })
        })]
      })
    }), /* @__PURE__ */ jsx(CourseSection, {})]
  });
});
export {
  _layout as default,
  headers,
  loader,
  meta
};
//# sourceMappingURL=_layout-Rsgefqv6.js.map
