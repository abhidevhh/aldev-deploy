import { UNSAFE_withComponentProps } from "react-router";
import { jsx } from "react/jsx-runtime";
import { H as HeroSection } from "./hero-section-BNEKo3U8.js";
import { h as images } from "./images-Dyd95Mrb.js";
import "clsx";
import "framer-motion";
import "./arrow-button-DsHCk3Gf.js";
import "react";
import "./icons-DQAXl5Y1.js";
import "./typography-DBSbiCOF.js";
import "./grid-Bsvu4qfo.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./misc-CQO4K9rH.js";
import "date-fns";
const handle = {
  getSitemapEntries: () => null
};
const meta = () => {
  return [{
    title: "Ain't nothing here"
  }];
};
const _404 = UNSAFE_withComponentProps(function NotFoundPage() {
  return /* @__PURE__ */ jsx("main", {
    children: /* @__PURE__ */ jsx(HeroSection, {
      title: "404 - Oh no, you found a page that's missing stuff.",
      subtitle: "This is not a page on abhidev.com. So sorry.",
      imageBuilder: images.bustedOnewheel
    })
  });
});
export {
  _404 as default,
  handle,
  meta
};
