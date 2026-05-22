import { subYears, subMonths } from "date-fns";
import pLimit from "p-limit";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import shuffle from "lodash/shuffle.js";
import "lodash/sortBy.js";
import { rankings, matchSorter } from "match-sorter";
import { c as cachified, b as cache, l as lruCache } from "./cache.server-BWnHcoUK.js";
import { getClientSession } from "./client.server-CTs0DPxN.js";
import { s as sendMessageFromDiscordBot } from "./user-info.server-DQEJabU4.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { g as getBlogMdxListItems } from "./mdx.server-CumfvRLd.js";
import { s as typedBoolean, h as getDomainUrl, q as getOptionalTeam, u as teams } from "./misc-DM3BUXHg.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import { getUser } from "./session.server-BVOCbXUc.js";
import { x as teamEmoji } from "./root-BtDGpB2R.js";
import { t as time } from "./timing.server-Ckj1L-xw.js";
function getRankingLeader(rankings2) {
  if (!rankings2) return null;
  return rankings2.reduce((leader, rank) => {
    if (rank.ranking <= 0) return leader;
    if (!leader || rank.ranking > leader.ranking) return rank;
    return leader;
  }, null);
}
function filterPosts(posts, searchString) {
  if (!searchString) return posts;
  const options = {
    keys: [
      {
        key: "frontmatter.title",
        threshold: rankings.CONTAINS
      },
      {
        key: "frontmatter.categories",
        threshold: rankings.CONTAINS,
        maxRanking: rankings.CONTAINS
      },
      {
        key: "frontmatter.meta.keywords",
        threshold: rankings.CONTAINS,
        maxRanking: rankings.CONTAINS
      },
      {
        key: "frontmatter.description",
        threshold: rankings.CONTAINS,
        maxRanking: rankings.CONTAINS
      }
    ]
  };
  const allResults = matchSorter(posts, searchString, options);
  const searches = new Set(searchString.split(" "));
  if (searches.size < 2) {
    return allResults;
  }
  const [firstWord, ...restWords] = searches.values();
  if (!firstWord) {
    return [];
  }
  const individualWordOptions = {
    ...options,
    keys: options.keys.map((key) => {
      return {
        ...key,
        maxRanking: rankings.CASE_SENSITIVE_EQUAL,
        threshold: rankings.WORD_STARTS_WITH
      };
    })
  };
  let individualWordResults = matchSorter(
    posts,
    firstWord,
    individualWordOptions
  );
  for (const word of restWords) {
    const searchResult = matchSorter(
      individualWordResults,
      word,
      individualWordOptions
    );
    individualWordResults = individualWordResults.filter(
      (r) => searchResult.includes(r)
    );
  }
  return Array.from(/* @__PURE__ */ new Set([...allResults, ...individualWordResults]));
}
async function getBlogRecommendations({
  request,
  limit = 3,
  keywords = [],
  exclude: externalExclude = [],
  timings
}) {
  const allPosts = await getBlogMdxListItems({ forceFresh: false, timings });
  let exclude = Array.from(
    /* @__PURE__ */ new Set([
      ...externalExclude,
      ...allPosts.filter(
        (post) => post.frontmatter.unlisted ?? post.frontmatter.archived ?? post.frontmatter.draft
      ).map((p) => p.slug)
    ])
  );
  const user = await getUser(request);
  const client = await getClientSession(request, user);
  const clientId = client.getClientId();
  const where = user ? { user: { id: user.id }, postSlug: { notIn: exclude.filter(Boolean) } } : { clientId, postSlug: { notIn: exclude.filter(Boolean) } };
  const readPosts = await time(
    prisma.postRead.groupBy({
      by: ["postSlug"],
      where
    }),
    {
      timings,
      type: "getReadPosts",
      desc: "getting slugs of all posts read by user"
    }
  );
  exclude.push(...readPosts.map((p) => p.postSlug));
  const recommendablePosts = allPosts.filter(
    (post) => !exclude.includes(post.slug)
  );
  if (limit === null) return shuffle(recommendablePosts);
  const recommendations = [];
  const groupsCount = keywords.length ? 3 : 2;
  const limitPerGroup = Math.floor(limit / groupsCount) || 1;
  if (keywords.length) {
    const postsByBestMatch = keywords.length ? Array.from(
      new Set(...keywords.map((k) => filterPosts(recommendablePosts, k)))
    ) : recommendablePosts;
    const bestMatchRecommendations = shuffle(
      postsByBestMatch.slice(0, limitPerGroup * 4)
    ).slice(0, limitPerGroup);
    recommendations.push(...bestMatchRecommendations);
    exclude = [...exclude, ...bestMatchRecommendations.map(({ slug }) => slug)];
  }
  const mostPopularRecommendationSlugs = await getMostPopularPostSlugs({
    // get 4x the limit so we can have a little randomness
    limit: limitPerGroup * 4,
    exclude,
    timings,
    request
  });
  const mostPopularRecommendations = shuffle(
    mostPopularRecommendationSlugs.map((slug) => recommendablePosts.find(({ slug: s }) => s === slug)).filter(typedBoolean)
  ).slice(0, limitPerGroup);
  recommendations.push(...mostPopularRecommendations);
  exclude = [...exclude, ...mostPopularRecommendationSlugs];
  if (recommendations.length < limit) {
    const remainingPosts = recommendablePosts.filter(
      ({ slug }) => !exclude.includes(slug)
    );
    const completelyRandomRecommendations = shuffle(remainingPosts).slice(
      0,
      limit - recommendations.length
    );
    recommendations.push(...completelyRandomRecommendations);
  }
  return shuffle(recommendations);
}
async function getMostPopularPostSlugs({
  limit,
  exclude,
  timings,
  request
}) {
  const readCounts = await getBlogPostReadCounts({ request, timings });
  const postsSortedByMostPopular = Object.entries(readCounts).sort(([aSlug, aCount], [bSlug, bCount]) => {
    if (bCount !== aCount) return bCount - aCount;
    return aSlug.localeCompare(bSlug);
  }).map(([slug]) => slug);
  return postsSortedByMostPopular.filter((s) => !exclude.includes(s)).slice(0, limit);
}
async function promiseWithTimeout(promise, timeoutMs) {
  let timeoutHandle = null;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error("Timeout")), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutHandle) clearTimeout(timeoutHandle);
  }
}
async function getBlogPostReadCounts({
  request,
  timings
}) {
  return cachified({
    key: `blog:post-read-counts`,
    ttl: 1e3 * 60 * 30,
    staleWhileRevalidate: 1e3 * 60 * 60 * 24,
    cache: lruCache,
    request,
    timings,
    checkValue: (value) => typeof value === "object" && value !== null && !Array.isArray(value) && Object.values(value).every(
      (v) => typeof v === "number"
    ),
    getFreshValue: async (context) => {
      try {
        const timeoutMs = context.background ? 1e3 * 10 : 1e3 * 5;
        const result = await promiseWithTimeout(
          prisma.postRead.groupBy({
            by: ["postSlug"],
            _count: { postSlug: true }
          }),
          timeoutMs
        );
        return Object.fromEntries(
          result.map((r) => [r.postSlug, r._count.postSlug])
        );
      } catch (error) {
        console.error(`Failed to get blog post read counts`, error);
        context.metadata.ttl = 1e3 * 60;
        return {};
      }
    }
  });
}
async function getTotalPostReads({
  request,
  slug,
  timings
}) {
  const key = `total-post-reads:${slug ?? "__all-posts__"}`;
  return cachified({
    key,
    cache: lruCache,
    ttl: 1e3 * 60 * 30,
    staleWhileRevalidate: 1e3 * 60 * 60 * 24,
    request,
    timings,
    checkValue: (value) => typeof value === "number",
    getFreshValue: async () => {
      const readCounts = await getBlogPostReadCounts({ request, timings });
      if (slug) return readCounts[slug] ?? 0;
      return Object.values(readCounts).reduce((sum, count) => sum + count, 0);
    }
  });
}
function isRawQueryResult(result) {
  return Array.isArray(result) && result.every((r) => typeof r === "object");
}
async function getReaderCount({
  request,
  timings
}) {
  const key = "total-reader-count";
  return cachified({
    key,
    cache: lruCache,
    ttl: 1e3 * 60 * 5,
    staleWhileRevalidate: 1e3 * 60 * 60 * 24,
    request,
    timings,
    checkValue: (value) => typeof value === "number",
    getFreshValue: async () => {
      const result = await prisma.$queryRaw`
      SELECT
        (SELECT COUNT(DISTINCT "userId") FROM "PostRead" WHERE "userId" IS NOT NULL) +
        (SELECT COUNT(DISTINCT "clientId") FROM "PostRead" WHERE "clientId" IS NOT NULL)`;
      if (!isRawQueryResult(result)) {
        console.error(`Unexpected result from getReaderCount: ${result}`);
        return 0;
      }
      const count = Object.values(result[0] ?? [])[0] ?? 0;
      return Number(count);
    }
  });
}
async function getBlogReadRankings({
  slug,
  request,
  forceFresh,
  timings
}) {
  const key = slug ? `blog:${slug}:rankings` : `blog:rankings`;
  const rankingObjs = await cachified({
    key,
    cache,
    request,
    timings,
    ttl: slug ? 1e3 * 60 * 60 * 24 * 7 : 1e3 * 60 * 60,
    staleWhileRevalidate: 1e3 * 60 * 60 * 24,
    forceFresh,
    checkValue: (value) => Array.isArray(value) && value.every((v) => typeof v === "object" && "team" in v),
    getFreshValue: async () => {
      const rawRankingData = await Promise.all(
        teams.map(async function getRankingsForTeam(team) {
          const totalReads = await prisma.postRead.count({
            where: {
              postSlug: slug,
              user: { team }
            }
          });
          const activeMembers = await getActiveMembers({ team, timings });
          const recentReads = await getRecentReads({ slug, team, timings });
          let ranking = 0;
          if (activeMembers) {
            ranking = Number((recentReads / activeMembers).toFixed(4));
          }
          return { team, totalReads, ranking };
        })
      );
      const rankings2 = rawRankingData.map((r) => r.ranking);
      const maxRanking = Math.max(...rankings2);
      const minRanking = Math.min(...rankings2);
      const rankPercentages = rawRankingData.map(
        ({ team, totalReads, ranking }) => {
          return {
            team,
            totalReads,
            ranking,
            percent: Number(
              ((ranking - minRanking) / (maxRanking - minRanking || 1)).toFixed(
                2
              )
            )
          };
        }
      );
      return rankPercentages;
    }
  });
  return rankingObjs.sort(
    ({ percent: a }, { percent: b }) => b === a ? Math.random() > 0.5 ? -1 : 1 : a > b ? -1 : 1
  );
}
async function getAllBlogPostReadRankings({
  request,
  forceFresh,
  timings
}) {
  const key = "all-blog-post-read-rankings";
  return cachified({
    key,
    cache,
    request,
    timings,
    forceFresh,
    ttl: 1e3 * 60 * 5,
    // the underlying caching should be able to handle this every 5 minues
    staleWhileRevalidate: 1e3 * 60 * 60 * 24,
    getFreshValue: async () => {
      const posts = await getBlogMdxListItems({ request, timings });
      const limit = pLimit(2);
      const allPostReadRankings = {};
      await Promise.all(
        posts.map(
          (post) => limit(async () => {
            allPostReadRankings[post.slug] = await getBlogReadRankings({
              request,
              slug: post.slug,
              timings
            });
          })
        )
      );
      return allPostReadRankings;
    }
  });
}
async function getRecentReads({
  slug,
  team,
  timings
}) {
  const withinTheLastSixMonths = subMonths(/* @__PURE__ */ new Date(), 6);
  const count = await time(
    prisma.postRead.count({
      where: {
        postSlug: slug,
        createdAt: { gt: withinTheLastSixMonths },
        user: { team }
      }
    }),
    {
      timings,
      type: "getRecentReads",
      desc: `Getting reads of ${slug} by ${team} within the last 6 months`
    }
  );
  return count;
}
async function getActiveMembers({
  team,
  timings
}) {
  const withinTheLastYear = subYears(/* @__PURE__ */ new Date(), 1);
  const count = await time(
    prisma.user.count({
      where: {
        team,
        postReads: {
          some: {
            createdAt: { gt: withinTheLastYear }
          }
        }
      }
    }),
    {
      timings,
      type: "getActiveMembers",
      desc: `Getting active members of ${team}`
    }
  );
  return count;
}
async function getSlugReadsByUser({
  request,
  timings
}) {
  const user = await getUser(request);
  const clientSession = await getClientSession(request, user);
  const clientId = clientSession.getClientId();
  const reads = await time(
    prisma.postRead.findMany({
      where: user ? { userId: user.id } : { clientId },
      select: { postSlug: true }
    }),
    {
      timings,
      type: "getSlugReadsByUser",
      desc: `Getting reads by ${user ? user.id : clientId}`
    }
  );
  return Array.from(new Set(reads.map((read) => read.postSlug)));
}
async function getPostJson(request) {
  const posts = await getBlogMdxListItems({ request });
  const blogUrl = `${getDomainUrl(request)}/blog`;
  return posts.map((post) => {
    const {
      slug,
      frontmatter: {
        title,
        description,
        meta: { keywords = [] } = {},
        categories
      }
    } = post;
    return {
      id: slug,
      slug,
      productionUrl: `${blogUrl}/${slug}`,
      title,
      categories,
      keywords,
      description
    };
  });
}
const leaderboardChannelId = getEnv().DISCORD_LEADERBOARD_CHANNEL;
const getUserDiscordMention = (user) => user.discordId ? `<@!${user.discordId}>` : user.firstName;
async function notifyOfTeamLeaderChangeOnPost({
  request,
  prevLeader,
  newLeader,
  postSlug,
  reader
}) {
  const blogUrl = `${getDomainUrl(request)}/blog`;
  const newLeaderEmoji = teamEmoji[newLeader];
  const url = `${blogUrl}/${postSlug}`;
  const newTeamMention = `the ${newLeaderEmoji} ${newLeader.toLowerCase()} team`;
  if (prevLeader) {
    const prevLeaderEmoji = teamEmoji[prevLeader];
    const prevTeamMention = `the ${prevLeaderEmoji} ${prevLeader.toLowerCase()} team`;
    if (reader && reader.team === newLeader) {
      const readerMention = getUserDiscordMention(reader);
      const cause = `${readerMention} just read ${url} and won the post from ${prevTeamMention} for ${newTeamMention}!`;
      await sendMessageFromDiscordBot(
        leaderboardChannelId,
        `🎉 Congratulations to ${newTeamMention}! You've won a post!

${cause}`
      );
    } else {
      const who = reader ? `Someone on the ${teamEmoji[getOptionalTeam(reader.team)]} ${reader.team.toLowerCase()} team` : `An anonymous user`;
      const cause = `${who} just read ${url} and triggered a recalculation of the rankings: ${prevTeamMention} lost the post and it's now claimed by ${newTeamMention}!`;
      await sendMessageFromDiscordBot(
        leaderboardChannelId,
        `🎉 Congratulations to ${newTeamMention}! You've won a post!

${cause}`
      );
    }
  } else if (reader) {
    const readerMention = getUserDiscordMention(reader);
    await sendMessageFromDiscordBot(
      leaderboardChannelId,
      `Congratulations to ${newTeamMention}! You've won a post!

${readerMention} just read ${url} and claimed the post for ${newTeamMention}!`
    );
  }
}
async function notifyOfOverallTeamLeaderChange({
  request,
  prevLeader,
  newLeader,
  postSlug,
  reader
}) {
  const blogUrl = `${getDomainUrl(request)}/blog`;
  const newLeaderEmoji = teamEmoji[newLeader];
  const url = `${blogUrl}/${postSlug}`;
  const cause = reader ? `${getUserDiscordMention(reader)} just read ${url}` : `An anonymous user just read ${url} triggering a ranking recalculation`;
  if (prevLeader) {
    const prevLeaderEmoji = teamEmoji[prevLeader];
    await sendMessageFromDiscordBot(
      leaderboardChannelId,
      `🎉 Congratulations to the ${newLeaderEmoji} ${newLeader.toLowerCase()} team! ${cause} and knocked team ${prevLeaderEmoji} ${prevLeader.toLowerCase()} team off the top of the leader board! 👏`
    );
  } else {
    await sendMessageFromDiscordBot(
      leaderboardChannelId,
      `🎉 Congratulations to the ${newLeaderEmoji} ${newLeader.toLowerCase()} team! ${cause} and took ${newLeader.toLowerCase()} team to the top of the leader board! 👏`
    );
  }
}
export {
  getRankingLeader as a,
  getBlogReadRankings as b,
  getTotalPostReads as c,
  getReaderCount as d,
  getAllBlogPostReadRankings as e,
  filterPosts as f,
  getBlogRecommendations as g,
  getBlogPostReadCounts as h,
  getSlugReadsByUser as i,
  getPostJson as j,
  notifyOfOverallTeamLeaderChange as k,
  notifyOfTeamLeaderChangeOnPost as n
};
//# sourceMappingURL=blog.server-C4fS0n4p.js.map
