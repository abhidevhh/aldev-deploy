import { slugifyWithCounter } from "@sindresorhus/slugify";
import * as YAML from "yaml";
import { c as cachified, b as cache } from "./cache.server-BWnHcoUK.js";
import { d as downloadFile, g as getGitHubContentPath } from "./github.server-CeJRQaMc.js";
import { m as markdownToHtml, a as markdownToHtmlUnwrapped, s as stripHtml } from "./markdown.server-C6vYtRmU.js";
import { f as formatDate, s as typedBoolean } from "./misc-DM3BUXHg.js";
let _slugify;
async function getSlugify() {
  if (!_slugify) {
    _slugify = slugifyWithCounter();
  }
  return _slugify;
}
async function getTalk(rawTalk, allTags) {
  const slugify = await getSlugify();
  const descriptionHTML = rawTalk.description ? await markdownToHtml(rawTalk.description) : "";
  return {
    title: rawTalk.title ?? "TBA",
    tag: allTags.find((tag) => rawTalk.tags?.includes(tag)) ?? rawTalk.tags?.[0],
    tags: rawTalk.tags ?? [],
    slug: slugify(rawTalk.title ?? "TBA"),
    resourceHTMLs: rawTalk.resources ? await Promise.all(rawTalk.resources.map((r) => markdownToHtml(r))) : [],
    descriptionHTML,
    description: descriptionHTML ? await stripHtml(descriptionHTML) : "",
    deliveries: (rawTalk.deliveries ? await Promise.all(
      rawTalk.deliveries.map(async (d) => {
        return {
          eventHTML: d.event ? await markdownToHtmlUnwrapped(d.event) : void 0,
          date: d.date,
          recording: d.recording,
          dateDisplay: d.date ? formatDate(d.date) : "TBA"
        };
      })
    ) : []).sort((a, b) => {
      return a.date && b.date ? moreRecent(a.date, b.date) ? -1 : 1 : 0;
    })
  };
}
function sortByPresentationDate(a, b) {
  const mostRecentA = mostRecent(
    a.deliveries.map(({ date }) => date).filter(typedBoolean)
  );
  const mostRecentB = mostRecent(
    b.deliveries.map(({ date }) => date).filter(typedBoolean)
  );
  return moreRecent(mostRecentA, mostRecentB) ? -1 : 1;
}
function mostRecent(dates = []) {
  return dates.reduce((recent, compare) => {
    if (!recent) return compare;
    return moreRecent(compare, recent) ? compare : recent;
  });
}
function moreRecent(a, b) {
  if (typeof a === "string") a = new Date(a);
  if (typeof b === "string") b = new Date(b);
  return a > b;
}
function getTags(talks) {
  const tagCounts = {};
  for (const talk of talks) {
    if (!talk.tags) continue;
    for (const tag of talk.tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }
  const tags = Object.entries(tagCounts).filter(([_tag, counts]) => counts > 1).sort((l, r) => r[1] - l[1]).map(([tag]) => tag);
  return tags;
}
async function getTalksAndTags({
  request,
  forceFresh,
  timings
}) {
  const slugify = await getSlugify();
  slugify.reset();
  const key = "content:data:talks.yml";
  try {
    return await cachified({
      cache,
      request,
      timings,
      key,
      ttl: 1e3 * 60 * 60 * 24 * 14,
      staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 30,
      forceFresh,
      getFreshValue: async () => {
        const talksString = await downloadFile(
          getGitHubContentPath("data/talks.yml")
        );
        const rawTalks = YAML.parse(talksString);
        if (!Array.isArray(rawTalks)) {
          console.error("Talks is not an array", rawTalks);
          throw new Error("Talks is not an array.");
        }
        const allTags = getTags(rawTalks);
        const allTalks = await Promise.all(
          rawTalks.map((rawTalk) => getTalk(rawTalk, allTags))
        );
        allTalks.sort(sortByPresentationDate);
        return { talks: allTalks, tags: allTags };
      },
      checkValue: (value) => Boolean(value) && typeof value === "object" && Array.isArray(value.talks) && Array.isArray(value.tags)
    });
  } catch (error) {
    console.error(
      `talks: failed to load talks, returning empty fallback`,
      error
    );
    return { talks: [], tags: [] };
  }
}
export {
  getTalksAndTags as g
};
//# sourceMappingURL=talks.server-B60mwIsu.js.map
