const favoriteContentTypes = [
  "blog-post",
  "talk",
  "abhi-call-episode",
  "chats-with-kent-episode",
  "youtube-video"
];
const favoriteIntents = ["add", "remove"];
function getEpisodeFavoriteContentId({
  seasonNumber,
  episodeNumber
}) {
  return `${String(seasonNumber)}:${String(episodeNumber)}`;
}
function parseEpisodeFavoriteContentId(contentId) {
  const [seasonRaw, episodeRaw, ...rest] = contentId.split(":");
  if (!seasonRaw || !episodeRaw || rest.length) return null;
  const seasonNumber = Number(seasonRaw);
  const episodeNumber = Number(episodeRaw);
  if (!Number.isInteger(seasonNumber) || seasonNumber < 1) return null;
  if (!Number.isInteger(episodeNumber) || episodeNumber < 1) return null;
  if (String(seasonNumber) !== seasonRaw) return null;
  if (String(episodeNumber) !== episodeRaw) return null;
  return { seasonNumber, episodeNumber };
}
function getEpisodeHomeworkContentId({
  seasonNumber,
  episodeNumber,
  itemIndex
}) {
  return `${String(seasonNumber)}:${String(episodeNumber)}:${String(itemIndex)}`;
}
function parseEpisodeHomeworkContentId(contentId) {
  const [seasonRaw, episodeRaw, itemIndexRaw, ...rest] = contentId.split(":");
  if (!seasonRaw || !episodeRaw || !itemIndexRaw || rest.length) return null;
  const seasonNumber = Number(seasonRaw);
  const episodeNumber = Number(episodeRaw);
  const itemIndex = Number(itemIndexRaw);
  if (!Number.isInteger(seasonNumber) || seasonNumber < 1) return null;
  if (!Number.isInteger(episodeNumber) || episodeNumber < 1) return null;
  if (!Number.isInteger(itemIndex) || itemIndex < 0) return null;
  if (String(seasonNumber) !== seasonRaw) return null;
  if (String(episodeNumber) !== episodeRaw) return null;
  if (String(itemIndex) !== itemIndexRaw) return null;
  return { seasonNumber, episodeNumber, itemIndex };
}
export {
  getEpisodeHomeworkContentId as a,
  parseEpisodeHomeworkContentId as b,
  favoriteContentTypes as c,
  favoriteIntents as f,
  getEpisodeFavoriteContentId as g,
  parseEpisodeFavoriteContentId as p
};
//# sourceMappingURL=favorites-BOCNblj8.js.map
