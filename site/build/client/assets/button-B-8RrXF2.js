import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { clsx } from "clsx";
import { A as AnchorOrLink } from "./misc-react-D8yAGzlT.js";
function getClassName({ className }) {
  return clsx(
    "group relative inline-flex text-lg font-medium opacity-100 transition focus:outline-none disabled:opacity-50",
    className
  );
}
function ButtonInner({
  children,
  variant,
  size = "large"
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(
          "focus-ring absolute inset-0 transform rounded-full opacity-100 transition disabled:opacity-50",
          {
            "border-secondary bg-primary border-2 group-hover:border-transparent group-focus:border-transparent": variant === "secondary" || variant === "danger",
            danger: variant === "danger",
            "bg-inverse": variant === "primary"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(
          "relative flex h-full w-full items-center justify-center whitespace-nowrap",
          {
            "text-primary": variant === "secondary",
            "text-inverse": variant === "primary",
            "text-red-500": variant === "danger",
            "space-x-5 px-11 py-6": size === "large",
            "space-x-3 px-8 py-4": size === "medium",
            "space-x-1 px-5 py-2 text-sm": size === "small"
          }
        ),
        children
      }
    )
  ] });
}
function Button({
  children,
  variant = "primary",
  size = "large",
  className,
  ...buttonProps
}) {
  return /* @__PURE__ */ jsx("button", { ...buttonProps, className: getClassName({ className }), children: /* @__PURE__ */ jsx(ButtonInner, { variant, size, children }) });
}
function LinkButton({
  className,
  underlined,
  ...buttonProps
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...buttonProps,
      className: clsx(
        className,
        underlined ? "underlined whitespace-nowrap focus:outline-none" : "underline",
        className?.includes("block") ? "" : "inline-block",
        "text-primary"
      )
    }
  );
}
function ButtonLink({
  children,
  variant = "primary",
  size = "large",
  className,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsx(AnchorOrLink, { ref, className: getClassName({ className }), ...rest, children: /* @__PURE__ */ jsx(ButtonInner, { variant, size, children }) });
}
export {
  ButtonLink as B,
  LinkButton as L,
  Button as a
};
//# sourceMappingURL=button-B-8RrXF2.js.map
