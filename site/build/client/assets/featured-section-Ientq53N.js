import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { d as getImgProps } from "./images-Dyd95Mrb.js";
import { a as ArrowLink } from "./arrow-button-DsHCk3Gf.js";
import { a as BlurrableImage, c as ClipboardCopyButton } from "./root-XTBE-Fp5.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { e as H6, a as H2 } from "./typography-DBSbiCOF.js";
function FeaturedSection({
  slug,
  href,
  caption = "Featured article",
  cta = "Read full article",
  imageBuilder,
  imageUrl,
  imageAlt,
  blurDataUrl,
  title = "Untitled Post",
  subTitle,
  permalink,
  leadingTeam
}) {
  const img = imageBuilder ? /* @__PURE__ */ jsx(
    "img",
    {
      ...getImgProps(imageBuilder, {
        className: "rounded-lg object-cover object-center",
        widths: [300, 600, 900, 1700, 2500],
        sizes: [
          "(max-width: 1023px) 80vw",
          "(min-width:1024px) and (max-width:1620px) 25vw",
          "410px"
        ],
        transformations: { background: "rgb:e6e9ee" }
      })
    }
  ) : /* @__PURE__ */ jsx(
    "img",
    {
      className: "rounded-lg object-cover object-center",
      src: imageUrl,
      alt: imageAlt
    }
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "w-full px-8 lg:px-0",
        leadingTeam ? `set-color-team-current-${leadingTeam.toLowerCase()}` : null
      ),
      children: /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gray-100 lg:bg-transparent dark:bg-gray-800 lg:dark:bg-transparent", children: /* @__PURE__ */ jsx("div", { className: "-mx-8 lg:mx-0", children: /* @__PURE__ */ jsxs(Grid, { className: "group rounded-lg px-4 pt-14 pb-6 sm:px-0 md:pb-12 lg:bg-gray-100 lg:dark:bg-gray-800", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-full lg:col-span-5 lg:col-start-2 lg:flex lg:flex-col lg:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(H6, { as: "h2", children: caption }),
            /* @__PURE__ */ jsx(H2, { as: "h3", className: "mt-12", children: title }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 text-xl font-medium text-slate-500", children: subTitle })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 flex items-center justify-between", children: /* @__PURE__ */ jsxs(ArrowLink, { to: slug ?? href ?? "/", prefetch: "intent", children: [
            cta,
            /* @__PURE__ */ jsx("div", { className: "focus-ring absolute inset-0 right-0 left-0 z-10 rounded-lg md:-right-12 md:-left-12 lg:right-0 lg:left-0" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative col-span-full mt-12 lg:col-span-4 lg:col-start-8", children: [
          blurDataUrl ? /* @__PURE__ */ jsx(
            BlurrableImage,
            {
              blurDataUrl,
              img,
              className: "aspect-[4/3] lg:aspect-[4/5]"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] lg:aspect-[4/5]", children: img }),
          leadingTeam ? /* @__PURE__ */ jsx("div", { className: "bg-team-current absolute top-6 left-6 z-20 h-4 w-4 rounded-full p-1" }) : null,
          permalink ? /* @__PURE__ */ jsx(
            ClipboardCopyButton,
            {
              className: "absolute top-6 left-6 z-20",
              value: permalink
            }
          ) : null
        ] })
      ] }) }) })
    }
  );
}
export {
  FeaturedSection as F
};
