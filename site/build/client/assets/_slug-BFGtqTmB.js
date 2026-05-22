import { UNSAFE_withComponentProps } from "react-router";
import { c as getSocialImageWithPreTitle } from "./images-D8NqauwH.js";
import { b as getDisplayUrl, g as getUrl } from "./misc-DM3BUXHg.js";
import { g as getSocialMetas } from "./seo-B3cPpSFw.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "date-fns";
const meta = ({
  matches,
  params
}) => {
  const {
    talks = []
  } = matches.find((m) => m.id === "routes/talks/_layout")?.data ?? {};
  const rootData = matches.find((m) => m.id === "root")?.data;
  if (!rootData) {
    return [{
      title: "404: Talk not found"
    }];
  }
  const {
    requestInfo
  } = rootData;
  const talk = params.slug ? talks.find((t) => t.slug === params.slug) : null;
  const title = talk ? talk.title : "404: Talk not found";
  return getSocialMetas({
    title: talk ? `${title} by AbhiDev` : title,
    description: talk ? talk.description : "404: Talk not found",
    url: getUrl(requestInfo),
    image: getSocialImageWithPreTitle({
      url: getDisplayUrl(requestInfo),
      featuredImage: "abhi/abhi-speaking-all-things-open",
      title,
      preTitle: `Checkout this talk by Kent`
    })
  });
};
const $slug = UNSAFE_withComponentProps(function TalksSlug() {
  return null;
});
export {
  $slug as default,
  meta
};
//# sourceMappingURL=_slug-BFGtqTmB.js.map
