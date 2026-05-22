import { jsxs } from "react/jsx-runtime";
function CharacterCountdown({
  id,
  value,
  maxLength,
  warnAt = 100
}) {
  const remaining = maxLength - value.length;
  const remainingDisplay = Math.max(0, remaining);
  let className = "text-gray-500 dark:text-slate-400";
  if (remaining <= 0) className = "text-red-500";
  else if (remaining <= warnAt)
    className = "text-yellow-600 dark:text-yellow-500";
  return /* @__PURE__ */ jsxs(
    "p",
    {
      id,
      className: `mt-2 text-right text-sm tabular-nums ${className}`,
      "aria-live": "polite",
      "aria-atomic": "true",
      children: [
        remainingDisplay,
        " characters left"
      ]
    }
  );
}
export {
  CharacterCountdown as C
};
//# sourceMappingURL=character-countdown-D-g85829.js.map
