function listify(array, {
  type = "conjunction",
  style = "long",
  stringify = (thing) => thing.toString()
} = {}) {
  const stringified = array.map((item) => stringify(item));
  const formatter = new Intl.ListFormat("en", { style, type });
  return formatter.format(stringified);
}
export {
  listify as l
};
//# sourceMappingURL=listify-DooNzvOm.js.map
