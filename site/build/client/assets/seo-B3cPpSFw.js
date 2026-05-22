import { b as getGenericSocialImage, i as images } from "./images-D8NqauwH.js";
function getSocialMetas({
  url,
  title = "Helping people make the world a better place through quality software",
  description = "Make the world better with software",
  image = getGenericSocialImage({
    url,
    words: title,
    featuredImage: images.abhiBuddyFlyingSnowboardingBlue.id
  }),
  keywords = "",
  ogType = "website"
}) {
  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "image", content: image },
    { name: "og:url", content: url },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:image", content: image },
    { name: "og:type", content: ogType },
    {
      name: "twitter:card",
      content: image ? "summary_large_image" : "summary"
    },
    { name: "twitter:creator", content: "@kentcdodds" },
    { name: "twitter:site", content: "@kentcdodds" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title }
  ];
}
export {
  getSocialMetas as g
};
//# sourceMappingURL=seo-B3cPpSFw.js.map
