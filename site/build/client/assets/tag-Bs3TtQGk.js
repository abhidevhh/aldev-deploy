import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
function Tag({ tag, selected, onClick, disabled }) {
  return /* @__PURE__ */ jsxs(
    "label",
    {
      className: clsx(
        "relative mr-4 mb-4 block h-auto w-auto cursor-pointer rounded-full px-6 py-3 transition",
        {
          "text-primary bg-secondary": !selected,
          "text-inverse bg-inverse": selected,
          "focus-ring opacity-100": !disabled,
          "opacity-25": disabled
        }
      ),
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: selected,
            onChange: onClick,
            readOnly: !onClick,
            disabled,
            value: tag,
            className: "sr-only"
          }
        ),
        /* @__PURE__ */ jsx("span", { children: tag })
      ]
    }
  );
}
export {
  Tag as T
};
//# sourceMappingURL=tag-Bs3TtQGk.js.map
