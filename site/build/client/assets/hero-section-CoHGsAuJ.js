import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useReducedMotion, motion } from "framer-motion";
import { g as getImgProps } from "./images-D8NqauwH.js";
import { A as ArrowLink } from "./arrow-button-DBVn13Kl.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { c as H2 } from "./typography-DDpAXXrz.js";
function generateAnimation({
  name,
  steps,
  initial,
  visible
}) {
  const keyframes = /* @__PURE__ */ new Map();
  keyframes.set("0%", {
    opacity: (initial.opacity ?? 0).toString(),
    transform: `translate(${initial.x ?? 0}, ${initial.y ?? 0})`
  });
  for (let step = 0; step < steps; step++) {
    keyframes.set(`${100 * (step + 1) / steps}%`, {
      opacity: `var(--${name}-opacity-step-${step})`,
      transform: `translate(var(--${name}-x-step-${step}), var(--${name}-y-step-${step}))`
    });
  }
  function getVariables(activeStep) {
    const variables = /* @__PURE__ */ new Map();
    for (let step = 0; step < steps; step++) {
      const value = step >= activeStep ? visible : initial;
      variables.set(`--${name}-opacity-step-${step}`, value.opacity ?? 0);
      variables.set(`--${name}-x-step-${step}`, value.x ?? 0);
      variables.set(`--${name}-y-step-${step}`, value.y ?? 0);
    }
    return Object.fromEntries(variables);
  }
  return {
    name,
    keyframes: Object.fromEntries(keyframes),
    getVariables
  };
}
const heroTextAnimation = generateAnimation({
  name: "hero-text-reveal",
  steps: 4,
  initial: {
    opacity: 0,
    y: "25px"
  },
  visible: {
    opacity: 1,
    y: "0px"
  }
});
function HeroSection({
  action,
  title,
  subtitle,
  arrowUrl,
  arrowLabel,
  image,
  imageProps,
  imageBuilder,
  imageSize = "medium",
  as = "header"
}) {
  const hasImage = Boolean(image ?? imageProps ?? imageBuilder);
  const shouldReduceMotion = useReducedMotion();
  let animationStep = 0;
  return /* @__PURE__ */ jsxs(
    Grid,
    {
      as,
      className: clsx("lg: mb-24 h-auto pt-24 lg:min-h-[40rem] lg:pb-12", {
        "lg:mb-64": arrowLabel,
        "lg:mb-0": !arrowLabel
      }),
      children: [
        hasImage ? /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx("col-span-full mb-12 lg:mb-0", {
              "px-10 lg:col-span-5 lg:col-start-7": imageSize === "medium",
              "flex items-start justify-end pl-10 lg:col-span-6 lg:col-start-6": imageSize === "large",
              "lg:-mr-5vw flex items-center justify-center lg:col-span-7 lg:col-start-6 lg:-mt-24 lg:px-0": imageSize === "giant"
            }),
            children: imageProps ? /* @__PURE__ */ jsx(
              motion.img,
              {
                ...imageProps,
                className: clsx(
                  "h-auto w-full object-contain",
                  {
                    "max-h-[50vh]": imageSize === "medium",
                    "max-h-[75vh]": imageSize === "giant"
                  },
                  imageProps.className
                ),
                initial: { scale: shouldReduceMotion ? 1 : 1.5, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { duration: 0.75 }
              }
            ) : imageBuilder ? /* @__PURE__ */ jsx(
              "img",
              {
                ...getHeroImageProps(imageBuilder, {
                  className: clsx(
                    "motion-safe:animate-hero-image-reveal h-auto w-full object-contain",
                    {
                      "max-h-[50vh]": imageSize === "medium",
                      "max-h-[75vh]": imageSize === "giant"
                    }
                  )
                })
              }
            ) : image
          }
        ) : null,
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "col-span-full pt-6 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col",
              {
                "lg:col-span-5": hasImage,
                "lg:col-span-7": !hasImage
              }
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-auto flex-col", children: [
                /* @__PURE__ */ jsx(
                  H2,
                  {
                    as: "h2",
                    className: "motion-safe:animate-hero-text-reveal",
                    style: heroTextAnimation.getVariables(animationStep++),
                    children: title
                  }
                ),
                subtitle ? /* @__PURE__ */ jsx(
                  H2,
                  {
                    as: "p",
                    variant: "secondary",
                    className: "motion-safe:animate-hero-text-reveal mt-3",
                    style: heroTextAnimation.getVariables(animationStep++),
                    children: subtitle
                  }
                ) : null,
                action ? /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "motion-safe:animate-hero-text-reveal mt-14 flex flex-col space-y-4",
                    style: heroTextAnimation.getVariables(animationStep++),
                    children: action
                  }
                ) : null
              ] }),
              arrowUrl ? /* @__PURE__ */ jsx(
                "div",
                {
                  className: "motion-safe:animate-hero-text-reveal hidden pt-12 lg:block",
                  style: heroTextAnimation.getVariables(animationStep++),
                  children: /* @__PURE__ */ jsx(ArrowLink, { to: arrowUrl, direction: "down", textSize: "small", children: arrowLabel })
                }
              ) : null
            ]
          }
        )
      ]
    }
  );
}
function getHeroImageProps(imageBuilder, {
  transformations,
  style,
  className
} = {}) {
  return getImgProps(imageBuilder, {
    style,
    className,
    widths: [256, 550, 700, 900, 1300, 1800],
    sizes: [
      "(max-width: 1023px) 80vw",
      "(min-width: 1024px) and (max-width: 1279px) 50vw",
      "(min-width: 1280px) 900px"
    ],
    transformations
  });
}
export {
  HeroSection as H,
  getHeroImageProps as g
};
//# sourceMappingURL=hero-section-CoHGsAuJ.js.map
