import { h as images } from "./images-Dyd95Mrb.js";
import { A as toBase64, l as getOptionalTeam } from "./misc-CQO4K9rH.js";
const DESIGN_SIZE = 3e3;
const KODY_PROFILE_BY_TEAM = {
  RED: images.abhiBuddyProfileRed,
  BLUE: images.abhiBuddyProfileBlue,
  YELLOW: images.abhiBuddyProfileYellow,
  UNKNOWN: images.abhiBuddyProfileGray
};
function doubleEncode(s) {
  return encodeURIComponent(encodeURIComponent(s));
}
function getAbhiCallEpisodeArtworkAvatar({
  isAnonymous,
  team,
  gravatarUrl
}) {
  if (isAnonymous) {
    return { kind: "public", publicId: images.abhiBuddyProfileGray.id };
  }
  if (gravatarUrl) {
    return { kind: "fetch", url: gravatarUrl };
  }
  const teamKey = getOptionalTeam(team);
  return {
    kind: "public",
    publicId: KODY_PROFILE_BY_TEAM[teamKey].id
  };
}
function getAbhiCallEpisodeArtworkUrl({
  title,
  url,
  name,
  avatar,
  avatarIsRound,
  size = DESIGN_SIZE
}) {
  const encodedTitle = doubleEncode(title);
  const encodedUrl = doubleEncode(url);
  const encodedName = doubleEncode(name);
  const avatarLayer = avatar.kind === "public" ? `l_${avatar.publicId.replace(/\//g, ":")}` : `l_fetch:${encodeURIComponent(toBase64(avatar.url))}`;
  const radius = avatarIsRound ? ",r_max" : "";
  const textLines = Math.ceil(Math.min(title.length, 50) / 18);
  const avatarYPosition = textLines + 0.6;
  const nameYPosition = -textLines + 5.2;
  const vars = `$th_${DESIGN_SIZE},$tw_${DESIGN_SIZE},$gw_$tw_div_12,$gh_$th_div_12`;
  const baseTransforms = [
    `https://res.cloudinary.com/abhidev-com/image/upload`,
    vars,
    `w_$tw,h_$th,l_abhidev.com:social-background`,
    `co_white,c_fit,g_north_west,w_$gw_mul_6,h_$gh_mul_2.6,x_$gw_mul_0.8,y_$gh_mul_0.8,l_text:abhidev.com:Matter-Medium.woff2_180:${encodedTitle}`,
    `c_crop${radius},g_north_west,h_$gh_mul_5.5,w_$gh_mul_5.5,x_$gw_mul_0.8,y_$gh_mul_${avatarYPosition},${avatarLayer}`,
    `co_rgb:a9adc1,c_fit,g_south_west,w_$gw_mul_8,h_$gh_mul_4,x_$gw_mul_0.8,y_$gh_mul_0.8,l_text:abhidev.com:Matter-Regular.woff2_120:${encodedUrl}`,
    `co_rgb:a9adc1,c_fit,g_south_west,w_$gw_mul_8,h_$gh_mul_4,x_$gw_mul_0.8,y_$gh_mul_${nameYPosition},l_text:abhidev.com:Matter-Regular.woff2_140:${encodedName}`,
    `c_fit,g_east,w_$gw_mul_11,h_$gh_mul_11,x_$gw,l_abhidev.com:illustrations:mic`
  ];
  if (size === DESIGN_SIZE) {
    return [
      ...baseTransforms,
      `c_fill,w_$tw,h_$th/abhidev.com/social-background.png`
    ].join("/");
  }
  return [
    ...baseTransforms,
    `c_fill,w_$tw,h_$th`,
    `c_scale,w_${size},h_${size}`,
    `abhidev.com/social-background.png`
  ].join("/");
}
const abhiCallFieldConstraints = {
  title: { minLength: 5, maxLength: 80 },
  // Optional caller-provided context; not required for submission.
  notes: { maxLength: 5e3 }
};
function getErrorForTitle(title) {
  if (!title) return `Title is required`;
  const { minLength, maxLength } = abhiCallFieldConstraints.title;
  if (title.length < minLength) {
    return `Title must be at least ${minLength} characters`;
  }
  if (title.length > maxLength) {
    return `Title must be no longer than ${maxLength} characters`;
  }
  return null;
}
function getErrorForNotes(notes) {
  if (!notes) return null;
  if (!notes.trim()) return null;
  const { maxLength } = abhiCallFieldConstraints.notes;
  if (notes.length > maxLength) {
    return `Notes must be no longer than ${maxLength} characters`;
  }
  return null;
}
function getErrorForAudio(audio) {
  if (!audio) return "Audio file is required";
  return null;
}
function getEpisodeFromParams(episodes, params) {
  return episodes.find(
    (e) => e.seasonNumber === Number(params.season) && e.episodeNumber === Number(params.episode)
  );
}
function getEpisodePath({
  seasonNumber,
  episodeNumber,
  slug
}) {
  return [
    "/calls",
    seasonNumber.toString().padStart(2, "0"),
    episodeNumber.toString().padStart(2, "0"),
    slug
  ].filter(Boolean).join("/");
}
export {
  abhiCallFieldConstraints as a,
  getAbhiCallEpisodeArtworkUrl as b,
  getEpisodeFromParams as c,
  getEpisodePath as d,
  getErrorForAudio as e,
  getErrorForNotes as f,
  getAbhiCallEpisodeArtworkAvatar as g,
  getErrorForTitle as h
};
