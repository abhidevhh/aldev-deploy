import { UNSAFE_withComponentProps, Form, Link, redirect, data } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { Dialog } from "@reach/dialog";
import { clsx } from "clsx";
import * as React from "react";
import { B as Button, a as ButtonLink } from "./button-C3vj8DF4.js";
import { b as InputError, F as Field, L as Label } from "./form-elements-DKDR40lU.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { t as LogoutIcon, R as RefreshIcon, K as PlusIcon, C as CheckCircledIcon } from "./icons-DQAXl5Y1.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { a as H2, e as H6, P as Paragraph, b as H3 } from "./typography-DBSbiCOF.js";
import { g as getGenericSocialImage, h as images } from "./images-Dyd95Mrb.js";
import { F as FavoriteToggle } from "./favorite-CcmX78Nt.js";
import { h as handleFormSubmission } from "./actions.server-B989TuGL.js";
import { d as getEpisodePath } from "./abhi-call-3LF8Y-Fm.js";
import { g as getAbhiEpisodePath } from "./chats-with-abhi-CQPpfNES.js";
import { g as getEpisodeFavoriteContentId, p as parseEpisodeFavoriteContentId } from "./favorites-Bsg0upig.js";
import { g as getBlogMdxListItems } from "./mdx.server-CWSqTQTg.js";
import { o as getTeam, g as getDiscordAuthorizeURL, w as reuseUsefulLoaderHeaders, i as getErrorMessage, m as getOrigin, e as getDisplayUrl, p as getUrl } from "./misc-CQO4K9rH.js";
import { T as TEAM_ONEWHEELING_MAP, b as TEAM_SNOWBOARD_MAP, a as TEAM_SKIING_MAP } from "./onboarding-C_WpLW5E.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import { requireUser, getSession, deleteOtherSessions } from "./session.server-DZ6f3pgH.js";
import { getSeasonListItems } from "./simplecast.server-Co703Zjj.js";
import { g as getTalksAndTags } from "./talks.server-CC1vC5Fa.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { getEpisodes as getCachedEpisodes } from "./transistor.server-C4ChjM7q.js";
import { x as useRootData } from "./root-XTBE-Fp5.js";
import { d as deleteDiscordCache, e as deleteKitCache, h as gravatarExistsForEmail } from "./user-info.server-D6axXZ8Q.js";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "cloudinary-build-url";
import "emoji-regex";
import "zod";
import "@radix-ui/react-tooltip";
import "date-fns";
import "@remark-embedder/core";
import "@remark-embedder/transformer-oembed";
import "lz-string";
import "mdx-bundler";
import "p-queue";
import "reading-time";
import "remark-autolink-headings";
import "remark-gfm";
import "remark-slug";
import "unist-util-visit";
import "http";
import "https";
import "@epic-web/cachified";
import "metascraper";
import "metascraper-description";
import "metascraper-image";
import "metascraper-title";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "litefs-js";
import "litefs-js/remix";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./github.server-u_4PqFTT.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "node:url";
import "@prisma/client/runtime/client";
import "hast-util-to-html";
import "mdast-util-to-hast";
import "p-limit";
import "rehype-remark";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "@sindresorhus/slugify";
import "yaml";
import "uuid";
import "@tanstack/react-hotkeys";
import "framer-motion";
import "spin-delay";
import "./arrow-button-DsHCk3Gf.js";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "mdx-bundler/client/index.js";
import "./theme-Ct2STwdZ.js";
import "@conform-to/zod/v4";
import "cookie";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-YMEmucWd.js";
import "./client.server-CTs0DPxN.js";
import "./login.server-Bn92r_Ja.js";
import "./theme.server-D5mszc13.js";
import "./header-section-B2Ylwupf.js";
import "./hero-section-BNEKo3U8.js";
const handle = {
  getSitemapEntries: () => null
};
const meta = ({
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  const domain = new URL(getOrigin(requestInfo)).host;
  return getSocialMetas({
    title: `Your account on ${domain}`,
    description: `Personal account information on ${domain}.`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.abhiBuddySnowboardingGray(),
      words: `View your account info on ${domain}`
    })
  });
};
async function loader({
  request
}) {
  const timings = {};
  const user = await requireUser(request, {
    timings
  });
  const [sessionCount, rawFavorites, abhiCallCallerEpisodes] = await Promise.all([prisma.session.count({
    where: {
      userId: user.id
    }
  }), prisma.favorite.findMany({
    where: {
      userId: user.id
    },
    select: {
      contentType: true,
      contentId: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  }), prisma.abhiCallCallerEpisode.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      transistorEpisodeId: true,
      isAnonymous: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })]);
  const wantsBlogPosts = rawFavorites.some((f) => f.contentType === "blog-post");
  const wantsTalks = rawFavorites.some((f) => f.contentType === "talk");
  const wantsCallEpisodes = rawFavorites.some((f) => f.contentType === "abhi-call-episode");
  const wantsCallEpisodeData = wantsCallEpisodes || abhiCallCallerEpisodes.length > 0;
  const wantsChatEpisodes = rawFavorites.some((f) => f.contentType === "chats-with-abhi-episode");
  const [blogPosts, talksAndTags, callEpisodes, chatSeasons] = await Promise.all([wantsBlogPosts ? getBlogMdxListItems({
    request,
    timings
  }) : [], wantsTalks ? getTalksAndTags({
    request,
    timings
  }) : {
    talks: [],
    tags: []
  }, wantsCallEpisodeData ? getCachedEpisodes({
    request,
    timings
  }) : [], wantsChatEpisodes ? getSeasonListItems({
    request,
    timings
  }) : []]);
  const blogTitleBySlug = new Map(blogPosts.map((post) => [post.slug, post.frontmatter.title ?? post.slug]));
  const talkTitleBySlug = new Map(talksAndTags.talks.map((talk) => [talk.slug, talk.title]));
  const callEpisodeById = new Map(callEpisodes.map((episode) => [getEpisodeFavoriteContentId({
    seasonNumber: episode.seasonNumber,
    episodeNumber: episode.episodeNumber
  }), episode]));
  const callEpisodeByTransistorId = new Map(callEpisodes.map((episode) => [episode.transistorEpisodeId, episode]));
  const chatEpisodeById = new Map(chatSeasons.flatMap((s) => s.episodes).map((episode) => [getEpisodeFavoriteContentId({
    seasonNumber: episode.seasonNumber,
    episodeNumber: episode.episodeNumber
  }), episode]));
  const favorites = rawFavorites.map((favorite) => {
    switch (favorite.contentType) {
      case "blog-post": {
        const title = blogTitleBySlug.get(favorite.contentId) ?? favorite.contentId;
        return {
          contentType: "blog-post",
          contentId: favorite.contentId,
          title,
          href: `/blog/${favorite.contentId}`,
          subtitle: "Blog post"
        };
      }
      case "talk": {
        const title = talkTitleBySlug.get(favorite.contentId) ?? favorite.contentId;
        return {
          contentType: "talk",
          contentId: favorite.contentId,
          title,
          href: `/talks/${favorite.contentId}`,
          subtitle: "Talk"
        };
      }
      case "youtube-video": {
        const videoId = favorite.contentId;
        return {
          contentType: "youtube-video",
          contentId: videoId,
          title: `YouTube video ${videoId}`,
          href: `/youtube?video=${encodeURIComponent(videoId)}`,
          subtitle: "YouTube video"
        };
      }
      case "abhi-call-episode": {
        const parsed = parseEpisodeFavoriteContentId(favorite.contentId);
        if (!parsed) return null;
        const episode = callEpisodeById.get(favorite.contentId);
        const title = episode?.title ?? `call AbhiDev Episode`;
        return {
          contentType: "abhi-call-episode",
          contentId: favorite.contentId,
          title,
          href: episode ? getEpisodePath(episode) : getEpisodePath({
            seasonNumber: parsed.seasonNumber,
            episodeNumber: parsed.episodeNumber
          }),
          subtitle: `Calls — Season ${parsed.seasonNumber} Episode ${parsed.episodeNumber}`
        };
      }
      case "chats-with-abhi-episode": {
        const parsed = parseEpisodeFavoriteContentId(favorite.contentId);
        if (!parsed) return null;
        const episode = chatEpisodeById.get(favorite.contentId);
        const title = episode?.title ?? `Engineering with AbhiDev Episode`;
        return {
          contentType: "chats-with-abhi-episode",
          contentId: favorite.contentId,
          title,
          href: episode ? getAbhiEpisodePath(episode) : getAbhiEpisodePath({
            seasonNumber: parsed.seasonNumber,
            episodeNumber: parsed.episodeNumber
          }),
          subtitle: `Chats — Season ${parsed.seasonNumber} Episode ${parsed.episodeNumber}`
        };
      }
      default: {
        return null;
      }
    }
  }).filter((v) => Boolean(v));
  const activities = ["skiing", "snowboarding", "onewheeling"];
  const activity = activities[Math.floor(Math.random() * activities.length)] ?? "skiing";
  const abhiCallCallerEpisodesDisplay = abhiCallCallerEpisodes.map((entry) => {
    const episode = callEpisodeByTransistorId.get(entry.transistorEpisodeId);
    if (!episode) {
      return {
        id: entry.id,
        seasonNumber: null,
        episodeNumber: null,
        slug: "",
        episodeTitle: "call AbhiDev episode (unavailable)",
        episodePath: "/calls",
        imageUrl: null,
        isAnonymous: entry.isAnonymous,
        createdAt: entry.createdAt
      };
    }
    return {
      id: entry.id,
      seasonNumber: episode.seasonNumber,
      episodeNumber: episode.episodeNumber,
      slug: episode.slug,
      episodeTitle: episode.title,
      episodePath: getEpisodePath({
        seasonNumber: episode.seasonNumber,
        episodeNumber: episode.episodeNumber,
        slug: episode.slug
      }),
      imageUrl: episode.imageUrl,
      isAnonymous: entry.isAnonymous,
      createdAt: entry.createdAt
    };
  });
  return data({
    sessionCount,
    teamType: activity,
    favorites,
    abhiCallCallerEpisodes: abhiCallCallerEpisodesDisplay
  }, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const actionIds = {
  logout: "logout",
  changeDetails: "change details",
  deleteDiscordConnection: "delete discord connection",
  deleteAccount: "delete account",
  deleteSessions: "delete sessions",
  refreshGravatar: "refresh gravatar"
};
function getFirstNameError(firstName) {
  if (!firstName?.length) return "First name is required";
  return null;
}
async function action({
  request
}) {
  const user = await requireUser(request);
  const form = new URLSearchParams(await request.text());
  const actionId = form.get("actionId");
  try {
    if (actionId === actionIds.logout) {
      const session = await getSession(request);
      await session.signOut();
      const searchParams = new URLSearchParams({
        message: `👋 See you again soon!`
      });
      return redirect(`/?${searchParams.toString()}`, {
        headers: await session.getHeaders()
      });
    }
    if (actionId === actionIds.deleteDiscordConnection && user.discordId) {
      await deleteDiscordCache(user.discordId);
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          discordId: null
        }
      });
      const searchParams = new URLSearchParams({
        message: `✅ Connection deleted`
      });
      return redirect(`/me?${searchParams.toString()}`);
    }
    if (actionId === actionIds.changeDetails) {
      return await handleFormSubmission({
        form,
        validators: {
          firstName: getFirstNameError
        },
        handleFormValues: async ({
          firstName
        }) => {
          if (firstName && user.firstName !== firstName) {
            await prisma.user.update({
              where: {
                id: user.id
              },
              data: {
                firstName
              }
            });
          }
          const searchParams = new URLSearchParams({
            message: `✅ Sucessfully saved your info`
          });
          return redirect(`/me?${searchParams.toString()}`);
        }
      });
    }
    if (actionId === actionIds.deleteSessions) {
      await deleteOtherSessions(request);
      const searchParams = new URLSearchParams({
        message: `✅ Sucessfully signed out of other sessions`
      });
      return redirect(`/me?${searchParams.toString()}`);
    }
    if (actionId === actionIds.deleteAccount) {
      const session = await getSession(request);
      await session.signOut();
      if (user.discordId) await deleteDiscordCache(user.discordId);
      if (user.kitId) await deleteKitCache(user.kitId);
      await prisma.user.delete({
        where: {
          id: user.id
        }
      });
      const searchParams = new URLSearchParams({
        message: `✅ Your KCD account and all associated data has been completely deleted from the KCD database.`
      });
      return redirect(`/?${searchParams.toString()}`, {
        headers: await session.getHeaders()
      });
    }
    if (actionId === actionIds.refreshGravatar) {
      await gravatarExistsForEmail({
        email: user.email,
        forceFresh: true
      });
    }
    return redirect("/me");
  } catch (error) {
    return data({
      fields: {
        firstName: null
      },
      errors: {
        generalError: getErrorMessage(error),
        firstName: null
      }
    }, 500);
  }
}
function YouScreen({
  loaderData: data2,
  actionData
}) {
  const teamMap = {
    skiing: TEAM_SKIING_MAP,
    snowboarding: TEAM_SNOWBOARD_MAP,
    onewheeling: TEAM_ONEWHEELING_MAP
  }[data2.teamType];
  const otherSessionsCount = data2.sessionCount - 1;
  const {
    requestInfo,
    userInfo,
    user
  } = useRootData();
  const team = getTeam(user?.team);
  if (!user) throw new Error("user required");
  if (!userInfo) throw new Error("userInfo required");
  if (!team) throw new Error("team required");
  const authorizeURL = getDiscordAuthorizeURL(requestInfo.origin);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs("main", {
    children: [/* @__PURE__ */ jsx("div", {
      className: "mt-24 mb-64 pt-6",
      children: /* @__PURE__ */ jsxs(Grid, {
        children: [/* @__PURE__ */ jsx("div", {
          className: "col-span-full mb-12 lg:mb-20",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col-reverse items-start justify-between lg:flex-row lg:items-center",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx(H2, {
                children: `Here's your profile.`
              }), /* @__PURE__ */ jsx(H2, {
                variant: "secondary",
                as: "p",
                children: `Edit as you wish.`
              })]
            }), /* @__PURE__ */ jsxs(Form, {
              action: "/me",
              method: "POST",
              children: [/* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "actionId",
                value: actionIds.logout
              }), /* @__PURE__ */ jsxs(Button, {
                variant: "secondary",
                children: [/* @__PURE__ */ jsx(LogoutIcon, {}), /* @__PURE__ */ jsx(H6, {
                  as: "span",
                  children: "logout"
                })]
              })]
            })]
          })
        }), /* @__PURE__ */ jsx(InputError, {
          id: "general-erorr",
          children: actionData?.errors.generalError
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full mb-24 lg:col-span-5 lg:mb-0",
          children: /* @__PURE__ */ jsxs(Form, {
            action: "/me",
            method: "POST",
            noValidate: true,
            "aria-describedby": "general-error",
            children: [/* @__PURE__ */ jsx("button", {
              hidden: true,
              type: "submit",
              name: "actionId",
              value: actionIds.changeDetails
            }), /* @__PURE__ */ jsx(Field, {
              name: "firstName",
              label: "First name",
              defaultValue: actionData?.fields.firstName ?? user.firstName,
              autoComplete: "given-name",
              required: true,
              error: actionData?.errors.firstName
            }), /* @__PURE__ */ jsx(Field, {
              name: "email",
              label: "Email address",
              autoComplete: "email",
              required: true,
              defaultValue: user.email,
              description: /* @__PURE__ */ jsxs("div", {
                className: "flex gap-1",
                children: [/* @__PURE__ */ jsxs("span", {
                  children: [`This controls your avatar via `, /* @__PURE__ */ jsx("a", {
                    className: "underlined font-bold",
                    href: "https://gravatar.com",
                    target: "_blank",
                    rel: "noreferrer noopener",
                    children: "Gravatar"
                  }), "."]
                }), /* @__PURE__ */ jsx("button", {
                  type: "submit",
                  name: "actionId",
                  value: actionIds.refreshGravatar,
                  children: /* @__PURE__ */ jsx(RefreshIcon, {})
                })]
              }),
              readOnly: true,
              disabled: true
            }), /* @__PURE__ */ jsx(Field, {
              name: "discord",
              label: "Discord",
              defaultValue: userInfo.discord?.username ?? user.discordId ?? "",
              placeholder: "n/a",
              readOnly: true,
              disabled: true,
              description: user.discordId ? /* @__PURE__ */ jsxs("div", {
                className: "flex gap-2",
                children: [/* @__PURE__ */ jsx("a", {
                  className: "underlined",
                  href: `https://discord.com/users/${user.discordId}`,
                  children: "connected"
                }), /* @__PURE__ */ jsx("button", {
                  name: "actionId",
                  value: actionIds.deleteDiscordConnection,
                  type: "submit",
                  "aria-label": "remove connection",
                  className: "text-secondary rotate-45 outline-none hover:scale-150 focus:scale-150",
                  children: /* @__PURE__ */ jsx(PlusIcon, {})
                })]
              }) : /* @__PURE__ */ jsx("a", {
                className: "underlined",
                href: authorizeURL,
                children: "Connect to Discord"
              })
            }), /* @__PURE__ */ jsx(Button, {
              className: "mt-8",
              type: "submit",
              name: "actionId",
              value: actionIds.changeDetails,
              children: "Save changes"
            })]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "col-span-full lg:col-span-4 lg:col-start-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex justify-between gap-2 align-bottom",
            children: [/* @__PURE__ */ jsx(Label, {
              className: "mb-4",
              htmlFor: "chosen-team",
              children: "Chosen team"
            }), /* @__PURE__ */ jsx("a", {
              className: "underlined mb-5 animate-pulse text-lg hover:animate-none focus:animate-none",
              href: "https://kcd.im/shirts",
              children: "Get your team shirt 👕"
            })]
          }), /* @__PURE__ */ jsx("input", {
            className: "sr-only",
            type: "radio",
            name: "team",
            value: team,
            checked: true,
            readOnly: true
          }), /* @__PURE__ */ jsxs("div", {
            className: "ring-team-current ring-offset-team-current relative col-span-full mb-3 rounded-lg bg-gray-100 ring-2 ring-offset-4 focus-within:ring-2 focus-within:outline-none lg:col-span-4 lg:mb-0 dark:bg-gray-800",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-team-current absolute top-9 left-9",
              children: /* @__PURE__ */ jsx(CheckCircledIcon, {})
            }), /* @__PURE__ */ jsxs("div", {
              className: "block px-12 pt-20 pb-12 text-center",
              children: [/* @__PURE__ */ jsx("img", {
                className: clsx("mb-16 block w-full", teamMap[team].image.className),
                src: teamMap[team].image(),
                alt: teamMap[team].image.alt,
                style: teamMap[team].image.style
              }), /* @__PURE__ */ jsx(H6, {
                as: "span",
                children: teamMap[team].label
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(Grid, {
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-12",
        children: [/* @__PURE__ */ jsx(H2, {
          children: "Log in on another device"
        }), /* @__PURE__ */ jsx(H2, {
          variant: "secondary",
          as: "p",
          children: "Use your password, or set up a passkey for easier sign-in."
        })]
      })
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "sm"
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-12",
        children: [/* @__PURE__ */ jsx(H2, {
          children: "Your favorites"
        }), /* @__PURE__ */ jsx(H2, {
          variant: "secondary",
          as: "p",
          children: "Save things you want to revisit."
        })]
      }), data2.favorites.length ? /* @__PURE__ */ jsx("ul", {
        className: "col-span-full space-y-4",
        children: data2.favorites.map((favorite) => /* @__PURE__ */ jsx("li", {
          className: "border-b border-gray-200 pb-4 dark:border-gray-600",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-start justify-between gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "min-w-0",
              children: [/* @__PURE__ */ jsx(Link, {
                to: favorite.href,
                className: "underlined text-primary hover:text-team-current focus:text-team-current block truncate text-lg font-medium focus:outline-none",
                children: favorite.title
              }), /* @__PURE__ */ jsx("p", {
                className: "text-secondary mt-1 text-sm",
                children: favorite.subtitle
              })]
            }), /* @__PURE__ */ jsx(FavoriteToggle, {
              mode: "icon",
              contentType: favorite.contentType,
              contentId: favorite.contentId,
              initialIsFavorite: true,
              className: "flex-none"
            })]
          })
        }, `${favorite.contentType}:${favorite.contentId}`))
      }) : /* @__PURE__ */ jsx(Paragraph, {
        className: "col-span-full",
        children: "No favorites yet. Open a blog post, talk, podcast episode, or YouTube video and hit the star."
      })]
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "sm"
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-12",
        children: [/* @__PURE__ */ jsx(H2, {
          children: "Your call AbhiDev episodes"
        }), /* @__PURE__ */ jsx(H2, {
          variant: "secondary",
          as: "p",
          children: "Episodes where you're the caller."
        })]
      }), data2.abhiCallCallerEpisodes.length ? /* @__PURE__ */ jsx("ul", {
        className: "col-span-full space-y-4",
        children: data2.abhiCallCallerEpisodes.map((episode) => /* @__PURE__ */ jsx("li", {
          className: "border-b border-gray-200 pb-4 dark:border-gray-600",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-start justify-between gap-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "min-w-0",
              children: [/* @__PURE__ */ jsx(Link, {
                to: episode.episodePath,
                className: "underlined text-primary hover:text-team-current focus:text-team-current block truncate text-lg font-medium focus:outline-none",
                children: episode.episodeTitle
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-secondary mt-1 text-sm",
                children: [typeof episode.seasonNumber === "number" && typeof episode.episodeNumber === "number" ? `Calls — Season ${episode.seasonNumber} Episode ${episode.episodeNumber}` : "Calls — episode unavailable", episode.isAnonymous ? " • anonymous" : ""]
              })]
            }), episode.imageUrl ? /* @__PURE__ */ jsx("img", {
              alt: "",
              src: episode.imageUrl,
              className: "h-12 w-12 flex-none rounded-lg object-cover",
              loading: "lazy"
            }) : null]
          })
        }, episode.id))
      }) : /* @__PURE__ */ jsxs("div", {
        className: "col-span-full rounded-lg bg-gray-100 p-8 dark:bg-gray-800",
        children: [/* @__PURE__ */ jsx(Paragraph, {
          className: "mb-4 text-gray-500 dark:text-slate-500",
          children: `No episodes yet. Record a call and Kent might answer it on the podcast.`
        }), /* @__PURE__ */ jsx(ButtonLink, {
          to: "/calls/record/new",
          children: `Record a call`
        })]
      })]
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "sm"
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full",
        children: /* @__PURE__ */ jsx(H2, {
          children: "Manage Your Account"
        })
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "3xs",
        className: "col-span-full"
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full flex flex-wrap gap-3",
        children: [/* @__PURE__ */ jsx(ButtonLink, {
          variant: "secondary",
          download: "my-kcd-data.json",
          href: `${requestInfo.origin}/me/download.json`,
          children: "Download Your Data"
        }), /* @__PURE__ */ jsx(ButtonLink, {
          variant: "secondary",
          to: "passkeys",
          children: "Manage Passkeys"
        }), /* @__PURE__ */ jsx(ButtonLink, {
          variant: "secondary",
          to: "password",
          children: "Password"
        }), /* @__PURE__ */ jsx(Form, {
          action: "/me",
          method: "POST",
          noValidate: true,
          "aria-describedby": "general-error",
          children: /* @__PURE__ */ jsxs(Button, {
            disabled: otherSessionsCount < 1,
            variant: "danger",
            type: "submit",
            name: "actionId",
            value: actionIds.deleteSessions,
            children: ["Sign out of ", otherSessionsCount, " ", otherSessionsCount === 1 ? "session" : "sessions"]
          })
        }), /* @__PURE__ */ jsx(Button, {
          variant: "danger",
          onClick: () => setDeleteModalOpen(true),
          children: "Delete Account"
        })]
      })]
    }), /* @__PURE__ */ jsxs(Dialog, {
      onDismiss: () => setDeleteModalOpen(false),
      isOpen: deleteModalOpen,
      "aria-label": "Delete your account",
      className: "!w-11/12 rounded-lg border-2 border-black lg:!max-w-screen-lg lg:!px-24 lg:!py-14 dark:border-white dark:!bg-gray-900",
      children: [/* @__PURE__ */ jsx(H3, {
        children: "Delete your KCD Account"
      }), /* @__PURE__ */ jsx(Paragraph, {
        children: `Are you certain you want to do this? There's no going back.`
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "2xs"
      }), /* @__PURE__ */ jsx(Form, {
        action: "/me",
        method: "POST",
        noValidate: true,
        "aria-describedby": "general-error",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-wrap gap-4",
          children: [/* @__PURE__ */ jsx(Button, {
            type: "button",
            onClick: () => setDeleteModalOpen(false),
            children: "Nevermind"
          }), /* @__PURE__ */ jsx(Button, {
            variant: "danger",
            name: "actionId",
            value: actionIds.deleteAccount,
            size: "medium",
            type: "submit",
            children: "Delete Account"
          })]
        })
      })]
    })]
  });
}
const _layout = UNSAFE_withComponentProps(YouScreen);
export {
  action,
  _layout as default,
  handle,
  headers,
  loader,
  meta
};
