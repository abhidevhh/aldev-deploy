import { differenceInWeeks } from "date-fns";
function getAbhiEpisodePath({
  seasonNumber,
  episodeNumber,
  slug
}) {
  return [
    "/chats",
    seasonNumber.toString().padStart(2, "0"),
    episodeNumber.toString().padStart(2, "0"),
    slug
  ].filter(Boolean).join("/");
}
function getFeaturedEpisode(episodes) {
  if (!episodes.length) return null;
  const weeksSinceMyBirthday = differenceInWeeks(
    /* @__PURE__ */ new Date(),
    /* @__PURE__ */ new Date("1988-10-18")
  );
  const featured = episodes[weeksSinceMyBirthday % episodes.length];
  if (!featured) {
    throw new Error(
      `Could not find featured episode. This should be impossible. ${weeksSinceMyBirthday} % ${episodes.length} = ${weeksSinceMyBirthday % episodes.length}`
    );
  }
  return featured;
}
export {
  getAbhiEpisodePath as a,
  getFeaturedEpisode as g
};
//# sourceMappingURL=chats-with-abhi-BpGMpCiR.js.map
